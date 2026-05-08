<template>
    <div>
        <!---Whiteboard container -!-->
        <div id="whiteboardContainer"></div>
        <!---Toolbar -!-->
        <div id="toolbar" style="position: absolute; top: 10px; left: 10px;">
            <!-- <v-btn-toggle>
                    <v-btn>
                        <v-icon>mdi-lock</v-icon>
                    </v-btn>
                    <v-btn>
                        <v-icon>mdi-lock-open</v-icon>
                    </v-btn>
                </v-btn-toggle> -->
            <div class="btn-group">
                <button v-if="readOnlyActive" id="whiteboardLockBtn" @click="deactivateReadOnlyMode($event)" style="background-color: orange;" title="View and Write" type="button">
                    <v-icon>mdi-lock</v-icon>
                    <!-- <i class="fa fa-lock"></i> -->
                </button>
                <button v-else id="whiteboardUnlockBtn" @click="activateReadOnlyMode($event)" title="View Only" type="button">
                    <!-- <i class="fa fa-lock-open"></i> -->
                    <v-icon>mdi-lock-open</v-icon>
                </button>
            </div>
            <div class="btn-group whiteboard-edit-group" :class="disableTool ? 'group-disabled': ''">
                <button id="whiteboardTrashBtn" title="Clear the whiteboard" type="button">
                    <!-- <i class="fa fa-trash"></i> -->
                    <v-icon>mdi-delete</v-icon>
                </button>
                <button style="position: absolute; left: 0px; top: 0px; width: 46px; display: none;" id="whiteboardTrashBtnConfirm" title="Confirm clear..." type="button">
                    <!-- <i class="fa fa-check"></i> -->
                    <v-icon>mdi-check</v-icon>
                </button>
                <button id="whiteboardUndoBtn" title="Undo your last step" type="button">
                    <!-- <i class="fa fa-undo"></i> -->
                    <v-icon>mdi-undo-variant</v-icon>
                </button>
                <button id="whiteboardRedoBtn" title="Redo your last undo" type="button">
                    <!-- <i class="fa fa-redo"></i> -->
                    <v-icon>mdi-redo-variant</v-icon>
                </button>
            </div>
            <div class="btn-group whiteboard-edit-group" :class="disableTool ? 'group-disabled': ''">
                <button tool="mouse" title="Take the mouse" type="button" class="whiteboard-tool" :disabled="disableTool">
                    <!-- <i class="fa fa-mouse-pointer"></i> -->
                    <v-icon>mdi-arrow-top-left-thick</v-icon>
                </button>
                <button tool="recSelect" title="Select an area" type="button" class="whiteboard-tool" :disabled="disableTool">
                    <!-- <img src="~assets/images/dottedRec.png" /> -->
                    <v-icon>mdi-border-none-variant</v-icon>
                </button>
                <button tool="pen" title="Take the pen" type="button" class="whiteboard-tool active" :disabled="disableTool">
                    <!-- <i class="fa fa-pencil-alt"></i> -->
                    <v-icon>mdi-lead-pencil</v-icon>
                </button>
                <button style="padding-bottom: 8px; padding-top: 6px;" tool="line" title="draw a line" type="button" class="whiteboard-tool" :disabled="disableTool">
                    ╱
                </button>
                <button tool="rect" title="draw a rectangle" type="button" class="whiteboard-tool" :disabled="disableTool">
                    <!-- <i class="far fa-square"></i> -->
                    <v-icon>mdi-square-outline</v-icon>
                </button>
                <button tool="circle" title="draw a circle" type="button" class="whiteboard-tool" :disabled="disableTool">
                    <!-- <i class="far fa-circle"></i> -->
                    <v-icon>mdi-circle-outline</v-icon>
                </button>
                <button tool="text" title="write text" type="button" class="whiteboard-tool" :disabled="disableTool">
                    <!-- <i class="fas fa-font"></i> -->
                    <v-icon>mdi-format-text-variant</v-icon>
                </button>
                <button tool="eraser" title="take the eraser" type="button" class="whiteboard-tool" :disabled="disableTool">
                    <!-- <i class="fa fa-eraser"></i> -->
                    <v-icon>mdi-eraser-variant</v-icon>
                </button>
            </div>
            <div class="btn-group whiteboard-edit-group" :class="disableTool ? 'group-disabled': ''">
                <button tool="sticky" title="Add Sticky Note" type="button" class="whiteboard-tool" :disabled="disableTool">
                    <v-icon>mdi-bookmark-plus</v-icon>
                </button>
            </div>
            <div class="btn-group whiteboard-edit-group" :class="disableTool ? 'group-disabled': ''">
                <button style="width: 190px; cursor: default;" :disabled="disableTool">
                    <div class="activeToolIcon" style="position: absolute; top: 2px; left: 2px; font-size: 0.6em;">
                        <i class="fa fa-pencil-alt"></i>
                    </div>
                    <img alt="" style="position: absolute;left: 11px;top: 16px;height: 14px;width: 130px;" src="~assets/images/slider-background.svg" />
                    <input title="Thickness" id="whiteboardThicknessSlider" style="position: absolute; left: 9px; width: 130px; top: 15px;" type="range" min="1" max="50" value="3" />
                    <v-text-field hide-mode-switch v-model="color" width="40" hide-details class="ma-0 pa-0 select-brush-color" solo id="whiteboardColorpicker" style="position: absolute;left: 155px;top: 10px;width: 25px;height: 25px;border-radius: 4px;border: 1px solid darkgrey;">
                        <template v-slot:append>
                            <v-menu v-model="menu" top nudge-bottom="105" nudge-left="16" :close-on-content-click="false">
                                <template v-slot:activator="{ on }">
                                    <div class="select-brush-color-menu" :style="swatchStyle" v-on="on" />
                                </template>
                                <v-card>
                                    <v-card-text class="pa-0">
                                        <v-color-picker v-model="color" @input="updateDrawColor" flat />
                                    </v-card-text>
                                </v-card>
                            </v-menu>
                        </template>
                    </v-text-field>
                    <!-- <div id="whiteboardColorpicker" style="position: absolute;left: 155px;top: 10px;width: 26px;height: 23px;border-radius: 3px;border: 1px solid darkgrey;" data-color="#000000"></div> -->
                </button>
            </div>
            <div class="btn-group whiteboard-edit-group" :class="disableTool ? 'group-disabled': ''">
                <button id="addImgToCanvasBtn" title="Upload Image to whiteboard" type="button" :disabled="disableTool">
                    <!-- <i class="fas fa-image"></i>
                        <i style="position: absolute;top: 3px;left: 2px;color: #000000;font-size: 0.5em;" class="fas fa-upload"></i> -->
                    <v-icon>mdi-image</v-icon>
                    <v-icon style="position: absolute;top: 3px;left: 2px;color: #000000;font-size: 0.6em;">mdi-upload</v-icon>
                </button>
                <button style="position: relative;" id="uploadJsonBtn" title="Load saved JSON to whiteboard" type="button" :disabled="disableTool">
                    <!-- <i class="far fa-file-alt"></i>
                        <i style="position: absolute;top: 3px;left: 2px;color: #000000;font-size: 0.5em;" class="fas fa-upload"></i> -->
                    <v-icon>mdi-file-document-outline</v-icon>
                    <v-icon style="position: absolute;top: 3px;left: 2px;color: #000000;font-size: 0.6em;">mdi-upload</v-icon>
                </button>
                <input style="display: none;" id="myFile" type="file" />
            </div>
            <div class="btn-group">
                <button id="saveAsImageBtn" title="Save whiteboard as image" type="button">
                    <!-- <i class="fas fa-image"></i>
                        <i style="position: absolute;top: 3px;left: 2px;color: #000000;font-size: 0.5em;" class="fas fa-save"></i> -->
                    <v-icon>mdi-image</v-icon>
                    <v-icon style="position: absolute;top: 3px;left: 2px;color: #000000;font-size: 0.6em;">mdi-content-save</v-icon>
                </button>
                <button v-if="isWebDav" style="position: relative;" id="uploadWebDavBtn" title="Save whiteboard to webdav" type="button">
                    <!-- <i class="fas fa-globe"></i>
                        <i style="position: absolute;top: 3px;left: 2px;color: #000000;font-size: 0.5em;" class="fas fa-save"></i> -->
                    <v-icon>mdi-earth</v-icon>
                    <v-icon style="position: absolute;top: 3px;left: 2px;color: #000000;font-size: 0.6em;">mdi-content-save</v-icon>
                </button>
                <button style="position: relative;" id="saveAsJSONBtn" title="Save whiteboard as JSON" type="button">
                    <!-- <i class="far fa-file-alt"></i> -->
                    <v-icon>mdi-file-document-outline</v-icon>
                    <v-icon style="position: absolute;top: 3px;left: 2px;color: #000000;font-size: 0.6em;">mdi-content-save</v-icon>
                    <!-- <i style="position: absolute;top: 3px;left: 2px;color: #000000;font-size: 0.5em;" class="fas fa-save"></i> -->
                </button>
                <button id="shareWhiteboardBtn" title="share whiteboard" type="button">
                    <!-- <i class="fas fa-share-square"></i> -->
                    <v-icon>mdi-share-all</v-icon>
                </button>
                <button id="displayWhiteboardInfoBtn" title="Show whiteboard info" type="button">
                    <!-- <i class="fas fa-info-circle"></i> -->
                    <v-icon>mdi-information</v-icon>
                </button>
            </div>
            <div class="btn-group minGroup">
                <button style="width: 25px;" id="minMaxBtn" title="hide buttons" type="button">
                    <!-- <i id="minBtn" style="position: relative; left: -5px;" class="fas fa-angle-left"></i> -->
                    <v-icon id="minBtn" style="">mdi-chevron-left</v-icon>
                    <v-icon id="maxBtn" style="display: none;">mdi-chevron-right</v-icon>
                    <!-- <i id="maxBtn" style="position: relative; left: -5px; display: none;" class="fas fa-angle-right"></i> -->
                </button>
            </div>
        </div>
        <div id="whiteboardInfoContainer">
            <p><b>Whiteboard information:</b></p>
            <p># connected users: <i id="connectedUsersCount">0</i></p>
            <p>Smallest screen resolution: <i id="smallestScreenResolution">Unknown.</i></p>
            <p># msg. sent to server: <i id="messageSentCount">0</i></p>
            <p># msg. received from server: <i id="messageReceivedCount">0</i></p>
        </div>
        <div id="shareWhiteboardDialog" class="displayNone">
            <div class="shareWhiteboardDialogContent">
                <div class="share-whiteboard share-whiteboard info white--text pa-3 rounded-lg d-flex flex-column">
                    <v-btn text color="white" class="shareWhiteboardDialogItem whtie--text text-capitalize" id="shareWhiteboardDialogCopyReadOnlyLink"><v-icon class="white--text" left>mdi-lock</v-icon> Share read-only link</v-btn>
                    <v-btn text color="white" class="whtie--text text-capitalize shareWhiteboardDialogItem" id="shareWhiteboardDialogCopyReadWriteLink"><v-icon class="white--text" left>mdi-lock-open</v-icon>&nbsp;Share read/write link</v-btn>
                    <v-btn text color="white" class="whtie--text text-capitalize shareWhiteboardDialogItem" id="shareWhiteboardDialogGoBack">Go back to the whiteboard</v-btn>
                    <!-- <button class="d-flex align-center">
                        <v-icon class="white--text">mdi-lock</v-icon>&nbsp;Share read-only link
                    </button> -->
                    <!-- <button class="d-flex align-center shareWhiteboardDialogItem displayNone" id="shareWhiteboardDialogCopyReadWriteLink">
                        <v-icon class="white--text">mdi-lock-open</v-icon>&nbsp;Share read/write link
                    </button> -->
                    <!-- <button class="shareWhiteboardDialogItem">
                        <b>Go back to the whiteboard</b>
                    </button> -->
                    <p class="shareWhiteboardDialogItem displayNone" id="shareWhiteboardDialogMessage"></p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useAuthStore } from '~/stores/auth'
import keybinds from './js/keybinds'
import io from 'socket.io-client'
import whiteboard from './js/whiteboard'
import { dom } from '@fortawesome/fontawesome-svg-core'
import pdfjsLib from 'pdfjs-dist'
import shortcutFunctions from './js/shortcutFunctions'
import ReadOnlyService from './js/services/ReadOnlyService'
import InfoService from './js/services/InfoService'
import { getSubDir } from './js/utils'
import ConfigService from './js/services/ConfigService'
import { v4 as uuidv4 } from 'uuid'

definePageMeta({ middleware: ['refresh-token', 'authenticated'] })
useHead({ title: 'SpotBrush | Whiteboard' })

const auth = useAuthStore()
const { $axios } = useNuxtApp()

const whiteboardId = ref("")
const color = ref("#ff6634ff")
const menu = ref(false)
const isWebDav = ref(false)
const readOnlyActive = ref(true)
const disableTool = ref(false)
const isJqueryLoaded = ref(false)
const jQueryUILoaded = ref(false)
const keyBindings = ref(false)
const windowSize = reactive({ width: 0, height: 0 })
let signaling_socket = null
let previousToolHtmlElem = null
let myUsername = ""

const swatchStyle = computed(() => ({
  backgroundColor: color.value,
  cursor: "pointer",
  height: "30px",
  width: "30px",
  borderRadius: menu.value ? "50%" : "4px",
  transition: "border-radius 200ms ease-in-out"
}))

function updateDrawColor() { whiteboard.setDrawColor(color.value) }
function handleResize() { windowSize.width = window.innerWidth; windowSize.height = window.innerHeight }
function activateReadOnlyMode(e) {
  if (e) e.stopImmediatePropagation()
  readOnlyActive.value = true
  previousToolHtmlElem = document.querySelector(".whiteboard-tool.active")
  disableTool.value = true
}
function deactivateReadOnlyMode(e) {
  if (e) e.stopImmediatePropagation()
  if (ConfigService.isReadOnly) return
  readOnlyActive.value = false
  disableTool.value = false
  previousToolHtmlElem && previousToolHtmlElem.click()
}

function pasteHandler(e) {
  if (document.querySelectorAll(".basicalert").length > 0) return
  if (!e.clipboardData) return
  const items = e.clipboardData.items
  let imgItemFound = false
  if (items) {
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        imgItemFound = true
        const blob = items[i].getAsFile()
        const reader = new window.FileReader()
        reader.readAsDataURL(blob)
        reader.onloadend = () => { uploadImgAndAddToWhiteboard(reader.result) }
      }
    }
  }
  if (!imgItemFound && whiteboard.tool !== "text" && whiteboard.tool !== "sticky") {
    showBasicAlert("Please Drag&Drop the image or pdf into the Whiteboard.")
  }
}

function showBasicAlert(html, newOptions) {
  const options = Object.assign({ header: "INFO MESSAGE", okBtnText: "Ok", headercolor: "#d25d5d", hideAfter: false, onOkClick: false }, newOptions)
  const alertEl = document.createElement("div")
  alertEl.className = "basicalert"
  alertEl.style.cssText = "position:absolute;left:0;width:100%;top:70px;font-family:monospace;z-index:9999"
  alertEl.innerHTML = `<div style="width:30%;margin:auto;background:#aaa;border-radius:5px;font-size:1.2em;border:1px solid gray"><div style="border-bottom:1px solid #676767;background:${options.headercolor};padding:5px">${options.header}<span style="float:right;cursor:pointer" class="closeAlert">?</span></div><div class="htmlcontent" style="padding:10px"></div><div style="padding:0 12px 12px;text-align:right"><button class="okbtn">${options.okBtnText}</button></div></div>`
  if (typeof html === "string") alertEl.querySelector(".htmlcontent").innerHTML = html
  else alertEl.querySelector(".htmlcontent").appendChild(html)
  document.body.appendChild(alertEl)
  alertEl.querySelector(".okbtn").addEventListener("click", () => { if (options.onOkClick) options.onOkClick(); alertEl.remove() })
  alertEl.querySelector(".closeAlert").addEventListener("click", () => alertEl.remove())
  if (options.hideAfter) setTimeout(() => alertEl.querySelector(".okbtn")?.click(), 1000 * options.hideAfter)
}

function initWhiteboard(socketIO) {
  if (!auth.auth) return
  const { email, jwt } = auth.auth
  const wid = whiteboardId.value
  ReadOnlyService.activateReadOnlyMode({ readOnlyActive, disableTool, previousToolHtmlElem })
  if (new URLSearchParams(window.location.search).get("webdav") === "true") isWebDav.value = true
  whiteboard.loadWhiteboard("#whiteboardContainer", {
    whiteboardId: wid,
    username: btoa(myUsername),
    backgroundGridUrl: "./images/" + ConfigService.backgroundGridImage,
    sendFunction(content) {
      if (readOnlyActive.value || !auth.auth) return
      content.at = auth.auth.jwt
      socketIO.emit("drawToWhiteboard", content)
      InfoService.incrementNbMessagesSent()
    },
  })
  $axios.get(`/api/loadwhiteboard?wid=${wid}&at=${jwt}`, { headers: { Authorization: `Bearer ${jwt}` } })
    .then(res => whiteboard.loadData(res.data?.ret))
    .catch(err => console.error(err.message))
  // jQuery-based toolbar wiring (runs after mount)
  setupToolbar(socketIO, jwt)
}

function setupToolbar(socketIO, jwt) {
  const $ = window.$
  if (!$) return
  const $self = { readOnlyActive, disableTool, whiteboardId, showBasicAlert, $axios }
  $(".whiteboard-tool").off("click").click(function() {
    $(".whiteboard-tool").removeClass("active"); $(this).addClass("active")
    const activeTool = $(this).attr("tool")
    whiteboard.setTool(activeTool)
    if (activeTool === "mouse" || activeTool === "recSelect") $(".activeToolIcon").empty()
    else $(".activeToolIcon").html($(this).html())
  })
  $("#whiteboardTrashBtn").off("click").click(function() { $("#whiteboardTrashBtnConfirm").show().focus(); $(this).css({ visibility: "hidden" }) })
  $("#whiteboardTrashBtnConfirm").mouseout(function() { $(this).hide(); $("#whiteboardTrashBtn").css({ visibility: "inherit" }) })
  $("#whiteboardTrashBtnConfirm").off("click").click(function() {
    $(this).hide(); $("#whiteboardTrashBtn").css({ visibility: "inherit" })
    whiteboard.clearWhiteboard()
    $axios.delete("/clearWhiteboard").catch(err => console.error(err.message))
  })
  $("#whiteboardUndoBtn").off("click").click(() => whiteboard.undoWhiteboardClick())
  $("#whiteboardRedoBtn").off("click").click(() => whiteboard.redoWhiteboardClick())
  $("#saveAsImageBtn").off("click").click(() => {
    whiteboard.getImageDataBase64({ imageFormat: ConfigService.imageDownloadFormat, drawBackgroundGrid: ConfigService.drawBackgroundGrid }, (imgData) => {
      const a = document.createElement("a"); a.href = imgData; a.download = "whiteboard." + ConfigService.imageDownloadFormat; document.body.appendChild(a); a.click(); document.body.removeChild(a)
    })
  })
  $("#saveAsJSONBtn").off("click").click(() => {
    const a = document.createElement("a")
    a.href = window.URL.createObjectURL(new Blob([whiteboard.getImageDataJson()], { type: "text/json" }))
    a.download = "whiteboard.json"; document.body.appendChild(a); a.click(); document.body.removeChild(a)
  })
  $("#whiteboardThicknessSlider").on("input", function() { if (!readOnlyActive.value) whiteboard.setStrokeThickness($(this).val()) })
  whiteboard.setDrawColor(color.value)
  shortcutFunctions.setTool_mouse()
  whiteboard.refreshCursorAppearance()
  ReadOnlyService.deactivateReadOnlyMode({ readOnlyActive, disableTool, previousToolHtmlElem })
  InfoService.displayInfo()
  if (ConfigService.isReadOnly) ReadOnlyService.activateReadOnlyMode()
}

function main() {
  if (!auth.auth) return
  const { jwt } = auth.auth
  const socketEndPoint = useRuntimeConfig().public.baseURL
  signaling_socket = io(socketEndPoint, { transports: ["websocket"] })
  signaling_socket.on("connect", () => {
    signaling_socket.on("whiteboardConfig", (cfg) => { ConfigService.initFromServer(cfg); initWhiteboard(signaling_socket) })
    signaling_socket.on("whiteboardInfoUpdate", (info) => { InfoService.updateInfoFromServer(info); whiteboard.updateSmallestScreenResolution() })
    signaling_socket.on("drawToWhiteboard", (content) => { whiteboard.handleEventsAndData(content, true); InfoService.incrementNbMessagesReceived() })
    signaling_socket.on("refreshUserBadges", () => whiteboard.refreshUserBadges())
    signaling_socket.on("wrongAccessToken", () => showBasicAlert("Access denied! Wrong accessToken!"))
    signaling_socket.emit("joinWhiteboard", { wid: whiteboardId.value, at: jwt, windowWidthHeight: { w: windowSize.width, h: windowSize.height } })
  })
}

function uploadImgAndAddToWhiteboard(base64data) {
  const date = +new Date()
  $axios.post("/upload", { data: { imagedata: base64data, whiteboardId: whiteboardId.value, date, at: auth.auth?.jwt } })
    .then(msg => whiteboard.addImgToCanvasByUrl(`/uploads/${msg.data.url}`))
    .catch(err => showBasicAlert("Failed to upload: " + err.message))
}

onMounted(() => {
  window.addEventListener("resize", handleResize)
  window.addEventListener("paste", pasteHandler)
  handleResize()
  const urlParams = new URLSearchParams(window.location.search)
  let wid = urlParams.get("whiteboardid")
  const randomid = urlParams.get("randomid")
  if (randomid) { wid = uuidv4(); urlParams.delete("randomid"); window.location.search = urlParams.toString() }
  if (!wid) wid = "myNewWhiteboard"
  wid = unescape(encodeURIComponent(wid)).replace(/[^a-zA-Z0-9-]/g, "")
  whiteboardId.value = wid
  myUsername = urlParams.get("username") || "Anonymus" + (Math.random() + "").substring(2, 6)
  auth.setWhiteboard(true)
  main()
})

onUnmounted(() => {
  window.removeEventListener("resize", handleResize)
  window.removeEventListener("paste", pasteHandler)
  auth.removeKeyBinds(false)
  auth.setWhiteboard(false)
  if (signaling_socket) signaling_socket.disconnect()
})
</script>
<style lang="scss" scoped>
@import '~/assets/css/whiteboard/main.css';

i.v-icon {
    color: black;
}

/* #whiteboardContainer {
    background: url(~assets/images/bg_grid.png);
} */

.activeToolIcon {
    .v-icon {
        font-size: 1.5em;
    }
}

.whiteboard-tool {
    &.active {
        &:not(:disabled){
            background: #dfdfdf;
        }
    }
}
.ui-resizable-handle {
    background: none;
}
</style>
<style lang="scss">
.select-brush-color {

    // .v-text-field.v-text-field--solo .v-input__control {
    //     min-height: unset !important;
    // }
    .v-input {
        min-height: unset !important;
        height: 100%;

        &__control {
            min-height: unset !important;
            height: 100%;

            .v-text-field__slot {
                display: none !important;
            }
        }

        &__slot {
            height: 100%;
            padding: 0 !important;
            display: block;
        }

        &__append-inner {
            padding: 0 !important;
            width: 100%;
            height: 100%;

            div {
                height: 100% !important;
                width: 100% !important;
            }
        }
    }
}
</style>

<style lang="scss">
.stickycontainer {
  cursor: url('../../assets/images/thumb-tack.svg'), auto;

  .note {
    float: left;
    display: block;
    position: relative;
    padding: 1em;
    width: 250px;
    min-height: 250px;
    // margin: 0 10px 10px 0;
    background: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0.05)), to(rgba(0, 0, 0, 0.25)));
    background: linear-gradient(to right, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.25));
    background-color: #fffd75;
    box-shadow: 5px 5px 10px -2px rgba(33, 33, 33, 0.3);
    -webkit-transform: rotate(2deg);
    transform: rotate(2deg);
    -webkit-transform: skew(-1deg, 1deg);
    transform: skew(-1deg, 1deg);
    -webkit-transition: -webkit-transform 0.15s;
    transition: -webkit-transform 0.15s;
    transition: transform 0.15s;
    transition: transform 0.15s, -webkit-transform 0.15s;
    // z-index: 1;
  }

  .note:hover {
    cursor: move;
  }

  .note.ui-draggable-dragging:nth-child(n) {
    box-shadow: 5px 5px 15px 0 rgba(0, 0, 0, 0.3);
    -webkit-transform: scale(1.125) !important;
    transform: scale(1.125) !important;
    z-index: 100;
    cursor: move;
    -webkit-transition: -webkit-transform 0.15s;
    transition: -webkit-transform 0.15s;
    transition: transform 0.15s;
    transition: transform 0.15s, -webkit-transform 0.15s;
  }

  .note textarea {
    background-color: transparent;
    border: none;
    resize: vertical;
    width: 100%;
    padding: 5px;
    font-size: 16px;
  }

  .note textarea:focus {
    outline: none;
    border: none;
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2) inset;
    // mix-blend-mode: unset !important;
  }

  .note textarea.sticky-note-title {
    font-size: 16px;
    font-weight: 700;
    color: #000000;
    // height: 64px;
    // margin-top: 20px;
  }

  .note textarea.cnt {
    min-height: 200px;
  }
  .stickyNote>.removeIcon,
  .stickyNote>.moveIcon {
    display: none;
  }

  .stickyNote.active>.removeIcon {
    display: block;
  }
}
.textcontainer {

  .textBox.active {
    border: 1px dashed gray;
  }

  .textBox>.removeIcon,
  .textBox>.moveIcon {
    display: none;
  }

  .textBox.active>.removeIcon,
  .textBox.active>.moveIcon {
    display: block;
  }
}

</style>
