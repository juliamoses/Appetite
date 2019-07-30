# Appetite

## About the Project
Appetite is a full stack web application built with Node.js, Express, AJAX, Twilio API, jQuery, HTML5, CSS3, PosgreSQL and local storage.

## Team Members
- [Julia Moses](https://github.com/juliamoses)
- [Brian Murray](https://github.com/brianeshores)
- [Daniel Tran](https://github.com/DTran23/Appetite)

### Problem Statement
An application built to simplify online food ordering for pickup.

### Expected Usage
Desired users are restaurant owners and customers:

- Restaurant owners will recieve a SMS when an order is placed.

	- The owners can send a SMS with estimated preparation time to notify customers.
	- The owners can check the informtation and status of each order.

- Customers can order from the restaurant menu online.

	- They will be notified when the order has been accepted and how long it will take.
	- They will be notified when the order is ready for pickup.


## Getting Started
Install all dependencies using the npm install command.

Setup the database:

	- Run knex migrate:latest in your terminal.
	- Optional: Set up dummy-data by running knex seed:run in your terminal.
	- Run the development web server using the 'npm start' command.

Setup twilio

	- Sign up in twilio to require authorization tokens and account sid.
	- Use twilio to send and receive message.


## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
- Body Parser
- EJS
- Express
- Knex
- Postgre SQL
- Twilio (API)


!["Appetite Home Page"](https://github.com/juliamoses/Appetite/blob/master/docs/appetite-home.png?raw=true)
!["Appetite Menu Page"](https://github.com/juliamoses/Appetite/blob/master/docs/appetite-menu.png?raw=true)
!["Appetite Checkout"](https://github.com/juliamoses/Appetite/blob/master/docs/appetite-cart.png?raw=true)
!["Appetite Map"](https://github.com/juliamoses/Appetite/blob/master/docs/appetite-map.png?raw=true)






