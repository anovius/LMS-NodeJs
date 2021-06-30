const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const mongoosastic = require('mongoosastic')

const orderSchema = mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    bookId: {type: mongoose.Schema.Types.ObjectId, ref: 'Book'},
    orderDate: {type: Date, default: Date.now},
    expiryDate: {type: Date, default: new Date(+new Date() + 5*24*60*60*1000)}
})

orderSchema.plugin(uniqueValidator)
orderSchema.plugin(mongoosastic)

const Order = mongoose.model('Order', orderSchema)
module.exports = Order