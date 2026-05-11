const mongoose = require("mongoose");
 
let connectDB  = async () => {
    try {
        let connection = await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully")
    } catch (error) {
    console.log("DB Error:", error.message);
    process.exit(1);
}
}
module.exports = connectDB;