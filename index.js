const express = require('express');
const dotenv = require('dotenv');
const errorHandler = require('./errorHandler');
const connectDB = require('./application/config/db');
const todoRouter = require('./application/routes/todosRoutes');
// const { validateTodo} = require('./application/middleware/validationMiddleware');
const passport= require('passport');
const cors = require('cors');


dotenv.config();

const app = express();


// cors middleware for cross origin requests
app.use(cors(
    {
        origin: 'http://127.0.0.1:5173'
    }
));

//Connect to MongoDB
connectDB();

//Middleware
app.use(express.json());

// const authMiddleware = (req, res, next) => {
//     const token = req.headers['auth'];
//     if (!token || token !== process.env.AUTH_STRING) {
//         res.sendStatus(401);
//         return;
//     }
//     next();
// }

// app.use(validateTodo);

app.use(passport.initialize());

//  Import routes
app.use('/todos', todoRouter);
app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
}
);
