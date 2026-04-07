const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getUsers,
  getParticularUser,
  deleteUser,
  updatePersonalInfo,
  updateResume,
  getProfile
} = require("../controllers/userController");

const { auth } = require("../middlewares/auth");

router.post("/register", register);
router.post("/login", login);

router.get("/getprofile", auth, getProfile);

router.put("/update-personal-info", auth, updatePersonalInfo);

router.put("/update-resume", auth, updateResume);

router.get("/all-users", auth, getUsers);

router.get("/user/:id", auth, getParticularUser);

router.delete("/delete-user/:id", auth, deleteUser);

module.exports = router;