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

const getTodosCompletionTrend = async () => {
    try {
        const completedTodos = await Todos.aggregate([
            {
                $match: { status: 'completed' },
            },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$updatedAt' } },
                    count: { $sum: 1 },
                }
            },
            {
                $sort: { _id: -1 }, // Sort by date in ascending order
            },
            {
                $project:
                {
                    _id: 0,
                    CompletedDate: '$_id',
                    count: '$count'
                },

            },
        ]);
        console.log(completedTodos);
        return completedTodos;
    }
    catch (error) {
        const customError = new Error('An error occurred while getting the completion trend');
        customError.statusCode = 500;
        throw customError;

    }
}

const getDueDateRangeAnalysis = async () => {
    try {
        const today = new Date(); // Current date
        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7); // Adding 7 days to get the date for next week
        console.log(today);
        console.log(nextWeek);

        const dueDateRangeAnalysis = await Todos.aggregate([
            {
                $match: {
                    dueDate: { $gte: today, $lt: nextWeek },
                },
            },
            {
                $group: {
                    _id: {
                        $switch: {
                            branches: [
                                {
                                    case: { $lt: ['$dueDate', today] },
                                    then: 'Past Due',
                                },
                                {
                                    case: { $gte: ['$dueDate', today], $lt: ['$dueDate', nextWeek] },
                                    then: 'Due This Week',
                                },
                                {
                                    case: { $gte: ['$dueDate', nextWeek] },
                                    then: 'Due Next Week',
                                },
                            ],
                            default: 'Other',
                        },
                    },
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    dueDateRange: '$_id',
                    count: 1,
                },
            },
            {
                $sort: {
                    count: -1,
                },
            },
        ]);
        console.log(dueDateRangeAnalysis);

        return dueDateRangeAnalysis;
    } catch (error) {
        console.log(error);
        const customError = new Error('An error occurred while performing Due Date Range Analysis');
        customError.statusCode = 500;
        throw customError;
    }
};

const getTodoCountForDateRange = async (startDate, endDate) => {
    // const startDateString = '2023-07-20';
    // const endDateString = '2023-07-21';
    console.log(startDate);
    console.log(endDate);
    console.log(typeof (startDate));
    // Parse the date strings using Date.parse
    // const startDate = new Date(Date.parse(startDateString));
    // const endDate = new Date(Date.parse(endDateString));

    const mongoStartDate = new Date(Date.parse(startDate));
    const mongoEndDate = new Date(Date.parse(endDate));

    console.log('gte' + mongoStartDate);
    console.log('lt' + mongoEndDate);

    // Convert startDate and endDate to MongoDB Date objects
    try {

        // const dateRangeTodoCount = await Todos.aggregate([
        //     {
        //         $match: {
        //             createdAt: { $gte: mongoStartDate, $lt: mongoEndDate },
        //         },

        //     },
        //     {
        //         $group: {
        //             _id: '$status',
        //             count: { $sum: 1 },
        //         },
        //     },
        //     {
        //         $project: {
        //             _id: 0,
        //             status: '$_id',
        //             count: 1,
        //         },
        //     },

        // ])

        const dateRangeTodoCount = await Todos.aggregate([
            {
                $match: {
                    createdAt: { $gte: mongoStartDate, $lt: mongoEndDate },
                },
            },
            {
                $group: {
                    _id: {
                        date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                        status: "$status",
                    },
                    count: { $sum: 1 },
                },
            },
            {
                $group: {
                    _id: "$_id.date",
                    statusCounts: {
                        $push: {
                            status: "$_id.status",
                            count: "$count",
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    date: "$_id",
                    statusCounts: 1,
                },
            },
        ]);

        console.log(dateRangeTodoCount);
        return dateRangeTodoCount;

    }
    catch (error) {
        console.log(error);
    }
}


module.exports = {
    getTodosCount,
    getTodosCompletionTrend,
    getDueDateRangeAnalysis,
    getTodoCountForDateRange,
}