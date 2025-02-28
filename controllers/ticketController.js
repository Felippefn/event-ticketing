const Ticket = require("../models/Ticket");
const generateQRCode = require("../utils/generateQRCode");

exports.purchaseTicket = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "User not authenticated" });
        }

        const { eventId } = req.body;
        if (!eventId) {
            return res.status(400).json({ error: "eventId is required" });
        }

        const userId = req.user.id; // This should be valid now

        const qrData = `${userId}-${eventId}-${Date.now()}`;
        console.log("QR Data:", qrData);
        const qrCode = await generateQRCode(qrData);
        console.log("Generated QR Code:", qrCode);

        if (!qrCode) {
            return res.status(500).json({ error: "Failed to generate QR code" });
        }

        const ticket = new Ticket({event: eventId, user: userId, qrcode: qrCode});
        await ticket.save();

        res.status(201).json(ticket);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}
