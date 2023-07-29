const userService = require('../services/userService');
const errorHandler = require('../../errorHandler');

const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        console.log("username,email,password" + username, email, password);
        const newUser = await userService.createUser(username, email, password);
        res.status(201).json({
            status: "success",
            statusCode: 201,
            message: "User registered successfully",
            data: newUser
        });


    } catch (error) {
        res.status(400).json({
            status: 'error',
            statusCode: 400,
            message: error.message, // Use the error message from the thrown error
        });
        // next(error);
    }
}

const login = (req, res, next) => {
    try {
        res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "User logged in successfully",
            data: req.user
        });


    }
    catch (error) {
        next(error);
    }
}

const logout = (req, res) => {
    // req.session.destroy();
    req.logout((err) => {
        if (err) {
            // Handle any errors that occur during logout
            console.error('Error during logout:', err);
            res.status(500).json({ message: 'Error during logout' });
        } else {
            // Successful logout, perform any additional actions
            // For example, redirect the user to the login page or respond with a success message
            res.send('Logged out successfully');
        }
    }); // Passport function to destroy the session and log the user out

};

module.exports = {
    signup,
    login,
    logout
}