const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

const verifyAdmin = (req, res, next) => {
    const apiKey = req.header("x-api-key");
    if (apiKey !== process.env.ADMIN_API_KEY) {
        return res.status(403).json({ message: "Forbidden: Invalid API Key" });
    }
    next();
};

module.exports = { verifyToken, verifyAdmin };
