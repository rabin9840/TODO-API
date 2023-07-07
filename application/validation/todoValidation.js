const { body } = require('express-validator');

// Validation rules for creating a new todo
exports.createTodoValidation = [
    body('title').notEmpty().withMessage('Title is required'),
    // body('dueDate').isISO8601().withMessage("Invalid date format"),
    body('dueDate').trim().isDate().withMessage('Must be valid date')
];

// Validation rules for dueDate
             

// exports.createTodoValidation = [
//     body('title').notEmpty().withMessage('Title is required and cannot be empty'),
//     body('dueDate')
//       .matches(/^\d{4}-\d{2}-\d{2}$/)
//       .withMessage('Invalid Date format. Expected format: YYYY-MM-DD'),
//   ];

// Validation rules for creating a new todo
// exports.createTodoValidation = [
//   body('title').notEmpty().withMessage('Title is required and cannot be empty'),
//   body('dueDate')
//     .custom((value) => {
//       const dateRegex = /^\d{4}([-/])\d{2}\1\d{2}$/; // Matches either '-' or '/' separator
//       if (!dateRegex.test(value)) {
//         throw new Error('Invalid Date format. Expected format: YYYY-MM-DD');
//       }
//       return true;
//     })
//     .toDate()
//     .isISO8601()
//     .withMessage('Invalid Date format. Expected format: YYYY-MM-DD'),
// ];

// exports.createTodoValidation = [
//     body('title').notEmpty().withMessage('Title is required and cannot be empty'),
//     body('dueDate')
//       .custom((value) => {
//         const dateRegex = /^\d{4}([-/])(0?[1-9]|1[0-2])\1(0?[1-9]|[12]\d|3[01])$/; // Matches either '-' or '/' separator
//         if (!dateRegex.test(value)) {
//           throw new Error('Invalid Date format. Expected format: YYYY-MM-DD or YYYY/MM/DD');
//         }
//         return true;
//       })
//       .toDate()
//       .isISO8601()
//       .withMessage('Invalid Date format. Expected format: YYYY-MM-DD'),
//   ];