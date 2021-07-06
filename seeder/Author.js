const faker = require('faker')
const mongoose = require('mongoose')
const Author = require('../models/Author')

const dbLink = 'mongodb://localhost/LMS'
mongoose.connect(dbLink, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
})
    .then((result) => {
        for(var i=0; i<99; i++){
            const newAuthor = new Author({
                name: faker.name.findName()
            })
            newAuthor.save().then((result) => console.log('Added!'))
        }
    })
    .catch((err) => console.log(err))