const Event = require("../models/Event");


exports.createEvent = async (req, res) => {
    const {title, date, location, price, imageEvent, ticketsAvailable, seatsAvailable} = req.body;

    if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "User not authenticated" });
    } else if (req.user.role != "admin"){
        return res.status(401).json( {error: "User is not an admin"} )
    }

    try{
    let titleNumbers = await Event.find({ title });
    let dateNumbers = await Event.find({ date });

    if (titleNumbers.length > 0 && dateNumbers.length > 0) {
        return res.status(400).json({ message: "Event is already active." });
    }

    eventShow = new Event({title, date, location, price, imageEvent, ticketsAvailable, seatsAvailable});

    await eventShow.save();
    res.status(201).json(eventShow);

    } catch (error) {
    console.error("Error checking event existence:", error);
    res.status(500).json({ message: "Internal server error." });
    }

};


exports.getEvents = async (req, res) => {
    try{
        events = await Event.find();
        res.json(events);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
};

exports.getSeatsAvailable = async (req, res) => {
    try{
        eventLocate = await Event.find();
        const seats = eventLocate.seatsAvailable;
        res.status(200).json({ seats })
    } catch (error) {

    }
};

