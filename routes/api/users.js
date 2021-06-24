const express = require('express')
const Router = express.Router()
const passport = require('../../config/passport')

Router.use(passport.initialize())
Router.use(passport.session())

Router.post('/login', (req, res) => {
    passport.authenticate('local', { session: false}), (err, user, info) => {
        console.log('here')
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