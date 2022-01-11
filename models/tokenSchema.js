const mongoose = require("mongoose");

var TokenModel = new mongoose.Schema({
  token: String,
  phoneNumber: String,
  planId: String,
  verify: String,
  verified: Boolean, String, 
});

module.exports = mongoose.models.Token || mongoose.model("Token", TokenModel);
