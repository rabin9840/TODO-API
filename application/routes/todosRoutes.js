const express = require('express');
const router = express.Router();
const { validateTodo } = require('../middleware/validationMiddleware');
const todoController = require('../controllers/todoController');
const { authenticate } = require('../middleware/authenticationMiddleware');

// GET /todos
router.get('/', authenticate, todoController.getAllTodos);
// router.get('/', todoController.getAllTodos);

//GET /todosCount
// router.get('/todosCount', authenticate, todoController.getTodosCount);
router.get('/todosCount', authenticate, todoController.getTodosCount);

router.get('/firstTenTodos', authenticate, todoController.getFirstTenTodos);

router.get('/firstTenTodosDuration', authenticate, todoController.getFirstTenTodosDuration);

router.get('/recentTodos', authenticate, todoController.getRecentTodos);


// POST /todos
router.post('/', validateTodo, todoController.createTodo);
// router.post('/', todoController.createTodo);

// PUT /todos/:id   
router.put('/:id', authenticate, todoController.updateTodo);

// DELETE /todos/:id
router.delete('/:id', authenticate, todoController.deleteTodo);

module.exports = router;