const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

const localStrategy = new LocalStrategy({usernameField: 'email', passwordField: 'password'}, (email, password, done) => {
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
)

module.exports = localStrategy