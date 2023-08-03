const authenticateUser = (req, res, next) => {
    console.log("Inside authenticateUser middleware" + req.session.passport.user);
    if (req.session && req.session.passport.user) {
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