'use strict'

const express = require('express')
const createError = require('http-errors')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const bodyParser = require('body-parser')
const session = require('express-session')
const jwt = require('jsonwebtoken')

const app = express()

// view engine setup
app.engine('pug', require('pug').__express)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
// body-parser: middleware for parsing HTTP JSON body into a usable object
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// Create a session cookie
app.use(session({
  secret: 'oursecret',
  resave: false,
  saveUninitialized: false
  // cookie: {
  //   expires: 3600000,
  //   httpOnly: true
  // }
}))

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, authorization, Cache-Control')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})

const whiteListUrl = {
  get: [
    '/keystone/getAdminToken',
    '/user/authorization'
  ],
  post: [
    '/user/login'
  ]
}

const hasOneOf = (str, arr) => {
  return arr.some(item => item.includes(str))
}

app.all('*', (req, res, next) => {
  const method = req.method.toLowerCase()
  const path = req.path
  const token = req.cookies.token
  if (whiteListUrl[method] && hasOneOf(path, whiteListUrl[method])) next()
  else if (!token) res.status(401).send('there is no token')
  else {
    jwt.verify(token, 'openstack token', (error, decode) => {
      if (error) res.status(401).send('token error')
      else {
        req.token = decode.name
        next()
      }
    })
  }
})

// routes
const user = require('./routes/user')
const neutron = require('./routes/neutron')
const keystone = require('./routes/keystone')
const nova = require('./routes/nova')
const glance = require('./routes/glance')

app.use('/user', user)
app.use('/neutron', neutron)
app.use('/keystone', keystone)
app.use('/nova', nova)
app.use('/glance', glance)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})
