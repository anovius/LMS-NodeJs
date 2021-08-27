const faker = require('faker')
const mongoose = require('mongoose')
const Book = require('../models/Book')
const Author = require('../models/Author')

const dbLink = 'mongodb://localhost/LMS'
mongoose.connect(dbLink, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
})
    .then((result) => {
        Author.find().select('_id').exec((err, data)=> {
            if(!err){
                for(var i=0; i<200; i++){
                    var auth1 = Math.floor(Math.random() * 50)
                    var auth2 = Math.floor(Math.random() * 50)
                    var auth3 = Math.floor(Math.random() * 50)
                    const newBook = new Book({
                        title: faker.name.title(),
                        cover: faker.image.image(),
                        ISBN: faker.datatype.number(),
                        authors: [data[auth1]._id, data[auth2]._id, data[auth3]._id],
                        quantity: Math.floor(Math.random() * 20) + 10
                    })
                    newBook.save().then((result) => console.log('Book Added!'))
                    .catch((err) => console.log('Can not add book'))
                }
            }
        })
    })
    .catch((err) => console.log(err))