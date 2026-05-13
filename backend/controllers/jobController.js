const Job = require("../models/jobModel");
const AsyncHandler = require("../utils/AsyncHandler");
const User = require("../models/userModel");
const Employer = require("../models/employerModel");

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

  await Employer.findByIdAndUpdate(
    req.user.id,
    {
      $push: {
        jobs: {
          jobId: newjob._id,
        },
      },
    }
  );

  res.status(200).json({
    success: true,
    message: "Job created successfully",
    data: newjob,
  });
});

/* ================= GET ALL JOBS ================= */

let getJobs = AsyncHandler(async (req, res) => {

  let jobs = await Job.find()
    .populate("createdBy", ["name", "email", "_id"]);

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

  user.appliedJobs.push({
    appliedJobId: jobId
  });

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

/* ================= GET MY JOBS ================= */

let getMyJobs = AsyncHandler(async (req, res) => {

  if (req.user.role !== "employer") {
    return res.status(403).json({
      success: false,
      message: "Only employers can access",
    });
  }

  const jobs = await Job.find({
    createdBy: req.user.id,
  })
    .populate("createdBy", "name email")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: jobs,
  });
});

/* ================= GET APPLIED CANDIDATES ================= */

let getMyJobsApplicants = AsyncHandler(async (req, res) => {

  if (req.user.role !== "employer") {
    return res.status(403).json({
      success: false,
      message: "Only employers can access",
    });
  }

  const jobs = await Job.find({
    createdBy: req.user.id,
  })
    .populate({
      path: "applicants",
      select:
        "name email phoneNumber experience educationLevel jobTitle languages profileImage resume",
    })
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: jobs,
  });
});

/* ================= UPDATE JOB ================= */

let updateJob = AsyncHandler(async (req, res) => {

  const { jobId } = req.params;

  const job = await Job.findById(jobId);

  if (!job) {
    return res.status(404).json({
      success: false,
      message: "Job not found",
    });
  }

  // only owner can edit
  if (job.createdBy.toString() !== req.user.id) {
    return res.status(403).json({
      success: false,
      message: "Not authorized",
    });
  }

  let updatedJob = await Job.findByIdAndUpdate(
    jobId,
    req.body,
    { new: true }
  );

  res.status(200).json({
    success: true,
    message: "Job updated successfully",
    data: updatedJob,
  });
});

/* ================= DELETE JOB ================= */

let deleteJob = AsyncHandler(async (req, res) => {

  const { jobId } = req.params;

  const job = await Job.findById(jobId);

  if (!job) {
    return res.status(404).json({
      success: false,
      message: "Job not found",
    });
  }

  if (job.createdBy.toString() !== req.user.id) {
    return res.status(403).json({
      success: false,
      message: "Not authorized",
    });
  }

  await job.deleteOne();

  res.json({
    success: true,
    message: "Job deleted successfully",
  });
});

module.exports = {
  createJob,
  getJobs,
  applyJob,
  getAppliedJobs,
  getMyJobs,
  getMyJobsApplicants,
  updateJob,
  deleteJob,
};