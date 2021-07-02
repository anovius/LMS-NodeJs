const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const mongoosastic = require('mongoosastic')
const slug = require('slug')

const orderSchema = mongoose.Schema({
    slug: {type: String, lowercase: true, unique: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    books: [{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}],
    orderDate: {type: Date, default: Date.now},
    expiryDate: {type: Date, default: new Date(+new Date() + 5*24*60*60*1000)}
})

orderSchema.plugin(uniqueValidator)
orderSchema.plugin(mongoosastic)

orderSchema.pre('validate', function(next){
    if(!this.slug)
      this.slugify()
    next()
})

orderSchema.methods.slugify = function(){
    this.slug = slug('or') + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36)
}

orderSchema.methods.toJSON = function(){
    return{
        slug: this.slug,
        user: {
            name: this.user.name,
            email: this.user.email
        },
        books: this.books,
        orderDate: this.orderDate,
        expiryDate: this.expiryDate
    }
}

const Order = mongoose.model('Order', orderSchema)
module.exports = Order