const express = require('express');
const app = express()

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use('/', require('./routes'))

require('./config/passport')

app.use((req, res, next) => {
    res.status(404).send('Not Found')
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
})

app.listen(3000 || process.env.PORT, () => {
    console.log('Listening on port ' + process.env.PORT);
})