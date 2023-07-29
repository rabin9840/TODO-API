const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
require('dotenv').config();

const userId = process.env.USER_ID;

passport.use(
    new BasicStrategy((username, password, done) => {
        console.log(username);
        if (username === userId) {
            return done(null, true);
        }
        else {
            return done(null, false);
        }
    })
);

exports.authenticate = passport.authenticate('basic', { session: false });