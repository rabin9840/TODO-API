const passport = require('passport');
const LocalStorage = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/users');

passport.use(new LocalStorage({ emailField: 'email' }, async (email, password, done) => {
    try {
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) { return done(null, false, { message: 'Incorrect email or password' }); }
        const userResult = await bcrypt.compare(password, user.password);
        console.log(userResult);
        console.log(userResult);
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