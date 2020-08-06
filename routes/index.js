var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    layout: "layout",
    title: "Home | Foodie",
    topMeals: require("../models/fake-db").topMeals,
  });
});
router.get("/meal-packages", function (req, res, next) {
  res.render("packages", {
    layout: "layout",
    title: "Meal Packages | Foodie",
    packages: require("../models/fake-db").packages,
  });
});

router.get("/login", function (req, res, next) {
  res.render("login", {
    layout: "layout",
    title: "Login | Foodie",
  });
});

router.get("/signup", function (req, res, next) {
  res.render("signup", {
    layout: "layout",
    title: "Sign Up | Foodie",
    packages: require("../models/fake-db").packages,
  });
});

module.exports = router;
