const PORT = 8080
const express = require('express')
//const mock = require('./config/mock')
const app = express()
const cors = require('cors')
const serverRouter = require('./routes')
const session = require('express-session')
//const MongoStore = require('connect-mongo')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const db_connection = require('./config/db')
const bcrypt = require('bcrypt')
const UserModel = require('./schema/userSchema')
const jwt = require('jsonwebtoken')

//app.use(cors("*"))
let whitelist = ['http://localhost:3000']
let corsConfig = {
    origin: function(origin, callback) {
        if (whitelist.indexOf(origin) !== -1){
            callback(null, true)
        }else{
            callback(new Error('Not allowed'))
        }
    },
    credentials: true
}
app.use(cors(corsConfig))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(session({
   /* store: MongoStore.create({
        mongoUrl: 'mongodb+srv://coderhouse:coderejercicio@cluster0.fr8bi.mongodb.net/sessions-coder',
        mongoOptions: advancedOptions
    }),*/
    secret:'123456',
    resave: false,
    saveUninitialized: false,
    cookie: {
        //maxAge: 10000 //10 segundos
        maxAge: 600000 // 10 minutos
    }
}))
app.use(passport.initialize())
app.use(passport.session())

db_connection()


function createHash(pswd){
    //console.log(pswd)
    return bcrypt.hash(pswd, 10, null)
 }
passport.use('signup', new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'username',
    passwordField: 'pswd'
}, async (req, username, pswd, done)=>{
    try {
        const userExists = await UserModel.findOne({username: `${username}`})
        if(userExists){
            console.log('User already exists')
            return done(null, false)
        }
        let user = req.body
        user.pswd = await createHash(pswd)
        UserModel.create(user)
    }catch(error){
        console.log(error)
    }
}))


function isValidPswd(user, pswd){
    //console.log(user.pswd, pswd)
    return bcrypt.compare(pswd, user.pswd)
}
passport.use('login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'pswd'
}, async (username, pswd, done) => {
    const user = await UserModel.findOne({username: `${username}`})
    if(!user){
        console.log('user not found', user)
        return done(null, false)
    }else{
        const match = await isValidPswd(user,pswd)
        if(!match){
            console.log('Invalid pswd', user + pswd)
            return done(null, false)
        }else{
            /*let id = user._id
            const token = jwt.sign({id}, 'userSecret', {
                expiresIn: 300,
            })
            res.json({auth: true, token: token, user:user})*/
            return done(null, user)
        }
    }
}))


passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser(function(id, done){
    UserModel.findById(id, function(err, user){
        done(err, user);
    });
});

serverRouter(app)

app.get('/', (req, res) => {
    res.send('entra en get')
})


app.listen(PORT, ()=> {
    console.log(`Estas conectado a http://localhost:${PORT}`)
})



