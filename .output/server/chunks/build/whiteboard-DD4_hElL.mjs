import { dom } from '@fortawesome/fontawesome-svg-core';
import Point from './Point-DM7E_x-Y.mjs';
import ReadOnlyService$1 from './ReadOnlyService-_MP-1Xik.mjs';
import InfoService$1 from './InfoService-KuEphH0M.mjs';
import ThrottlingService$1 from './ThrottlingService-Cft2UPc7.mjs';
import ConfigService$1 from './ConfigService-DEOCz6AH.mjs';
import html2canvas from 'html2canvas';
import './utils-Dg8BbwNB.mjs';
import './ConfigService.utils-DxoHktcq.mjs';

const DEG_TO_RAD = Math.PI / 180;
const _45_DEG_IN_RAD = 45 * DEG_TO_RAD;
const whiteboard = {
  canvas: null,
  ctx: null,
  drawcolor: "black",
  previousToolHtmlElem: null,
  // useful for handling read-only mode
  tool: "mouse",
  thickness: 4,
  /**
   * @type Point
   */
  prevPos: new Point(0, 0),
  /**
   * @type Point
   */
  startCoords: new Point(0, 0),
  drawFlag: false,
  oldGCO: null,
  mouseover: false,
  lineCap: "round",
  //butt, square
  backgroundGrid: null,
  canvasElement: null,
  cursorContainer: null,
  imgContainer: null,
  svgContainer: null,
  //For draw prev
  mouseOverlay: null,
  ownCursor: null,
  penSmoothLastCoords: [],
  svgLine: null,
  svgRect: null,
  svgCirle: null,
  drawBuffer: [],
  undoBuffer: [],
  drawId: 0,
  //Used for undo/redo functions
  imgDragActive: false,
  latestActiveTextBoxId: false,
  //The id of the latest clicked Textbox (for font and color change)
  latestActiveStickyNoteId: false,
  //The id of the latest clicked StickyNote (for font and color change)
  pressedKeys: {},
  settings: {
    whiteboardId: "0",
    username: "unknown",
    sendFunction: null,
    backgroundGridUrl: "./images/gb_grid.png"
  },
  lastPointerSentTime: 0,
  /**
   * @type Point
   */
  lastPointerPosition: new Point(0, 0),
  loadWhiteboard: function(whiteboardContainer2, newSettings) {
    const svgns = "https://www.w3.org/2000/svg";
    const _this = this;
    for (const i in newSettings) {
      this.settings[i] = newSettings[i];
    }
    this.settings["username"] = this.settings["username"].replace(/[^0-9a-z]/gi, "");
    _this.backgroundGrid = $(
      `<div style="position: absolute; left:0px; top:0; opacity: 0.2; background:url('${_this.settings["backgroundGridUrl"]}'); height: 100%; width: 100%;"></div>`
    );
    _this.imgContainer = $(
      '<div style="position: absolute; left:0px; top:0; height: 100%; width: 100%;"></div>'
    );
    _this.canvasElement = $(
      '<canvas id="whiteboardCanvas" style="position: absolute; left:0px; top:0; cursor:crosshair;"></canvas>'
    );
    _this.svgContainer = $(
      '<svg style="position: absolute; top:0px; left:0px;" width="100%" height="100%"></svg>'
    );
    _this.dropIndicator = $(
      '<div style="position:absolute; height: 100%; width: 100%; border: 7px dashed gray; text-align: center; top: 0px; left: 0px; color: gray; font-size: 23em; display: none;"><i style="font-size: 23em;" class="v-icon notranslate mdi mdi-plus-box theme--light text-h1 grey--text text--darken-1"></i></div>'
    );
    _this.cursorContainer = $(
      '<div style="position: absolute; left:0px; top:0; height: 100%; width: 100%;"></div>'
    );
    _this.textContainer = $(
      '<div class="textcontainer" style="position: absolute; left:0px; top:0; height: 100%; width: 100%; cursor:text;"></div>'
    );
    _this.stickyContainer = $(
      '<div class="stickycontainer" style="position: absolute; left:0px; top:0; height: 100%; width: 100%;"></div>'
    );
    _this.mouseOverlay = $(
      '<div id="mouseOverlay" style="cursor:none; position: absolute; left:0px; top:0; height: 100%; width: 100%;"></div>'
    );
    $(whiteboardContainer2).append(_this.backgroundGrid).append(_this.imgContainer).append(_this.canvasElement).append(_this.svgContainer).append(_this.dropIndicator).append(_this.cursorContainer).append(_this.textContainer).append(_this.stickyContainer).append(_this.mouseOverlay);
    dom.i2svg();
    this.canvas = $("#whiteboardCanvas")[0];
    this.canvas.height = $(void 0).height();
    this.canvas.width = $(void 0).width();
    this.ctx = this.canvas.getContext("2d");
    this.oldGCO = this.ctx.globalCompositeOperation;
    (void 0).addEventListener("resize", function() {
      const dbCp = JSON.parse(JSON.stringify(_this.drawBuffer));
      _this.canvas.width = $(void 0).width();
      _this.canvas.height = $(void 0).height();
      _this.drawBuffer = [];
      _this.loadData(dbCp);
    });
    $(_this.mouseOverlay).on("mousedown touchstart", function(e) {
      _this.mousedown(e);
    });
    _this.mousedown = function(e) {
      if (_this.imgDragActive || _this.drawFlag) {
        return;
      }
      if (ReadOnlyService$1.readOnlyActive) return;
      _this.drawFlag = true;
      const currentPos = Point.fromEvent(e);
      if (_this.tool === "pen") {
        _this.penSmoothLastCoords = [
          currentPos.x,
          currentPos.y,
          currentPos.x,
          currentPos.y,
          currentPos.x,
          currentPos.y
        ];
      } else if (_this.tool === "eraser") {
        _this.drawEraserLine(
          currentPos.x,
          currentPos.y,
          currentPos.x,
          currentPos.y,
          _this.thickness
        );
        _this.sendFunction({
          t: _this.tool,
          d: [currentPos.x, currentPos.y, currentPos.x, currentPos.y],
          th: _this.thickness
        });
      } else if (_this.tool === "line") {
        _this.startCoords = currentPos;
        _this.svgLine = (void 0).createElementNS(svgns, "line");
        _this.svgLine.setAttribute("stroke", "gray");
        _this.svgLine.setAttribute("stroke-dasharray", "5, 5");
        _this.svgLine.setAttribute("x1", currentPos.x);
        _this.svgLine.setAttribute("y1", currentPos.y);
        _this.svgLine.setAttribute("x2", currentPos.x);
        _this.svgLine.setAttribute("y2", currentPos.y);
        _this.svgContainer.append(_this.svgLine);
      } else if (_this.tool === "rect" || _this.tool === "recSelect") {
        _this.svgContainer.find("rect").remove();
        _this.svgRect = (void 0).createElementNS(svgns, "rect");
        _this.svgRect.setAttribute("stroke", "gray");
        _this.svgRect.setAttribute("stroke-dasharray", "5, 5");
        _this.svgRect.setAttribute("style", "fill-opacity:0.0;");
        _this.svgRect.setAttribute("x", currentPos.x);
        _this.svgRect.setAttribute("y", currentPos.y);
        _this.svgRect.setAttribute("width", 0);
        _this.svgRect.setAttribute("height", 0);
        _this.svgContainer.append(_this.svgRect);
        _this.startCoords = currentPos;
      } else if (_this.tool === "circle") {
        _this.svgCirle = (void 0).createElementNS(svgns, "circle");
        _this.svgCirle.setAttribute("stroke", "gray");
        _this.svgCirle.setAttribute("stroke-dasharray", "5, 5");
        _this.svgCirle.setAttribute("style", "fill-opacity:0.0;");
        _this.svgCirle.setAttribute("cx", currentPos.x);
        _this.svgCirle.setAttribute("cy", currentPos.y);
        _this.svgCirle.setAttribute("r", 0);
        _this.svgContainer.append(_this.svgCirle);
        _this.startCoords = currentPos;
      }
      _this.prevPos = currentPos;
    };
    _this.textContainer.on("mousemove touchmove", function(e) {
      e.preventDefault();
      if (_this.imgDragActive || !$(e.target).hasClass("textcontainer")) {
        return;
      }
      if (ReadOnlyService$1.readOnlyActive) return;
      const currentPos = Point.fromEvent(e);
      ThrottlingService$1.throttle(currentPos, () => {
        _this.lastPointerPosition = currentPos;
        _this.sendFunction({
          t: "cursor",
          event: "move",
          d: [currentPos.x, currentPos.y],
          username: _this.settings.username
        });
      });
    });
    _this.stickyContainer.on("mousemove touchmove", function(e) {
      e.preventDefault();
      if (_this.imgDragActive || !$(e.target).hasClass("stickycontainer")) {
        return;
      }
      if (ReadOnlyService$1.readOnlyActive) return;
      const currentPos = Point.fromEvent(e);
      ThrottlingService$1.throttle(currentPos, () => {
        _this.lastPointerPosition = currentPos;
        _this.sendFunction({
          t: "cursor",
          event: "move",
          d: [currentPos.x, currentPos.y],
          username: _this.settings.username
        });
      });
    });
    _this.mouseOverlay.on("mousemove touchmove", function(e) {
      e.preventDefault();
      if (ReadOnlyService$1.readOnlyActive) return;
      _this.triggerMouseMove(e);
    });
    _this.mouseOverlay.on("mouseup touchend touchcancel", function(e) {
      _this.mouseup(e);
    });
    _this.mouseup = function(e) {
      if (_this.imgDragActive) {
        return;
      }
      if (ReadOnlyService$1.readOnlyActive) return;
      _this.drawFlag = false;
      _this.drawId++;
      _this.ctx.globalCompositeOperation = _this.oldGCO;
      let currentPos = Point.fromEvent(e);
      if (currentPos.isZeroZero) {
        _this.sendFunction({
          t: "cursor",
          event: "out",
          username: _this.settings.username
        });
      }
      if (_this.tool === "line") {
        if (_this.pressedKeys.shift) {
          currentPos = _this.getRoundedAngles(currentPos);
        }
        _this.drawPenLine(
          currentPos.x,
          currentPos.y,
          _this.startCoords.x,
          _this.startCoords.y,
          _this.drawcolor,
          _this.thickness
        );
        _this.sendFunction({
          t: _this.tool,
          d: [currentPos.x, currentPos.y, _this.startCoords.x, _this.startCoords.y],
          c: _this.drawcolor,
          th: _this.thickness
        });
        _this.svgContainer.find("line").remove();
      } else if (_this.tool === "pen") {
        _this.drawId--;
        _this.pushPointSmoothPen(currentPos.x, currentPos.y);
        _this.drawId++;
      } else if (_this.tool === "rect") {
        if (_this.pressedKeys.shift) {
          if ((currentPos.x - _this.startCoords.x) * (currentPos.y - _this.startCoords.y) > 0) {
            currentPos = new Point(
              currentPos.x,
              _this.startCoords.y + (currentPos.x - _this.startCoords.x)
            );
          } else {
            currentPos = new Point(
              currentPos.x,
              _this.startCoords.y - (currentPos.x - _this.startCoords.x)
            );
          }
        }
        _this.drawRec(
          _this.startCoords.x,
          _this.startCoords.y,
          currentPos.x,
          currentPos.y,
          _this.drawcolor,
          _this.thickness
        );
        _this.sendFunction({
          t: _this.tool,
          d: [_this.startCoords.x, _this.startCoords.y, currentPos.x, currentPos.y],
          c: _this.drawcolor,
          th: _this.thickness
        });
        _this.svgContainer.find("rect").remove();
      } else if (_this.tool === "circle") {
        const r = currentPos.distTo(_this.startCoords);
        _this.drawCircle(
          _this.startCoords.x,
          _this.startCoords.y,
          r,
          _this.drawcolor,
          _this.thickness
        );
        _this.sendFunction({
          t: _this.tool,
          d: [_this.startCoords.x, _this.startCoords.y, r],
          c: _this.drawcolor,
          th: _this.thickness
        });
        _this.svgContainer.find("circle").remove();
      } else if (_this.tool === "recSelect") {
        _this.imgDragActive = true;
        if (_this.pressedKeys.shift) {
          if ((currentPos.x - _this.startCoords.x) * (currentPos.y - _this.startCoords.y) > 0) {
            currentPos = new Point(
              currentPos.x,
              _this.startCoords.y + (currentPos.x - _this.startCoords.x)
            );
          } else {
            currentPos = new Point(
              currentPos.x,
              _this.startCoords.y - (currentPos.x - _this.startCoords.x)
            );
          }
        }
        const width = Math.abs(_this.startCoords.x - currentPos.x);
        const height = Math.abs(_this.startCoords.y - currentPos.y);
        const left = _this.startCoords.x < currentPos.x ? _this.startCoords.x : currentPos.x;
        const top = _this.startCoords.y < currentPos.y ? _this.startCoords.y : currentPos.y;
        _this.mouseOverlay.css({ cursor: "default" });
        const imgDiv = $(
          `<div class="dragMe" style="position:absolute; left: ${left}px; top: ${top}px; width: ${width}px; border: 2px dotted gray; overflow: hidden; height: ${height}px;" cursor:move;">
                    <canvas style="cursor:move; position:absolute; top:0px; left:0px;" width="${width}" height="${height}"></canvas>
                    <div style="position:absolute; right:5px; top:3px;">
                    <button draw="1" style="margin: 0px 0px; background: #03a9f4; padding: 5px; margin-top: 3px; color: white;" class="addToCanvasBtn btn btn-default">Drop</button>
                    <button style="margin: 0px 0px; background: #03a9f4; padding: 5px; margin-top: 3px; color: white;" class="xCanvasBtn btn btn-default">x</button>
                    </div>
                    </div>`
        );
        const dragCanvas = $(imgDiv).find("canvas");
        const dragOutOverlay = $(
          `<div class="dragOutOverlay" style="position:absolute; left: ${left}px; top: ${top}px; width: ${width}px; height: ${height}px; background:white;"></div>`
        );
        _this.mouseOverlay.append(dragOutOverlay);
        _this.mouseOverlay.append(imgDiv);
        const destCanvasContext = dragCanvas[0].getContext("2d");
        destCanvasContext.drawImage(
          _this.canvas,
          left,
          top,
          width,
          height,
          0,
          0,
          width,
          height
        );
        imgDiv.find(".xCanvasBtn").off("click").click(function() {
          _this.imgDragActive = false;
          _this.refreshCursorAppearance();
          imgDiv.remove();
          dragOutOverlay.remove();
        });
        imgDiv.find(".addToCanvasBtn").off("click").click(function() {
          _this.imgDragActive = false;
          _this.refreshCursorAppearance();
          const p = imgDiv.position();
          const leftT = Math.round(p.left * 100) / 100;
          const topT = Math.round(p.top * 100) / 100;
          _this.drawId++;
          _this.sendFunction({
            t: _this.tool,
            d: [left, top, leftT, topT, width, height]
          });
          _this.dragCanvasRectContent(left, top, leftT, topT, width, height);
          imgDiv.remove();
          dragOutOverlay.remove();
        });
        imgDiv.draggable();
        _this.svgContainer.find("rect").remove();
      }
    };
    _this.mouseOverlay.on("mouseout", function(e) {
      if (ReadOnlyService$1.readOnlyActive) return;
      _this.triggerMouseOut();
    });
    _this.mouseOverlay.on("mouseover", function(e) {
      if (ReadOnlyService$1.readOnlyActive) return;
      _this.triggerMouseOver();
    });
    _this.textContainer.on("click", function(e) {
      const currentPos = Point.fromEvent(e);
      const fontsize = _this.thickness * 0.5;
      const txId = "tx" + +/* @__PURE__ */ new Date();
      _this.sendFunction({
        t: "addTextBox",
        d: [_this.drawcolor, fontsize, currentPos.x, currentPos.y, txId]
      });
      _this.addTextBox(_this.drawcolor, fontsize, currentPos.x, currentPos.y, txId, true);
    });
    _this.stickyContainer.on("click", function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      const currentPos = Point.fromEvent(e);
      const fontsize = _this.thickness * 0.25;
      const txId = "tx" + +/* @__PURE__ */ new Date();
      _this.sendFunction({
        t: "addStickyNote",
        d: [_this.drawcolor, fontsize, currentPos.x, currentPos.y, txId]
      });
      _this.addStickyNote(_this.drawcolor, fontsize, currentPos.x, currentPos.y, txId, true);
    });
  },
  /**
   * For drawing lines at 0,45,90° ....
   * @param {Point} currentPos
   * @returns {Point}
   */
  getRoundedAngles: function(currentPos) {
    const { startCoords } = this;
    const dx = currentPos.x - startCoords.x;
    const dy = startCoords.y - currentPos.y;
    const angle = Math.atan2(dy, dx);
    const angle45 = Math.round(angle / _45_DEG_IN_RAD) * _45_DEG_IN_RAD;
    const dist = currentPos.distTo(startCoords);
    let outX = startCoords.x + dist * Math.cos(angle45);
    let outY = startCoords.y - dist * Math.sin(angle45);
    return new Point(outX, outY);
  },
  triggerMouseMove: function(e) {
    const _this = this;
    if (_this.imgDragActive) {
      return;
    }
    let currentPos = Point.fromEvent(e);
    (void 0).requestAnimationFrame(function() {
      currentPos = Point.fromEvent(e);
      if (_this.drawFlag) {
        if (_this.tool === "pen") {
          _this.pushPointSmoothPen(currentPos.x, currentPos.y);
        } else if (_this.tool === "eraser") {
          _this.drawEraserLine(
            currentPos.x,
            currentPos.y,
            _this.prevPos.x,
            _this.prevPos.y,
            _this.thickness
          );
          _this.sendFunction({
            t: _this.tool,
            d: [currentPos.x, currentPos.y, _this.prevPos.x, _this.prevPos.y],
            th: _this.thickness
          });
        }
      }
      if (_this.tool === "eraser") {
        const left = currentPos.x - _this.thickness;
        const top = currentPos.y - _this.thickness;
        if (_this.ownCursor) _this.ownCursor.css({ top: top + "px", left: left + "px" });
      } else if (_this.tool === "pen" || _this.tool == "sticky") {
        const left = currentPos.x - _this.thickness / 2;
        const top = currentPos.y - _this.thickness / 2;
        if (_this.ownCursor) _this.ownCursor.css({ top: top + "px", left: left + "px" });
      } else if (_this.tool === "line") {
        if (_this.svgLine) {
          let posToUse = currentPos;
          if (_this.pressedKeys.shift) {
            posToUse = _this.getRoundedAngles(currentPos);
          }
          _this.svgLine.setAttribute("x2", posToUse.x);
          _this.svgLine.setAttribute("y2", posToUse.y);
        }
      } else if (_this.tool === "rect" || _this.tool === "recSelect" && _this.drawFlag) {
        if (_this.svgRect) {
          const width = Math.abs(currentPos.x - _this.startCoords.x);
          let height = Math.abs(currentPos.y - _this.startCoords.y);
          if (_this.pressedKeys.shift) {
            height = width;
            const x = currentPos.x < _this.startCoords.x ? _this.startCoords.x - width : _this.startCoords.x;
            const y = currentPos.y < _this.startCoords.y ? _this.startCoords.y - width : _this.startCoords.y;
            _this.svgRect.setAttribute("x", x);
            _this.svgRect.setAttribute("y", y);
          } else {
            const x = currentPos.x < _this.startCoords.x ? currentPos.x : _this.startCoords.x;
            const y = currentPos.y < _this.startCoords.y ? currentPos.y : _this.startCoords.y;
            _this.svgRect.setAttribute("x", x);
            _this.svgRect.setAttribute("y", y);
          }
          _this.svgRect.setAttribute("width", width);
          _this.svgRect.setAttribute("height", height);
        }
      } else if (_this.tool === "circle") {
        const r = currentPos.distTo(_this.startCoords);
        if (_this.svgCirle) {
          _this.svgCirle.setAttribute("r", r);
        }
      }
      _this.prevPos = currentPos;
    });
    ThrottlingService$1.throttle(currentPos, () => {
      _this.lastPointerPosition = currentPos;
      _this.sendFunction({
        t: "cursor",
        event: "move",
        d: [currentPos.x, currentPos.y],
        username: _this.settings.username
      });
    });
  },
  triggerMouseOver: function() {
    var _this = this;
    if (_this.imgDragActive) {
      return;
    }
    if (!_this.mouseover) {
      var color = _this.drawcolor;
      var widthHeight = _this.thickness;
      if (_this.tool === "eraser") {
        color = "#00000000";
        widthHeight = widthHeight * 2;
      }
      if (_this.tool === "eraser" || _this.tool === "pen") {
        _this.ownCursor = $(
          '<div id="ownCursor" style="background:' + color + "; border:1px solid gray; position:absolute; width:" + widthHeight + "px; height:" + widthHeight + 'px; border-radius:50%;"></div>'
        );
        _this.cursorContainer.append(_this.ownCursor);
      }
      if (_this.tool === "sticky") {
        _this.ownCursor = $(
          `
                        <i id="ownCursor" style="position:absolute; transform: rotate(45deg); color: ${color}" class="v-icon notranslate mdi mdi-pin theme--light text-h5 text--darken-1"></i>
                    `
        );
        _this.cursorContainer.append(_this.ownCursor);
      }
    }
    _this.mouseover = true;
  },
  triggerMouseOut: function() {
    var _this = this;
    if (_this.imgDragActive) {
      return;
    }
    _this.drawFlag = false;
    _this.mouseover = false;
    _this.ctx.globalCompositeOperation = _this.oldGCO;
    if (_this.ownCursor) _this.ownCursor.remove();
    _this.svgContainer.find("line").remove();
    _this.svgContainer.find("rect").remove();
    _this.svgContainer.find("circle").remove();
    _this.sendFunction({ t: "cursor", event: "out" });
  },
  redrawMouseCursor: function() {
    const _this = this;
    _this.triggerMouseOut();
    _this.triggerMouseOver();
    _this.triggerMouseMove({ offsetX: _this.prevPos.x, offsetY: _this.prevPos.y });
  },
  delKeyAction: function() {
    var _this = this;
    $.each(_this.mouseOverlay.find(".dragOutOverlay"), function() {
      var width = $(this).width();
      var height = $(this).height();
      var p = $(this).position();
      var left = Math.round(p.left * 100) / 100;
      var top = Math.round(p.top * 100) / 100;
      _this.drawId++;
      _this.sendFunction({ t: "eraseRec", d: [left, top, width, height] });
      _this.eraseRec(left, top, width, height);
    });
    _this.mouseOverlay.find(".xCanvasBtn").click();
    _this.textContainer.find("#" + _this.latestActiveTextBoxId).find(".removeIcon").click();
  },
  escKeyAction: function() {
    var _this = this;
    if (!_this.drawFlag) {
      _this.svgContainer.empty();
    }
    _this.mouseOverlay.find(".xCanvasBtn").click();
  },
  pushPointSmoothPen: function(X, Y) {
    var _this = this;
    if (_this.penSmoothLastCoords.length >= 8) {
      _this.penSmoothLastCoords = [
        _this.penSmoothLastCoords[2],
        _this.penSmoothLastCoords[3],
        _this.penSmoothLastCoords[4],
        _this.penSmoothLastCoords[5],
        _this.penSmoothLastCoords[6],
        _this.penSmoothLastCoords[7]
      ];
    }
    _this.penSmoothLastCoords.push(X, Y);
    if (_this.penSmoothLastCoords.length >= 8) {
      _this.drawPenSmoothLine(_this.penSmoothLastCoords, _this.drawcolor, _this.thickness);
      _this.sendFunction({
        t: _this.tool,
        d: _this.penSmoothLastCoords,
        c: _this.drawcolor,
        th: _this.thickness
      });
    }
  },
  dragCanvasRectContent: function(xf, yf, xt, yt, width, height) {
    var tempCanvas = (void 0).createElement("canvas");
    tempCanvas.width = width;
    tempCanvas.height = height;
    var tempCanvasContext = tempCanvas.getContext("2d");
    tempCanvasContext.drawImage(this.canvas, xf, yf, width, height, 0, 0, width, height);
    this.eraseRec(xf, yf, width, height);
    this.ctx.drawImage(tempCanvas, xt, yt);
  },
  eraseRec: function(fromX, fromY, width, height) {
    var _this = this;
    _this.ctx.beginPath();
    _this.ctx.rect(fromX, fromY, width, height);
    _this.ctx.fillStyle = "rgba(0,0,0,1)";
    _this.ctx.globalCompositeOperation = "destination-out";
    _this.ctx.fill();
    _this.ctx.closePath();
    _this.ctx.globalCompositeOperation = _this.oldGCO;
  },
  drawPenLine: function(fromX, fromY, toX, toY, color, thickness) {
    var _this = this;
    _this.ctx.beginPath();
    _this.ctx.moveTo(fromX, fromY);
    _this.ctx.lineTo(toX, toY);
    _this.ctx.strokeStyle = color;
    _this.ctx.lineWidth = thickness;
    _this.ctx.lineCap = _this.lineCap;
    _this.ctx.stroke();
    _this.ctx.closePath();
  },
  drawPenSmoothLine: function(coords, color, thickness) {
    var _this = this;
    var xm1 = coords[0];
    var ym1 = coords[1];
    var x0 = coords[2];
    var y0 = coords[3];
    var x1 = coords[4];
    var y1 = coords[5];
    var x2 = coords[6];
    var y2 = coords[7];
    var length = Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2));
    var steps = Math.ceil(length / 5);
    _this.ctx.beginPath();
    _this.ctx.moveTo(x0, y0);
    for (var i = 0; i < steps; i++) {
      var point = lanczosInterpolate(xm1, ym1, x0, y0, x1, y1, x2, y2, (i + 1) / steps);
      _this.ctx.lineTo(point[0], point[1]);
    }
    _this.ctx.strokeStyle = color;
    _this.ctx.lineWidth = thickness;
    _this.ctx.lineCap = _this.lineCap;
    _this.ctx.stroke();
    _this.ctx.closePath();
  },
  drawEraserLine: function(fromX, fromY, toX, toY, thickness) {
    var _this = this;
    _this.ctx.beginPath();
    _this.ctx.moveTo(fromX, fromY);
    _this.ctx.lineTo(toX, toY);
    _this.ctx.strokeStyle = "rgba(0,0,0,1)";
    _this.ctx.lineWidth = thickness * 2;
    _this.ctx.lineCap = _this.lineCap;
    _this.ctx.globalCompositeOperation = "destination-out";
    _this.ctx.stroke();
    _this.ctx.closePath();
    _this.ctx.globalCompositeOperation = _this.oldGCO;
  },
  drawRec: function(fromX, fromY, toX, toY, color, thickness) {
    var _this = this;
    toX = toX - fromX;
    toY = toY - fromY;
    _this.ctx.beginPath();
    _this.ctx.rect(fromX, fromY, toX, toY);
    _this.ctx.strokeStyle = color;
    _this.ctx.lineWidth = thickness;
    _this.ctx.lineCap = _this.lineCap;
    _this.ctx.stroke();
    _this.ctx.closePath();
  },
  drawCircle: function(fromX, fromY, radius, color, thickness) {
    var _this = this;
    _this.ctx.beginPath();
    _this.ctx.arc(fromX, fromY, radius, 0, 2 * Math.PI, false);
    _this.ctx.lineWidth = thickness;
    _this.ctx.strokeStyle = color;
    _this.ctx.stroke();
  },
  clearWhiteboard: function() {
    var _this = this;
    if (ReadOnlyService$1.readOnlyActive) return;
    _this.canvas.height = _this.canvas.height;
    _this.imgContainer.empty();
    _this.textContainer.empty();
    _this.stickyContainer.empty();
    _this.sendFunction({ t: "clear" });
    _this.drawBuffer = [];
    _this.undoBuffer = [];
    _this.drawId = 0;
  },
  setStrokeThickness(thickness) {
    var _this = this;
    _this.thickness = thickness;
    if (_this.tool == "text" && _this.latestActiveTextBoxId) {
      _this.sendFunction({
        t: "setTextboxFontSize",
        d: [_this.latestActiveTextBoxId, thickness]
      });
      _this.setTextboxFontSize(_this.latestActiveTextBoxId, thickness);
    }
    if (_this.tool == "sticky" && _this.latestActiveStickyNoteId) {
      _this.sendFunction({
        t: "setStickyNoteFontSize",
        d: [_this.latestActiveStickyNoteId, thickness]
      });
      _this.setStickyNoteFontSize(_this.latestActiveStickyNoteId, thickness);
    }
  },
  addImgToCanvasByUrl: function(url) {
    var _this = this;
    var oldTool = _this.tool;
    _this.setTool("mouse");
    _this.imgDragActive = true;
    _this.mouseOverlay.css({ cursor: "default" });
    var imgDiv = $(
      '<div class="dragMe" style="border: 2px dashed gray; position:absolute; left:200px; top:200px; min-width:160px; min-height:100px; cursor:move;"><img style="width:100%; height:100%;" src="' + url + '"><div style="position:absolute; right:5px; top:3px;"><button draw="1" style="margin: 0px 0px; background: #03a9f4; padding: 5px; margin-top: 3px; color: white;" class="addToCanvasBtn btn btn-default">Draw to canvas</button> <button draw="0" style="margin: 0px 0px; background: #03a9f4; padding: 5px; margin-top: 3px; color: white;" class="addToBackgroundBtn btn btn-default">Add to background</button> <button style="margin: 0px 0px; background: #03a9f4; padding: 5px; margin-top: 3px; color: white;" class="xCanvasBtn btn btn-default">x</button></div><i style="position: absolute;bottom: -4px;right: -4px; transform: rotate(90deg);" class="v-icon notranslate mdi mdi-resize theme--light text-h5 primary--text text--darken-1"></i><div class="rotationHandle" style="position:absolute; bottom: -30px; left: 0px; width:100%; text-align:center; cursor:ew-resize;"><i class="v-icon notranslate mdi mdi-rotate-left theme--light text-h4 primary--text text--darken-1"></i></div></div>'
    );
    imgDiv.find(".xCanvasBtn").off("click").click(function() {
      _this.imgDragActive = false;
      _this.refreshCursorAppearance();
      imgDiv.remove();
      _this.setTool(oldTool);
    });
    var rotationAngle = 0;
    var recoupLeft = 0;
    var recoupTop = 0;
    imgDiv.position();
    var left = 200;
    var top = 200;
    imgDiv.find(".addToCanvasBtn,.addToBackgroundBtn").off("click").click(function() {
      var draw = $(this).attr("draw");
      _this.imgDragActive = false;
      var width = imgDiv.width();
      var height = imgDiv.height();
      if (draw == "1") {
        _this.drawImgToCanvas(url, width, height, left, top, rotationAngle);
      } else {
        _this.drawImgToBackground(url, width, height, left, top, rotationAngle);
      }
      _this.sendFunction({
        t: "addImgBG",
        draw,
        url,
        d: [width, height, left, top, rotationAngle]
      });
      _this.drawId++;
      imgDiv.remove();
      _this.refreshCursorAppearance();
      _this.setTool(oldTool);
    });
    _this.mouseOverlay.append(imgDiv);
    imgDiv.draggable({
      start: function(event, ui) {
        var left2 = parseInt($(this).css("left"), 10);
        left2 = isNaN(left2) ? 0 : left2;
        var top2 = parseInt($(this).css("top"), 10);
        top2 = isNaN(top2) ? 0 : top2;
        recoupLeft = left2 - ui.position.left;
        recoupTop = top2 - ui.position.top;
      },
      drag: function(event, ui) {
        ui.position.left += recoupLeft;
        ui.position.top += recoupTop;
      },
      stop: function(event, ui) {
        left = ui.position.left;
        top = ui.position.top;
      }
    });
    imgDiv.resizable();
    var params = {
      // Callback fired on rotation start.
      start: function(event, ui) {
      },
      // Callback fired during rotation.
      rotate: function(event, ui) {
      },
      // Callback fired on rotation end.
      stop: function(event, ui) {
        rotationAngle = ui.angle.current;
      },
      handle: imgDiv.find(".rotationHandle")
    };
    imgDiv.rotatable(params);
    dom.i2svg();
  },
  drawImgToBackground(url, width, height, left, top, rotationAngle) {
    this.imgContainer.append(
      '<img crossorigin="anonymous" style="width:' + width + "px; height:" + height + "px; position:absolute; top:" + top + "px; left:" + left + "px; transform: rotate(" + rotationAngle + 'rad);" src="' + url + '">'
    );
  },
  addTextBox(textcolor, fontsize, left, top, txId, newLocalBox) {
    var _this = this;
    var textBox = $(
      `
                <div id="${txId}" class="textBox" style="font-family: Monospace; position: absolute; top: ${top}px; left: ${left}px;">
                    <div contentEditable="true" spellcheck="false" class="textContent" style="outline: none; font-size: ${fontsize}em; color: ${textcolor}; min-width:50px; min-height:50px;"></div>
                    <div title="remove textbox" class="removeIcon" style="position:absolute; cursor:pointer; top:-5px; right:-5px;"><i class="v-icon notranslate mdi mdi-close theme--light text-body-1 grey--text text--darken-1"></i></div>
                    <div title="move textbox" class="moveIcon" style="position:absolute; cursor:move; top:1px; left:2px; font-size: 0.5em;"><i class="v-icon notranslate mdi mdi-arrow-expand-all theme--light text-body-2 grey--text text--darken-1"></i></div>
                </div>
            `
    );
    _this.latestActiveTextBoxId = txId;
    textBox.click(function(e) {
      e.preventDefault();
      _this.latestActiveTextBoxId = txId;
      return false;
    });
    textBox.on("mousemove touchmove", function(e) {
      e.preventDefault();
      if (_this.imgDragActive) {
        return;
      }
      var textBoxPosition = textBox.position();
      var currX = e.offsetX + textBoxPosition.left;
      var currY = e.offsetY + textBoxPosition.top;
      if ($(e.target).hasClass("removeIcon")) {
        currX += textBox.width() - 4;
      }
      const newPointerPosition = new Point(currX, currY);
      ThrottlingService$1.throttle(newPointerPosition, () => {
        _this.lastPointerPosition = newPointerPosition;
        _this.sendFunction({
          t: "cursor",
          event: "move",
          d: [newPointerPosition.x, newPointerPosition.y],
          username: _this.settings.username
        });
      });
    });
    if (_this.textContainer.find(`#${txId}`).length == 0) {
      this.textContainer.append(textBox);
    }
    textBox.draggable({
      handle: ".moveIcon",
      stop: function() {
        var textBoxPosition = textBox.position();
        _this.sendFunction({
          t: "setTextboxPosition",
          d: [txId, textBoxPosition.top, textBoxPosition.left]
        });
      },
      drag: function() {
        var textBoxPosition = textBox.position();
        _this.sendFunction({
          t: "setTextboxPosition",
          d: [txId, textBoxPosition.top, textBoxPosition.left]
        });
      }
    });
    textBox.find(".textContent").on("input", function() {
      var text = btoa(unescape(encodeURIComponent($(this).html())));
      _this.sendFunction({ t: "setTextboxText", d: [txId, text] });
    });
    textBox.find(".removeIcon").off("click").click(function(e) {
      $("#" + txId).remove();
      _this.sendFunction({ t: "removeTextbox", d: [txId] });
      e.preventDefault();
      return false;
    });
    if (newLocalBox) {
      setTimeout(() => {
        textBox.find(".textContent").focus();
      }, 0);
    }
    if (this.tool === "text") {
      textBox.addClass("active");
    }
    dom.i2svg();
  },
  setTextboxText(txId, text) {
    $("#" + txId).find(".textContent").html(decodeURIComponent(escape(atob(text))));
  },
  removeTextbox(txId) {
    $("#" + txId).remove();
  },
  setTextboxPosition(txId, top, left) {
    $("#" + txId).css({ top: top + "px", left: left + "px" });
  },
  setTextboxFontSize(txId, fontSize) {
    $("#" + txId).find(".textContent").css({ "font-size": fontSize + "em" });
  },
  setTextboxFontColor(txId, color) {
    $("#" + txId).find(".textContent").css({ color });
  },
  addStickyNote(textcolor, fontsize, left, top, txId, newLocalBox) {
    var _this = this;
    var noteZindex = 1;
    var stickyNote = $(
      `
                <div id="${txId}" class="stickyNote" style="font-family: Monospace; position: absolute; top: ${top}px; left: ${left}px; cursor: text">
                    <div class="note moveNote" style="background-color: ${textcolor}">
                        <div class="note_cnt">
                            <textarea class="sticky-note-title" spellcheck="false" placeholder="Enter note title" style="outline: none; font-size: ${fontsize * 1.5}em; line-height:normal; color: #fff;"></textarea>
                            <textarea class="cnt" spellcheck="false" placeholder="Enter note description here" style="outline: none; font-size: ${fontsize}em; line-height:normal; color: #fff;"></textarea>
                        </div>
                    </div>
                    <div title="remove stickynote" class="removeIcon" style="position:absolute; cursor:pointer; top:-10px; right:-10px;">
                        <button type="button" class="v-btn v-btn--flat v-btn--icon v-btn--round theme--light v-size--small pink--text" style="background-color: ${textcolor};">
                            <span class="v-btn__content">
                                <i aria-hidden="true" class="v-icon mdi mdi-close theme--light" style="color: #fff;"></i>
                            </span>
                        </button>
                    </div>
                </div>
            `
    );
    _this.latestActiveStickyNoteId = txId;
    stickyNote.click(function(e) {
      e.preventDefault();
      _this.latestActiveStickyNoteId = txId;
      return false;
    });
    stickyNote.on("mousemove touchmove", function(e) {
      e.preventDefault();
      if (_this.imgDragActive) {
        return;
      }
      var stickyNotePosition = stickyNote.position();
      var currX = e.offsetX + stickyNotePosition.left;
      var currY = e.offsetY + stickyNotePosition.top;
      if ($(e.target).hasClass("removeIcon")) {
        currX += stickyNote.width() - 4;
      }
      const newPointerPosition = new Point(currX, currY);
      ThrottlingService$1.throttle(newPointerPosition, () => {
        _this.lastPointerPosition = newPointerPosition;
        _this.sendFunction({
          t: "cursor",
          event: "move",
          d: [newPointerPosition.x, newPointerPosition.y],
          username: _this.settings.username
        });
      });
    });
    if (_this.stickyContainer.find(`#${txId}`).length == 0) {
      this.stickyContainer.append(stickyNote).find(".sticky-note-title");
    }
    stickyNote.draggable({
      handle: ".moveNote",
      stop: function() {
        var stickyNotePosition = stickyNote.position();
        _this.sendFunction({
          t: "setStickyNotePosition",
          d: [txId, stickyNotePosition.top, stickyNotePosition.left]
        });
      },
      drag: function() {
        var stickyNotePosition = stickyNote.position();
        _this.sendFunction({
          t: "setStickyNotePosition",
          d: [txId, stickyNotePosition.top, stickyNotePosition.left]
        });
      }
    }).on(
      "dragstart",
      function() {
        _this.latestActiveStickyNoteId = txId;
        $(".stickyNote").css({ zIndex: "unset" });
        $(this).css({ zIndex: ++noteZindex });
        $(this).find(".sticky-note-title").focus();
      }
    );
    stickyNote.find(".sticky-note-title").on("input", function() {
      var titleText = btoa(unescape(encodeURIComponent($(this).val())));
      _this.sendFunction({ t: "setStickyNoteTitleText", d: [txId, titleText] });
    });
    stickyNote.find(".cnt").on("input", function() {
      var noteDesc = btoa(unescape(encodeURIComponent($(this).val())));
      _this.sendFunction({ t: "setStickyNoteDesc", d: [txId, noteDesc] });
    });
    stickyNote.find(".removeIcon").off("click").click(function(e) {
      $("#" + txId).remove();
      _this.sendFunction({ t: "removeStickyNote", d: [txId] });
      e.preventDefault();
      return false;
    });
    if (newLocalBox) {
      setTimeout(() => {
        stickyNote.find(".sticky-note-title").focus();
      }, 0);
    }
    if (this.tool === "sticky") {
      stickyNote.addClass("active");
    }
    dom.i2svg();
  },
  setStickyNoteTitleText(txId, titleText) {
    $("#" + txId).find(".sticky-note-title").html(decodeURIComponent(escape(atob(titleText))));
  },
  setStickyNoteDesc(txId, noteDesc) {
    $("#" + txId).find(".cnt").html(decodeURIComponent(escape(atob(noteDesc))));
  },
  removeStickyNote(txId) {
    $("#" + txId).remove();
  },
  setStickyNotePosition(txId, top, left) {
    $("#" + txId).css({ top: top + "px", left: left + "px" });
  },
  setStickyNoteFontSize(txId, fontSize) {
    $("#" + txId).find(".sticky-note-title").css({ "font-size": fontSize + "em" });
    $("#" + txId).find(".cnt").css({ "font-size": fontSize + "em" });
  },
  setStickyNoteFontColor(txId, color) {
    $(`#${txId}`).find(".note, .removeIcon .v-btn").css({ backgroundColor: color });
  },
  drawImgToCanvas(url, width, height, left, top, rotationAngle, doneCallback) {
    var _this = this;
    var img = (void 0).createElement("img");
    img.onload = function() {
      rotationAngle = rotationAngle ? rotationAngle : 0;
      if (rotationAngle === 0) {
        _this.ctx.drawImage(img, left, top, width, height);
      } else {
        _this.ctx.save();
        _this.ctx.translate(left + width / 2, top + height / 2);
        _this.ctx.rotate(rotationAngle);
        _this.ctx.drawImage(img, -(width / 2), -(height / 2), width, height);
        _this.ctx.restore();
      }
      if (doneCallback) {
        doneCallback();
      }
    };
    img.src = url;
  },
  undoWhiteboard: function(username) {
    var _this = this;
    if (!username) {
      username = _this.settings.username;
    }
    for (var i = _this.drawBuffer.length - 1; i >= 0; i--) {
      if (_this.drawBuffer[i]["username"] == username) {
        var drawId = _this.drawBuffer[i]["drawId"];
        for (var i = _this.drawBuffer.length - 1; i >= 0; i--) {
          if (_this.drawBuffer[i]["drawId"] == drawId && _this.drawBuffer[i]["username"] == username) {
            _this.undoBuffer.push(_this.drawBuffer[i]);
            _this.drawBuffer.splice(i, 1);
          }
        }
        break;
      }
    }
    if (_this.undoBuffer.length > 1e3) {
      _this.undoBuffer.splice(0, _this.undoBuffer.length - 1e3);
    }
    _this.canvas.height = _this.canvas.height;
    _this.imgContainer.empty();
    _this.loadDataInSteps(_this.drawBuffer, false, function(stepData) {
    });
  },
  redoWhiteboard: function(username) {
    var _this = this;
    if (!username) {
      username = _this.settings.username;
    }
    for (var i = _this.undoBuffer.length - 1; i >= 0; i--) {
      if (_this.undoBuffer[i]["username"] == username) {
        var drawId = _this.undoBuffer[i]["drawId"];
        for (var i = _this.undoBuffer.length - 1; i >= 0; i--) {
          if (_this.undoBuffer[i]["drawId"] == drawId && _this.undoBuffer[i]["username"] == username) {
            _this.drawBuffer.push(_this.undoBuffer[i]);
            _this.undoBuffer.splice(i, 1);
          }
        }
        break;
      }
    }
    _this.canvas.height = _this.canvas.height;
    _this.imgContainer.empty();
    _this.loadDataInSteps(_this.drawBuffer, false, function(stepData) {
    });
  },
  undoWhiteboardClick: function() {
    if (ReadOnlyService$1.readOnlyActive) return;
    this.sendFunction({ t: "undo" });
    this.undoWhiteboard();
  },
  redoWhiteboardClick: function() {
    if (ReadOnlyService$1.readOnlyActive) return;
    this.sendFunction({ t: "redo" });
    this.redoWhiteboard();
  },
  setTool: function(tool) {
    this.tool = tool;
    if (this.tool === "text") {
      $(".stickyNote").removeClass("active");
      $(".textBox").addClass("active");
      this.textContainer.appendTo($(whiteboardContainer));
    } else if (this.tool === "sticky") {
      $(".textBox").removeClass("active");
      $(".stickyNote").addClass("active");
      this.stickyContainer.appendTo($(whiteboardContainer));
      if (this.latestActiveStickyNoteId) {
        $(`#${this.latestActiveStickyNoteId}`).find(".sticky-note-title").focus();
      }
    } else {
      $(".textBox, .stickyNote").removeClass("active");
      this.mouseOverlay.appendTo($(whiteboardContainer));
    }
    this.refreshCursorAppearance();
    this.mouseOverlay.find(".xCanvasBtn").click(function(e) {
      e.stopImmediatePropagation();
    });
  },
  setDrawColor(color) {
    var _this = this;
    _this.drawcolor = color;
    $("#whiteboardColorpicker").css({ background: color });
    if (_this.tool == "text" && _this.latestActiveTextBoxId) {
      _this.sendFunction({
        t: "setTextboxFontColor",
        d: [_this.latestActiveTextBoxId, color]
      });
      _this.setTextboxFontColor(_this.latestActiveTextBoxId, color);
    }
    if (_this.tool == "sticky" && _this.latestActiveStickyNoteId) {
      _this.sendFunction({
        t: "setStickyNoteFontColor",
        d: [_this.latestActiveStickyNoteId, color]
      });
      _this.setStickyNoteFontColor(_this.latestActiveStickyNoteId, color);
    }
  },
  updateSmallestScreenResolution() {
    const { smallestScreenResolution } = InfoService$1;
    const { showSmallestScreenIndicator } = ConfigService$1;
    if (showSmallestScreenIndicator && smallestScreenResolution) {
      const { w: width, h: height } = smallestScreenResolution;
      this.backgroundGrid.empty();
      if (width < $(void 0).width() || height < $(void 0).height()) {
        this.backgroundGrid.append(
          '<div style="position:absolute; left:0px; top:0px; border-right:3px dotted black; border-bottom:3px dotted black; width:' + width + "px; height:" + height + 'px;"></div>'
        );
        this.backgroundGrid.append(
          '<div style="position:absolute; left:' + (width + 5) + 'px; top:0px;">smallest screen participating</div>'
        );
      }
    }
  },
  handleEventsAndData: function(content, isNewData, doneCallback) {
    var _this = this;
    var tool = content["t"];
    var data = content["d"];
    var color = content["c"];
    var username = content["username"];
    var thickness = content["th"];
    (void 0).requestAnimationFrame(function() {
      if (tool === "line" || tool === "pen") {
        if (data.length == 4) {
          _this.drawPenLine(data[0], data[1], data[2], data[3], color, thickness);
        } else {
          _this.drawPenSmoothLine(data, color, thickness);
        }
      } else if (tool === "rect") {
        _this.drawRec(data[0], data[1], data[2], data[3], color, thickness);
      } else if (tool === "circle") {
        _this.drawCircle(data[0], data[1], data[2], color, thickness);
      } else if (tool === "eraser") {
        _this.drawEraserLine(data[0], data[1], data[2], data[3], thickness);
      } else if (tool === "eraseRec") {
        _this.eraseRec(data[0], data[1], data[2], data[3]);
      } else if (tool === "recSelect") {
        _this.dragCanvasRectContent(data[0], data[1], data[2], data[3], data[4], data[5]);
      } else if (tool === "addImgBG") {
        if (content["draw"] == "1") {
          _this.drawImgToCanvas(
            content["url"],
            data[0],
            data[1],
            data[2],
            data[3],
            data[4],
            doneCallback
          );
        } else {
          _this.drawImgToBackground(
            content["url"],
            data[0],
            data[1],
            data[2],
            data[3],
            data[4]
          );
        }
      } else if (tool === "addTextBox") {
        _this.stickyContainer.css({ zIndex: 0 });
        _this.addTextBox(data[0], data[1], data[2], data[3], data[4]);
      } else if (tool === "setTextboxText") {
        _this.setTextboxText(data[0], data[1]);
      } else if (tool === "removeTextbox") {
        _this.removeTextbox(data[0]);
      } else if (tool === "setTextboxPosition") {
        _this.setTextboxPosition(data[0], data[1], data[2]);
      } else if (tool === "setTextboxFontSize") {
        _this.setTextboxFontSize(data[0], data[1]);
      } else if (tool === "setTextboxFontColor") {
        _this.setTextboxFontColor(data[0], data[1]);
      } else if (tool === "addStickyNote") {
        _this.addStickyNote(data[0], data[1], data[2], data[3], data[4]);
      } else if (tool === "setStickyNoteTitleText") {
        _this.setStickyNoteTitleText(data[0], data[1]);
      } else if (tool === "setStickyNoteDesc") {
        _this.setStickyNoteDesc(data[0], data[1]);
      } else if (tool === "removeStickyNote") {
        _this.removeStickyNote(data[0]);
      } else if (tool === "setStickyNotePosition") {
        _this.setStickyNotePosition(data[0], data[1], data[2]);
      } else if (tool === "setStickyNoteFontSize") {
        _this.setStickyNoteFontSize(data[0], data[1]);
      } else if (tool === "setStickyNoteFontColor") {
        _this.setStickyNoteFontColor(data[0], data[1]);
      } else if (tool === "clear") {
        _this.canvas.height = _this.canvas.height;
        _this.imgContainer.empty();
        _this.textContainer.empty();
        _this.stickyContainer.empty();
        _this.drawBuffer = [];
        _this.undoBuffer = [];
        _this.drawId = 0;
      } else if (tool === "cursor" && _this.settings) {
        if (content["event"] === "move") {
          if (_this.cursorContainer.find("." + content["username"]).length >= 1) {
            _this.cursorContainer.find("." + content["username"]).css({ left: data[0] + "px", top: data[1] - 15 + "px" });
          } else {
            _this.cursorContainer.append(
              '<div style="font-size:0.8em; padding-left:2px; padding-right:2px; background:gray; color:white; border-radius:3px; position:absolute; left:' + data[0] + "px; top:" + (data[1] - 151) + 'px;" class="userbadge ' + content["username"] + '"><div style="width:4px; height:4px; background:gray; position:absolute; top:13px; left:-2px; border-radius:50%;"></div>' + decodeURIComponent(atob(content["username"])) + "</div>"
            );
          }
        } else {
          _this.cursorContainer.find("." + content["username"]).remove();
        }
      } else if (tool === "undo") {
        _this.undoWhiteboard(username);
      } else if (tool === "redo") {
        _this.redoWhiteboard(username);
      }
    });
    if (isNewData && [
      "line",
      "pen",
      "rect",
      "circle",
      "eraser",
      "addImgBG",
      "recSelect",
      "eraseRec",
      "addTextBox",
      "setTextboxText",
      "removeTextbox",
      "setTextboxPosition",
      "setTextboxFontSize",
      "setTextboxFontColor",
      "addStickyNote",
      "setStickyNoteTitleText",
      "setStickyNoteDesc",
      "removeStickyNote",
      "setStickyNotePosition",
      "setStickyNoteFontSize",
      "setStickyNoteFontColor"
    ].includes(tool)) {
      content["drawId"] = content["drawId"] ? content["drawId"] : _this.drawId;
      content["username"] = content["username"] ? content["username"] : _this.settings.username;
      _this.drawBuffer.push(content);
    }
  },
  userLeftWhiteboard(username) {
    this.cursorContainer.find("." + username).remove();
  },
  refreshUserBadges() {
    this.cursorContainer.find(".userbadge").remove();
  },
  getImageDataBase64(options, callback) {
    var _this = this;
    var width = this.mouseOverlay.width();
    var height = this.mouseOverlay.height();
    var copyCanvas = (void 0).createElement("canvas");
    copyCanvas.width = width;
    copyCanvas.height = height;
    var imageFormat = options.imageFormat || "png";
    var drawBackgroundGrid = options.drawBackgroundGrid || false;
    var brackGroundImg = new Image();
    brackGroundImg.src = _this.settings.backgroundGridUrl;
    brackGroundImg.onload = function() {
      var destCtx = copyCanvas.getContext("2d");
      if (imageFormat === "jpeg") {
        destCtx.fillStyle = "#FFFFFF";
        destCtx.fillRect(0, 0, width, height);
      }
      if (drawBackgroundGrid) {
        destCtx.globalAlpha = 0.8;
        var ptrn = destCtx.createPattern(brackGroundImg, "repeat");
        destCtx.fillStyle = ptrn;
        destCtx.fillRect(0, 0, copyCanvas.width, copyCanvas.height);
        destCtx.globalAlpha = 1;
      }
      $.each(_this.imgContainer.find("img"), function() {
        var width2 = $(this).width();
        var height2 = $(this).height();
        var p = $(this).position();
        var left = Math.round(p.left * 100) / 100;
        var top = Math.round(p.top * 100) / 100;
        destCtx.drawImage(this, left, top, width2, height2);
      });
      destCtx.drawImage(_this.canvas, 0, 0);
      var textBoxCnt = 0;
      $.each($(".textBox"), function() {
        textBoxCnt++;
        var textContainer = $(this);
        var p = textContainer.position();
        var left = Math.round(p.left * 100) / 100;
        var top = Math.round(p.top * 100) / 100;
        html2canvas(this, {
          backgroundColor: "rgba(0, 0, 0, 0)",
          removeContainer: true
        }).then(function(canvas) {
          console.log("canvas", canvas);
          destCtx.drawImage(canvas, left, top);
          textBoxCnt--;
          checkForReturn();
        });
      });
      var stickyNoteCnt = 0;
      $.each($(".stickyNote"), function() {
        stickyNoteCnt++;
        var stickyContainer = $(this);
        var p = stickyContainer.position();
        var left = Math.round(p.left * 100) / 100;
        var top = Math.round(p.top * 100) / 100;
        html2canvas(this, {
          backgroundColor: "rgba(0, 0, 0, 0)",
          removeContainer: true
        }).then(function(canvas) {
          console.log("canvas", canvas);
          destCtx.drawImage(canvas, left, top);
          stickyNoteCnt--;
          checkForReturn();
        });
      });
      function checkForReturn() {
        if (textBoxCnt == 0 && stickyNoteCnt == 0) {
          var url = copyCanvas.toDataURL("image/" + imageFormat);
          callback(url);
        }
      }
      checkForReturn();
    };
  },
  getImageDataJson() {
    var sendObj = [];
    for (var i = 0; i < this.drawBuffer.length; i++) {
      sendObj.push(JSON.parse(JSON.stringify(this.drawBuffer[i])));
      delete sendObj[i]["username"];
      delete sendObj[i]["wid"];
      delete sendObj[i]["drawId"];
    }
    return JSON.stringify(sendObj, null, 2);
  },
  loadData: function(content) {
    var _this = this;
    _this.loadDataInSteps(content, true, function(stepData) {
      if (stepData["username"] == _this.settings.username && _this.drawId < stepData["drawId"]) {
        _this.drawId = stepData["drawId"] + 1;
      }
    });
  },
  loadDataInSteps(content, isNewData, callAfterEveryStep) {
    var _this = this;
    function lData(index) {
      for (var i = index; i < content.length; i++) {
        if (content[i]["t"] === "addImgBG" && content[i]["draw"] == "1") {
          _this.handleEventsAndData(content[i], isNewData, function() {
            callAfterEveryStep(content[i], i);
            lData(i + 1);
          });
          break;
        } else {
          _this.handleEventsAndData(content[i], isNewData);
          callAfterEveryStep(content[i], i);
        }
      }
    }
    lData(0);
  },
  loadJsonData(content, doneCallback) {
    var _this = this;
    _this.loadDataInSteps(content, false, function(stepData, index) {
      _this.sendFunction(stepData);
      if (index >= content.length - 1) {
        _this.drawId++;
        if (doneCallback) {
          doneCallback();
        }
      }
    });
  },
  sendFunction: function(content) {
    var _this = this;
    content["wid"] = _this.settings.whiteboardId;
    content["username"] = _this.settings.username;
    content["drawId"] = _this.drawId;
    var tool = content["t"];
    if (_this.settings.sendFunction) {
      _this.settings.sendFunction(content);
    }
    if ([
      "line",
      "pen",
      "rect",
      "circle",
      "eraser",
      "addImgBG",
      "recSelect",
      "eraseRec",
      "addTextBox",
      "setTextboxText",
      "removeTextbox",
      "setTextboxPosition",
      "setTextboxFontSize",
      "setTextboxFontColor",
      "addStickyNote",
      "setStickyNoteTitleText",
      "setStickyNoteDesc",
      "removeStickyNote",
      "setStickyNotePosition",
      "setStickyNoteFontSize",
      "setStickyNoteFontColor"
    ].includes(tool)) {
      _this.drawBuffer.push(content);
    }
  },
  refreshCursorAppearance() {
    var _this = this;
    if (_this.tool === "pen" || _this.tool === "eraser" || _this.tool == "sticky") {
      _this.mouseOverlay.css({ cursor: "none" });
    } else if (_this.tool === "mouse") {
      this.mouseOverlay.css({ cursor: "default" });
    } else {
      _this.mouseOverlay.css({ cursor: "crosshair" });
    }
  }
};
function lanczosKernel(x) {
  if (x == 0) {
    return 1;
  }
  return 2 * Math.sin(Math.PI * x) * Math.sin(Math.PI * x / 2) / Math.pow(Math.PI * x, 2);
}
function lanczosInterpolate(xm1, ym1, x0, y0, x1, y1, x2, y2, a) {
  var cm1 = lanczosKernel(1 + a);
  var c0 = lanczosKernel(a);
  var c1 = lanczosKernel(1 - a);
  var c2 = lanczosKernel(2 - a);
  var delta = (cm1 + c0 + c1 + c2 - 1) / 4;
  cm1 -= delta;
  c0 -= delta;
  c1 -= delta;
  c2 -= delta;
  return [cm1 * xm1 + c0 * x0 + c1 * x1 + c2 * x2, cm1 * ym1 + c0 * y0 + c1 * y1 + c2 * y2];
}

export { whiteboard as default };
//# sourceMappingURL=whiteboard-DD4_hElL.mjs.map
