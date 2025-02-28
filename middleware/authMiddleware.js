const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ error: "Authentication token missing" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret key
        req.user = decoded; // Attach the decoded user information to the request
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};

module.exports = authMiddleware;
