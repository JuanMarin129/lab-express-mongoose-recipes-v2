const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model.js")


const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION

const mongoDB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";
mongoose.connect(mongoDB_URI)
.then((expressDB) => {
    console.log(`Connected to Mongo! Database name: "${expressDB.connections[0].name}"`)
})
.catch((error) => {
    console.log(error)
})



// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route

app.post("/recipes", async (req,res) => {

    console.log(req.body)

    try {
        await Recipe.create({
            title: req.body.title,
            instruction: req.body.instruction,
            level: req.body.level,
            ingredients: req.body.ingredients,
            image: req.body.image,
            duration: req.body.duration,
            isArchived: req.body.isArchived,
            created: req.body.created
        })

        res.status(201).json("Receta Creada!!!")
        
        
    } catch (error) {
        console.log(error)
    }

})


//  Iteration 4 - Get All Recipes
//  GET  /recipes route

app.get("/recipes", async (req,res) => {

    try {
        const response = await Recipe.find()
        res.json(response)
        
    } catch (error) {
        console.log(error)
    }
})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get("/recipes/:id", async (req,res) => {

    try {
        const response = await Recipe.find({_id: req.params.id})
        res.json(response)
        
    } catch (error) {
        console.log(error)
    }

})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", async (req, res) => {

    try {
        const response = await Recipe.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            instructions: req.body.instructions,
            level: req.body.level,
            ingredients: req.body.ingredients,
            image: req.body.image,
            duration: req.body.duration,
            isArchived: req.body.isArchived,
            created: req.body.created
        })
        res.json(response)
        
    } catch (error) {
        console.log(error)
    }
})



//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete("/recipes/:id", async (req,res) => {

    try {
        const response = await Recipe.findByIdAndDelete (req.params.id)
        res.status(204).json("Receta borrada!")
        
    } catch (error) {
        console.log(error)
    }
})

// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
