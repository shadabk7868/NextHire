const AsyncHandler = require("../utils/AsyncHandler");
const Contact = require("../models/contactModal");

/* ================= CREATE CONTACT ================= */
let createContact = AsyncHandler(async (req, res) => {
  let { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Name, Email & Message required",
    });
  }

  let newContact = await Contact.create({
    name,
    email,
    subject,
    message,
  });

  await newContact.save();

  res.status(201).json({
    success: true,
    message: "Message sent successfully",
    data: newContact,
  });
});

/* ================= GET ALL CONTACTS ================= */
let getContacts = AsyncHandler(async (req, res) => {
  let contacts = await Contact.find();

  res.status(200).json({
    success: true,
    data: contacts,
  });
});

/* ================= DELETE CONTACT ================= */
let deleteContact = AsyncHandler(async (req, res) => {
  let { id } = req.params;

  let contact = await Contact.findById(id);

  if (!contact) {
    return res.status(404).json({
      success: false,
      message: "Contact not found",
    });
  }

  await Contact.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "Deleted successfully",
  });
});

module.exports = {
  createContact,
  getContacts,
  deleteContact,
};