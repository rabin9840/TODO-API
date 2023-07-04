const todoService = require('../services/todoServices');
// const { validationResult } = require('express-validator');
// const { createTodoValidation } = require('../validation/todoValidation');

const getAllTodos = async (req, res) => {
    try {
        const todos = await todoService.getAllTodos();
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
}

const createTodo = async (req, res) => {

    // //check for validation errors
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     console.log(errors.array()[0].msg);
    //     return res.status(422).json({
    //         status: "error",
    //         statusCode: 422,
    //         message: "Validation errors",
    //         // different way of error presenting
    //         errors:errors.array()
            
    //     })
    // }
    try { 
        const { title, description, dueDate, completed } = req.body;
        const newTodo = await todoService.createTodo(
            title,
            description,
            dueDate,
            completed
        );
        res.status(201).json({
            status: "success",
            statusCode: 201,
            message: "Todo task created successfully",
            data:newTodo
        });

    }
    catch (error) {
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

}

const updateTodo = async (req, res) => { 
    try {
        const id = req.params.id;
        const { title, description, dueDate, completed } = req.body;
        const updatedTodo = await todoService.updateTodo(
            id,
            title,
            description,
            dueDate,
            completed
        );
        res.status(200).json({  
            status: "success",
            statusCode: 200,
            message: "Todo task updated successfully",
            data: updatedTodo
        });

    } catch (error) {
        res.status(500).json({
            status: "error",
            statusCode: 500,
            message: 'An error occurred while updating the todo task',
            errors: [
                {
                    msg: error.message,
                    name: error.name,
                    value: error.value
                }
            ]
        });
        
    }
   
}

const deleteTodo = async (req, res) => {
    try {
        const id = req.params.id;
        await todoService.deleteTodo(id);
        res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "Todo task deleted successfully"
        });
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
}

module.exports = {  
    getAllTodos,
    // createTodo: [
    //     createTodoValidation,
    //     createTodo
    // ],
    createTodo,
    updateTodo,
    deleteTodo
}