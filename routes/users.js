var express = require("express");
var router = express.Router();

/* GET users listing. */

module.exports = (loggedInUser) => {
  const UserController = require("../controllers/user.controller")(
    loggedInUser
  );
  router.post("/signup", UserController.signup, UserController.login);
  router.post("/login", UserController.login);
  return router;
};
