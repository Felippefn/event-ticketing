require("dotenv").config();
const express = require("express");
const mongoose = require("./config/db");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes"); 
const eventRoutes = require("./routes/eventRoutes");

const app = express();

//Middleware
app.use(express.json());
app.use(cors());

//Routes

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
//app.use("/api/tickets", require("./routes/ticketRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));