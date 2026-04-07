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

app.use("/api/user", userRoute);
app.use("/uploads", express.static("uploads"));
app.listen(process.env.PORT, (err) => {
  console.log(err || "Server Run on Port "+ process.env.PORT);
})

