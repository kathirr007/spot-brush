const express = require('express')
const app = express()
// const cookiepars = require('cookieparser')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
// const override = require('method-override')


app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

const testRoutes = require('./test');
const authRoutes = require('./auth');

// var csrf = require('csurf');
// consider using this

// Routers registeration
app.use('/test', testRoutes);
app.use('/auth', authRoutes);

/* app.get('/test', (req, res, next) => {
  res.json({
    'message': 'ok'
  })
}) */

module.exports = {
  path: '/api/v1',
  handler: app
}


