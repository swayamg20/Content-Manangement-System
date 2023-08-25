const mongoose = require("mongoose");

//schema for blog posts
const schema = new mongoose.Schema({
  workshopName: String,
  description: String,
  prizeMoney: String,
  registrationDeadline: String,
});

module.exports = new mongoose.model("Workshop", schema);
