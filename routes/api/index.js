const express = require('express');
const Router = express.Router()

Router.use('/users', require('./users'))
Router.use('/books', require('./books'))
Router.use('/authors', require('./authors'))
Router.use('/orders', require('./orders'))

module.exports = Router