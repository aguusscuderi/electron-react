const { Router } = require('express')
const router = Router()
const passport = require('passport')
const mock = require('../config/mock')
const httpProxy = require('http-proxy')
const proxy = httpProxy.createProxyServer({})

//FUNCTIONS AND MIDDLEWARES
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

        res.send(user)
        //res.redirect()
        // proxy.web(req, res, {target: 'http://localhost:3000/api/successlogin'})
        next()
    }else{
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
    
    router.get('/successlogin', isAuth, (req, res)=>{
        //res.json(mock)
        //res.json(req.user)
    })

    /*router.get('/user', (req, res) => {
        res.send(req.user)
    })*/

    router.post('/successlogin', (req, res)=>{
        res.json(mock)
    })

    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/api/successlogin',
        failureRedirect: '/api/badlogin'
    }))

    router.post('/login', passport.authenticate('login', {
        //successRedirect: 'http://localhost:3000/api/successlogin',
        successRedirect: "/api/successlogin",
        failureRedirect: '/api/badlogin'
    }), (req, res) => {
        const user = req.body
        //console.log(user)
    })

    
}

module.exports = serverRouter