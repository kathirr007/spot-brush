import path from "path";

import config from "./config/config.js";
import ReadOnlyBackendService from "./services/ReadOnlyBackendService.js";
import WhiteboardInfoBackendService from "./services/WhiteboardInfoBackendService.js";
import fs from "fs-extra"
import express from "express"
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import formidable from "formidable" //form upload processing
import createDOMPurify from "dompurify" //Prevent xss
import { JSDOM } from "jsdom"
import { createClient } from "webdav";

import * as httpserver from "http"
import * as IO from "socket.io"
import * as s_whiteboard  from "./s_whiteboard.js";
import * as authService from "./auth-middleware"

function startBackendServer(port) {

  const window = new JSDOM("").window;
  const DOMPurify = createDOMPurify(window);

  const app = express();
  app.use(cookieParser());
  app.use(cors())
  app.use(express.static('./static/uploads'))
  // app.use(express.static(path.join(__dirname, "..", "assets")));
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  app.use(
    "/uploads",
    // express.static(path.join(__dirname, "..", "static", "uploads"))
    express.static('./static/uploads')
  );
  const server = httpserver.Server(app);
  server.listen(port);
  const io = IO(server, { path: "/ws-api" });
  WhiteboardInfoBackendService.start(io);

  console.log("Webserver & socketserver running on port:" + port);

  const { accessToken, enableWebdav } = config.backend;



  app.get("/api/loadwhiteboard", function (req, res) {
    // const wid = req["query"]["wid"];
    // const at = req["query"]["at"];
    const wid = req.headers['wid'];
    const at = req.headers['at'];
    // debugger
    // console.log(res);

    /* if (accessToken === "" || accessToken == at) {
      const widForData = ReadOnlyBackendService.isReadOnly(wid)
        ? ReadOnlyBackendService.getIdFromReadOnlyId(wid)
        : wid;
      const ret = s_whiteboard.loadStoredData(widForData);
      res.send(ret);
      res.end();
    } else {
      res.status(401); //Unauthorized
      res.end();
    } */
    if (!at) {
      res.status(401);
      res.end();
    } else if (at && at != "") {
      const widForData = ReadOnlyBackendService.isReadOnly(wid)
        ? ReadOnlyBackendService.getIdFromReadOnlyId(wid)
        : wid;
      const ret = s_whiteboard.loadStoredData(widForData);
      res.json({
        ret: ret,
        email: req.query.email,
        boardName: req.query.wid,
      });
      // res.send(ret);
      // res.end();
    } else {
      res.status(401); //Unauthorized
      res.end();
    }
  });

  app.post("/api/upload", function (req, res) {
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
  });

/*   app.post('/api/upload', (req, res) => {
    debugger
    const { image } = req.body;
    base64Img.img(image, './public', Date.now(), function(err, filepath) {
      const pathArr = filepath.split('/')
      const fileName = pathArr[pathArr.length - 1];

      res.status(200).json({
        success: true,
        url: `http://127.0.0.1:${port}/${fileName}`
      })
    });
  }); */

  function progressUploadFormData(formData, callback) {
    console.log("Progress new Form Data");
    const fields = escapeAllContentStrings(formData.fields);
    const wid = fields["whiteboardId"];
    if (ReadOnlyBackendService.isReadOnly(wid)) return;

    const readOnlyWid = ReadOnlyBackendService.getReadOnlyId(wid);

    const name = fields["name"] || "";
    const date = fields["date"] || +new Date();
    const filename = `${readOnlyWid}_${date}.png`;
    let webdavaccess = fields["webdavaccess"] || false;
    try {
      webdavaccess = JSON.parse(webdavaccess);
    } catch (e) {
      webdavaccess = false;
    }

    const savingDir = path.join("./public/uploads", readOnlyWid);
    fs.ensureDir(savingDir, function (err) {
      if (err) {
        console.log("Could not create upload folder!", err);
        return;
      }
      let imagedata = fields["imagedata"];
      if (imagedata && imagedata != "") {
        //Save from base64 data
        imagedata = imagedata
          .replace(/^data:image\/png;base64,/, "")
          .replace(/^data:image\/jpeg;base64,/, "");
        console.log(filename, "uploaded");
        const savingPath = path.join(savingDir, filename);
        fs.writeFile(savingPath, imagedata, "base64", function (err) {
          if (err) {
            console.log("error", err);
            callback(err);
          } else {
            if (webdavaccess) {
              //Save image to webdav
              if (enableWebdav) {
                saveImageToWebdav(savingPath, filename, webdavaccess, function (
                  err
                ) {
                  if (err) {
                    console.log("error", err);
                    callback(err);
                  } else {
                    callback();
                  }
                });
              } else {
                callback("Webdav is not enabled on the server!");
              }
            } else {
              callback();
            }
          }
        });
      } else {
        callback("no imagedata!");
        console.log("No image Data found for this upload!", name);
      }
    });
  }

  function saveImageToWebdav(imagepath, filename, webdavaccess, callback) {
    if (webdavaccess) {
      const webdavserver = webdavaccess["webdavserver"] || "";
      const webdavpath = webdavaccess["webdavpath"] || "/";
      const webdavusername = webdavaccess["webdavusername"] || "";
      const webdavpassword = webdavaccess["webdavpassword"] || "";

      const client = createClient(webdavserver, {
        username: webdavusername,
        password: webdavpassword,
      });
      client
        .getDirectoryContents(webdavpath)
        .then((items) => {
          const cloudpath = webdavpath + "" + filename;
          console.log("webdav saving to:", cloudpath);
          fs.createReadStream(imagepath).pipe(
            client.createWriteStream(cloudpath)
          );
          callback();
        })
        .catch((error) => {
          callback("403");
          console.log("Could not connect to webdav!");
        });
    } else {
      callback("Error: no access data!");
    }
  }

  io
  /* .use(function (socket, next) {
    function getCookie(name) {
      // Split cookie string and get all individual name=value pairs in an array
      // var cookieArr = socket.client.conn.request.headers.cookie.split(';')
      var refererArr = socket.conn.request.headers.referer.split("&");

      // Loop through the array elements
      for (var i = 0; i < refererArr.length; i++) {
        var cookiePair = refererArr[i].split("=");

        // Removing whitespace at the beginning of the cookie name and compare it with the given string
        if (name == cookiePair[0].trim()) {
          // Decode the cookie value and return
          return decodeURIComponent(cookiePair[1]);
        }
      }

      // Return null if not found
      return null;
    }
    let token = getCookie("accesstoken");
    let validate = authService.Validate2(token, function (err, result) {
      if (err) {
        console.log("Socket validation is not completed..");
        console.log("invalid " + err.message);
        return;
      } else {
        console.log("Socket validation is successfully completed..");
        console.log("result " + result);
        next();
      }
    });
  }) */
  .on("connection", function (socket) {
    // console.log(socket)
    let whiteboardId = null;
    socket.on("disconnect", function () {
      WhiteboardInfoBackendService.leave(socket.id, whiteboardId);
      socket
        .compress(false)
        .broadcast.to(whiteboardId)
        .emit("refreshUserBadges", null); //Removes old user Badges
    });

    socket.on("drawToWhiteboard", function (content) {
      if (!whiteboardId || ReadOnlyBackendService.isReadOnly(whiteboardId))
        return;

      content = escapeAllContentStrings(content);
      if (accessToken === "" || accessToken == content["at"]) {
        const broadcastTo = (wid) =>
          socket
            .compress(false)
            .broadcast.to(wid)
            .emit("drawToWhiteboard", content);
        // broadcast to current whiteboard
        broadcastTo(whiteboardId);
        // broadcast the same content to the associated read-only whiteboard
        const readOnlyId = ReadOnlyBackendService.getReadOnlyId(whiteboardId);
        broadcastTo(readOnlyId);
        s_whiteboard.handleEventsAndData(content); //save whiteboardchanges on the server
      } else {
        socket.emit("wrongAccessToken", true);
      }
    });

    socket.on("joinWhiteboard", function (content) {
      content = escapeAllContentStrings(content);
      if (accessToken === "" || accessToken == content["at"]) {
        // console.log("accessToken :: " + accessToken);
        whiteboardId = content["wid"];

        socket.emit("whiteboardConfig", {
          common: config.frontend,
          whiteboardSpecific: {
            correspondingReadOnlyWid: ReadOnlyBackendService.getReadOnlyId(
              whiteboardId
            ),
            isReadOnly: ReadOnlyBackendService.isReadOnly(whiteboardId),
          },
        });

        socket.join(whiteboardId); //Joins room name=wid
        const screenResolution = content["windowWidthHeight"];
        WhiteboardInfoBackendService.join(
          socket.id,
          whiteboardId,
          screenResolution
        );
      } else {
        socket.emit("wrongAccessToken", true);
      }
    });

    socket.on("updateScreenResolution", function (content) {
      content = escapeAllContentStrings(content);
      if (accessToken === "" || accessToken == content["at"]) {
        const screenResolution = content["windowWidthHeight"];
        WhiteboardInfoBackendService.setScreenResolution(
          socket.id,
          whiteboardId,
          screenResolution
        );
      }
    });
  });

  //Prevent cross site scripting (xss)
  function escapeAllContentStrings(content, cnt) {
    if (!cnt) cnt = 0;

    if (typeof content === "string") {
      return DOMPurify.sanitize(content);
    }
    for (var i in content) {
      if (typeof content[i] === "string") {
        content[i] = DOMPurify.sanitize(content[i]);
      }
      if (typeof content[i] === "object" && cnt < 10) {
        content[i] = escapeAllContentStrings(content[i], ++cnt);
      }
    }
    return content;
  }

  process.on("unhandledRejection", (error) => {
    // Will print "unhandledRejection err is not defined"
    console.log("unhandledRejection", error.message);
  });
}

export default startBackendServer;
