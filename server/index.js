const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
// const cookiepars = require('cookieparser')
const base64Img = require('base64-img');
const bodyParser = require('body-parser')
const cors = require('cors')

global.fetch = require('node-fetch');
require('dotenv').config();

const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

const authService = require("./middleware/auth");

const testRouter = require('./routes/test')
const authRouter = require('./routes/auth')

const startBackendServer = require("./backend/server-backend");

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

  // app.use(cookieParser());
  app.use(cors())
  app.use(express.static('./static/uploads'))
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

/*   app.get('/test', (req, res, next) => {
    res.json({
      'message': 'ok'
    })
  }) */

  app.use('/test', testRouter)
  app.use('/auth', authRouter)

  app.post('/upload', (req, res) => {
    const { canvImage } = req.body;
    base64Img.img(canvImage, './static/uploads', Date.now(), function(err, filepath) {
      const pathArr = filepath.split('/')
      const fileName = pathArr[pathArr.length - 1];

      res.status(200).json({
        success: true,
        url: `${fileName}`
      })
    });
  });

  /* app.post("/v1/upload", function (req, res) {
    //File upload
    debugger
    var form = new formidable.IncomingForm(); //Receive form
    var formData = {
      files: {},
      fields: {},
    };

    form.on("file", function (name, file) {
      formData["files"][file.name] = file;
    });

    form.on("field", function (name, value) {
      formData["fields"][name] = value;
    });

    form.on("error", function (err) {
      console.log("File uplaod Error!");
    });

    form.on("end", function () {
      if (accessToken === "" || accessToken == formData["fields"]["at"]) {
        progressUploadFormData(formData, function (err) {
          if (err) {
            if (err == "403") {
              res.status(403);
            } else {
              res.status(500);
            }
            res.end();
          } else {
            res.send("done");
          }
        });
      } else {
        res.status(401); //Unauthorized
        res.end();
      }
      //End file upload
    });
    form.parse(req);
  }); */

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

// startBackendServer(3000)
