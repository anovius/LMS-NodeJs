const express = require('express');
const Router = express.Router()

Router.use('/users', require('./users'))
Router.use('/books', require('./books'))

module.exports = Router