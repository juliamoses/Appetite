"use strict";

/////////REQUIRES///////////////////////////
require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");



/////////APP.USE///////////////////////////

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes,
//yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));
app.use("/api/items", usersRoutes(knex));
// Mount middleware to notify Twilio of errors- do i need?
//app.use(twilioNotifications.notifyOnError);


/////////HELPER FUNCTIONS//////////////////
//helper function for twillo text
//users must provide email(twillo auth)

/////////GET REQUESTS/////////////////////(most to least specific)

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

//get for order
app.get("/order", (req, res) => {
  // let templateVars = {order}
  res.render("order");
});

//get for checkout
app.get("/checkout", (req,res) => {
  res.render("checkout");
})


/////////POST REQUESTS/////////////////////(most to least specific)

//post to update
app.post("/order/update", (req, res) => {
  res.redirect("order");
});


//twillo(read up on)
app.post("twillo/send",(req, res) => {
  if (!isConfigured) {
  var errorMessage =
    'TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_NUMBER must be set.';
  throw new Error(errorMessage);
  }
  res.send("orders here!");
});


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
