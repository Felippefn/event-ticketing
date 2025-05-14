const Ticket = require("../models/Ticket");
const generateQRCode = require("../utils/generateQRCode");
const Event = require("../models/Event");

exports.purchaseTicket = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "User not authenticated" });
        }

        const { eventId } = req.body;
        if (!eventId) {
            return res.status(400).json({ error: "eventId is required" });
        }

        const eventToPurchase = await Event.findById(eventId);
        if (!eventToPurchase) {
            return res.status(404).json({ error: "Event not found" });
        }

        // Check if there are seats available
        if (eventToPurchase.seatsAvailable <= 0) {
            return res.status(400).json({ error: "No seats available" });
        }

        const userId = req.user.id;

        const qrData = `${userId}-${eventId}-${Date.now()}`;
        const qrCode = await generateQRCode(qrData);

        if (!qrCode) {
            return res.status(500).json({ error: "Failed to generate QR code" });
        }

        const ticket = new Ticket({
            event: eventId,
            user: userId,
            qrcode: qrCode
        });

        await ticket.save();

        // Decrease seatsAvailable by 1
        eventToPurchase.seatsAvailable -= 1;
        await eventToPurchase.save();

        res.status(201).json(ticket);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

