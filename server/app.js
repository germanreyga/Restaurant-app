var createError = require("http-errors");
var express = require("express");
var app = express();
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var routes = require("./main/routes");
let bodyParser = require("body-parser");
let passport = require("passport");
require("./configs/passport");

// Debugger
app.use(logger("dev"));

// Configurations
let appConfig = require("./configs/app");

// Express, Express sessions and Passport
let session = require("express-session");
let flash = require("express-flash");
let sessionStore = new session.MemoryStore();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    cookie: { maxAge: 60000 },
    store: sessionStore,
    saveUninitialized: true,
    resave: "true",
    secret: appConfig.secret
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(express.static(path.join(__dirname, "public")));
app.use("/", routes);

module.exports = app;
