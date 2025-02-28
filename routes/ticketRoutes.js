const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { purchaseTicket } = require("../controllers/ticketController");

const router = express.Router();

router.post("/generate-qrcode", authMiddleware, purchaseTicket);
//router.get("/", login);

module.exports = router;
