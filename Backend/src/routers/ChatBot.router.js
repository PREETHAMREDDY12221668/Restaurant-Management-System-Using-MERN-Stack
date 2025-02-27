const express = require('express');
const bodyParser = require('body-parser');
const chrono = require('chrono-node'); // Correct import
const reservation = require('../models/reservation.model');
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
                                "type": "info",
                                "title": "🎉 Reservation Confirmed!",
                                "subtitle": `Hey ${name}, your table for ${guests} guests is booked on ${date} at ${time}.`,
                                "image": {
                                    "src": {
                                        "rawUrl": "https://example.com/reservation-success.jpg"
                                    }
                                },
                                "actionLink": "https://example.com/my-reservations"
                            },
                            {
                                "type": "divider"
                            },
                            {
                                "type": "description",
                                "title": "📍 Restaurant Location",
                                "text": [
                                    "📌 Address: 123 Food Street, New York, NY",
                                    "📞 Contact: +1-234-567-8900"
                                ]
                            },
                            {
                                "type": "chips",
                                "options": [
                                    {
                                        "text": "Modify Reservation"
                                    },
                                    {
                                        "text": "Cancel Reservation"
                                    },
                                    {
                                        "text": "View Menu 🍽️"
                                    }
                                ]
                            }
                        ]
                    ]
                }
            }
        ]
    };
};

router.post('/webhook', (req, res) => {
  const userQuery = req.body.queryResult?.queryText; // Ensure safe access

  if (!userQuery) {
    return res.json({ fulfillmentText: 'Invalid request format.' });
  }

  try {
    // Parse the user's query for dates using chrono-node
    const parsedDate = chrono.parseDate(userQuery);

    if (parsedDate) {
      // If a date is found, format it
      const response = {
        date: format(parsedDate, 'yyyy-MM-dd'),
        formatted_date: format(parsedDate, 'MMMM dd, yyyy'),
        relative_date: userQuery
      };
      return res.json({ fulfillmentText: JSON.stringify(response) });
    } else {
      return res.json({ fulfillmentText: "Sorry, I couldn't understand the date." });
    }
  } catch (error) {
    console.error('Error processing date:', error);
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

          // Save reservation to database
          const formattedDate = format(parseISO(rawDate), "MMMM d, yyyy");
          // ✅ Convert Time to 12-Hour Format with AM/PM (e.g., 7:30 PM)
          const formattedTime = format(parseISO(`2024-01-01T${rawTime}`), "hh:mm a");

          const newReservation = new reservation({ name, phone, formattedDate, formattedTime, guests });
          await newReservation.save();

           res.json(generateReservationResponse(name, guests, formattedDate, formattedTime));
      }

      res.json({ fulfillmentText: "I didn't understand your request." });
  } catch (error) {
      console.error("Error making reservation:", error);
      res.json({ fulfillmentText: "Sorry, something went wrong while making the reservation." });
  }
});


module.exports = router;
