const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title:{type: String, required: true},
  descriptions:{type: String, reqired: true},
  technologies:{type: String, reqired: true},
  image: { type: String, required: false },

});

const ProjectModel = mongoose.model('Project', projectSchema);

module.exports = ProjectModel;