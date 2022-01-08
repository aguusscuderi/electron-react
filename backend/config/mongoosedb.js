
let { Schema, model } = require('mongoose')
const { userCreateSchema } = require('../schema/userSchema')
const userSchema = new Schema(userCreateSchema)
const UserModel = model('users', userSchema)

module.exports = UserModel