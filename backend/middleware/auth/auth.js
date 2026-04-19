require("dotenv").config();
const jwt = require('jsonwebtoken')
const blacklistCollection = require('../../schema/blackList')
const userCollection = require("../../schema/userSchema");

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    const isBlackList = await blacklistCollection.findOne({ accessToken: token })
    if (isBlackList) {
        return res.status(200).json({ message: 'token is blacklisted', success: true })
    }
    if (!token) {
        return res.send({ message: 'token not recevied', success: false })
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN)
        req.user = decoded;
        next()

    } catch (err) {
        return res.status(401).json({ message: "Invalid token", success: false, status: 401 });
    }

}

// handleReferesh Token
const handleRefereshToken = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "No refresh token", success: false });
        }
        const refToken = authHeader.split(" ")[1];

        jwt.verify(refToken, process.env.REFERESH_TOKEN, (err, user) => {
            if (err) {
                console.log(err)
                return res.status(403).json({ message: "Invalid refresh token" });
            }
            const newAccessToken = jwt.sign({ id: user.id, email: user.email }, process.env.ACCESS_TOKEN, { expiresIn: "15m" });
            return res.json({ accessToken: newAccessToken });
        });
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            const decoded = jwt.decode(refToken);
            const userId = decoded?.user?._id;
            if (userId) {
                await userCollection.findByIdAndUpdate(userId, { $set: { isLogin: false } });
            }
        }
    }

};

module.exports = { authMiddleware, handleRefereshToken };