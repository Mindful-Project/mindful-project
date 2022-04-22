const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Events = new Schema ({
    image: {
        type: String,
        required: true
    },
    eName: {
        type: String,
        required: [true, "Please enter an event name"]
    },
    eDate: {
        type: Date,
        required: [true, "Please enter an event date"]
    },
    eTime: {
        type: Date,
        required: [true, "Please enter an event time"]
    },
    eSeatsNo: {
        type: Number,
        required: [true, "Please enter a seat number"]
    },
    ePrice: {
        type: Number,
        required: [true, "Please enter an event price"]
    },
});

const newEvents = mongoose.model("event", Events);
module.exports = newEvents;