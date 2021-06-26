const express = require('express');
const app = express()
const mongoose = require('mongoose')
const env_vars = require('./config')

mongoose.connect(env_vars.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
}).then((result) => app.listen(env_vars.port || process.env.PORT, () => {
    console.log('Listening ...');
})).catch((err) => console.log(err))

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use('/', require('./routes'))

app.use((req, res, next) => {
    res.status(404).send('Not Found')
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
})
