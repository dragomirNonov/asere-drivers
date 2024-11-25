const jwt = require("jsonwebtoken");

module.exports.authUser = (req, res, rolesToCheck, next) => {
  const token = req.headers.token;

  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err) {
      console.log(err);
      logger.error(`${err} Invalid token`);
      return res.status(401).json({
        title: "Unauthorized",
        error: "Invalid token",
      });
    } else {
      // Ensure rolesToCheck is an array
      if (!Array.isArray(rolesToCheck)) {
        rolesToCheck = [rolesToCheck];
      }

      // Check if decoded role matches any of the roles in rolesToCheck
      if (!rolesToCheck.includes(decoded.role)) {
        logger.error(`Unauthorized - Role: ${decoded.role}`);
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
