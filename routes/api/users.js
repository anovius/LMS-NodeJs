const express = require('express')
const Router = express.Router()
const passport = require('passport')
const localStrategy = require('../../config/passport')

passport.use(localStrategy)
Router.use(passport.initialize())

Router.post('/login', passport.authenticate('local', {session:false}), (req, res) => {
    req.user.generateToken()
    console.log(req.user.token)
    res.send("ok")
})

module.exports = Router