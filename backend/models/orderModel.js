const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    fname:{
      type: String,
      required: true,
    },
    lname:{
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    OptionalAddress:{
      type: String,
    },
    officialEmialId:{
      type: String,
    },
    farmAddress:{
      type: String,
    },
    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },
    pinCode: {
      type: Number,
      required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
    },
  },
 billingInfo:{
  fname:{
    type: String,
    required: true,
  },
  lname:{
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  OptionalAddress:{
    type: String,
  },
  officialEmialId:{
    type: String,
  },
  farmAddress:{
    type: String,
  },
  city: {
    type: String,
    required: true,
  },

  state: {
    type: String,
    required: true,
  },

  country: {
    type: String,
    required: true,
  },
  pinCode: {
    type: Number,
    required: true,
  },
  phoneNo: {
    type: Number,
    required: true,
  },
 },
 orderItems: [
    {
      name: {
        type: String,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
      varieties:[{
        type:String
      }]
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  orderedAt: {
    type: Date,
    required: true,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);