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
    .populate('books', 'title ISBN')
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

Router.get('/all/orders/:pageNumber/:limit', async (req, res) => {
    const count = await Order.countDocuments()
    Order.find()
    .skip((+req.params.pageNumber-1) * +req.params.limit)
    .limit(+req.params.limit)
    .populate('books', 'title ISBN')
    .populate('user')
    .exec((err, orders) => {
        if(!err && orders !== null){
            res.status(200).send({total: count, Orders: orders})
        }
        else{
            res.status(203).send({message: 'No record found'})
        }
    })
})

Router.get('/cart/checkout', auth.isToken, auth.isUser, async(req, res) =>{

    var ISBN = req.user.cart;
    var books = []
    console.log(req.user)
    for(var i=0; i<ISBN.length; i++){
        const book = await Book.findOne({ISBN: ISBN[i]})
        console.log(book)
        if(book === null){
            res.status(203).send({message: ISBN[i] + ' Book not found'})
            return
        }
        if(book.quantity === 0){
            res.status(203).send({message: ISBN[i] + ' Not enough quantity'})
            return
        }
        book.quantity = book.quantity - 1;
        await book.save();
        books.push(book._id)
    }
    const newOrder = new Order({
        user: req.user._id,
        books: books
    })
    newOrder.save().then(async (result) => {
        await newOrder.populate('user')
        req.user.cart = []
        await req.user.save()
        res.status(201).send({message: 'Order Added Successfully!', order: newOrder})
    })
    .catch((err) => res.status(203).send({message:'Something went wrong!'}))
})

Router.put('/return', (req, res) => {
    const slug = req.body.slug
    var fine = 0
    Order.findOne({slug: slug})
    .populate('books')
    .exec((err, order) => {
        if(!err && order !== null){
           var today = new Date()
           var diff = Math.round((order.expiryDate-today)/(1000*60*60*24))
           if(diff < 0){
               fine = 500 * diff * -1
           }
           
           for(var i=0; i<order.books.length;i++){
                order.books[i].quantity += 1
                order.books[i].save()
           }
        }
        else{
            res.status(203).send({message:'Order not found'})
        }
    })

    deleteOrder(slug)
    res.status(200).send({message: 'Book Returned Record Updated!', fineToPay: fine + ' PKR'})
})

Router.post('/addTOCart/:book', auth.isToken, auth.isUser, (req, res) => {
    if(req.user.cart.includes(req.params.book)){
        res.status(203).send({message: 'Already in cart'})
        return
    }
    req.user.cart.push(req.params.book);
    req.user.save().then((result) => {
        res.status(201).send({message: 'Book Added to Cart!'})
    }
    ).catch((err) => res.status(203).send({message:'Something went wrong!'}))
});

Router.get('/get/cart', auth.isToken, auth.isUser, (req ,res) => {
    console.log("called mee")
    console.log(req.user.cart);
    Book.find({ISBN: {$in: req.user.cart}})
    .exec((err, books) => {
        if(!err && books !== null){
            res.status(200).send(books)
        }
        else{
            res.status(203).send({message: 'Your cart is empty'})
        }
    })
});

Router.get('/clear/cart', auth.isToken, auth.isUser, (req, res) => {
    req.user.cart = []
    req.user.save().then((result) => {
        res.status(201).send({message: 'Cart Cleared!'})
    }).catch((err) => res.status(203).send({message:'Something went wrong!'}))
});

Router.delete('/:slug', (req, res) => {
    if(typeof req.params.slug === 'undefined' || req.params.slug === null){
        res.status(203).send({message: 'Please send slug of order'})
        return
    }
    Order.findOne({slug: req.params.slug})
    .populate('books')
    .exec((err, order) => {
        if(!err && order !== null){
            for(var i=0; i<order.books.length;i++){
                order.books[i].quantity += 1
                order.books[i].save()
           }
        }
    })

    deleteOrder(req.params.slug)
    res.status(200).send({message: 'Deleted Successfully!'})
})

function deleteOrder(slug){
    Order.deleteOne({slug:slug}, (err) => {

    })
}

module.exports = Router