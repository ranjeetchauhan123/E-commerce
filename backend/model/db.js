const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/products')
        console.log('MongoDB connect Successfull !!')
    } catch (err) {
        console.log('faild to connect !!', err)
    }
}

module.exports = connectDB;