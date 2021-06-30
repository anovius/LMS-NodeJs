const faker = require('faker')
const mongoose = require('mongoose')
const User = require('../models/User')

const dbLink = 'mongodb://localhost/LMS'
mongoose.connect(dbLink, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
})
    .then((result) => {
            let newUser = User()
            newUser.name = 'admin'
            newUser.email = 'admin@gmail.com'
            newUser.setPassword('admin123')
            newUser.userType = 0
            newUser.save().then((result) => console.log('User Added!'))
            .catch((err) => console.log(err))

            let newUser2 = User()
            newUser2.name = 'usman'
            newUser2.email = 'usman@gmail.com'
            newUser2.setPassword('usman123')
            newUser2.userType = 1
            newUser2.save().then((result) => console.log('User Added!'))
            .catch((err) => console.log(err))
    })
    .catch((err) => console.log(err))