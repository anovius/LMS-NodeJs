const faker = require('faker')
const mongoose = require('mongoose')
const BookRequest = require('../models/BookRequest')

const dbLink = 'mongodb://localhost/LMS'
mongoose.connect(dbLink, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
})
    .then((result) => {
        for(var i=0; i<1000; i++){
            const bookRequestSchema = new BookRequest({
                title: faker.name.title()
            })
            bookRequestSchema.save()
        }
    })
    .catch((err) => console.log(err))