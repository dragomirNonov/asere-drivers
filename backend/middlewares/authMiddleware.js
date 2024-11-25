const userAuthentication = require("../services/userAuth");

const authorize = (roles) => (req, res, next) => {
  userAuthentication.authUser(req, res, roles, next);
};

module.exports = { authorize };
