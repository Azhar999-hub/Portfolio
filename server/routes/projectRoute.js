const express = require("express");
const ProjectController = require("../controllers/projectController");
const upload = require("../middlewares/multer")
const router = express.Router();

router.post("/", upload.single("image"), ProjectController.addProject);
router.get("/", ProjectController.getProject);
router.get("/:projectId", ProjectController.getOneProject);
router.put("/:projectId", upload.single("image"), ProjectController.editProject);
router.delete("/:projectId", ProjectController.deleteProject);

module.exports = router;
