const express = require('express')
const app = express()
const mongoose = require('mongoose')
const env_vars = require('./config')
const cors = require('cors')


var allowedOrigins = [
    "http://localhost:4200",
    "http://localhost:4300",
    "http://localhost:3000",
    "http://165.22.228.6"
  ];
  app.use(
    cors({
      credentials: true,
      origin: function (origin, callback) {
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
          var msg =
            "The CORS policy for this site does not " +
            "allow access from the specified Origin.";
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      },
    })
);

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

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use('/', require('./routes'))

app.use(function(error, req, res, next) {
    
})

app.use((req, res, next) => {
    res.status(404).send('Not Found')
})
