const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
// const cookiepars = require('cookieparser')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

global.fetch = require('node-fetch');
require('dotenv').config();

const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

const authService = require("./middleware/auth");

const testRouter = require('./routes/test')
const authRouter = require('./routes/auth')

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)
  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(cors())

/*   app.get('/test', (req, res, next) => {
    res.json({
      'message': 'ok'
    })
  }) */

  app.use('/test', testRouter)
  app.use('/auth', authRouter)

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)

  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
