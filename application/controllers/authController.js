const userService = require('../services/userService');
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

const logout = (req, res) => {
    req.logout(); // Passport function to destroy the session and log the user out
    // res.redirect('/api/login');
    res.send("logged out");
};

module.exports = {
    signup,
    logout
}