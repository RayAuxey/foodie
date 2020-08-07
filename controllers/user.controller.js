const User = require("../models/user.model");

module.exports = (loggedInUser) => ({
  async signup(req, res, next) {
    const { firstName, lastName, email, password } = req.body;
    const newUser = new User({
      fname: firstName,
      lname: lastName,
      email,
      password,
    });

    try {
      const savedUser = await newUser.save();
      next();
    } catch (err) {
      res.render("signup", {
        layout: "layout",
        title: "Sign Up | Foodie",
        error: err.code === 11000 ? "Email Already in Use" : "An Error Occured",
      });
    }
  },
  async login(req, res, next) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.render("login", {
        layout: "layout",
        title: "Login | Foodie",
        error: " Sorry, you entered the wrong email and/or password",
      });
    }

    if (await user.isValidPassword(password)) {
      loggedInUser.loggedIn = true;
      loggedInUser.user = user;
      res.redirect("/dashboard");
    } else {
      res.render("login", {
        layout: "layout",
        title: "Login | Foodie",
        error: " Sorry, you entered the wrong email and/or password",
      });
    }
  },
});
