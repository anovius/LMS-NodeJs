const express = require('express')
const Router = express.Router()
const mongoose = require('mongoose')
const Book = require('../../models/Book')
const auth = require('../../middlewares/auth')

Router.get('/', auth.isToken, auth.isUser, (req, res) => {
    Book.find()
    .populate('authors', 'name')
    .exec((err, books) => {
        if(!err && books !== null){
            res.status(200).send(books)
        }
        else{
            res.status(200).send({message: 'No record found'})
        }
    })
})

Router.post('/addBook', auth.isToken, auth.isUser, auth.isAdmin, (req, res) => {
    var authors = []

    for(var i=0; i<req.body.authors.length; i++)
        authors.push(mongoose.Types.ObjectId(req.body.authors[i]))

    const newBook = new Book({
        title: req.body.title,
        ISBN: req.body.ISBN,
        authors: authors 
    })
    newBook.save((err, result) => {
        if(!err){
            res.status(201).send({message: 'Book added Successfully'})
        }
        else{
            res.status(203).send({message: 'ISBN is already in use'})
        }
    })
})

Router.get('/search/:title', auth.isToken, auth.isUser, (req, res) => {
    Book.findOne({title: new RegExp(req.params.title, 'i')})
    .populate('authors', 'name')
    .exec((err, book) => {
        if(!err && book !== null){
            res.status(200).send(book)
        }
        else{
            res.status(200).send({message: 'No record found'})
        }
    })
})

Router.put('/update', auth.isToken, auth.isUser, auth.isAdmin, (req, res) => {
    if(typeof req.body.id !== 'undefined' && req.body.id !== null){
        Book.findById(mongoose.Types.ObjectId(req.body.id), (err, book) => {
            if(!err && book !== null){
                const title = req.body.title
                const ISBN = req.body.ISBN
                const authors = req.body.authors
                const isAvailable = req.body.isAvailable

                if(typeof title !== 'undefined' && title !== null) book.title = title
                if(typeof ISBN !== 'undefined' && ISBN !== null) book.ISBN = ISBN
                if(typeof authors !== 'undefined' && authors !== null) book.authors = authors
                if(typeof isAvailable !== 'undefined' && isAvailable !== null) book.isAvailable = isAvailable

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
        res.status(403).send({message: 'Please enter some id of the book'})
    }
})


module.exports = Router