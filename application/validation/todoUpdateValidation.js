const { body } = require('express-validator');

// Validation rules for creating a new todo
exports.updateTodoValidation = [
    body('title').optional().notEmpty().withMessage('Title cannot be an empty string'),
];