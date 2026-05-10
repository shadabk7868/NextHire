const AsyncHandler = require("../utils/AsyncHandler");
const { genrateToken } = require("../utils/generateToken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
 
// REGISTER
let register = AsyncHandler(async (req, res) => {
  let { name, email, password } = req.body;
 
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Name, email and password are required"
    });
  }
 
  let existUser = await User.findOne({ email });
  if (existUser) {
    return res.status(400).json({
      success: false,
      message: "User already exists"
    });
  }
 
  const hashedPassword = await bcrypt.hash(password, 10);
  let newuser = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  await newuser.save();
 
  res.status(201).json({
    success: true,
    message: "User registered successfully",
  });
});
 
// LOGIN
let login = AsyncHandler(async (req, res) => {
  let { email, password } = req.body;
 
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password required"
    });
  }
 
  let user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found"
    });
  }
 
  const isMatch = await bcrypt.compare(password, user.password);
 
  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: "Invalid credentials"
    });
  }
 
  let token = await genrateToken(
  { id: user._id, role: user.role },
  "1h"
);
 
  let userData = user.toObject();
  delete userData.password;
 
  res.status(200).json({
  success: true,
  message: "Login successful",
  token,
  data: {
    role: user.role,
    id: user._id
  }
});
});
 
 
let updatePersonalInfo = AsyncHandler(async (req, res) => {
  let id = req.user.id;
 
  let { name,
    address,
    phoneNumber,
    experience,
    age,
    educationLevel,
    gender,
    currentSalary,
    expectedSalary,
    languages,
    skills,
    education,
    keywords,
    workExperience,
  } = req.body;
  let file = req.file
  let profileImage = {};
 
  let user = await User.findById(id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }
  if (file) {
    profileImage = { filename: file.filename, url: process.env.BASE_URL + "/" + file.filename }
  } else {
    profileImage = user.profileImage
  }
 
  let updated = await User.findByIdAndUpdate(
    id,
    {
      name,
      address,
      phoneNumber,
      experience,
      age,
      educationLevel,
      gender,
      currentSalary,
      expectedSalary,
      languages,
      skills,
      education,
      keywords,
      workExperience,
      profileImage
    },
    { new: true }
  );
 
  res.status(200).json({
    success: true,
    message: "Personal info updated",
  });
});
 
// UPDATE RESUME
let updateResume = AsyncHandler(async (req, res) => {
  let id = req.user.id;
  let file = req.file
  let resume = {}
 
  let user = await User.findById(id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }
 
  if (file) {
    resume = { filename: file.filename, url: process.env.BASE_URL + "/" + file.filename }
  } else {
    resume = user.resume
  }
  let updated = await User.findByIdAndUpdate(
    id,
    { resume },
    { new: true }
  );
 
  res.status(200).json({
  success: true,
  message: "Resume updated",
  data: updated  
});
});
 
// GET ALL USERS
let getUsers = AsyncHandler(async (req, res) => {
  let users = await User.find().select("-password");
 
  res.status(200).json({
    success: true,
    message: "All users fetched",
    data: users
  });
});
 
// GET PARTICULAR USER
let getParticularUser = AsyncHandler(async (req, res) => {
  let { id } = req.params;
 
  let user = await User.findById(id).select("-password");
 
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }
 
  res.status(200).json({
    success: true,
    message: "User fetched",
    data: user
  });
});
 
// DELETE USER
let deleteUser = AsyncHandler(async (req, res) => {
  let { id } = req.params;
 
  let user = await User.findById(id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }
 
  await User.findByIdAndDelete(id);
 
  res.status(200).json({
    success: true,
    message: "User deleted successfully"
  });
});
 
// GET PROFILE (AUTH)
let getProfile = AsyncHandler(async (req, res) => {
  let user = await User.findById(req.user.id).select("-password");
 
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }
 
  res.status(200).json({
    success: true,
    message: "Profile fetched",
    data: user
  });
});

let getAppliedJobs = AsyncHandler(async (req, res) => {
  let user = await User.findById(req.user.id)
    .populate("appliedJobs.appliedJobId"); 

  

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    data: user.appliedJobs
  });
});
 
module.exports = {
  register,
  login,
  updatePersonalInfo,
  updateResume,
  getUsers,
  getParticularUser,
  deleteUser,
  getProfile,
  getAppliedJobs
};