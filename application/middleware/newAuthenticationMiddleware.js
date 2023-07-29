const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/users');
passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
        const user = await User.findOne({ email });
        console.log("middlwawre:" + user);
        if (!user) {
            console.log("error in user");
            return done(null, false, { message: 'Incorrect email or password' });
        }

        const userResult = await bcrypt.compare(password, user.password);
        console.log(userResult);
        if (!userResult) {
            console.log("userResult" + userResult);
            return done(null, false, { message: 'Incorrect email or password' });

        }
        console.log("beside if" + user);

        return done(null, user);
    } catch (error) {
        console.log(error);
        return done(error);
    }
}));


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});


// exports.localAuthMiddleware = passport.authenticate('local', { session: true });
const localAuthMiddleware = (req, res, next) => {
    passport.authenticate('local', { session: true }, (err, user, info) => {
        if (err) {
            console.log(err);
            return next(err);
        }
        if (!user) {
            console.log("Inside user error");
            return res.status(401).json({
                status: "error",
                statusCode: 401,
                message: info.message
            });
        }
        req.user = user;
        next();
    })(req, res, next);
}

module.exports = localAuthMiddleware;