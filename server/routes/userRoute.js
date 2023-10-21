const express = require("express");
const cookieParser = require("cookie-parser");
// const checkAuth = require('../middlewares/checkAuth')
const router = express.Router();
const { protect } = require("../middlewares/checkAuth");
// const {signUp, getOneUser,login,getAllUsers} = require('../controllers/userController')
router.use(cookieParser());
const {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");

// router.get("/:userId", checkAuth, getOneUser);
// router.get("/", getAllUsers, checkAuth );
// router.post('/signup', signUp)
// router.post('/login', login, checkAuth)

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;
