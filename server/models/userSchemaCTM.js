const mongoose = require("mongoose");

//schema for blog posts
const schema = new mongoose.Schema({
  email: String,
  accessHead: {type: Boolean,default: false},
  accessOrganizer: {type: Boolean,default: false},
  accessAll:{type: Boolean,default: false},
  uid: String
});

module.exports = new mongoose.model("User", schema);
