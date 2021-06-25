const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
//const mongoosastic = require('mongoosastic')
const bcrypt = require('bcrypt');
const saltRounds = 10
const jsonwebtoken = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, required: true},
    userType: {type: Number, require: true},
})

userSchema.plugin(uniqueValidator, {message: 'Error, expected {PATH} to be unique.'})
//userSchema.plugin(mongoosastic)



userSchema.methods.setPassword =  function(pass){
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(pass, salt);
    this.password = hash
}

userSchema.methods.comparePassword = function(pass){
    return bcrypt.compareSync(pass, this.password)
}

userSchema.methods.generateToken = function(){
    this.token = jsonwebtoken.sign({user: this.email}, 'shhhhh')
}

const User = mongoose.model('User', userSchema)
module.exports = User