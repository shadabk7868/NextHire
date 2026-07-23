const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config()
const connectDB = require("./config/connectDB.js");
const { testGroq } = require("./ai/groq");

app.use(cors()); 
app.use(express.json()); 

let path = require("path");
const fs = require("fs");

connectDB();
testGroq();


const userRoute = require("./routes/userRoutes");
const employerRoute = require("./routes/employerRoutes.js");
const jobRoute = require("./routes/jobRoutes.js");
const contactRoute = require("./routes/contactRoutes.js")
const aiRoute = require("./routes/aiRoutes");

app.use("/api/user", userRoute);
app.use("/api/employer", employerRoute);
app.use("/api/job", jobRoute);
app.use("/api/contact", contactRoute);
app.use("/api/ai", aiRoute);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.listen(process.env.PORT, (err) => {
  console.log(err || "Server Run on Port "+ process.env.PORT);
})

