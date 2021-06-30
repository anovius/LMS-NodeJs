const express = require('express')
const Router = express.Router()
const auth = require('../../middlewares/auth')
const Author = require('../../models/Author')

Router.get('/', auth.isToken, auth.isUser, auth.isAdmin, (req, res) => {
    Author.find((err, data) => {
        if(!err && data !== null)
            res.status(200).send(data)
        else
            res.status(203).send({message: 'No data exists'})
    })
})

module.exports = Router