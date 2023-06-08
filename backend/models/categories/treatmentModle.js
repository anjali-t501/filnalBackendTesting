
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const TeratmentTypeSchema = new mongoose.Schema({

    TreatmentTypeName: {
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

module.exports = mongoose.model("Treatment",TeratmentTypeSchema );