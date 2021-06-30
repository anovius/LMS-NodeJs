const express = require('express');
const Router = express.Router()
const path = require('path');

Router.get('/', (req, res) => {
    
    res.sendFile(path.join(process.cwd()+'/public/index.html'))
})

Router.use('/api', require('./api'))


module.exports = Router