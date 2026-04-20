require("dotenv").config();
const jwt = require('jsonwebtoken');
const blacklistCollection = require('../../schema/blackList');
const userCollection = require("../../schema/userSchema");

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: 'Token not received', success: false });
        }
        const isBlackList = await blacklistCollection.findOne({ accessToken: token });
        if (isBlackList) {
            return res.status(401).json({ message: 'Token is blacklisted', success: false });
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
        req.user = decoded;
        next()
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token", success: false });
    }
};

const handleRefereshToken = async (req, res) => {
    const refToken = req.headers.authorization?.split(" ")[1];
    try {
        if (!refToken) {
            return res.status(401).json({ message: "No refresh token", success: false });
        }
        const decoded = jwt.verify(refToken, process.env.REFERESH_TOKEN);
        const newAccessToken = jwt.sign({ id: decoded.id }, process.env.ACCESS_TOKEN, { expiresIn: "10m" });
        return res.json({ accessToken: newAccessToken });
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            const decoded = jwt.decode(refToken)
            console.log('......',decoded.id)
            if (decoded?.id) {
                await userCollection.findByIdAndUpdate(decoded.id, { $set: { isLogin: false } })
                return res.status(403).json({ message: "Refresh token expired, login again" });
            }
        }
        return res.status(403).json({ message: "Invalid refresh token" });
    }
};

module.exports = { authMiddleware, handleRefereshToken };