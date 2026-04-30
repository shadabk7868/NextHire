const AsyncHandler = require("../utils/AsyncHandler");
const bcrypt = require("bcrypt");
const Employer = require("../models/employerModel");
const { genrateToken } = require("../utils/generateToken");

/* ================= REGISTER ================= */
let registerEmployer = AsyncHandler(async (req, res) => {
  let { name, email, password, phoneNumber, industryType } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields required",
    });
  }

  let exist = await Employer.findOne({ email });

  if (exist) {
    return res.status(400).json({
      success: false,
      message: "Employer already exists",
    });
  }

  let hashedPassword = await bcrypt.hash(password, 10);

  let employer = await Employer.create({
    name,
    email,
    password: hashedPassword,
  });
  await employer.save()

  res.status(201).json({
    success: true,
    message: "Employer Registered",
  });
});

/* ================= LOGIN ================= */
let loginEmployer = AsyncHandler(async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email & password required",
    });
  }

  let employer = await Employer.findOne({ email });

  if (!employer) {
    return res.status(404).json({
      success: false,
      message: "Employer not found",
    });
  }

  let match = await bcrypt.compare(password, employer.password);

  if (!match) {
    return res.status(400).json({
      success: false,
      message: "Invalid Password",
    });
  }

  let token = await genrateToken(
  { id: employer._id, role: employer.role },
  "1h"
);

  res.status(200).json({
  success: true,
  message: "Login successful",
  token,
  data: {
    role: employer.role
  }
});
});

/* ================= UPDATE PROFILE ================= */
let updateEmployerProfile = AsyncHandler(async (req, res) => {
  let id = req.user.id;

  let {
    website,
    category,
    industryType,
    foundedIn,
    teamSize,
    about,
    address,
  } = req.body;

  let files = req.files;

  let employer = await Employer.findById(id);

  if (!employer) {
    return res.status(404).json({
      success: false,
      message: "Employer not found",
    });
  }


  let image = employer.image;
  if (files?.logo) {
    image = {
      filename: files.logo[0].filename,
      url: process.env.BASE_URL + "/" + files.logo[0].filename,
    };
  }

  let coverImage = employer.coverImage;
  if (files?.coverImage) {
    coverImage = {
      filename: files.coverImage[0].filename,
      url: process.env.BASE_URL + "/" + files.coverImage[0].filename,
    };
  }

  let updated = await Employer.findByIdAndUpdate(
    id,
    {
      website,
      category,
      industryType,
      foundedIn,
      teamSize,
      about,
      address: {
  country: req.body["address[country]"] || employer.address?.country,
  state: req.body["address[state]"] || employer.address?.state,
  city: req.body["address[city]"] || employer.address?.city,
  area: req.body["address[area]"] || employer.address?.area,
  fullAddress:
    req.body["address[fullAddress]"] || employer.address?.fullAddress,
},
      image,
      coverImage,
    },
    { new: true }
  );
  

  res.status(200).json({
    success: true,
    message: "Profile updated",
    data: updated,
  });
});

/* ================= GET PROFILE ================= */
let getEmployerProfile = AsyncHandler(async (req, res) => {
  let employer = await Employer.findById(req.user.id).select("-password");

  if (!employer) {
    return res.status(404).json({
      success: false,
      message: "Employer not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Profile fetched",
    data: employer,
  });
});

/* ================= DELETE ================= */
let deleteEmployer = AsyncHandler(async (req, res) => {
  let employer = await Employer.findById(req.user.id);

  if (!employer) {
    return res.status(404).json({
      success: false,
      message: "Employer not found",
    });
  }

  await Employer.findByIdAndDelete(req.user.id);

  res.status(200).json({
    success: true,
    message: "Employer Deleted",
  });
});

module.exports = {
  registerEmployer,
  loginEmployer,
  updateEmployerProfile,
  getEmployerProfile,
  deleteEmployer,
};