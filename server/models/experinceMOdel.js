const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  company: { type: String, required: true },
  city: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  description: { type: String, required: true },
  technologies: { type: String, required: true },
  image: { type: String, required: false },
});

const ExperienceModel = mongoose.model('Experince', experienceSchema);

module.exports = ExperienceModel;