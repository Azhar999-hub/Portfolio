const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const asyncHandler = require("express-async-handler");
const UserModel = require("../models/userModel");
dotenv.config();

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token provided');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await UserModel.findById(decoded.userId).select('-password');
    next();
  } catch (error) {
    console.error(error);
    res.status(401);
    throw new Error('Not authorized, token verification failed');
  }
});

module.exports = { protect };
