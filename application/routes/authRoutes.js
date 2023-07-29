const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const passport = require('passport');
const { isAuthenticated } = require('../middleware/sessionAuthenticationMiddleware');
const localAuthMiddleware = require('../middleware/newAuthenticationMiddleware');
// const { localAuthMiddleware } = require('../middleware/newAuthenticationMiddleware');

router.post('/signup', authController.signup);
// router.post('/login', localAuthMiddleware, authController.login);
router.post('/login', localAuthMiddleware, authController.login);


router.get('/todo', isAuthenticated, (req, res) => {
    // User is authenticated, return the TODO list or any other protected data
    res.json({
        todos: ['Task 1', 'Task 2', 'Task 3'],
        userEmail: req.user.email
    });
});
router.get('/logout', authController.logout);



module.exports = router;
