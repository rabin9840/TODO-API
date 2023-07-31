const express = require('express');
const dotenv = require('dotenv');
const errorHandler = require('./errorHandler');
const connectDB = require('./application/config/db');
const uuid = require('uuid');

const todoRouter = require('./application/routes/todosRoutes');
const authRoutes = require('./application/routes/authRoutes');
// const { validateTodo} = require('./application/middleware/validationMiddleware');
const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// cors middleware for cross origin requests
// app.use(cors(
//     {
//         origin: 'http://127.0.0.1:5173'
//     }
// ));



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
// const sessionSecret = uuid.v4();
// console.log(sessionSecret);
app.use(session({
    secret: 'this is my secret key', // Replace with a strong secret for session encryption
    // secret: sessionSecret, // Replace with a strong secret for session encryption
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        mongoUrl: process.env.MONGO_URI,
        autoRemove: 'interval',
        autoRemoveInterval: 10
    }),
    // cookie: {
    //     maxAge: 2 * 24 * 60 * 60 * 1000, // Set the session to expire in 30 days (adjust as needed)
    //     sameSite: 'none',
    //     secure: true,



    // },
}));
// app.use(cors({
//     origin: 'http://127.0.0.1:5173',
//     credentials: true,
// }));

app.use('*', cors({
    origin: true,
    credentials: true,
}))


// app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

//  Import routes
app.use('/todos', todoRouter);
app.use('/api', authRoutes);


app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
}
);
