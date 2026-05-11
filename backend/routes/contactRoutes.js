  const express = require("express");
  const router = express.Router();

  const {
    createContact,
    getContacts,
    deleteContact,
  } = require("../controllers/contactController");


  router.post("/create", createContact);

  router.get("/get", getContacts);
  router.delete("/:id", deleteContact);

  module.exports = router;