const mongoose = require("mongoose");
 
let contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    subject: String,
}, { timestamps: true })
let contactModel = mongoose.model("contacts", contactSchema);
 
module.exports = contactModel
