const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
var MongoDBStore = require("connect-mongodb-session")(session);

if (process.env.NODE_ENV !== "production") {
  // Load environment variables from .env file in non prod environments
  require("dotenv").config();
}
require("./utils/connectdb");

require("./strategies/JwtStrategy");
require("./strategies/LocalStrategy");
require("./middleware/authenticate");

// ROUTERS IMPORT
const userRouter = require("./routes/userRoutes");
const bugRouter = require('./routes/bugRoutes')

const app = express();

// Mongo store
var store = new MongoDBStore({
  uri: process.env.MONGO_DB_CONNECTION_STRING,
  collection: "mySessions",
});
// express session examples for deprecated undefined and additional JWT options
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    // name: process.env.cookie_name,
    store: store, // connect-mongo session store
    proxy: true,
    resave: true,
    saveUninitialized: true,
    cookie: { sameSite: "strict" },
  })
);
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

//Add the client URL to the CORS policy

const whitelist = process.env.WHITELISTED_DOMAINS
  ? process.env.WHITELISTED_DOMAINS.split(",")
  : [];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },

  credentials: true,
};

app.use(cors(corsOptions));

app.use(passport.initialize());

// ATTACH OR LISTEN FOR THE ROUTERS
app.use("/users", userRouter);
app.use("/bug", bugRouter);

app.get("/", function (req, res) {
  res.send({ status: "success" });
});

//Start the server in port 8081

const server = app.listen(process.env.PORT || 8080, function () {
  const port = server.address().port;

  console.log("App started at port:", port);
});
