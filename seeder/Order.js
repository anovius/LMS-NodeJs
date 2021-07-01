const faker = require('faker')
const mongoose = require('mongoose')
const Book = require('../models/Book')
const Order = require('../models/Order')
const User = require('../models/User')

const dbLink = 'mongodb://localhost/LMS'
mongoose.connect(dbLink, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
})
    .then( async (result) => {
        const books = await Book.find().select('_id quantity').exec()
        const users = await User.find().select('_id').exec()
        for(var i=0; i<1000; i++){
            var randomBook = Math.floor(Math.random() * 900)
            var randomUser = Math.floor(Math.random() * 100)
            if(books[randomBook].quantity !== 0){
                Book.updateOne(books[randomBook], {$inc : {quantity: -1}})
                const newOrder = new Order({
                    userId: users[randomUser]._id,
                    bookId: books[randomBook]._id 
                })
                newOrder.save().then((result) => console.log('Order Added!'))
                .catch((err) => console.log(err))
            }
            else{
                console.log('Not enough quantity')
            }
        }
    })
    .catch((err) => console.log(err))