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

    body('dueDate').trim().isDate().withMessage('Must be a valid date').custom((value) => {
        const formats = ['YYYY/MM/DD', 'M/D/YYYY', 'YYYY-MM-DD'];
        const selectedDate = parseISO(value);
        const currentDate = new Date();
        const correctedCurrentDate = moment(currentDate).format('YYYY-MM-DD');
        if (selectedDate < correctedCurrentDate) {
            throw new Error('Due date cannot be in the past');
        }
        return true;
    }),
];