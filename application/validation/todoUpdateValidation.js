// const { body } = require('express-validator');
// const Todo = require('../models/todo'); // Assuming the mongoose model for todos is named "Todo"
// const { parseISO } = require('date-fns');
// const moment = require('moment');


// // Validation rules for creating a new todo
// exports.updateTodoValidation = [
//     body('title').optional().notEmpty().withMessage('Title cannot be an empty string').custom(async (value) => {
//         // Check if a todo with the same title already exists
//         const existingTodo = await Todo.findOne({ title: value });
//         if (existingTodo) {
//             throw new Error('A todo with this title already exists');
//         }
//         return true;
//     }),

//     body('dueDate').trim().isDate().withMessage('Must be a valid date').custom((value) => {
//         const formats = ['YYYY/MM/DD', 'M/D/YYYY', 'YYYY-MM-DD'];
//         const selectedDate = parseISO(value);
//         const currentDate = new Date();
//         const correctedCurrentDate = moment(currentDate).format('YYYY-MM-DD');
//         if (selectedDate < correctedCurrentDate) {
//             throw new Error('Due date cannot be in the past');
//         }
//         return true;
//     }),
// ];

// const { body } = require('express-validator');
// const { parseISO, format } = require('date-fns');
// const Todo = require('../models/todo');

// exports.updateTodoValidation = [
//     body('title')
//         .optional()
//         .notEmpty().withMessage('Title cannot be an empty string')
//         .custom(async (value) => {
//             // Check if a todo with the same title already exists
//             const existingTodo = await Todo.findOne({ title: value });
//             if (existingTodo) {
//                 throw new Error('A todo with this title already exists');
//             }
//             return true;
//         }),
//     body('dueDate').trim().isDate().withMessage('Must be a valid date').custom((value) => {
//         const formats = ['YYYY/MM/DD', 'M/D/YYYY', 'YYYY-MM-DD'];
//         const selectedDate = parseISO(value);
//         const currentDate = new Date();
//         const correctedCurrentDate = moment(currentDate).format('YYYY-MM-DD');
//         console.log("correctedCurrentDate" + correctedCurrentDate);
//         console.log(selectedDate);
//         console.log(currentDate);

//         // error in timezone date
//         // if (selectedDate < currentDate) {
//         //     throw new Error('Due date cannot be in the past');
//         // }
//         if (selectedDate < correctedCurrentDate) {
//             throw new Error('Due date cannot be in the past');
//         }
//         return true;
//     }),
// ];
// exports.updateTodoValidation = [
//     // ... other validations ...
//     body('title')
//         .optional()
//         .notEmpty().withMessage('Title cannot be an empty string')
//         .custom(async (value) => {
//             // Check if a todo with the same title already exists
//             const existingTodo = await Todo.findOne({ title: value });
//             if (existingTodo) {
//                 throw new Error('A todo with this title already exists');
//             }
//             return true;
//         }),

//     body('dueDate').trim().isDate().withMessage('Must be a valid date').custom((value) => {
//         const selectedDate = parseISO(value);
//         const currentDate = new Date();
//         const currentDateFormat = format(currentDate, 'yyyy-MM-dd');

//         console.log("currentDateFormat: " + currentDateFormat);
//         console.log("selectedDate: " + selectedDate);

//         if (selectedDate < currentDateFormat) {
//             throw new Error('Due date cannot be in the past');
//         }
//         return true;
//     }),
// ];


const { body } = require('express-validator');
const { format } = require('date-fns');
const moment = require('moment');
const Todo = require('../models/todo');

exports.updateTodoValidation = [
    // ... other validations ...
    body('title')
        .optional()
        .notEmpty().withMessage('Title cannot be an empty string')
        .custom(async (value) => {
            // Check if a todo with the same title already exists
            const existingTodo = await Todo.findOne({ title: value });
            if (existingTodo) {
                throw new Error('A todo with this title already exists');
            }
            return true;
        }),


    body('dueDate').trim().isDate().withMessage('Must be a valid date').custom((value) => {
        const selectedDate = moment(value, 'YYYY/MM/DD').toDate(); // Parse input date using moment and convert to Date
        const currentDate = new Date();
        const currentDateFormat = format(currentDate, 'yyyy-MM-dd');

        console.log("currentDateFormat: " + currentDateFormat);
        console.log("selectedDate: " + selectedDate);

        if (selectedDate < currentDateFormat) {
            throw new Error('Due date cannot be in the past');
        }
        return true;
    }),
];

