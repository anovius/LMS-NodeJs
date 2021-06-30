const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const mongoosastic = require('mongoosastic')

const authorSchema = mongoose.Schema({
    name: {type: String, required: true}
})

authorSchema.plugin(uniqueValidator)
authorSchema.plugin(mongoosastic)

const Author = mongoose.model('Author', authorSchema)
module.exports = Author