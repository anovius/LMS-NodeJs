const express = require('express')
const Router = express.Router()
const mongoose = require('mongoose')
const Book = require('../../models/Book')
const Author = require('../../models/Author')
const auth = require('../../middlewares/auth')

Router.get('/:ISBN', (req, res) => {
    if(typeof req.params.ISBN === 'undefined' || req.params.ISBN === null){
        res.status(203).send({message: 'Please send slug of author'})
        return
    }

    Book.findOne({ISBN: req.params.ISBN})
    .populate('authors', 'slug name')
    .exec((err, book) => {
        if(!err && book !== null){
            res.status(200).send(book.toJSON())
        }
        else{
            res.status(200).send({message: 'No Book found'})
        }
    })
})

Router.post('/', async (req, res) => {
    if(typeof req.body.title === 'undefined' || req.body.tile === null){
        res.status(203).send({message: 'Please send title of Book'})
        return
    }
    if(typeof req.body.ISBN === 'undefined' || req.body.ISBN === null){
        res.status(203).send({message: 'Please send ISBN of Book'})
        return
    }
    if(typeof req.body.authors === 'undefined' || req.body.authors === null){
        res.status(203).send({message: 'Please send authors of Book'})
        return
    }
    
    var authors = []
    for(var i=0; i<req.body.authors.length; i++){
        const author = await Author.findOne({slug: req.body.authors[i]}).select('_id').exec()
        authors.push(author._id)
    }

    const newBook = new Book({
        title: req.body.title,
        ISBN: req.body.ISBN,
        authors: authors 
    })

    newBook.save((err, result) => {
        if(!err){
            res.status(201).send({message: 'Book added Successfully', book: newBook.toJSON()})
        }
        else{
            res.status(203).send({message: 'ISBN is already in use'})
        }
    })
})

Router.put('/', (req, res) => {
    if(typeof req.body.ISBN !== 'undefined' && req.body.ISBN !== null){
        Book.findOne({ISBN: req.body.ISBN}, async (err, book) => {
            if(!err && book !== null){
                const title = req.body.title
                const ISBN = req.body.ISBN
                const authors = req.body.authors
                const quantity = req.body.quantity

                if(typeof title !== 'undefined' && title !== null) book.title = title
                if(typeof ISBN !== 'undefined' && ISBN !== null) book.ISBN = ISBN
                if(typeof authors !== 'undefined' && authors !== null){
                    var authorsID = []
                    for(var i=0; i<req.body.authors.length; i++){
                        const author = await Author.findOne({slug: req.body.authors[i]}).select('_id').exec()
                        authorsID.push(author._id)
                    }
                    book.authors = authorsID
                }
                if(typeof quantity !== 'undefined' && quantity !== null) book.quantity = quantity

                book.save((err, data) => {
                    if(!err) 
                        res.status(200).send({message: 'Book updated!', book: book})
                    else
                        res.status(203).send({message: 'ISBN already in use'})
                })

            }
            else{
                res.status(203).send({message: 'Book not found!'})
            }
        })
    }
    else{
        res.status(403).send({message: 'Please enter ISBN of the book'})
    }
})

Router.delete('/:ISBN', (req, res) => {
    if(typeof req.params.slug === 'undefined' || req.param.slug === null){
        res.status(203).send({message: 'Please send slug of author'})
        return
    }
    Book.deleteOne({ISBN: req.params.ISBN}, (err) =>{
        if(!err)
            res.status(200).send({message: 'Book Deleted Successfully'})
    })
})

Router.get('/all/books/:pageNumber/:limit', async (req, res) => {
    const count = await Book.countDocuments()
    Book.find()
    .skip((+req.params.pageNumber-1) * +req.params.limit)
    .limit(+req.params.limit)
    .populate('authors', 'slug name')
    .exec((err, books) => {
        res.status(200).send({total: count, books: books})
    })
})

Router.post('/search', (req, res) => {
    const keyword = req.body.keyword
    
    if(typeof keyword === 'undefined' || keyword === null){
        res.status(203).send({message: 'Please provide some keyword to search!'})
        return
    }

    Book.find({$or: [ { title: new RegExp(keyword, 'i') }, { ISBN: new RegExp(keyword, 'i') } ]})
    .populate('authors')
    .exec((err, books) => {
        res.status(200).send(books)
    })
})


module.exports = Router