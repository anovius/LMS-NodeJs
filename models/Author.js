const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const mexp = require('mongoose-elasticsearch-xp').v2

const authorSchema = mongoose.Schema({
    name: {type: String, required: true}
})

authorSchema.plugin(uniqueValidator)
authorSchema.plugin(mexp)

const Author = mongoose.model('Author', authorSchema)
module.exports = Author