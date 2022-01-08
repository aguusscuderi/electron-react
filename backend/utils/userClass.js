
//const UserModel = require('../config/mongoosedb')
const UserModel = require('../schema/userSchema')

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