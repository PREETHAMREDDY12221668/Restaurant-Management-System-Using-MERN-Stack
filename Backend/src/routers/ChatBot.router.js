const express = require("express");
const bodyParser = require("body-parser");
const chrono = require("chrono-node");
const { format, parseISO, parse } = require("date-fns");
const Reservation = require("../models/reservation.model");

const router = express.Router();
router.use(bodyParser.json());

const generateReservationResponse = (name, guests, date, time) => {
  return {
    fulfillmentMessages: [
      {
        payload: {
          richContent: [
            [
              {
                type: "info",
                title: "🎉 Reservation Confirmed!",
                subtitle: `Hey ${name}, your table for ${guests} guests is booked on ${date} at ${time}.`,
                image: {
                  src: {
                    rawUrl: "https://www.flaticon.com/free-icon/hombre_87235?term=suite+people&page=1&position=14&origin=search&related_id=87235",
                  },
                },
                actionLink: "https://example.com/my-reservations",
              },
              {
                type: "divider",
              },
              {
                type: "Chinese, South Indian, Multicuisine, North Indian",
                title: "📍 Restaurant Location",
                text: [
                  "📌 Address: Garden Lane, Revenue Colony, near R.E.C. Petrol Pump, Hanamkonda, Telangana 506004",
                  "📞 Contact: +91-98494-28400",
                ],
              },
              {
                type: "chips",
                options: [
                  {
                    text: "Modify Reservation",
                  },
                  {
                    text: "Cancel Reservation",
                  },
                  {
                    text: "View Menu 🍽️",
                  },
                ],
              },
            ],
          ],
        },
      },
    ],
  };
};

router.post("/webhook", (req, res) => {
  const userQuery = req.body.queryResult?.queryText;

  if (!userQuery) {
    return res.json({ fulfillmentText: "Invalid request format." });
  }

  try {
    const parsedDate = chrono.parseDate(userQuery);

    if (parsedDate) {
      const response = {
        date: format(parsedDate, "yyyy-MM-dd"),
        formatted_date: format(parsedDate, "MMMM dd, yyyy"),
        relative_date: userQuery,
      };
      return res.json({ fulfillmentText: JSON.stringify(response) });
    } else {
      return res.json({ fulfillmentText: "Sorry, I couldn't understand the date." });
    }
  } catch (error) {
    console.error("Error processing date:", error);
    return res.json({ fulfillmentText: "Sorry, I couldn't process the date." });
  }
});

router.post("/webhook-res", async (req, res) => {
  try {
    console.log("Webhook called. Request body:", JSON.stringify(req.body, null, 2));

    const intent = req.body.queryResult.intent.displayName;
    if (intent === "reservation") {
      console.log("Intent recognized correctly");

      const { name, phone, date, time, guests } = req.body.queryResult.parameters;
      console.log(`Received parameters: Name=${name}, Phone=${phone}, Date=${date}, Time=${time}, Guests=${guests}`);

      if (!name || !phone || !date || !time || !guests) {
        return res.json({ fulfillmentText: "Some details are missing for the reservation." });
      }

      // Format Date
      const formattedDate = format(parseISO(date), "MMMM d, yyyy");

      // Format Time (Ensuring `parse` is used for `HH:mm` format)
      const parsedTime = parseISO(time);
      const formattedTime = format(time, "hh:mm a");
      console.log(formattedDate+parsedTime+formattedTime);
      const newReservation = new Reservation({
        name,
        phone,
        formattedDate,
        formattedTime,
        guests,
      });
      await newReservation.save();

      return res.json(generateReservationResponse(name, guests, formattedDate, formattedTime));
    }
    else if (intent === 'Menu.Categories') {
      try {
          const apiResponse = await axios.get('https://restaurant-management-system-using-mern-lqpi.onrender.com/api/items/unique-categories');
          
          // Extract categories from the API response
          const categories = apiResponse.data.data.join(', ');
  
          res.json({ fulfillmentText: `We offer: ${categories}. Which one would you like to explore?` });
      } catch (error) {
          console.error("Error fetching categories:", error);
          res.json({ fulfillmentText: "Sorry, I couldn't fetch the categories. Please try later." });
      }
  }
  


    return res.json({ fulfillmentText: "I didn't understand your request." });
  } catch (error) {
    console.error("Error making reservation:", error);
    return res.json({ fulfillmentText: "Sorry, something went wrong while making the reservation." });
  }
});

module.exports = router;