const express = require('express');
const router = express.Router();
const { validateTodo } = require('../middleware/validationMiddleware');
const todoController = require('../controllers/todoController');
const analyticsController = require('../controllers/analyticsController');
const { authenticate } = require('../middleware/authenticationMiddleware');
const { createTodoValidation } = require('../validation/todoValidation');
const { updateTodoValidation } = require('../validation/todoUpdateValidation');
const authenticateUser = require("../middleware/authenticateUser");

// GET /todos
// router.get('/', authenticate, todoController.getAllTodos);
router.get('/', authenticateUser, todoController.getAllTodos);
// router.get('/', todoController.getAllTodos);

//GET /todosCount
// router.get('/todosCount', authenticate, todoController.getTodosCount);
router.get('/todosCount', authenticate, analyticsController.getTodosCount);

router.get('/firstTenTodos', authenticate, todoController.getFirstTenTodos);

router.get('/firstTenTodosDuration', authenticate, todoController.getFirstTenTodosDuration);

router.get('/recentTodos', authenticate, todoController.getRecentTodos);

router.get('/todosCompletionTrend', authenticate, analyticsController.getTodosCompletionTrend);
router.get('/dueDateRangeAnalysis', authenticate, analyticsController.getDueDateRangeAnalysis);

router.get('/barData', authenticate, analyticsController.getTodoCountForDateRange);

// POST /todos
router.post('/', authenticateUser, validateTodo(createTodoValidation), todoController.createTodo);
// router.post('/', todoController.createTodo);

// PUT /todos/:id   
// validate for update
router.put('/:id', authenticate, validateTodo(updateTodoValidation), todoController.updateTodo);

// DELETE /todos/:id
// For basic authentication
// router.delete('/:id', authenticate, todoController.deleteTodo);

// For session based 
router.delete('/:id', authenticateUser, todoController.deleteTodo);

module.exports = router;