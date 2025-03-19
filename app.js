const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");


// MONGOOSE

const mongoDB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";
mongoose.connect(mongoDB_URI)
.then((expressDB) => {
    console.log(`Connected to Mongo! Database name: "${expressDB.connections[0].name}"`)
})
.catch((error) => {
    console.log(error)
})

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION



// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route


//  Iteration 4 - Get All Recipes
//  GET  /recipes route


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route


//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route



// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
