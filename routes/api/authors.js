const express = require('express')
const Router = express.Router()
const auth = require('../../middlewares/auth')
const Author = require('../../models/Author')

Router.get('/:slug', (req, res) => {
    Author.findOne({slug: req.params.slug}, (err, author) => {
        if(!err && author !== null){
            res.status(200).send(author.toJSON())
        }
        else{
            res.status(203).send({message: 'No data exists'})
        }
    })
})

Router.post('/', (req, res) => {
    const newAuthor = new Author({
        name: req.body.name
    })
    newAuthor.save((err, result) =>{
        if(!err){
            res.status(200).send({message: 'Author added!', author: newAuthor.toJSON()})
        }
    })
})

Router.put('/', (req, res) => {
    Author.findOne({slug: req.body.slug}, (err, author) => {
        if(!err && author !== null){
            author.name = req.body.name
            author.save()
            res.status(200).send({message: 'Author Updated!', author: author.toJSON()})
        }
        else{
            res.status(203).send({message: 'No data exists'})
        }
    })
})

Router.get('/all/authors', (req, res) => {
    Author.find((err, data) => {
        if(!err && data !== null)
            res.status(200).send(data)
        else
            res.status(203).send({message: 'No data exists'})
    })
})

Router.delete('/:slug', (req, res) => {
    Author.deleteOne({slug: req.params.slug}, (err) => {
        if(!err){
            res.status(200).send({message: 'Deleted Successfully!'})
        }
        else{
            res.status(203).send({message: 'No data exists'})
        }
    })
})

module.exports = Router