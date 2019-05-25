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

// FAKE DB //
const usersDatabase = {
  "Daniel": {
    id: "Daniel1",
    email: "user@example.com",
    password: "pu"
  },
  "Daniel2": {
    id: "Daniel2",
    email: "user@example.com",
    password: "pu"
  }
}


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

/////////POST REQUESTS/////////////////////(most to least specific)

//post to update
app.post("/order/update", (req, res) => {
  res.redirect("order");
});


//twillo(read up on)
// app.post("twillo/send",(req, res) => {
//   if (!isConfigured) {
//   var errorMessage =
//     'TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_NUMBER must be set.';
//   throw new Error(errorMessage);
//   }
//   res.send("orders here!");
// });

// client.messages
//   .create({
//      body: 'Order placed by customer',
//      from: '+16475035109',
//      to: '+16473904501'
//    })

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message('Your order will be ready in 20');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});
  

app.post("/register", (req, res) => {
  const { email, password } = req.body;
  // Generate new user
  const id = generateRandomString();
  const newUser = {
    id,
    email,
    password
  }
  //Add new user to DB
  usersDatabase[id] = newUser;
  //Set cookie
  req.session.user = newUser;
  res.redirect("/");

})

app.post("/login", (req, res) => {
  res.redirect("/");
});



app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});







