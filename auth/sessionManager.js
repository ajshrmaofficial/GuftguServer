require('dotenv').config()
const session = require('express-session')
const redisStore = require('connect-redis').default
const redis = require('redis')

const redisClient = redis.createClient()

const sessionMiddleware = session({
    store: new redisStore({client: redisClient}),
    secret: process.env.COOKIE_SECRET,
    credentials: true,
    name: 'sid',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production' ? true : false,
        httpOnly: true,
        maxAge: 1000*60*60*24*7,
    }
})

module.exports = {redisClient, sessionMiddleware}