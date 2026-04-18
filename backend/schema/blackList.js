const mongoose  = require("mongoose");

const blackListSchema = new mongoose.Schema({
    accessToken : {
        type: String,
        required : true
    }
})

const blacklistCollection = mongoose.model('blaklist', blackListSchema)

module.exports = blacklistCollection;