const express = require("express");
const router = express.Router();

const { analyzeResume } = require("../controllers/aiController");
const { auth, isEmployer } = require("../middlewares/auth");

router.post("/analyze", auth, isEmployer, analyzeResume);

module.exports = router;