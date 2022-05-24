const { Router } = require('express')
const router = Router()
const passport = require('passport')
const mock = require('../config/mock')
const cors = require('cors')
const jwt = require('jsonwebtoken')

//FUNCTIONS AND MIDDLEWARES

const verifyJwt = (req, res, next) => {
    console.log('desde el verifyjwt')
    const token = req.headers["x-access-token"]
    if(!token){
        console.log('entre por false')
        res.send('we need a token')
    }else{
        console.log('entre por true')
        jwt.verify(token, 'userSecret', (err, decoded) =>{
            if(err){
                res.json({auth: false})
            }else{
                req.userId = decoded.id
            }
            next()
        })
    }

}

function isAuth (req, res, next){
    if(req.isAuthenticated()){
        let user = req.user
        console.log('user logged', user)
       /* if(user){
            if(req.session.authenticated){
                //res.json(req.session)
                //res.render('authIndex', {userData: req.session})
                console.log('welcome again')
            }else{
                if(user.pswd){
                    req.session.authenticated = true
                    req.session.user = {
                        user
                    }
                    console.log('first hello')
                    //res.render('authIndex', {userData: req.session})
                }else{
                    console.log('bad credentials 1')
                }
            }
        }else{
            console.log('bad credentials 2')
        }
        console.log('session done')*/

        //console.log(user)
        res.send(user)
        //res.redirect()
        //res.render('../../src/components/menu/menu', user)
        next()
    }else{
        console.log('salio mal xd')
        res.redirect('/api/login')
    }
}

function postAuth (req, res, next){
    let user = req.user
    console.log('user in post', user)
    res.redirect('')
    next()
}


function isNotAuth (req, res, next){
    if(!req.isAuthenticated()){
        next()
    }else{
        res.redirect('/api/login')
    }
}


//SERVER ROUTER
function serverRouter(app){
    app.use('/api', router)

    router.get('/signup', async (req, res) => {
        res.send('entraste a la ruta get')
        //res.redirect('/')
    })

    router.get('/badlogin', (req, res) => {
        res.send('fallo el login')
    })

    router.get('/login', (req, res) => {
        res.send('entraste en login')
    })
    
   /* router.get('/successlogin', isAuth, (req, res)=>{

    })*/

    /*router.get('/user', (req, res) => {
        res.send(req.user)
    })*/

    /*router.post('/successlogin', (req, res)=>{
        res.json(mock)
    })*/

    router.get('/user', (req, res) => {
        let user = req.user
        if(user){
            res.json(user)
        }else{
            res.send('Not authenticated.')
        }
    })

    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/api/successlogin',
        failureRedirect: '/api/badlogin'
    }))

    router.post('/login', passport.authenticate('login'), /*verifyJwt*/ isAuth, (req, res) => {
        //res.set('Access-Control-Allow-Origin', 'http://localhost:3000')
    })

    
}

module.exports = serverRouter