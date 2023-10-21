const mongoose = require("mongoose");
const AboutModel = require("../models/aboutMeModel");

//____________________________________________________

const getAllAboutMe = async (req, res) => {
  try {
    const aboutMe = await AboutModel.find();
    res.status(200).json({
      message: "Fetch All About me!",
      aboutMe,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to Fetch",
    });
  }
};

//____________________________________________________

const getOneAboutMe = async (req, res) => {
  const aboutMeId = req.params.aboutMeId;
  try {
    const aboutMe = await AboutModel.findById(aboutMeId);
    if (!aboutMe) {
      return res.status(404).json({
        error: "Not Found",
      });
    } else {
      res.status(200).json({
        message: "Fetch Successfully!",
        aboutMe,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to Fetch",
    });
  }
};

//____________________________________________________

const addAboutMe = async (req, res) => {
  const { name, info,roles } = req.body;
  try {
    if (!name) {
      res.json({
        error: "Name is Required",
      });
    }
    if (!info) {
      res.json({
        error: "Info is Required",
      });
    } else {
      const aboutMe = await AboutModel({
        _id: new mongoose.Types.ObjectId(),
        name:name,
        info: info,
        roles:roles
      });

      await aboutMe.save();
      res.status(201).json({
        message: "Created Successfully!",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Server Error!",
    });
  }
};

//____________________________________________________

const editAboutMe = async (req, res) => {
  const aboutMeId = req.params.aboutMeId;
  const { name,info,roles } = req.body;
  try {
    const existingAboutMe = await AboutModel.findById(aboutMeId);
    if (!existingAboutMe) {
      res.status(404).json({
        message: "Not Found!",
      });
    } else {
      existingAboutMe.name = name;
      existingAboutMe.info = info;
      existingAboutMe.roles = roles;
      const updateAboutMe = await existingAboutMe.save();
      res.status(200).json({
        message: "About me Update Successfullt!",
        updateAboutMe,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Server Error",
    });
  }
};

//____________________________________________________

const deleteAboutMe = async (req, res) => {
  const aboutMeId = req.params.aboutMeId;
  try {
    const existingAboutMe = await AboutModel.findById(aboutMeId);
    if (!existingAboutMe) {
      return res.status(404).json({
        error: "Not Found!",
      });
    } else {
      await AboutModel.findByIdAndRemove(existingAboutMe);
      res.status(200).json({
        message: "Deleted Successfully!",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Server Error!",
    });
  }
};

//____________________________________________________

module.exports = {
  getAllAboutMe,
  getOneAboutMe,
  addAboutMe,
  editAboutMe,
  deleteAboutMe,
};
