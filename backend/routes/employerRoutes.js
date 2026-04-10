const express = require("express");
const router = express.Router();

const {
 registerEmployer,
 loginEmployer,
 getEmployerProfile,
 updateEmployerProfile,
 deleteEmployer
}=require("../controllers/employerController")

router.post("/register", registerEmployer);
router.post("/login", loginEmployer);

router.get("/profile", auth, getEmployerProfile);

router.put("/update", auth, updateEmployerProfile);

router.delete("/delete", auth, deleteEmployer);
module.exports=router;