const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config()
const connectDB = require("./config/connectDB.js");

app.use(cors()); // third party middleware
app.use(express.json()); // parse JSON data

let path = require("path");
const fs = require("fs");

connectDB();


const userRoute = require("./routes/userRoutes");
const employerRoute = require("./routes/employerRoutes.js");
const jobRoute = require("./routes/jobRoutes.js");
const contactRoute = require("./routes/contactRoutes.js")

app.use("/api/user", userRoute);
app.use("/api/employer", employerRoute);
app.use("/api/job", jobRoute);
app.use("/api/contact", contactRoute);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.listen(process.env.PORT, (err) => {
  console.log(err || "Server Run on Port "+ process.env.PORT);
})

