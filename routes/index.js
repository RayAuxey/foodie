var express = require("express");
var router = express.Router();

/* GET home page. */

module.exports = (loggedInUser) => {
  router.get("/", function (req, res, next) {
    const { loggedIn } = loggedInUser;
    res.render("index", {
      layout: "layout",
      title: "Home | Foodie",
      topMeals: require("../models/fake-db").topMeals,
      loggedIn,
    });
  });
  router.get("/meal-packages", function (req, res, next) {
    const { loggedIn } = loggedInUser;
    res.render("packages", {
      layout: "layout",
      title: "Meal Packages | Foodie",
      packages: require("../models/fake-db").packages,
      loggedIn,
    });
  });

  router.get("/login", function (req, res, next) {
    const { loggedIn } = loggedInUser;
    res.render("login", {
      layout: "layout",
      title: "Login | Foodie",
      loggedIn,
    });
  });

  router.get("/signup", function (req, res, next) {
    const { loggedIn } = loggedInUser;
    res.render("signup", {
      layout: "layout",
      title: "Sign Up | Foodie",
      packages: require("../models/fake-db").packages,
      loggedIn,
    });
  });

  router.get("/dashboard", (req, res, next) => {
    const { loggedIn } = loggedInUser;
    console.log("User", loggedInUser);
    if (loggedInUser.loggedIn) {
      const {
        user: { fname, lname, isClerk },
      } = loggedInUser;
      res.render("dashboard", {
        layout: "layout",
        title: "Dashboard | Foodie",
        fname,
        lname,
        isClerk,
        loggedIn,
      });
    } else {
      res.render("login", {
        layout: "layout",
        title: "Login | Foodie",
        loggedIn,
      });
    }
  });

  router.get("/shopping-cart", (req, res, next) => {
    const { loggedIn } = loggedInUser;
    console.log("User", loggedInUser);
    if (loggedInUser.loggedIn) {
      const {
        user: { fname, lname },
      } = loggedInUser;
      res.render("shopping-cart", {
        layout: "layout",
        title: "Shopping Cart | Foodie",
        fname,
        lname,
        loggedIn,
      });
    } else {
      res.render("login", {
        layout: "layout",
        title: "Login | Foodie",
        loggedIn,
      });
    }
  });

  router.get("/logout", function (req, res, next) {
    const { loggedIn } = loggedInUser;
    loggedInUser.user = null;
    loggedInUser.loggedIn = false;
    res.redirect("/");
  });
  return router;
};
