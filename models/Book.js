const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
//const mongoosastic = require('mongoosastic')

const bookSchema = mongoose.Schema({
    title: {type: String, required: true},
    ISBN: {type: String, requires: true, unique: true},
    authors: [{type: mongoose.Schema.Types.ObjectId, ref: 'Author'}],
    quantity: {type: Number, default: 1}
})

bookSchema.plugin(uniqueValidator)
//bookSchema.plugin(mongoosastic)

const Book = mongoose.model('Book', bookSchema)
module.exports = Book