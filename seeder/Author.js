const faker = require('faker')
const mongoose = require('mongoose')
const Author = require('../models/Author')

const dbLink = 'mongodb://localhost/LMS'
// TODO WTF mongoose  is doing here where is your index file of seeder folder
// 1.  create an index file export only variables from here 
// 2. connect mongoose one time and drop the db automatically
// 3. create some functions like seed Author.
// 4. then create a series of seeder function there
// 5. mongoose connection should be only once overall the script


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