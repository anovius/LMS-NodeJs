const express = require('express')
const Router = express.Router()
const auth = require('../../middlewares/auth')
const Author = require('../../models/Author')
const Book = require('../../models/Book')

Router.get('/:slug', (req, res) => {

    if(typeof req.params.slug === 'undefined' || req.param.slug === null){
        res.status(203).send({message: 'Please send slug of author'})
        return
    }

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
    if(typeof req.body.name === 'undefined' || req.body.name === null){
        res.status(203).send({message: 'Please send name of author'})
        return
    }

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

Router.get('/all/authors/:pageNumber/:limit', async(req, res) => {
    const count = await Author.countDocuments()
    Author.find()
    .skip((+req.params.pageNumber-1) * +req.params.limit)
    .limit(+req.params.limit)
    .exec((err, data) => {
        if(!err && data !== null)
            res.status(200).send({total: count, authors: data})
        else
            res.status(203).send({message: 'No data exists'})
    })
})

Router.delete('/:slug', async (req, res) => {
    if(typeof req.params.slug === 'undefined' || req.params.slug === null){
        res.status(203).send({message: 'Please send slug of author'})
        return
    }

    const author = await Author.findOne({slug: req.params.slug})
    if(author === null) {
        res.status(404).send({message: 'Author not found!'})
        return
    }
    Book.find({authors: author._id}, (err, book) => {
        if(book.length>0){
            res.status(203).send({message: 'You can not delete this author as this appears in books!'})
            return
        }
        else{
            author.deleteOne()
            res.status(200).send({message: 'Author deleted Successfully!'})
        }
    })
})

module.exports = Router