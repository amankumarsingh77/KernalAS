// authMiddleware.js
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');
const { Users } = require('../db/modals'); // Import the Users model

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: "Authorization header missing or invalid" });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, SECRET);
        const user = await Users.findOne({ username: decoded.username, email: decoded.email });

        if (!user) {
            return res.status(403).json({ message: "User not found" });
        }

        req.user = user; // Attach user to request object for later use
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
};

module.exports = {
    authMiddleware
}