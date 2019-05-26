"use strict";

/////////REQUIRES///////////////////////////
require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();
const cookieSession     = require('express-session');


const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const MessagingResponse = require('twilio').twiml.MessagingResponse;


// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const itemRoutes = require("./routes/items");

////////API Twilio resources///////////////

const accountSid = 'AC55535e36229687b8c837b28720d4ff35';
const authToken = '6f744798e7d9ab0380a556356c3081a8';
const client = require('twilio')(accountSid, authToken);


/////////APP.USE///////////////////////////

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes,
//yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

// Session for storing cookies
app.use(cookieSession({
  name: 'session',
  secret: 'super secret',
  keys: ['key1', 'key2'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

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
app.use("/api/items", itemRoutes(knex));
// Mount middleware to notify Twilio of errors- do i need?
//app.use(twilioNotifications.notifyOnError);


/////////HELPER FUNCTIONS//////////////////
//helper function for twillo text
//users must provide email(twillo auth)

//Generates Random String
const generateRandomString = () => {
  return Math.random().toString(36).substring(2,8);
};

/////////GET REQUESTS/////////////////////(most to least specific)

// Home page
app.get("/", (req, res) => {

  const userInfo = { user: req.session.user };

  res.render("index", userInfo);
});

//get for order
app.get("/order", (req, res) => {
  const userInfo = { user: req.session.user };
  // let templateVars = {order}
  res.render("order", userInfo);
});

//get for checkout
app.get("/checkout", (req,res) => {
  const userInfo = { user: req.session.user };

  res.render("checkout", userInfo);
});

//get for registration
app.get("/register", (req, res) => {
  
  res.render("register");
});


//get for login
app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/checkout/final", (req, res) => {
  res.render("/checkout/final");
});


/////////POST REQUESTS/////////////////////(most to least specific)

//post to update
app.post("/order/update", (req, res) => {
  res.redirect("order");
});

// post to chckout on order submit
app.post("/checkout", (req, res) => {
  const msg = client.messages
  // .create({
  //    body: `Order placed by ${req.body.name}. Phone # ${req.body['phone-number']} Please respond to customer with an estimate of when order will be ready for pickup`,
  //    from: '+16475035109',
  //    to: '+16473904501'
  //  })
  // client.messages
  //  .create({
  //   body: 'Order being processed.',
  //   from: '+16475035109',
  //   to: '+16473904501'
  // })
  res.redirect("/")
  res.json({success: true});
});

//Register new users
app.post("/register", (req, res) => {
  const { email, password } = req.body;

  //check if email exists in DB
  knex.select("email")
  .from("users_db")
  .where("email", email)
  .andWhere("password", password)
  .then( (userEmail) => {
      if (userEmail.length === 0) {
          return knex('users_db')
            .returning('id')
            .insert([{
              email,
              password
            }])
            .then((newUserId) => {
              res.redirect("/");
              console.log('inserted user', newUserId);
            });
      }
  res.status(403).send('Email already exists');
  return;
});

});


app.post("/login", (req, res) => {
  res.redirect("/");
});



app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});







