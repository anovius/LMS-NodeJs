const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const mongoosastic = require('mongoosastic')
const slug = require('slug')

const bookRequestSchema = mongoose.Schema({
    slug: {type: String, lowercase: true, unique: true},
    title: {type: String, required: true},
}, {timestamp: true})

bookRequestSchema.plugin(uniqueValidator, {message: 'Error, expected {PATH} to be unique.'})
bookRequestSchema.plugin(mongoosastic)

bookRequestSchema.pre('validate', function(next){
    if(!this.slug)
      this.slugify()
    next()
})

bookRequestSchema.methods.slugify = function(){
    this.slug = slug('au') + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36)
}

bookRequestSchema.methods.toJSON = function(){
    return{
        slug: this.slug,
        title: this.title
    }
}

const BookRequest = mongoose.model('BookRequest', bookRequestSchema)
module.exports = BookRequest