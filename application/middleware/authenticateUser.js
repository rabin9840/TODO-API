const authenticateUser = (req, res, next) => {
    console.log("Inside authenticateUser middleware" + req.session);
    console.log("Inside authenticateUser middleware" + req.session.userId);
    if (req.session && req.session.userId) {
        next();
    }
    else {
        res.status(401).json({
            status: "failure",
            statusCode: 401,
            message: "Unauthorized access"
        });

    }
}

module.exports = authenticateUser;