const { Router } = require('express')
const router = Router()
const UserCreator = require('../utils/userClass')
const newUser = new UserCreator()

function serverRouter(app){
    app.use('/', router)

    router.post('/api', async (req, res) => {
        let user = req.body
        console.log(user)
        await newUser.save(user)
        //res.redirect('/')
    })
}

module.exports = serverRouter