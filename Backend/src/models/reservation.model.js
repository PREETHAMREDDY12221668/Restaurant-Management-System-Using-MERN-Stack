const mongoose  =require('mongoose');

const reservationSchema = new mongoose.Schema({
    name: String,
    phone: String,
    date: String,
    time: String,
    guests: Number,
});
module.exports = mongoose.model('reservation', reservationSchema);