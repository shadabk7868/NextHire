const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    profileImage: { filename: String, url: String },
    name: String,
    jobTitle: String,
    phoneNumber: Number,
    password: {
        type: String,
        required: true
    },
    email: { type: String, unique: true, required: true },
    experience: Number,
    age: Number,
    educationLevel: String,
    gender: String,
    currentSalary: Number,
    expectedSalary: Number,
    education: [
        {
            instituteName: String,
            course: String,
            startingYear: Number,
            EndingYear: Number,
            description: String,
            _id: false
        }
    ],
    skills: [],
    workExperience: [
        {
            userName: String,
            companyName: String,
            role: String,
            description: String,
            startingYear: Number,
            EndingYear: Number,
        }
    ],
    languages: [],
    role: { type: String, default: "candidate" },
    address: { country: String, state: String, dist: String, area: String, fullAddress: String },
    resume: { filename: String, url: String },
    keywords: [],
    appliedJobs: [
        {
            appliedJobId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "jobs",
            },
            appliedAt: {
                type: Date,
                default: Date.now,
            },
            _id: false,
        },
    ],
    shortlisted: [{
        shortlistedJobId: { type: mongoose.Schema.Types.ObjectId, ref: "jobs", },
        _id: false
    }]
}, { timestamps: true })
let User = mongoose.model("users", userSchema)
module.exports = User;
