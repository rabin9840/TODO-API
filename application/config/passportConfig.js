const passport = require('passport');
const LocalStorage = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/users');

passport.use(new LocalStorage({ emailField: 'email' }, async (email, password, done) => {
    try {
        const user = await User.findOne({ email });
        if (!user) { return done(null, false, { message: 'Incorrect email or password' }); }
        const userResult = bcrypt.compare(password, user.password);
        if (!userResult) return done(null, false, { message: 'Incorrect email or password' });
        return done(null, user);

    } catch (error) {
        return done(error);

    }
}))

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
})