const express = require('express');
const Router = express.Router()

Router.use('/api', require('./api'))

module.exports = Router