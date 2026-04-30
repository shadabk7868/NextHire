const mongoose = require("mongoose");

let jobSchema = new mongoose.Schema({
    title: String,
    description: String,
    email: String,
    jobType: String,
    specialization: String,
    offeredSalary: Number,
    careerLevel: String,
    experience: Number,
    industryType: String,
    qualification: String,
    deadlineData: String,
    address: {
        country: String,
        state: String,
        city: String,
        area: String,
        fullAddress: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employers"
    },
    companyLogo: {
        filename: String,
        url: String
    },
    applicants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }]
}, { timestamps: true })
let jobModel = mongoose.model("jobs", jobSchema);

module.exports = jobModel

