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

module.exports = {
    getTodosCount,
}