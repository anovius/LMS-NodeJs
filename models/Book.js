const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const mongoosastic = require('mongoosastic')

const bookSchema = mongoose.Schema({
    title: {type: String, required: true},
    ISBN: {type: String, requires: true, unique: true},
    authors: [{type: mongoose.Schema.Types.ObjectId, ref: 'Author'}],
    quantity: {type: Number, default: 20}
}, {timestamp: true})

bookSchema.plugin(uniqueValidator)
bookSchema.plugin(mongoosastic)

bookSchema.methods.toJSON = function(){
    return{
        title: this.title,
        ISBN: this.ISBN,
        quantity: this.quantity,
        authors: this.authors
    }
}

const Book = mongoose.model('Book', bookSchema)
module.exports = Book