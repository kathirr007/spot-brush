import express from 'express'
import consola from 'consola'
import { Nuxt, Builder } from 'nuxt'
const app = express()
import base64Img from 'base64-img'
import bodyParser from 'body-parser'
import cors from 'cors'
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

import config from "./backend/config/config.js"
import ReadOnlyBackendService from "./backend/services/ReadOnlyBackendService.js"
import WhiteboardInfoBackendService from "./backend/services/WhiteboardInfoBackendService.js"

import fetch from 'node-fetch'
global.fetch = fetch;
import 'dotenv/config'
// dotenv.config();

import nuxtConfig from '../nuxt.config.js'
nuxtConfig['dev'] = process.env.NODE_ENV !== 'production'

// import * as authService from "./middleware/auth"
import { testRoutes } from './routes/test.js'
import { authRoutes } from './routes/auth.js'

// import startBackendServer from "./backend/server-backend"

import { existsSync, readdirSync, rmdirSync, unlinkSync }  from 'fs'
import { join } from 'path'
import fs from "fs-extra"
import cookieParser from 'cookie-parser'
import formidable from "formidable" //form upload processing

import createDOMPurify from "dompurify" //Prevent xss
import { JSDOM } from "jsdom"
import { createClient } from "webdav"

import  compression from 'compression'
// const helmet = require('helmet');
import s_whiteboard from "./backend/s_whiteboard.js"
import * as httpserver from "http"
import IO from "socket.io"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = httpserver.createServer(app)

const isDir = path => {
  try {
    return statSync(path).isDirectory();
  } catch (error) {
    return false;
  }
};

const getFiles = (path) =>
  readdirSync(path)
    .map(name => join(path, name));

const getDirectories = path =>
  readdirSync(path)
    .map(name => join(path, name))
    .filter(isDir);

const rmDir = path => {
  getDirectories(path).map(dir => rmDir(dir));
  getFiles(path).map(file => unlinkSync(file));
  rmdirSync(path);
};

async function start () {
  const window = new JSDOM("").window;
  const DOMPurify = createDOMPurify(window);



  // Init Nuxt.js
  const nuxt = new Nuxt(nuxtConfig)
  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (nuxtConfig.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

/*   app.get('/test', (req, res, next) => {
    res.json({
      'message': 'ok'
    })
  }) */

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  server.listen(port, host)

  consola.ready({
    message: `Webserver & socketserver running on http://${host}:${port}`,
    badge: true
  })
}
start()
/* if(nuxtConfig.dev) {
  startBackendServer(3000)
} else {
  startBackendServer(process.env.PORT)
} */
