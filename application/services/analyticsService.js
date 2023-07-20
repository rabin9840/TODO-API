const Todos = require('../models/todo');
const moment = require('moment');
const mongoose = require('mongoose');

const getTodosCount = async () => {
    try {
        const todosCount = await Todos.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0, // Exclude the default _id field from the result
                    status: '$_id', // Create a new field called "status" with the value from _id
                    count: 1, // Include the count field in the result
                },
            },
        ])

        return todosCount;
    }
    catch (error) {
        const customError = new Error('An error occurred while getting the count of todo tasks');
        customError.statusCode = 500;
        throw customError;
    }
}

module.exports = {
    getTodosCount,
}