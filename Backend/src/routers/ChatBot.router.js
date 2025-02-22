const express = require('express');
const bodyParser = require('body-parser');
const chrono = require('chrono-node'); // Correct import
const { format } = require('date-fns');

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

module.exports = router;
