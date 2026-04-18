const mongoose  = require("mongoose");

const cartSchema = new mongoose.Schema({
    title :{
        type: String,
        required: true
    },
    description :{
        type: String,
        required: true
    },
    price :{
        type: Number,
        required: true
    },
    image : {
        type : String,
        required: true
    }

})

const cartCollection = mongoose.model("mycarts", cartSchema);

module.exports=cartCollection;