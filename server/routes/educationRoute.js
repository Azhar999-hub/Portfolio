const express = require("express");
const {
  getAllEducation,
  getOneEducation,
  addEducation,
  editEducation,
  deleteEducation,
} = require("../controllers/educationController");
const upload = require("../middlewares/multer")

const router = express.Router();

router.post("/",upload.single('image'), addEducation);
router.get("/", getAllEducation);
router.get("/:educationId", getOneEducation);
router.put("/:educationId",upload.single('image'), editEducation);
router.delete("/:educationId", deleteEducation);

module.exports = router;
