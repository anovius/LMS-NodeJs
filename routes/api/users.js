const express = require('express');
const Router = express.Router()
const passport = require('passport');

Router.post('/login', (req, res, next) => {
    console.log('ok mn agya')
    passport.authenticate('local', { session: false}), (err, user, info) => {
        if(err) return next(err)
        if(user){
            res.send('Logged In Successfully!')
        }
        else{
            res.send('Invalid info!')
        }
    }
})

module.exports = Router