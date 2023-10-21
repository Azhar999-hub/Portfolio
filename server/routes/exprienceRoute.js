const express = require("express");
const upload = require("../middlewares/multer")

const {
  getAllExperience,
  getOneExperience,
  addExperience,
  editExperience,
  deleteExperience,
} = require("../controllers/experieinceController");
const router = express.Router();


router.post("/", upload.single('image'), addExperience);
router.get("/", getAllExperience);
router.get("/:experienceId", getOneExperience);
router.put("/:experienceId", upload.single('image'), editExperience);
router.delete("/:experienceId", deleteExperience);

module.exports = router;
