const passport = require('passport');
const { Strategy: HeaderStrategy } = require('passport-http-header-strategy');

// Load environment variables
require('dotnev').config();

// configure passport to use the HeaderStrategy
passport.use(
    new HeaderStrategy((headerValue, done) => {
        if (headerValue === process.env.AUTH_STRING) {
            return done(null, true); // AUTHENTICATION SUCCESS
        }
        else {
            return done(null, false);
        }
    })
);

exports.authenticate = (req, res, next) => {
    passport.authenticate('header', {
        session: false
    })(req, res, next);
};