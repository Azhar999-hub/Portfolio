const express = require("express");
const checkAuth = require("../middlewares/checkAuth");
const {getAllMessage, addMessage, editMessage} = require("../controllers/messageController")

const router = express.Router();

router.get('/', getAllMessage);
router.post('/', addMessage);
router.put('/:messageId', editMessage);

module.exports = router;