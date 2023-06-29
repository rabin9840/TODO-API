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
        res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "Todo tasks retrieved successfully",
            data: todos
        }
        );
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            statusCode: 500,
            message: "An error occured while retrieving todo tasks",
            errors: [
                {
                    msg: error.message,
                    name: error.name,
                    value: error.value,
                    location: error.location,
                    params: error.params

                }
                
            ]
        });
    }
 }) 

 // Create a new todo
app.post('/todo', async (req, res) => { 
    try {
        const { title, description, dueDate, completed } = req.body;
        console.log(dueDate);
        console.log(typeof dueDate);
        const changedDate=new Date(dueDate).toISOString().substr(0, 10);
        console.log(changedDate);
        
        const formattedDueDate = new Date(dueDate).toISOString().split('T')[0];

        const newTodo = new Todos({
            title,
            description,
            dueDate: changedDate,
            completed
        });
        console.log(newTodo);

        await newTodo.save();
        res.status(200).send('To do created');
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'An error occurred'});
        
    }
    
})


// To update a Todo 
app.put('/todos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { title, description, dueDate, completed } = req.body;
        
        const updatedTodo = await Todos.findByIdAndUpdate(id,
            {
                title,
                description,
                dueDate,
                completed
            },
            { new: true }
        );
        res.status(200).send('To do updated');

        
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'An error occurred' });
    }
})

// To delete a todo
app.delete('/todos/:id', async (req, res) => {
    try { 
        const id = req.params.id;
        await Todos.findByIdAndDelete(id);
        res.status(200).json({
            status: "success",
            statusCode:200,
            message:"Todo task deleted successfully"
        })
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            statusCode: 500,
            message: "An error occured while deleting todo task",
            errors: [
                {
                    msg: error.message,
                    name: error.name,
                    value: error.value
                }
            ]
        });

    }
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})