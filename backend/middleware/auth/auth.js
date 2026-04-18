const jwt = require('jsonwebtoken')
const blacklistCollection = require('../../schema/blackList')

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    const isBlackList = await blacklistCollection.findOne({accessToken : token})
    if(isBlackList){
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
        console.log(err)
        return res.send({ message: 'Invalid Token', success: false })
    }

}

module.exports = authMiddleware;