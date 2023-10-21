const SkillModel = require("../models/skillModel");
const mongoose = require("mongoose");

//_____________________________________________________

const getOneSkill = async (req, res, next) => {
  const id = req.params.skillId;
  try {
    const skill = await SkillModel.findById(id);
    res.status(200).json(skill);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

//_____________________________________________________

const getAllSkills = async (req, res) => {
  try {
    const skills = await SkillModel.find({});
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({
      error: "Server Error",
    });
  }
};

//_____________________________________________________

const addSkill = async (req, res) => {
  const { type, level } = req.body;
  try {
    if (!type) {
      return res.json({
        error: "Type is Required",
      });
    }
    if (!level) {
      return res.json({
        error: "level is Required",
      });
    } else {
      const skills = new SkillModel({
        _id: new mongoose.Types.ObjectId(),
        type: type,
        level: level,
      });
      await skills.save();
      res.status(201).json({
        status: "ok",
        message: "Skills Add Successfully!",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Server Error",
    });
  }
};

//_____________________________________________________

const deleteSkill = async (req, res) => {
  const id = req.params.skillId;
  try {
    const result = await SkillModel.deleteOne({ _id: id });
    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Skill Deleted Successfully" });
    } else {
      res.status(404).json({ message: "Skill not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

//_____________________________________________________

const updateSkill = async (req, res) => {
  const { skillId } = req.params;
  const { type, level } = req.body;

  try {
    const existingSkill = await SkillModel.findById(skillId);

    if (!existingSkill) {
      return res.status(404).json({ error: "Skill not found" });
    }

    existingSkill.type = type;
    existingSkill.level = level;

    const updatedSkill = await existingSkill.save();

    return res
      .status(200)
      .json({ message: "Skill Updated Successfully", updatedSkill });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getOneSkill,
  getAllSkills,
  addSkill,
  deleteSkill,
  updateSkill,
};
