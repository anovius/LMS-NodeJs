const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use(new LocalStrategy((email, password, done) => {
        User.findOne({email: email}, (err, user) => {
            if(err) return done(err)
            if(!user){
                return done(null, false, {message: 'Incorrect Email Address'})
            }
            if(!user.comparePassword(password)){
                return done(null, false, {message: 'Incorrect Password'})
            }
            return done(null, user)
        })
    }
))

module.exports = passport