const mongoose = require("mongoose");

let employerSchema = new mongoose.Schema({
    name: String,
    image: { filename: String, url: String },
    coverImage: { filename: String, url: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: Number,
    category: String,
    website: String,
    industryType: String,
    foundedIn: Date,
    teamSize: Number,
    about: String,
    role: { type: String, default: "employer" },
    address: {
        country: String,
        state: String,
        city: String,
        area: String,
        fullAddress: String
    }, jobs: [
        {
            jobId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "jobs",
            }
        }
    ],
    allApplicants: [
        {
            applicantId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users",
            }
        }
    ],
    shortListed: [
        {
            shortListedApplicantId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users",
            }
        }
    ]
}, { timestamps: true })
let employerModel = mongoose.model("employers", employerSchema);

module.exports = employerModel