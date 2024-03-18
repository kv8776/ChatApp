const mongoose = require('mongoose');
const User =require("./userModel")
const msgSchema = new mongoose.Schema({
  message: {
    text: {
      type: String,
      required: true
    }
  },
  users: [mongoose.Schema.Types.ObjectId],
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true }); 

const messages = mongoose.model('messages', msgSchema);
module.exports = messages;
