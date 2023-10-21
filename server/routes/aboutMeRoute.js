const express = require("express");
const {
  getAllAboutMe,
  getOneAboutMe,
  addAboutMe,
  editAboutMe,
  deleteAboutMe,
} = require("../controllers/aboutMeController");
const router = express.Router();

router.post("/", addAboutMe);
router.get("/", getAllAboutMe);
router.get("/:aboutMeId", getOneAboutMe);
router.put("/:aboutMeId", editAboutMe);
router.delete("/:aboutMeId", deleteAboutMe);

module.exports = router;
