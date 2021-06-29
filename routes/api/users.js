const express = require('express')
const Router = express.Router()
const passport = require('passport')
const localStrategy = require('../../config/passport')
const User = require('../../models/User')
const auth = require('../../middlewares/auth')

passport.use(localStrategy)
Router.use(passport.initialize())

Router.post('/login', passport.authenticate('local', {session:false}), (req, res) => {
    
    req.user.generateToken()
    res.status(200).send({token: req.user.token, message: 'Logged In Successfully'})
})

Router.post('/signUp', (req, res) => {
    let newUser = User()
    newUser.name = req.body.name
    newUser.email = req.body.email
    newUser.setPassword(req.body.password)
    newUser.save((err, result) => {
        if(!err){
            newUser.generateToken()
            res.status(201).send({token: newUser.token, message: 'User created Successfully'})
        }
        else{
            console.log(err)
            res.status(203).send({message: 'Email already in use'})
        }
    })
})

Router.get('/getAllUsers',  auth.isToken, auth.isUser, auth.isAdmin, (req, res) => {
    User.find((err, data) => {
        if(!err)
            res.status(200).send(data)
        else
            res.send(203).send({message: 'Something went wrong'})
    })
})

module.exports = Router