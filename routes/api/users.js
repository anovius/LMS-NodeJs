const express = require('express')
const Router = express.Router()
const passport = require('passport')
const localStrategy = require('../../config/passport')

passport.use(localStrategy)
Router.use(passport.initialize())

Router.post('/login', passport.authenticate('local', {session:false}), (req, res) => {
    res.send("Logged In")
})

module.exports = Router