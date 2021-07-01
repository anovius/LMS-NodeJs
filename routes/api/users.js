const express = require('express')
const Router = express.Router()
const passport = require('passport')
const localStrategy = require('../../config/passport')
const User = require('../../models/User')
const auth = require('../../middlewares/auth')
const {body, validationResult} = require('express-validator')

passport.use(localStrategy)
Router.use(passport.initialize())

Router.get('/:email', body('email').isEmail(), (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        User.findOne({email: req.params.email}, {addresses: { $slice: [0, 1] } ,'_id': false})
        .exec((err, user) => {
            if(!err && user !== null){
                res.status(200).send(user.toJSON())
            }
            else{
                res.status(404).send({message: 'No user exits'})
            }
        })
    }
    else{
        console.log(errors)
    }
})

Router.put('/', (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    if(typeof email !== 'undefined' && email !== null){
        User.findOne({email: email})
        .exec((err, user) => {
            if(!err && user !== null){
                if(typeof name !== 'undefined' && name !== null) user.name = name
                if(typeof password !== 'undefined' && password !== null) user.setPassword(password)
                user.save((err, data) => {
                    if(!err){
                        res.status(200).send({message: 'User Updated!', user: user})
                    }
                    else{
                        console.log(err)
                        res.status(203).send({message: 'Something went wrong!'})
                    }
                })
            }
            else{
                res.status(404).send({message: 'No user exits'})
            }
        })
    }
    else{
        res.status(203).send({message: 'Email Required!'})
    }

})

Router.delete('/:email', (req, res) => {
    if(typeof req.param.email === 'undefined' || req.param.email === null){
        res.status(203).send({message: 'Email required!'})
    }
    else{
        User.deleteOne({email: req.params.email})
        .exec((err) => {
            res.status(200).send({message: 'User deleted Successfully'})
        })
    }
})

Router.post('/login', passport.authenticate('local', {session:false}), (req, res) => {
    res.status(200).send(req.user.toJSON())
})

Router.post('/signUp', (req, res) => {
    let newUser = User()

    if(typeof req.body.name === 'undefined' || req.body.name === null){
        res.status(203).send({message: 'Please send name of User'})
        return
    }
    if(typeof req.body.email === 'undefined' || req.body.email === null){
        res.status(203).send({message: 'Please send mail of User'})
        return
    }
    if(typeof req.body.password === 'undefined' || req.body.password === null){
        res.status(203).send({message: 'Please send name of User'})
        return
    }
    
    newUser.name = req.body.name
    newUser.email = req.body.email
    newUser.setPassword(req.body.password)
    newUser.save((err, result) => {
        if(!err){
            newUser.generateToken()
            res.status(201).send(newUser.toJSON())
        }
        else{
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

Router.get('/current/user', auth.isToken, auth.isUser, (req, res) => {
    res.status(200).send(req.user)
})

module.exports = Router