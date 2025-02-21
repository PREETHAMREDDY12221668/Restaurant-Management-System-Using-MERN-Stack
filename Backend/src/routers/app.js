const chrono = require('chrono-node');

const userText = req.body.text;

// Parse the input using chrono-node
const parsedDate = chrono.parseDate(userText);

if (parsedDate) {
    const formattedDate = parsedDate.toISOString().split('T')[0]; // YYYY-MM-DD
    const formattedTime = parsedDate.toTimeString().split(' ')[0].substring(0, 5); // HH:MM

    res.json({
        date: formattedDate,
        time: formattedTime
    });
} else {
    res.status(400).json({ error: "No valid date or time found in the input." });
}