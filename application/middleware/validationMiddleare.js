const { validationResult } = require('express-validator');

const validateTodo = (req, res, next) => {
    //check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array()[0].msg);
        return res.status(422).json({
            status: "error",
            statusCode: 422,
            message: "Validation errors",
            // different way of error presenting
            errors:errors.array()
            
        })
    }

    next();
    
};

module.exports = {
    validateTodo
}
