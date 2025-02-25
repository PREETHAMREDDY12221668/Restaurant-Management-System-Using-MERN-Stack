const express = require('express');
const bodyParser = require('body-parser');
const chrono = require('chrono-node'); // Correct import
const { format } = require('date-fns');
const reservation = require('../models/reservation.model');
const router = express.Router();
router.use(bodyParser.json());

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
      const intent = req.body.queryResult.intent.displayName;
      if (intent === "make_reservation") {
          const name = req.body.queryResult.parameters.name;
          const phone = req.body.queryResult.parameters.phone;
          const date = req.body.queryResult.parameters.date;
          const time = req.body.queryResult.parameters.time;
          const guests = req.body.queryResult.parameters.guests;

          // Save reservation to database
          const newReservation = new reservation({ name, phone, date, time, guests });
          await newReservation.save();

          // Respond to the user
          return res.json({
              fulfillmentText: `✅ Your table for ${guests} is booked on ${date} at ${time}, ${name}. We’ll call you at ${phone} if needed.`,
          });
      }

      res.json({ fulfillmentText: "I didn't understand your request." });
  } catch (error) {
      console.error("Error making reservation:", error);
      res.json({ fulfillmentText: "Sorry, something went wrong while making the reservation." });
  }
});

module.exports = router;
