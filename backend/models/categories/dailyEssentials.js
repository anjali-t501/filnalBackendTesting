const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const EssentialTypeSchema = new mongoose.Schema({

    essentialName: {
        type: String,
        trim: true,
    },
    imageUrl:{
        type:String
    },
    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },



}, { timestamps: true })

module.exports = mongoose.model("Essential",EssentialTypeSchema );