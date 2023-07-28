const userService = require('../services/userServices');
const { validationResult } = require('express-validator');
const { createTodoValidation } = require('../validation/todoValidation');
const errorHandler = require('../../errorHandler');

const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const newUser = await userService.createUser(username, email, password);
        res.status(201).json({
            status: "success",
            statusCode: 201,
            message: "User registered successfully",
            data: newUser
        });


    } catch (error) {
        next(error);
    }

}