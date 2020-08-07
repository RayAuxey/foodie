require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

mongoose.connect(
  `mongodb://admin:${process.env.DB_PASS}@cluster0-shard-00-00.uvo8o.mongodb.net:27017,cluster0-shard-00-01.uvo8o.mongodb.net:27017,cluster0-shard-00-02.uvo8o.mongodb.net:27017/foodapp?ssl=true&replicaSet=atlas-q5m1ov-shard-0&authSource=admin&retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var hbs = require("express-handlebars");

var app = express();
app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultView: "layout",
    layoutsDir: __dirname + "/views/pages/",
    partialsDir: __dirname + "/views/partials/",
  })
);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const loggedInUser = {
  loggedIn: false,
  user: null,
};

app.use("/", indexRouter(loggedInUser));
app.use("/users", usersRouter(loggedInUser));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
