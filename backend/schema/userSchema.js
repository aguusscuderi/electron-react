let Joi = require('joi')

const username = Joi.string().min(3).required()
const pswd = Joi.number().required()
const email = Joi.string()

const userCreateSchema = {
   username,
   email,
   pswd
}

module.exports = {
    userCreateSchema
}

