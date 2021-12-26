const PORT = 8080
const express = require('express')
//const mock = require('./config/mock')
const app = express()
const cors = require('cors')
const serverRouter = require('./routes')
const db_connection = require('./config/db')

/*let {Schema, model} = require('mongoose')
const {userCreateSchema} = require('./schema/userSchema')
const userSchema = new Schema(userCreateSchema)
const userModel = model('users', userSchema)*/

app.use(cors("*"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

db_connection()

/*app.post('/api/', async (req, res) => {
    let user = req.body
    console.log(user)
    await userModel.create(user)
    //res.redirect('/')
})*/

serverRouter(app)

app.listen(PORT, ()=> {
    console.log(`Estas conectado a http://localhost:${PORT}`)
})

