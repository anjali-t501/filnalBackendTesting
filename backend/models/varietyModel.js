const mongoose = require("mongoose");
const VarietySchema = new mongoose.Schema({
  subProduct:{
    type:[String]
  },
  Length:{
    type:[String]
  },
  Coating:{
    type:[String]
  },
  Sterility:{
    type:[String]
  },
  Quality:{
    type:[String]
  },
  colors:{
    type:[String]
  },
  sizes:{
    type:[String]
  }
});
const Model = mongoose.model("varieties", VarietySchema);
module.exports = Model;
