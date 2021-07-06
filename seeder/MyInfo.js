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
            newUser.userType = 1
            newUser.save().then((result) => console.log('User Added!'))
            .catch((err) => console.log(err))

            let newUser2 = User()
            newUser2.name = 'librariun'
            newUser2.email = 'lib@gmail.com'
            newUser2.setPassword('lib123')
            newUser2.userType = 2
            newUser2.save().then((result) => console.log('User Added!'))
            .catch((err) => console.log(err))

            let newUser3 = User()
            newUser3.name = 'usman'
            newUser3.email = 'usman@gmail.com'
            newUser3.setPassword('usman123')
            newUser3.userType = 3
            newUser3.save().then((result) => console.log('User Added!'))
            .catch((err) => console.log(err))
    })
    .catch((err) => console.log(err))