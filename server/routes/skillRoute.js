const express = require("express");
const router = express.Router();

const {addSkill, getAllSkills,getOneSkill, deleteSkill,updateSkill} = require('../controllers/skillController');
const checkAuth = require('../middlewares/checkAuth');

router.get("/:skillId",getOneSkill );
router.delete("/:skillId",deleteSkill );
router.post("/", addSkill  );
router.get("/", getAllSkills );
router.put("/:skillId",updateSkill);

module.exports = router;