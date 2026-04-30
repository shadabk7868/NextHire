const { verifyToken } = require("../utils/generateToken");
 
const auth = async (req, res, next) => {
  if (!req.headers.authorization) {
  return res.status(401).json({ message: "No token" });
}

let token = req.headers.authorization;

if (token.startsWith("Bearer ")) {
  token = token.split(" ")[1];
}
 
  try {
    let decoded = await verifyToken(token);
 
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
 
let isEmployer = (req, res, next) => {
  console.log(req.user)
  if (req.user.role == "employer") {
    next()
  } else {
    res.status(400).json({ success: false, message: "access denied" })
  }
 
}
module.exports = { auth, isEmployer };
 