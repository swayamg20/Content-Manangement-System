const mongoose = require("mongoose");

//schema for blog posts
const schema = new mongoose.Schema({
  title: String,
  subTitle: String,
  competitionsName: String,
  description: String,
  prizeMoney: String,
  registrationDeadline: String,
  abstractDeadline: String,
  updatedBy:String
});

module.exports = new mongoose.model("Competition", schema);
