const todoService = require('../services/todoServices');
const { validationResult } = require('express-validator');
const { createTodoValidation } = require('../validation/todoValidation');
const errorHandler = require('../../errorHandler');
const validateDueDate = require('../middleware/validateDueDate');


// For particular user's todos tasks
// const getAllTodos = async (req, res, next) => {
//     console.log("callingGetALLtoDOS");
//     console.log(req.session.passport);
//     try {
//         const page = parseInt(req.query.page) || 1;
//         const limit = parseInt(req.query.limit) || 10;
//         const status = req.query.status;
//         // const dueDate = req.query.duedate;
//         const dueDate = req.query.dueDate;

//         const isActive = req.query.isActive;
//         const title = req.query.title;

//         const startIndex = (page - 1) * limit;
//         const endIndex = page * limit;
//         const userId = req.session.passport.user;
//         console.log("start index, limit, endindex, status user " + startIndex, limit, endIndex, status, userId);

//         const todos = await todoService.getAllTodos(startIndex, limit, status, page, dueDate, isActive, title, userId);
//         // if (todos.length === 0) {
//         //     res.status(204).json({
//         //         status: "success",
//         //         statusCode: 204,
//         //         message: "No todo tasks found",
//         //         data: todos
//         //     })
//         // }
//         // else {
//         //     res.status(200).json({
//         //         status: "success",
//         //         statusCode: 200,
//         //         message: "Todo tasks retrieved successfully",
//         //         data: todos
//         //     }
//         //     );
//         // }
//         const statusCode = todos.length === 0 ? 204 : 200;
//         const message = todos.length === 0 ? "No todo tasks found" : "Todo tasks retrieved successfully";
//         res.status(statusCode).json({
//             status: "success",
//             statusCode,
//             message,
//             data: todos
//         });

//     } catch (error) {
//         next(error);
//     }
// }


// To get all the available todos tasks
const getAllTodos = async (req, res, next) => {
    console.log("callingGetALLtoDOS");
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const status = req.query.status;
        // const dueDate = req.query.duedate;
        const dueDate = req.query.dueDate;

        const isActive = req.query.isActive;
        const title = req.query.title;

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        console.log("start index, limit, endindex, status " + startIndex, limit, endIndex, status);
        const todos = await todoService.getAllTodos(startIndex, limit, status, page, dueDate, isActive, title);
        const statusCode = todos.length === 0 ? 204 : 200;
        const message = todos.length === 0 ? "No todo tasks found" : "Todo tasks retrieved successfully";
        res.status(statusCode).json({
            status: "success",
            statusCode,
            message,
            data: todos
        });

    } catch (error) {
        next(error);
    }
}

// const createTodo = async (req, res, next) => {

//     //check for validation errors
//     // const errors = validationResult(req);
//     // console.log(errors);
//     // if (!errors.isEmpty()) {

//     //     console.log(errors.array()[0].msg);
//     //     return res.status(400).json({
//     //         status: "error",
//     //         statusCode: 400,
//     //         // different way of error presenting
//     //         errors:errors.array()

//     //     })
//     // }
//     try {
//         const { title, description, dueDate, isActive, status } = req.body;
//         // if (dueDate) {
//         //     const currentDate = new Date();
//         //     const selectedDate = new Date(dueDate);
//         //     if (selectedDate < currentDate) {
//         //         return res.status(400).json({
//         //             status: "error",
//         //             statusCode: 400,
//         //             message: "Due date cannot be in the past"
//         //         })
//         //     }
//         // }
//         const newTodo = await todoService.createTodo(
//             title,
//             description,
//             dueDate,
//             isActive,
//             status
//         );
//         res.status(201).json({
//             status: "success",
//             statusCode: 201,
//             message: "Todo task created successfully",
//             data: newTodo
//         });

//     }
//     catch (error) {
//         next(error); // Pass the error to the error handler middleware


//     }

// }

// const createTodo = async (req, res, next) => {
//     try {
//         const { title, description, dueDate, isActive, status } = req.body;

//         // Use the validateDueDate middleware here
//         validateDueDate(req, res, async function (err) {
//             if (err) {
//                 return next(err);
//             }

//             // Continue with creating newTodo
//             const newTodo = await todoService.createTodo(
//                 title,
//                 description,
//                 dueDate,
//                 isActive,
//                 status
//             );

//             res.status(201).json({
//                 status: "success",
//                 statusCode: 201,
//                 message: "Todo task created successfully",
//                 data: newTodo
//             });
//         });
//     } catch (error) {
//         next(error); // Pass the error to the error handler middleware
//     }
// };

const createTodo = async (req, res, next) => {

    try {
        const { title, description, dueDate, isActive, status } = req.body;
        console.log("inside controller");
        // if (dueDate) {
        //     const currentDate = new Date();
        //     const selectedDate = new Date(dueDate);
        //     if (selectedDate < currentDate) {
        //         return res.status(400).json({
        //             status: "error",
        //             statusCode: 400,
        //             message: "Due date cannot be in the past"
        //         })
        //     }
        // }
        console.log(req.session.passport.user);
        const createdBy = req.session.passport.user;
        const newTodo = await todoService.createTodo(
            title,
            description,
            dueDate,
            isActive,
            status,
            createdBy
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
        // User's id
        console.log(req.session.passport.user);
        const userId = req.session.passport.user;
        console.log("delete controller called");
        console.log("userid" + userId);

        // todos task id
        const id = req.params.id;
        await todoService.deleteTodo(id, userId);
        res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "Todo task deleted successfully"
        });
    }
    catch (error) {
        console.log("inside error of delete controller" + error.name);
        console.log(error);
        if (error.name === "UnauthorizedError") {
            return res.status(401).json({
                status: "error",
                statusCode: 401,
                message: error.message
            });
        }
        next(error);
    }
}

// const getTodosCount = async (req, res, next) => {
//     try {
//         const count = await todoService.getTodosCount();
//         res.status(200).json({
//             status: "success",
//             statusCode: 200,
//             message: "Todo tasks count retrieved successfully",
//             data: count
//         });
//     } catch (error) {
//         next(error);
//     }
// }

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
    // getTodosCount,
    getFirstTenTodos,
    getFirstTenTodosDuration,
    getRecentTodos
}