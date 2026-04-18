const mongoose = require('mongoose')

const mySchema = new mongoose.Schema({
    name : {
        type: String,
      
    },
    email : {
        type: String,
    },
    otp : {
        type: String,
    },
    otpExpire : {
        type : Date
    },
    password : {
        type: String,    
    },
    profession : {
        type: String,    
    },
    image : {
        type: String,
    },
    isVerify :{
        type: Boolean,
        default: false
    },
    isLogin : {
        type: Boolean,
        default: false
    }
})

const userCollection = mongoose.model('users', mySchema)

module.exports= userCollection;