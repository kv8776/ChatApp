const msgModel = require("../model/messageModel");
const errorHandler = require('../utils/errorhandler');

module.exports.addMsg = errorHandler(async (req, res) => {
  const { from, to, message } = req.body;
  const data = await msgModel.create({
    message: { text: message },
    users: [from, to],
    sender: from,
  });

  if (data) {
    return res.status(200).json({
      status: "success",
      message: "Successfully added",
    });
  } else {
    return res.status(500).json({
      status: "failure",
      message: "Failed to add",
    });
  }
});

module.exports.getAllMsg = errorHandler(async (req, res) => {
  const {from,to} = req.body;
 const allMessages = await msgModel.find({
  users:{$all:[from,to]}
 }).sort({updatedAt:1});
 const projectMsg= allMessages.map((msg)=>{
  return{
    fromSelf:msg.sender.toString()===from,
    message:msg.message.text
  }
 })
  return res.status(200).json({
    status:"success",
    messages:projectMsg
  });
});
