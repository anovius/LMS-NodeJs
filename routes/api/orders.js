const express = require('express')
const Router = express.Router()
const auth = require('../../middlewares/auth')
const Order = require('../../models/Order')
const Book = require('../../models/Book')
const mongoose = require('mongoose')


Router.get('/:slug', (req, res) => {
    if(typeof req.params.slug === 'undefined' || req.params.slug === null){
        res.status(203).send({message: 'Please send slug of order'})
        return
    }
    Order.findOne({slug: req.params.slug})
    .populate('book')
    .populate('user')
    .exec((err, order) => {
        if(!err && order !== null){
            res.status(200).send(order)
        }
        else{
            res.status(203).send({message: 'No record found'})
        }
    })
})

Router.get('/all/orders', (req, res) => {
    Order.find()
    .populate('book')
    .populate('user')
    .exec((err, orders) => {
        if(!err && orders !== null){
            res.status(200).send(orders)
        }
        else{
            res.status(203).send({message: 'No record found'})
        }
    })
})

Router.post('/placeOrder', (req, res) =>{
    const ISBN = req.body.ISBN
    if(typeof req.body.ISBN === 'undefined' || req.body.ISBN === null){
        res.status(203).send({message: 'Please send ISBN of book'})
        return
    }
    Book.findOne({ISBN: ISBN}, (err, book) => {
        if(!err && book !== null){
            if(book.quantity > 0){
                book.quantity -= 1
                book.save()
                const newOrder = new Order({
                    user: req.user._id,
                    book: book._id 
                })
                newOrder.save().then((result) => res.status(201).send({message: 'Order Added Successfully!', order: newOrder}))
                .catch((err) => res.status(203).send({message:'Something went wrong!'}))
            }
            else{
                res.status(203).send({message:'Not enough quantity exists for this book!'})
            }
        }
        else{
            res.status(203).send({message:'Book not found'})
        }
    })
})

Router.put('/return',  auth.isToken, auth.isUser, auth.isAdmin, (req, res) => {
    const slug = req.body.slug
    Order.findOne({slug: slug})
    .populate('book')
    .exec((err, order) => {
        if(!err && order !== null){
           var today = new Date()
           var fine = 0
           var diff = Math.round((order.expiryDate-today)/(1000*60*60*24))
           if(diff < 0){
               fine = 500 * diff * -1
           }
           order.book.quantity += 1
           order.book.save()
           res.status(200).send({message: 'Book Returned Record Updated!', fineToPay: fine + ' PKR'})
        }
        else{
            res.status(203).send({message:'Order not found'})
        }
    })
})

Router.delete('/:slug', (req, res) => {
    if(typeof req.params.slug === 'undefined' || req.params.slug === null){
        res.status(203).send({message: 'Please send slug of order'})
        return
    }
    Order.findOne({slug: req.params.slug})
    .populate('book')
    .exec((err, order) => {
        if(!err && order !== null){
            order.book.quantity += 1
            order.book.save()
        }
    })
    Order.deleteOne({slug: req.params.slug}, (err) => {
        if(!err){
            res.status(200).send({message: 'Deleted Successfully!'})
        }
        else{
            res.status(203).send({message: 'No data exists'})
        }
    })
})

module.exports = Router