const express = require("express");
const router = express.Router();

const {
    registerEmployer,
    loginEmployer,
    getEmployerProfile,
    updateEmployerProfile,
    deleteEmployer
} = require("../controllers/employerController")

const { auth } = require("../middlewares/auth");
const upload = require("../middlewares/upload");

router.post("/register", registerEmployer);
router.post("/login", loginEmployer);

router.get("/profile", auth, getEmployerProfile);

router.put("/update", auth, upload.fields([
    { name: "logo", maxCount: 1 }, { name: "coverImage", maxCount: 1 },
]), updateEmployerProfile
);

router.delete("/delete", auth, deleteEmployer);
module.exports = router;