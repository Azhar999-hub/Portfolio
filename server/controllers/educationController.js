const mongoose = require("mongoose");
const EducationModel = require("../models/educationModel");

//_________________________________________________

const getAllEducation = async (req, res) => {
  try {
    const educations = await EducationModel.find();
    res.status(200).json({
      message: "Fetch All Educations!",
      educations,
    });
  } catch (error) {
    res.status(500).json({
      error: "Fail to Fetch Educations",
    });
  }
};

//_________________________________________________

const getOneEducation = async (req, res) => {
  const educationId = req.params.educationId;
  try {
    const education = await EducationModel.findById(educationId);
    if (!education) {
      return res.status(402).json({ error: "Education not Found!" });
    } else {
      res.status(200).json({
        message: "Education Fetch Successfully!",
        education,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Fail to Fetch Education!",
    });
  }
};

//_________________________________________________

const addEducation = async (req, res) => {
  const { title, description, startDate, endDate, school } = req.body;
  try {
    if (!title) {
      return res.json({ error: "Title is Required!" });
    }
    if (!description) {
      return res.json({ error: "City is Required!" });
    }
    if (!startDate) {
      return res.json({ error: "Start Date is Required!" });
    }
    if (!endDate) {
      return res.json({ error: "End Date is Required!" });
    }
    if (!school) {
      return res.json({ error: "School is Required!" });
    } else {
      const education = await EducationModel({
        _id: new mongoose.Types.ObjectId(),
        title,
        description,
        startDate,
        endDate,
        school,
        image: req.file.path,
      });
      await education.save();
      res.status(201).json({
        message: "Education Add Successfully!",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Server Error!",
    });
  }
};

//_________________________________________________

const editEducation = async (req, res) => {
  const educationId = req.params.educationId;
  try {
    const existingEducation = await EducationModel.findById(educationId);
    if (!existingEducation) {
      return res.status(404).json({ error: "Education Not Found!" });
    } else {
      if (req.body.title) {
        existingEducation.title = req.body.title;
      }
      if (req.body.school) {
        existingEducation.school = req.body.school;
      }
      if (req.body.description) {
        existingEducation.description = req.body.description;
      }
      if (req.body.startDate) {
        existingEducation.startDate = req.body.startDate;
      }
      if (req.body.endDate) {
        existingEducation.endDate = req.body.endDate;
      }
      if (req.file) {
        // Handle image upload/update here
        // Upload the new image, generate a URL, and store it in the database
        const newImage = req.file.path; // Get the path of the new image
        existingEducation.image = newImage; // Update the image URL in the database
      }

      const updatedEducation = await existingEducation.save();
      return res.status(200).json({
        message: "Experience Updated Successfully!",
        updatedEducation,
      });
    }
  } catch (error) {
    console.error("Error in edit Education:", error);
    res.status(500).json({
      error: "Server Error",
    });
  }
};

//_________________________________________________

const deleteEducation = async (req, res) => {
  const educationId = req.params.educationId;
  try {
    const existingEducation = await EducationModel.findById(educationId);
    if (!existingEducation) {
      return res.status(404).json({ error: "Education Not Found!" });
    } else {
      await EducationModel.findByIdAndRemove(educationId);
      res.status(200).json({
        message: "Education Delete Successfully!",
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Server Error!" });
  }
};

//_________________________________________________

module.exports = {
  getAllEducation,
  getOneEducation,
  addEducation,
  editEducation,
  deleteEducation,
};
