const mongoose = require("mongoose");

const employerSchema = new mongoose.Schema({
    logo: {filename: String,url: String},
    companyName: {type: String, required: true},
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: String,
    website: String,

    establishedSince: Date,
    teamSize: String, 
    industry: [String], // multiple select (Retail, IT, etc.)

    allowInSearch: {
        type: Boolean,
        default: true
    },

    aboutCompany: {
        type: String
    },

    address: {
        country: String,
        state: String,
        city: String,
        area: String,
        fullAddress: String
    },
    password: {
        type: String,
        required: true
    },
    postedJobs: [
        { jobId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "jobs"
            },
            _id: false }
    ]
}, { timestamps: true });

const Employer = mongoose.model("employers", employerSchema);
module.exports = Employer;