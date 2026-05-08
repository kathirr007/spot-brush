// Nitro plugin: attaches Express routes and Socket.io to the Nuxt 3 server
import express from 'express'
import { Server as SocketIO } from 'socket.io'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import compression from 'compression'
import { authRoutes } from '../routes/auth.js'
import s_whiteboard from '../backend/s_whiteboard.js'

export default defineNitroPlugin((nitroApp) => {
  const app = express()

  app.use(compression())
  app.use(cors())
  app.use(bodyParser.json({ limit: '50mb' }))
  app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
  app.use(cookieParser())

  app.use('/auth', authRoutes)

  // @ts-ignore
  nitroApp.router.use('/auth', (req, res, next) => app(req, res, next))
  // @ts-ignore
  nitroApp.router.use('/api', (req, res, next) => app(req, res, next))
  // @ts-ignore
  nitroApp.router.use('/uploads', (req, res, next) => app(req, res, next))

  // @ts-ignore
  nitroApp.hooks.hook('listen', (server) => {
    const io = new SocketIO(server, { cors: { origin: '*' } })
    s_whiteboard(io)
  })
})
