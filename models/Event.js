const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  imageEvent: { type: Buffer, required: false, default: "" },
  isAvailable: { type: Boolean, default: true },
  ticketsAvailable: { type: Number, required: true },
  seatsAvailable: {type: Number, required: true}
});

module.exports = mongoose.model("Event", EventSchema);
