const express= require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Todos = require('./models/todo');
const mongoose = require('mongoose');
const moment= require('moment');

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
        // if no todos found
        if (todos.length === 0) {
            res.status(204).json({
                status: "success",
                statusCode: 204,
                message: "No todo tasks found",
                data: todos
            })
        }
        else {
            res.status(200).json({
                status: "success",
                statusCode: 200,
                message: "Todo tasks retrieved successfully",
                data: todos
            }
            );    
        }
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
                }
                
            ]
        });
    }
 }) 

 // Create a new todo
app.post('/todo', async (req, res) => { 
    try {
        const { title, description, dueDate, completed } = req.body;
        // const changedDate=new Date(dueDate).toISOString().substr(0, 10);
        // console.log(changedDate);
        // console.log(new Date(dueDate).toISOString());
        const momentDate = moment(dueDate).format('YYYY-MM-DD');
        
        // const formattedDueDate = new Date(dueDate).toISOString().split('T')[0];

        const newTodo = new Todos({
            title,
            description,
            // dueDate: changedDate,
            dueDate:momentDate,
            completed
        });
        console.log(newTodo);

        await newTodo.save();
        res.status(201).json({
            status: "success",
            statusCode: 201,
            message: "Todo task created successfully",
            data:newTodo
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            statusCode: 500,
            message: "An error occured while creating todo task",
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


// To update a Todo 
app.put('/todos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { title, description, dueDate, completed } = req.body;
        const momentDate = moment(dueDate).format('YYYY-MM-DD');
        console.log(momentDate);
        // const formattedDueDate = new Date(dueDate).toISOString().split('T')[0];
        
        // to solve timezone issue
        // function parseDatetoString(dateString) {
        //     const [month, day, year] = dateString.split('/');
        //     console.log("month:" + month);
        //     console.log("day:" + day);
        //     console.log("year:" + year);
        //     console.log('date:'+`${year}-${month}-${day}`);
        //     return new Date(`${year}-${month}-${day}`);
        // }

        // console.log("parse date:" + parseDatetoString(dueDate));

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                status: "error",
                statusCode: 400,
                message: "Invalid ID",
                errors: [
                    {
                        msg: "Invalid ID",
                        name: "Invalid ID",
                        value: "Invalid ID"
                    }
                ]
            });
            return;
        }
        
        
        const updatedTodo = await Todos.findByIdAndUpdate(id,
            {
                title,
                description,
                dueDate:momentDate,
                completed
            },
            { new: true }
        );
        console.log(updatedTodo);

        // if no todo found
        if (!updatedTodo) {
            console.log("inside toto");
            res.status(404).json({
                status: "error",
                statusCode: 404,
                message: "Todo task not found",
                errors: [
                    {
                        msg: "Todo task not found",
                        name: "Todo task not found",
                        value: "Todo task not found"
                    }
                ]
            });
        }
        else {
            res.status(200).json({  
                status: "success",
                statusCode: 200,
                message: "Todo task updated successfully",
                data: updatedTodo
            });
            
        }
        
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            status: "error",
            statusCode: 500,
            message: 'An error occurred while updating the todo task',
            errors: [
                {
                    msg: err.message,
                    name: err.name,
                    value: err.value
                }
            ]
        });
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