const UserModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler")
const dotenv = require("dotenv");
const generateToken = require("../utils/generateToken")
dotenv.config();

// const getOneUser = async (req, res, next) => {
//   const id = req.params.userId;
//   try {
//     const user = await UserModel.findById(id).select("name email");
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json({ error: err });
//   }
// };

// const getAllUsers = async (req, res) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   // Verify the token and extract the username
//   jwt.verify(token, rocess.env.JWT_SECRET, (err, decoded) => {
//     if (err) { 
//       return res.status(401).json({ message: "Token is invalid" });
//     }

//     const username = decoded.username;

//     // Find the user by username
//     User.findOne({ username }, (err, user) => {
//       if (err) {
//         return res.status(500).json({ message: "Server Error" });
//       }

//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }

//       // Return the user's data (you can customize this)
//       const userData = {
//         username: user.username,
//         // Add more fields as needed
//       };

//       res.status(200).json(userData);
//     });
//   });
// };

// // _________________________________________________________________

// const signUp = async (req, res) => {
//   const { name, email, password } = req.body;
//   console.log(req.body);
//   const encryptedPassword = await bcrypt.hash(password, 10);
//   try {
//     if (!name) {
//       return res.json({
//         error: "Name is Required",
//       });
//     }
//     if (!email) {
//       return res.json({
//         error: "Email is Required",
//       });
//     }
//     if (!password || password.length < 8) {
//       return res.json({
//         error: "Password is required and should be at least 8 characters",
//       });
//     }

//     const user = await UserModel.findOne({ email: email });

//     if (user) {
//       return res.json({
//         error: "User is Already Exist!",
//       });
//     } else {
//       const newUser = new UserModel({
//         _id: new mongoose.Types.ObjectId(),
//         name: name,
//         email: email,
//         password: encryptedPassword,
//       });
//       await newUser.save();
//       res.status(201).json({
//         status: "ok",
//         message: "Signup Successfully and PLease Login Now!",
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       error: "Server Error",
//     });
//   }
// };

// // _________________________________________________________________

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await UserModel.findOne({ email });
//     if (!user) {
//       return res.json({ status: "not found", error: "User Not found" });
//     }
//     if (await bcrypt.compare(password, user.password)) {
//       const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
//         expiresIn: "1440m",
//       });

//       if (res.status(201)) {
//         return res.json({ status: "ok", data: token });
//       } else {
//         return res.json({ error: "error" });
//       }
//     }
//   } catch (error) {
//     res.json({ status: "error", error: "InvAlid Password" });
//   }
// };

const authUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body;
  const user = await UserModel.findOne({ email });

if (user) {
  const isMatch = await user.matchPassword(password);
  if (isMatch) {
    // Passwords match, proceed with authentication
    generateToken(res, user._id);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      message: "User Login Successfully!"
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
} else {
  res.status(401);
  throw new Error('Invalid email or password');
}

});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await UserModel.findOne({ email });

  if (userExists) {
    res.status(400).json({message:'User already exists'});
  }

  const user = await UserModel.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      message: "User Register Successfully!"
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      message:"Fetch User Profile Successfully!"
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      message:"User Updated Successfully!"
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

module.exports = {
  // getOneUser,
  // signUp,
  // login,
  // getAllUsers
  authUser,
  updateUserProfile,
  getUserProfile,
  registerUser,
  logoutUser
};
