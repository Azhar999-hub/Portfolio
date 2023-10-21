const MessageModal = require("../models/messageModel");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "uzairzafar938@gmail.com",
    pass: "jahw vqka ngni sttm",
  },
});

const getAllMessage = async (req, res, next) => {
  try {
    const messages = await MessageModal.find();

    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch Messages.",
      error: error.message,
    });
  }
};

const addMessage = async (req, res, next) => {
  const { email, message } = req.body;

  try {
    if (!email) {
      return res.json({
        error: "Email is Required!",
      });
    }
    if (!message) {
      return res.json({
        error: "Message is Required!",
      });
    }

    const userMailOptions = {
      from: req.body.email,
      to: "uzairzafar938@gmail.com",
      subject: `Message from ${req.body.email}: ${req.body.subject}`,
      text: message,
    };
    console.log(req.body.email);

    transporter.sendMail(userMailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to send email." });
      } else {
        console.log("Email sent: " + info.response);
        res.status(201).json({ message: "Message Add Successfully!" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

//______________________________________________________

const editMessage = async (req, res) => {
  try {
    const messageId = req.params.messageId;
    const { name, email, subject, message, isSeen } = req.body;

    // Check if the project exists
    const existingfMessage = await MessageModal.findById(messageId);

    if (!existingfMessage) {
      return res.status(404).json({ message: "message not found." });
    }

    // Update the project
    existingfMessage.name = name;
    existingfMessage.email = email;
    existingfMessage.subject = subject;
    existingfMessage.message = message;
    existingfMessage.isSeen = isSeen;

    // Save the updated project
    const updatedMessage = await existingfMessage.save();

    res.status(200).json({
      message: "Message updated successfully.",
      project: updatedMessage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update Message.",
      error: error.message,
    });
  }
};

//______________________________________________________

module.exports = {
  getAllMessage,
  addMessage,
  editMessage,
};
