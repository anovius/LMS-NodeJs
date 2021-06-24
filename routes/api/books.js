const express = require('express')
const Router = express.Router()
const mongoose = require('mongoose')
const Book = require('../../models/Book')

Router.post('/addBook', (req, res) => {
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

Router.get('/search/:title', (req, res) => {
    Book.findOne({title: req.params.title}, (err, book) => {
        if(!err){
            res.status(200).send(book)
        }
    })
})

module.exports = Router