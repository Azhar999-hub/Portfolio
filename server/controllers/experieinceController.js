const mongoose = require("mongoose");
const ExperienceModel = require("../models/experinceMOdel");
const upload = require("../middlewares/multer");
const path = require("path");
//__________________________________________________________

const getAllExperience = async (req, res) => {
  try {
    const experiences = await ExperienceModel.find();
    res.status(200).json({
      message: "All Experiences fetch Successfully!",
      experiences,
    });
  } catch (error) {
    res.status(500).json({
      error: "Fail to fetch Experiences!",
    });
  }
};

//__________________________________________________________

const getOneExperience = async (req, res) => {
  const experienceId = req.params.experienceId;
  try {
    const experience = await ExperienceModel.findById(experienceId);
    if (!experience) {
      return res.status(404).json({ error: "Experience Not Found" });
    } else {
      res
        .status(200)
        .json({ message: "Experience fetch Successfully!", experience });
    }
  } catch (error) {
    res.status(500).json({
      error: "Fail to fetch Experience!",
    });
  }
};

//__________________________________________________________

const addExperience = async (req, res) => {
  const {
    title,
    company,
    city,
    startDate,
    endDate,
    description,
    technologies,
  } = req.body;
  // const image = req.file.filename;
  console.log(req.file);
  try {
    if (!title) {
      return res({ error: "Title is Required" });
    }
    if (!company) {
      return res({ error: "Complany is Required" });
    }
    if (!city) {
      return res({ error: "City is Required" });
    }
    if (!startDate) {
      return res({ error: "Start Date is Required" });
    }
    if (!endDate) {
      return res({ error: "End Date is Required" });
    }
    if (!description) {
      return res({ error: "Description is Required" });
    }
    if (!technologies) {
      return res({ error: "Technologies is Required" });
    } else {
      const experience = await ExperienceModel({
        _id: new mongoose.Types.ObjectId(),
        title: title,
        company: company,
        city: city,
        startDate: startDate,
        endDate: endDate,
        description: description,
        technologies: technologies,
        image: req.file.path,
      });
      await experience.save();
      res.status(201).json({
        message: "Experience Add Successfully!",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Server Error",
    });
  }
};

//__________________________________________________________

const editExperience = async (req, res) => {
  const experienceId = req.params.experienceId;
  try {
    const existingExperience = await ExperienceModel.findById(experienceId);
    if (!existingExperience) {
      return res.status(404).json({ error: "Experience Not Found!" });
    } else {
      if (req.body.title) {
        existingExperience.title = req.body.title;
      }
      if (req.body.company) {
        existingExperience.company = req.body.company;
      }
      if (req.body.city) {
        existingExperience.city = req.body.city;
      }
      if (req.body.startDate) {
        existingExperience.startDate = req.body.startDate;
      }
      if (req.body.endDate) {
        existingExperience.endDate = req.body.endDate;
      }
      if (req.body.description) {
        existingExperience.description = req.body.description;
      }
      if (req.body.technologies) {
        existingExperience.technologies = req.body.technologies;
      }
      if (req.file) {
        // Handle image upload/update here
        // Upload the new image, generate a URL, and store it in the database
        const newImage = req.file.path; // Get the path of the new image
        existingExperience.image = newImage; // Update the image URL in the database
      }

      const updatedExperience = await existingExperience.save();
      return res.status(200).json({
        message: "Experience Updated Successfully!",
        updatedExperience,
      });
    }
  } catch (error) {
    console.error('Error in editExperience:', error);
    res.status(500).json({
      error: "Server Error",
    });
  }
};




//__________________________________________________________

const deleteExperience = async (req, res) => {
  const experienceId = req.params.experienceId;

  try {
    const existingExperience = await ExperienceModel.findById(experienceId);
    if (!existingExperience) {
      return res.status(404).json({
        error: "Experience Not Found",
      });
    } else {
      await ExperienceModel.findByIdAndRemove(experienceId);
      res.status(200).json({
        message: "Experience Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Server Error",
    });
  }
};

//__________________________________________________________

module.exports = {
  getAllExperience,
  getOneExperience,
  addExperience,
  editExperience,
  deleteExperience,
};
