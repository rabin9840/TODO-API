const analyticsService = require('../services/analyticsService');
const errorHandler = require('../../errorHandler');

const getTodosCount = async (req, res, next) => {
    try {
        const count = await analyticsService.getTodosCount();
        res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "Todo tasks count retrieved successfully",
            data: count
        });
    } catch (error) {
        next(error);
    }
}

const getTodosCompletionTrend = async (req, res, next) => {
    try {
        const count = await analyticsService.getTodosCompletionTrend();
        res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "Todo tasks completion trend count retrieved successfully",
            data: count
        });
    } catch (error) {
        next(error);
    }
}

const getDueDateRangeAnalysis = async (req, res, next) => {
    try {
        const count = await analyticsService.getDueDateRangeAnalysis();
        res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "Todo tasks dueDate count retrieved successfully",
            data: count
        });
    } catch (error) {
        next(error);
    }
}

const getTodoCountForDateRange = async (req, res, next) => {
    try {
        const { datePreset } = req.query;
        console.log("date preset" + datePreset);
        let startDate, endDate;
        switch (datePreset) {
            case 'last7days':
                startDate = new Date().slice(0, 10);
                startDate.setDate(startDate.getDate() - 7);
                endDate = new Date().slice(0, 10);
                break;
            case 'last30days':
                console.log("This is last 30 days");
                startDate = new Date();
                startDate.setDate(startDate.getDate() - 30);
                startDate = startDate.toISOString().slice(0, 10);
                endDate = new Date();
                endDate.setDate(endDate.getDate() + 1)
                endDate = endDate.toISOString().slice(0, 10);
                break;
            case 'lastweek':
                startDate = new Date();
                startDate.setDate(startDate.getDate() - 7);
                endDate = new Date();
                break;
            case 'lastmonth':

                startDate = new Date();
                startDate.setDate(startDate.getDate() - 30);
                endDate = new Date();
                break;
            default:
                console.log("this is default");
                startDate = new Date();
                startDate = startDate.toISOString().slice(0, 10);
                endDate = new Date();
                endDate.setDate(endDate.getDate() + 1)
                endDate = endDate.toISOString().slice(0, 10);
                break;
        }


        const count = await analyticsService.getTodoCountForDateRange(startDate, endDate);
        console.log(count);
        res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "Todo tasks dueDate count retrieved successfully",
            data: count
        });
    } catch (error) {
        next(error);
    }
}



module.exports = {
    getTodosCount,
    getTodosCompletionTrend,
    getDueDateRangeAnalysis,
    getTodoCountForDateRange,
}