const { body } = require('express-validator');

// Validation rules for creating a new todo
exports.createTodoValidation = [
    body('title').notEmpty().withMessage('Title is required'),
];