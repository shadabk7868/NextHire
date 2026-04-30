const Job = require("../models/jobModel");
const AsyncHandler = require("../utils/AsyncHandler");
const User = require("../models/userModel");

/* ================= CREATE JOB ================= */
let createJob = AsyncHandler(async (req, res) => {

  let logo = req.file
    ? {
        filename: req.file.filename,
        url: `/uploads/${req.file.filename}`,
      }
    : null;

  let newjob = await Job.create({
    ...req.body,
    companyLogo: logo,
    createdBy: req.user.id,
  });

  res.status(200).json({
    success: true,
    message: "Job created successfully",
    data: newjob,
  });
});

/* ================= GET ALL JOBS ================= */
let getJobs = AsyncHandler(async (req, res) => {
  
  let jobs = await Job.find().populate("createdBy", ["name", "email"]);

  res.status(200).json({
    success: true,
    data: jobs,
  });
});

/* ================= APPLY JOB ================= */
let applyJob = AsyncHandler(async (req, res) => {
  let { jobId } = req.params;

  if (req.user.role !== "candidate") {
    return res.status(403).json({
      success: false,
      message: "Only candidates can apply",
    });
  }

  let job = await Job.findById(jobId);
  let user = await User.findById(req.user.id);

  if (!job) {
    return res.status(400).json({
      success: false,
      message: "Job Not Found",
    });
  }

  const alreadyApplied = user.appliedJobs.some(
    (item) => item.appliedJobId.toString() === jobId
  );

  if (alreadyApplied) {
    return res.json({
      success: false,
      message: "Already Applied",
    });
  }

  // save both
  job.applicants.push(req.user.id);
  await job.save();

  user.appliedJobs.push({ appliedJobId: jobId });
  await user.save();

  res.json({
    success: true,
    message: "Applied Successfully",
  });
});

/* ================= GET APPLIED JOBS ================= */
let getAppliedJobs = AsyncHandler(async (req, res) => {
  let user = await User.findById(req.user.id)
    .populate("appliedJobs.appliedJobId");

  res.json({
    success: true,
    data: user.appliedJobs,
  });
});

module.exports = {
  createJob,
  getJobs,
  applyJob,
  getAppliedJobs,
};