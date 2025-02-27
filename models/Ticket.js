const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
    event: { type:  mongoose.Schema.Types.ObjectId, ref: "Event", required: true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    qrcode: { type: String, required: true},
    purchasedAt: { type: Date, default: Date.now}
})

module.exports = mongoose.model("Ticket", TicketSchema);