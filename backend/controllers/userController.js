const AsyncHandler = require("../utils/AsyncHandler");
const { genrateToken } = require("../utils/generateToken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

// REGISTER
let register = AsyncHandler(async (req, res) => {
  let { name, email, password, address, phoneNumber, role } = req.body;

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
    address,
    phoneNumber,
    role
  });

  let userData = newuser.toObject();
  delete userData.password;

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: userData
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

  let token = await genrateToken({ id: user._id }, "1h");

  let userData = user.toObject();
  delete userData.password;

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: userData,
    token
  });
});


let updatePersonalInfo = AsyncHandler(async (req, res) => {
  let id = req.user.id;
  let { name, address, phoneNumber } = req.body;

  let user = await User.findById(id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  let updated = await User.findByIdAndUpdate(
    id,
    { name, address, phoneNumber },
    { new: true }
  );

  let userData = updated.toObject();
  delete userData.password;

  res.status(200).json({
    success: true,
    message: "Personal info updated",
    data: userData
  });
});

// UPDATE RESUME
let updateResume = AsyncHandler(async (req, res) => {
  let id = req.user.id;
  let { resumeLink } = req.body;

  let user = await User.findById(id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  let updated = await User.findByIdAndUpdate(
    id,
    { resumeLink },
    { new: true }
  );

  let userData = updated.toObject();
  delete userData.password;

  res.status(200).json({
    success: true,
    message: "Resume updated",
    data: userData
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

module.exports = {
  register,
  login,
  updatePersonalInfo,
  updateResume,
  getUsers,
  getParticularUser,
  deleteUser,
  getProfile
};