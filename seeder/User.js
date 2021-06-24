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
        for(var i=0; i<100; i++){

            let newUser = User()
            newUser.name = faker.name.findName()
            newUser.email = faker.internet.email()
            newUser.setPassword(faker.internet.password())
            newUser.userType = 1
            newUser.save().then((result) => console.log('User Added!'))
            .catch((err) => console.log(err))
        }
    })
    .catch((err) => console.log(err))