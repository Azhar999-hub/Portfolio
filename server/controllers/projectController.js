const ProjectModel = require("../models/projectModel");
const mongoose = require("mongoose");

const addProject = async (req, res) => {
  try {
    const { title, descriptions, technologies } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Project image is required." });
    }
    if (!title) {
      return res.status(400).json({ message: "Project Title is required." });
    }
    if (!descriptions) {
      return res
        .status(400)
        .json({ message: "Project Description is required." });
    }
    if (!technologies) {
      return res
        .status(400)
        .json({ message: "Project Technologies is required." });
    }

    const project = new ProjectModel({
      _id: new mongoose.Types.ObjectId(),
      title,
      descriptions,
      technologies,
      image: req.file.path,
    });

    await project.save();

    res.status(201).json({
      message: "Project added successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to add project.",
      error: error.message,
    });
  }
};

//_______________________________________________________

const getProject = async (req, res) => {
  try {
    const projects = await ProjectModel.find();

    res.status(200).json({ projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch projects.",
    });
  }
};

//____________________________________________________

const getOneProject = async (req, res) => {
  try {
    const projectId = req.params.projectId;

    const project = await ProjectModel.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    res.status(200).json({ project });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch project.",
      error: error.message,
    });
  }
};

//____________________________________________________

const editProject = async (req, res) => {
  const projectId = req.params.projectId;
  try {
    const existingProject = await ProjectModel.findById(projectId);
    if (!existingProject) {
      return res.status(404).json({ error: "Project Not Found!" });
    } else {
      if (req.body.title) {
        existingProject.title = req.body.title;
      }
      if (req.body.descriptions) {
        existingProject.descriptions = req.body.descriptions;
      }
      if (req.body.technologies) {
        existingProject.technologies = req.body.technologies;
      }
      if (req.file) {
        const newImage = req.file.path; // Get the path of the new image
        existingProject.image = newImage; // Update the image URL in the database
      }

      const updatedProject = await existingProject.save();
      return res.status(200).json({
        message: "Project Updated Successfully!",
        updatedProject,
      });
    }
  } catch (error) {
    res.status(500).json({
      erroe: "Failed to update project.",
      error: error.message,
    });
  }
};

// const editProject = async (req, res) => {
//   try {
//     const projectId = req.params.projectId;
//     const { title, descriptions, technologies } = req.body;

//     // Check if the project exists
//     const existingProject = await ProjectModel.findById(projectId);

//     if (!existingProject) {
//       return res.status(404).json({ message: "Project not found." });
//     }

//     // Update the project
//     existingProject.title = title;
//     existingProject.descriptions = descriptions;
//     existingProject.technologies = technologies;
//     // existingProject.link = link;
//     // existingProject.haveLink = haveLink;

//     // Save the updated project
//     const updatedProject = await existingProject.save();

//     res.status(200).json({
//       message: "Project updated successfully.",
//       updatedProject,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       message: "Failed to update project.",
//       error: error.message,
//     });
//   }
// };

//____________________________________________________

const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.projectId;

    // Check if the project exists
    const existingProject = await ProjectModel.findById(projectId);

    if (!existingProject) {
      return res.status(404).json({ message: "Project not found." });
    }

    // Delete the project
    await ProjectModel.findByIdAndRemove(projectId);

    res.status(200).json({ message: "Project deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to delete project.",
      error: error.message,
    });
  }
};

//____________________________________________________

module.exports = {
  addProject,
  getProject,
  getOneProject,
  editProject,
  deleteProject,
};
