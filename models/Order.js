const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const mexp = require('mongoose-elasticsearch-xp').v2

const orderSchema = mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    bookId: {type: mongoose.Schema.Types.ObjectId, ref: 'Book'},
    orderDate: {type: Date, default: Date.now}
})

orderSchema.plugin(uniqueValidator)
orderSchema.plugin(mexp)

const Order = mongoose.model('Order', orderSchema)
module.exports = Order