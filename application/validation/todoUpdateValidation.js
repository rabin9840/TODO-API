const { body } = require('express-validator');
const Todo = require('../models/todo'); // Assuming the mongoose model for todos is named "Todo"



// Validation rules for creating a new todo
exports.updateTodoValidation = [
    body('title').optional().notEmpty().withMessage('Title cannot be an empty string').custom(async (value) => {
        // Check if a todo with the same title already exists
        const existingTodo = await Todo.findOne({ title: value });
        if (existingTodo) {
            throw new Error('A todo with this title already exists');
        }
        return true;
    }),
];