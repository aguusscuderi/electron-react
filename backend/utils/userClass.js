let {Schema, model} = require('mongoose')
const {userCreateSchema} = require('../schema/userSchema')
const userSchema = new Schema(userCreateSchema)
const UserModel = model('users', userSchema)

class UserCreator {
    async save(user){
        try {
            await UserModel.create(user)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = UserCreator