const mongoose = require("mongoose");

const educaionSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  school: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  image: { type: String, required: false },
});

const EducationModel = mongoose.model("Education", educaionSchema);

module.exports = EducationModel;
