const express= require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Todos = require('./models/todo');

//Load config file
dotenv.config({path:'./config/config.env'});
const app= express();
const port = process.env.PORT;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

//  API endpoints:
app.get('/todos', (req, res) => {
    Todos.find({}, (err, todos) => { 
        if (err) {
            res.status(500).json({message: err.message})
        } else {
            res.status(200).json(todos)
        }
    })
 })

 // Create a new todo
app.post('/todo', (req, res) => { 
    const { title, description, dueDate, completed } = req.body;
    const newTodo = new Todos({
        title,
        description,
        dueDate,
        completed
    });

    newTodo.save((err) => {
        if (err) {
            res.status(500).send('An error occurred');
        }
        else {
            res.send("A new todo has been added to the database");
        }
    })
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})