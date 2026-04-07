const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employers",
        required: true
    },

    email: String,
    username: String,

    specialisms: [String], 
    jobType: String, // Full-time, Part-time
    salary: String, // can be range "5L-10L"
    careerLevel: String,
    experience: String,
    gender: String,
    industry: String,
    qualification: String,
    applicationDeadline: Date,

    location: {
        country: String,
        city: String,
        fullAddress: String
    },

    applicants: [
        { userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users"
            },
            status: {type: String,enum: ["applied", "shortlisted", "rejected"],default: "applied"},
            appliedAt: {type: Date,default: Date.now},_id: false }
    ],

    isActive: {
        type: Boolean,
        default: true
    }

}, { timestamps: true });

const Job = mongoose.model("jobs", jobSchema);
module.exports = Job;