const mongoose = require('mongoose');

const skillsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  type: {type: String, required: true},
  level: {type: Number, required: true},
}); 

const SkillModel = mongoose.model('Skills', skillsSchema);

module.exports = SkillModel;