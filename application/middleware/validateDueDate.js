const dueDateValidation = (req, res, next) => {
    const { dueDate } = req.body;

    if (dueDate) {
        const currentDate = new Date();
        const selectedDate = new Date(dueDate);

        if (selectedDate < currentDate) {
            return res.status(400).json({
                status: "error",
                statusCode: 400,
                message: "Due date cannot be in the past"
            });
        }
    }

    next();
}

module.exports = dueDateValidation;