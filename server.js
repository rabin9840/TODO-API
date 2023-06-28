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
app.get('/todos', async (req, res) => {
    try {
        const todos = await Todos.find({});
        res.status(200).json(todos);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'An error occurred'});
    }
 })

 // Create a new todo
app.post('/todo', async (req, res) => { 
    try {
        const { title, description, dueDate, completed } = req.body;
        const newTodo = new Todos({
            title,
            description,
            dueDate,
            completed
        });
        await newTodo.save();
        res.status(200).send('To do created');
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'An error occurred'});
        
    }
    
})

// To delete a todo
app.delete('/todos/:id', async (req, res) => {
    try { 
        const id = req.params.id;
        await Todos.findByIdAndDelete(id);
        res.status(200).send('To Do deleted');
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message:'An error occurred'});

    }
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})