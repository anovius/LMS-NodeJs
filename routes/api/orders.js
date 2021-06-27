const express = require('express')
const Router = express.Router()
const auth = require('../../middlewares/auth')
const Order = require('../../models/Order')
const Book = require('../../models/Book')
const mongoose = require('mongoose')

Router.get('/', auth.isToken, auth.isUser, auth.isAdmin, (req, res) => {
    Order.find()
    .populate('bookId', '_id title')
    .populate('userId', '_id name')
    .exec((err, orders) => {
        if(!err && orders !== null){
            res.status(302).send(orders)
        }
        else{
            res.status(200).send({message: 'No record found'})
        }
    })
})

Router.post('/placeOrder', auth.isToken, auth.isUser, (req, res) =>{
    const ISBN = req.body.ISBN
    Book.findOne({ISBN: ISBN}, (err, book) => {
        if(!err && book !== null){
            if(book.quantity > 0){
                book.quantity -= 1
                book.save()
                const newOrder = new Order({
                    userId: req.user._id,
                    bookId: book._id 
                })
                newOrder.save().then((result) => res.status(201).send({message: 'Order Added Successfully!'}))
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
    const orderId = req.body.orderId
    Order.findById(mongoose.Types.ObjectId(orderId), (err, order) => {
        if(!err && order !== null){
            console.log(Date.now() + "\n" + order.expiryDate)
            if(Date.now < order.expiryDate)
                console.log(order.expiryDate)
        }
        else{
            res.status(203).send({message:'Order not found'})
        }
    })
})

module.exports = Router