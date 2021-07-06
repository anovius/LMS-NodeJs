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
        for(var j=0; j<1000; j++){
            var randomBook = []

            randomBook.push(Math.floor(Math.random() * 900))
            randomBook.push(Math.floor(Math.random() * 900))
            randomBook.push(Math.floor(Math.random() * 900))

            for(var i=0; i<3; i++){
                if(books[randomBook[i]].quantity !== 0){
                    await Book.updateOne(books[randomBook[i]], {$inc : {quantity: -1}})
                }
            }
            
            var randomUser = Math.floor(Math.random() * 100)
            
            let newOrder = new Order()
            newOrder.user = users[randomUser]._id
            newOrder.books.push(books[randomBook[0]]._id)
            newOrder.books.push(books[randomBook[1]]._id)
            newOrder.books.push(books[randomBook[2]]._id)

            newOrder.save().then((result) => console.log('Order Added!'))
            .catch((err) => console.log(err))
        }
    })
    .catch((err) => console.log(err))