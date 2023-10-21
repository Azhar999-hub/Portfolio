const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name:{type: String, require: true},
  roles:{type:String, require:true},
  info:{type: String, require: true}
});

const AboutModel = mongoose.model('About',aboutSchema);

module.exports = AboutModel;