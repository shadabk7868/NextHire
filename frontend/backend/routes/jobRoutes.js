const express = require("express");
const router = express.Router();

const {
   createJob,
   getJobs,
   applyJob,
   getAppliedJobs,
   getMyJobs,
   updateJob,
   deleteJob
} = require("../controllers/jobController");

const { auth, isEmployer } = require("../middlewares/auth");
const upload = require("../middlewares/upload");


router.post("/create-job", auth, isEmployer, upload.single("companyLogo"), createJob);

router.get("/getjob", getJobs);

router.post("/apply/:jobId", auth, applyJob);

router.get("/applied-jobs", auth, getAppliedJobs);

router.get("/my-jobs", auth, getMyJobs);

router.put("/update-job/:jobId", auth, isEmployer, updateJob);

router.delete("/delete-job/:jobId", auth, isEmployer, deleteJob);

module.exports = router;