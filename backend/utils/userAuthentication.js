
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

//User Schema
//const UserModel = require('../config/mongoosedb')
const UserModel = require('../schema/userSchema')

class UserAuth {
    async login_authenticate(){
        console.log('entra de auth')

        function isValidPswd(user, pswd){
            return bcrypt.compareSync(pswd, user.pswd)
        }

        passport.use('login', new LocalStrategy(async (username, pswd, done) => {
            try {
                console.log('entra en catch')
                await UserModel.find({username: `${username}`}, (err, user) => {
                    if(err) 
                        return done(err)
    
                    if(!user){
                        console.log('User Not Found.')
                        return done(null, false)
                    }
    
                    if(!isValidPswd(user,pswd)){
                        console.log('Invalid pswd')
                        return done(null, false)
                    }
    
                    console.log('salio todo bien')
                    return done(null, user)
                })
            } catch (error) {
                console.log('error', error)
            }


           
        }))

        console.log('sale de auth')
    }

    /*async serialize () {
        passport.serializeUser((user, done) => {
            done(null, user.username)
        })
    }*/

}

module.exports = UserAuth