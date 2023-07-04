const express = require('express');
const router = express.Router();
const { validateTodo } = require('../middleware/validationMiddleware');
const todoController = require('../controllers/todoController');
const {authenticate} = require('../middleware/authenticationMiddleware');

// GET /todos
router.get('/', authenticate,todoController.getAllTodos);
// router.get('/', todoController.getAllTodos);

// POST /todos
router.post('/', validateTodo, todoController.createTodo);
// router.post('/', todoController.createTodo);

// PUT /todos/:id   
router.put('/:id', todoController.updateTodo);

// DELETE /todos/:id
router.delete('/:id', todoController.deleteTodo);

module.exports = router;