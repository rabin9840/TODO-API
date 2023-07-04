const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./application/config/db');
const todoRouter = require('./application/routes/todosRoutes');
const { validateTodo} = require('./application/middleware/validationMiddleware');

dotenv.config();

const app = express();

//Connect to MongoDB
connectDB();

//Middleware
app.use(express.json());

app.use(validateTodo);


//  Import routes
app.use('/todos', todoRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
}
);
