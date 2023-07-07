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
router.put('/:id', authenticate,validateTodo,todoController.updateTodo);

// DELETE /todos/:id
router.delete('/:id',authenticate, todoController.deleteTodo);

module.exports = router;