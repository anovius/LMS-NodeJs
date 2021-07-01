const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const mongoosastic = require('mongoosastic')
const slug = require('slug');

const authorSchema = mongoose.Schema({
    slug: {type: String, lowercase: true, unique: true},
    name: {type: String, required: true}
}, {timestamp: true})

authorSchema.plugin(uniqueValidator)
authorSchema.plugin(mongoosastic)

authorSchema.pre('validate', function(next){
    if(!this.slug)
      this.slugify()
    next()
})

authorSchema.methods.slugify = function(){
    this.slug = slug('au') + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36)
}

authorSchema.methods.toJSON = function(){
    return{
        slug: this.slug,
        name: this.name
    }
}

const Author = mongoose.model('Author', authorSchema)
module.exports = Author