const express = require('express')
const app = express()
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);
const {format} = require('timeago.js')
require('./BD/conexion')
require('./passport/passport')

//---------------------------------------
         /* ----- middleware -----*/
//---------------------------------------

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.set('port',process.env.PORT || 3000)
app.set('views', 'src/views')
app.set('view engine', 'pug')
app.use(express.static('src/public'))
//app.use(require('./config/multer'))
app.use((req,res,next)=>{
    app.locals.format = format
    next()
})
//---------------------------------------
         /* ----- SESSION -----*/
//---------------------------------------
app.use(session({
    secret: 'hola viejo',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        url: 'mongodb://localhost:27017/red-social',
        autoReconnect: true
    })
}))
app.use(passport.initialize());
app.use(passport.session());
//---------------------------------------
         /* ----- rutas -----*/
//---------------------------------------

app.use(require('./rutas/rutas'))

//---------------------------------------
         /* ----- PUERTO DE ESCUCHA -----*/
//---------------------------------------
app.listen(app.get('port'),()=>console.log('servidor ON'))