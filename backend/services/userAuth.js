const jwt = require("jsonwebtoken");

module.exports.authUser = (req, res, roleToCheck, next) => {
  const token = req.headers.token;

  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({
        title: "Unauthorized",
        error: "Invalid token",
      });
    } else {
      // Check if decoded role matches the roleToCheck
      if (decoded.role !== roleToCheck) {
        return res.status(401).json({
          title: "Unauthorized",
          error: "Role mismatch",
        });
      } else {
        // Role matches, proceed to the next middleware
        next();
      }
    }
  });
};
