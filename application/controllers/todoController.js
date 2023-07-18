const todoService = require('../services/todoServices');
const { validationResult } = require('express-validator');
const { createTodoValidation } = require('../validation/todoValidation');
const errorHandler = require('../../errorHandler');
const getAllTodos = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        console.log("start index, limit, endindex " + startIndex, limit, endIndex);

        const todos = await todoService.getAllTodos(startIndex, limit);
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
        next(error);
    }
}

const createTodo = async (req, res, next) => {

    //check for validation errors
    // const errors = validationResult(req);
    // console.log(errors);
    // if (!errors.isEmpty()) {

    //     console.log(errors.array()[0].msg);
    //     return res.status(400).json({
    //         status: "error",
    //         statusCode: 400,
    //         // different way of error presenting
    //         errors:errors.array()

    //     })
    // }
    try {
        const { title, description, dueDate, isActive, status } = req.body;
        const newTodo = await todoService.createTodo(
            title,
            description,
            dueDate,
            isActive,
            status
        );
        res.status(201).json({
            status: "success",
            statusCode: 201,
            message: "Todo task created successfully",
            data: newTodo
        });

    }
    catch (error) {
        next(error); // Pass the error to the error handler middleware


    }

}

const updateTodo = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { title, description, dueDate, isActive, status } = req.body;
        const updatedTodo = await todoService.updateTodo(
            id,
            title,
            description,
            dueDate,
            isActive,
            status
        );
        res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "Todo task updated successfully",
            data: updatedTodo
        });

    } catch (error) {
        next(error);
    }

}

const deleteTodo = async (req, res, next) => {
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
        next(error);

    }
}

const getTodosCount = async (req, res, next) => {
    try {
        const count = await todoService.getTodosCount();
        res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "Todo tasks count retrieved successfully",
            data: count
        });
    } catch (error) {
        next(error);
    }
}

const getFirstTenTodos = async (req, res, next) => {
    try {
        const firstTenTodos = await todoService.getFirstTenTodos();
        res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "Top Ten Todos Tasks retrieved successfully",
            data: firstTenTodos
        });
    } catch (error) {
        next(error);
    }
}

const getFirstTenTodosDuration = async (req, res, next) => {
    try {
        const firstTenTodosDuration = await todoService.getFirstTenTodosDuration();
        res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "Top Ten Todos Tasks duration retrieved successfully",
            data: firstTenTodosDuration
        });
    } catch (error) {
        next(error);
    }
}

const getRecentTodos = async (req, res, next) => {
    try {
        const recentTodos = await todoService.getRecentTodos();
        res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "Recently added Todos",
            data: recentTodos
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllTodos,
    createTodo: [createTodoValidation, createTodo],
    updateTodo,
    deleteTodo,
    getTodosCount,
    getFirstTenTodos,
    getFirstTenTodosDuration,
    getRecentTodos
}