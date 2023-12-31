const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  isSeen: { type: Boolean, required: true, default: false },
  date: { type: Date, required: true, default: Date.now },
});

const MessageModel = mongoose.model('Message', messageSchema);

module.exports = MessageModel;