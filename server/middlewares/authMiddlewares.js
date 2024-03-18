const User = require("../models/authModel");
const jwt = require("jsonwebtoken");

module.exports.checkUser = async (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"] || req.cookies.jwt || req.headers.authorization.split(" ")[1];
   
  try {
    if (token) {
      jwt.verify(token, "Anurags_Secret", async (err, decodedToken) => {
        if (err) {
          res.status(401).json({ status: false, message: "Invalid token" });
        } else {
          const user = await User.findById(decodedToken.id);
          if (user) {
            res.status(200).json({ status: true, user: user.email });
          } else {
            res.status(404).json({ status: false, message: "User not found" });
          }
        }
      });
    } else {
      res.status(401).json({ status: false, message: "No token provided" });
      next();
    }
  } catch (error) {
    console.error("Error in authentication middleware:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};
