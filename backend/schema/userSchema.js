let Joi = require('joi')
let { Schema, model } = require('mongoose')
let mongoose = require('mongoose')
//const bcrypt = require('bcrypt')

const username = Joi.string().min(3).required()
const pswd = Joi.number().required()
const email = Joi.string()

const userCreateSchema = {
   username,
   email,
   pswd
}

const userSchema = new Schema(userCreateSchema)
const UserModel = model('users', userSchema)

module.exports = mongoose.model.userSchema || UserModel



