
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const AnimalTypeSchema = new mongoose.Schema({

    animalName: {
        type: String,
        trim: true,
        required: [true, 'animal category is required'],
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

module.exports = mongoose.model("Animal",AnimalTypeSchema );