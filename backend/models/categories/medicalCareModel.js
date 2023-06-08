const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const MedicalTypeSchema = new mongoose.Schema({

    medicalCareName: {
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

module.exports = mongoose.model("Medical",MedicalTypeSchema );