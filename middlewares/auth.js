const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/User')

const isToken = function (req, res, next){
    var token = req.headers.authorization.split(' ')
    if(typeof token[1] === 'undefined' || typeof token[1] === null){
        res.status(401).send({message: 'You are not logged in'})
    }
    else{
        jsonwebtoken.verify(token[1], 'shhhhh', (err, data) => {
            if(err){
                res.status(401).send({message: 'You are not logged in'})
            }
            else{
                req.email = data.user
                next()
            }
        })
    }
}

const isUser = function(req, res, next){
    User.findOne({email: req.email}, (err, user) => {
        if(err){
            res.status(401).send({message: 'You are not logged in'})
        }
        else{
            req.user = user
            next()
        }
    })   
}

const isAdmin = function(req, res, next){
    console.log(req.user)
    if(req.user.userType === 0){
        next()
    }
    else
        res.status(401).send({message: 'You are not admin'})
}

module.exports = {isToken, isUser, isAdmin}