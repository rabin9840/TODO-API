// import todo model
const Todos = require('../models/todo');
const moment = require('moment');
const mongoose = require('mongoose');

const getAllTodos = async (startIndex, limit, status, page, dueDate, isActive, title) => {
    // let query = {};
    const query = {};

    // const todos = await Todos.find({});

    // applying only pagination
    // const todos = await Todos.find({}).skip(startIndex).limit(limit);

    // apply status filter if status is available
    // if (status) {
    //     query.status = status;
    // }
    // const todos = await Todos.find(query).skip(startIndex).limit(limit);
    // return todos;
    const options = {
        page,
        limit,
        sort: { createdAt: -1 },
    };

    if (status && status !== "All") { // Check if status is provided and not "All"
        query.status = status;
    }
    console.log("duedate" + dueDate);
    if (dueDate) query.dueDate = dueDate;
    if (title) query.title = { $regex: title, $options: "i" }
    if (isActive) query.isActive = isActive === "true";
    console.log(query);
    const todos = await Todos.paginate(query, options);
    return todos;
}

const createTodo = async (title, description, dueDate, isActive, status, createdBy) => {
    const formats = ['YYYY/MM/DD', 'M/D/YYYY', 'YYYY-MM-DD'];
    // const isoDate = moment(dueDate, 'M/D/YYYY').format('YYYY-MM-DD');
    // const momentDate = moment(isoDate).format('YYYY-MM-DD');
    // const momentDate = moment(dueDate, 'M/D/YYYY').format('YYYY-MM-DD');
    const momentDate = moment(dueDate, formats).format('YYYY-MM-DD');

    const newTodo = new Todos({
        title,
        description,
        dueDate: momentDate,
        isActive,
        status,
        createdBy
    });
    await newTodo.save();
    return newTodo;
}

const updateTodo = async (id, title, description, dueDate, isActive, status) => {
    // const isoDate = moment(dueDate, 'M/D/YYYY').format('YYYY-MM-DD');
    // const momentDate = moment(isoDate).format('YYYY-MM-DD');
    const formats = ['YYYY/MM/DD', 'M/D/YYYY', 'YYYY-MM-DD'];

    //  const momentDate = dueDate ? moment(dueDate, 'M/D/YYYY').format('YYYY-MM-DD') : undefined;
    const momentDate = dueDate ? moment(dueDate, formats).format('YYYY-MM-DD') : undefined;

    console.log(id);
    console.log(id);
    console.log(dueDate);

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid ID');
    }
    const updatedTodo = await Todos.findByIdAndUpdate(id,
        {
            title,
            description,
            dueDate: momentDate,
            isActive,
            status
        },
        { new: true }
    );

    return updatedTodo;


}

const deleteTodo = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        const error = new Error('Invalid ID');
        error.statusCode = 400; // Set the desired status code
        throw error;
    }

    try {
        await Todos.findByIdAndDelete(id);
    } catch (error) {
        const customError = new Error('An error occurred while deleting the todo task');
        customError.statusCode = 500; // Set the desired status code
        throw customError;
    }
}

// Aggregate usage to group and return the count of todos according to status
// const getTodosCount = async () => {
//     try {
//         const todosCount = await Todos.aggregate([
//             {
//                 $group: {
//                     _id: '$status',
//                     count: { $sum: 1 },
//                 },
//             },
//             {
//                 $project: {
//                     _id: 0, // Exclude the default _id field from the result
//                     status: '$_id', // Create a new field called "status" with the value from _id
//                     count: 1, // Include the count field in the result
//                 },
//             },
//         ])

//         return todosCount;
//     }
//     catch (error) {
//         const customError = new Error('An error occurred while getting the count of todo tasks');
//         customError.statusCode = 500;
//         throw customError;
//     }
// }

const getFirstTenTodos = async () => {
    try {
        const firstTenTodos = await Todos.aggregate([
            {
                $sort: { dueDate: 1 }
            },
            { $limit: 10 },
        ])

        return firstTenTodos;
    }
    catch (error) {
        const customError = new Error('An error occurred while getting the first ten todo tasks');
        customError.statusCode = 500;
        throw customError;
    }
}

const getFirstTenTodosDuration = async () => {
    try {
        const firstTenTodosDuration = await Todos.aggregate([
            {
                $sort: { dueDate: 1 }
            },
            { $limit: 10 },
            {
                $project: {
                    task: '$title',
                    duration: {
                        $subtract: ['$dueDate', new Date()]
                    }
                }
            }
        ])

        return firstTenTodosDuration;
    }
    catch (error) {
        const customError = new Error('An error occurred while getting the first ten todo tasks duration');
        customError.statusCode = 500;
        throw customError;
    }
}

const getRecentTodos = async () => {
    try {
        const recentTodos = await Todos.aggregate([
            {
                $sort: { createdAt: -1 }
            },
            { $limit: 10 },
        ])

        return recentTodos;
    }
    catch (error) {
        const customError = new Error('An error occurred while getting the recently added todos');
        customError.statusCode = 500;
        throw customError;
    }
}
module.exports = {
    getAllTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    // getTodosCount,
    getFirstTenTodos,
    getFirstTenTodosDuration,
    getRecentTodos
}