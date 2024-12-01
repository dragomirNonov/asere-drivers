const jwt = require("jsonwebtoken");

const authorize = (roles) => (req, res, next) => {
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
      let rolesToCheck = roles;

      if (!Array.isArray(roles)) {
        rolesToCheck = [roles];
      }

      if (!rolesToCheck.includes(decoded.role)) {
        logger.error(`Unauthorized - Role: ${decoded.role}`);

        return res.status(401).json({
          title: "Unauthorized",
          error: "Role mismatch",
        });
      } else {
        next();
      }
    }
  });
};

module.exports = { authorize };
