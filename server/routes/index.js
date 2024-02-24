import express from 'express'
const app = express()

import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import override from 'method-override'


app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

import { testRoutes } from './test.js';
import { authRoutes } from './auth.js';

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

export default {
  path: '/',
  handler: app
}


