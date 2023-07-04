const { validationResult } = require('express-validator');
const { createTodoValidation } = require('../validation/todoValidation');

const validateTodo = [
  createTodoValidation, // Apply createTodoValidation rules
  (req, res, next) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array()[0].msg);
      return res.status(422).json({
        status: "error",
        statusCode: 422,
        message: "Validation errors",
        // errors: errors.array(),
          errors: [
              {
                msg: errors.array()[0].msg,
            }
        ]
      });
    }
    next();
  },
];

module.exports = {
  validateTodo
};
