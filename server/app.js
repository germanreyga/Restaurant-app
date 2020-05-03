var createError = require("http-errors");
var express = require("express");
const socketIO = require("socket.io");
const cors = require("cors");
var app = express();
// Socket.io Server
var server = require("http").Server(app);
var io = require("socket.io")(server);

var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var routes = require("./main/routes");
let bodyParser = require("body-parser");
let passport = require("passport");
require("./configs/passport");

// Debugger
app.use(logger("dev"));

// Express, Express sessions and Passport
let session = require("express-session");
let flash = require("express-flash");
let sessionStore = new session.MemoryStore();

// Socket.io logic
io.on("connection", (socket) => {
  console.log("New client connected, id:", socket.id, "at", new Date());

  socket.on("new-order-placed", (data) => {
    io.sockets.emit("inform-employees", { message: data.message });
  });
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    cookie: { maxAge: 3600000 }, // 1 Hour
    store: sessionStore,
    saveUninitialized: true,
    resave: "true",
    secret: "YOU_SHOULD_NOT_USE_THIS_SECRET",
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(express.static(path.join(__dirname, "public")));
app.use("/", routes);

// Cors config
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

module.exports = { app: app, server: server };
