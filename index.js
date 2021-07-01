const express = require('express');
const app = express()
const mongoose = require('mongoose')
const env_vars = require('./config')
const cors = require('cors');

mongoose.connect(env_vars.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
}).then((result) => app.listen(env_vars.port || process.env.PORT, () => {
    console.log('Listening');
})).catch((err) => console.log(err))

require('./models/Author')
require('./models/Book')
require('./models/Order')
require('./models/User')

app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use('/', require('./routes'))

app.use((req, res, next) => {
    res.status(404).send('Not Found')
})
