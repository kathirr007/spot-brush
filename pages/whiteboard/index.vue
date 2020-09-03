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
                <button id="whiteboardLockBtn" style="background-color: orange;" title="View and Write" type="button">
                    <v-icon>mdi-lock</v-icon>
                    <!-- <i class="fa fa-lock"></i> -->
                </button>
                <button id="whiteboardUnlockBtn" title="View Only" type="button">
                    <!-- <i class="fa fa-lock-open"></i> -->
                    <v-icon>mdi-lock-open</v-icon>
                </button>
            </div>
            <div class="btn-group whiteboard-edit-group">
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
            <div class="btn-group whiteboard-edit-group">
                <button tool="mouse" title="Take the mouse" type="button" class="whiteboard-tool">
                    <!-- <i class="fa fa-mouse-pointer"></i> -->
                    <v-icon>mdi-arrow-top-left-thick</v-icon>
                </button>
                <button tool="recSelect" title="Select an area" type="button" class="whiteboard-tool">
                    <!-- <img src="~assets/images/dottedRec.png" /> -->
                    <v-icon>mdi-border-none-variant</v-icon>
                </button>
                    <button tool="pen" title="Take the pen" type="button" class="whiteboard-tool active">
                        <!-- <i class="fa fa-pencil-alt"></i> -->
                        <v-icon>mdi-lead-pencil</v-icon>
                    </button>
                    <button style="padding-bottom: 8px; padding-top: 6px;" tool="line" title="draw a line" type="button" class="whiteboard-tool">
                        ╱
                    </button>
                    <button tool="rect" title="draw a rectangle" type="button" class="whiteboard-tool">
                        <!-- <i class="far fa-square"></i> -->
                        <v-icon>mdi-square-outline</v-icon>
                    </button>
                    <button tool="circle" title="draw a circle" type="button" class="whiteboard-tool">
                        <!-- <i class="far fa-circle"></i> -->
                        <v-icon>mdi-circle-outline</v-icon>
                    </button>
                    <button tool="text" title="write text" type="button" class="whiteboard-tool">
                        <!-- <i class="fas fa-font"></i> -->
                        <v-icon>mdi-format-text-variant</v-icon>
                    </button>
                    <button tool="eraser" title="take the eraser" type="button" class="whiteboard-tool">
                        <!-- <i class="fa fa-eraser"></i> -->
                        <v-icon>mdi-eraser-variant</v-icon>
                    </button>
            </div>
            <div class="btn-group whiteboard-edit-group">
                <button style="width: 190px; cursor: default;">
                    <div class="activeToolIcon" style="position: absolute; top: 2px; left: 2px; font-size: 0.6em;">
                        <i class="fa fa-pencil-alt"></i>
                    </div>
                    <img style="position: absolute;left: 11px;top: 16px;height: 14px;width: 130px;" src="~assets/images/slider-background.svg" />
                    <input title="Thickness" id="whiteboardThicknessSlider" style="position: absolute; left: 9px; width: 130px; top: 15px;" type="range" min="1" max="50" value="3" />
                    <v-text-field hide-mode-switch v-model="color" width="40" hide-details class="ma-0 pa-0 select-brush-color" solo  id="whiteboardColorpicker" style="position: absolute;left: 155px;top: 10px;width: 25px;height: 25px;border-radius: 4px;border: 1px solid darkgrey;">
                        <template v-slot:append>
                            <v-menu v-model="menu"  top nudge-bottom="105" nudge-left="16" :close-on-content-click="false">
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
            <div class="btn-group whiteboard-edit-group">
                <button id="addImgToCanvasBtn" title="Upload Image to whiteboard" type="button">
                    <!-- <i class="fas fa-image"></i>
                    <i style="position: absolute;top: 3px;left: 2px;color: #000000;font-size: 0.5em;" class="fas fa-upload"></i> -->
                    <v-icon>mdi-image</v-icon>
                    <v-icon style="position: absolute;top: 3px;left: 2px;color: #000000;font-size: 0.6em;">mdi-upload</v-icon>
                </button>
                <button style="position: relative;" id="uploadJsonBtn" title="Load saved JSON to whiteboard" type="button">
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
                <button class="shareWhiteboardDialogItem" id="shareWhiteboardDialogCopyReadOnlyLink">
                    <i class="fa fa-lock"></i>&nbsp;Share read-only link
                </button>
                <button class="shareWhiteboardDialogItem displayNone" id="shareWhiteboardDialogCopyReadWriteLink">
                    <i class="fa fa-lock-open"></i>&nbsp;Share read/write link
                </button>
                <button class="shareWhiteboardDialogItem" id="shareWhiteboardDialogGoBack">
                    <b>Go back to the whiteboard</b>
                </button>
                <p class="shareWhiteboardDialogItem displayNone" id="shareWhiteboardDialogMessage"></p>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    // import "jquery-ui/ui/core";
    // import "jquery-ui/ui/widgets/draggable";
    // import "jquery-ui/ui/widgets/resizable";
    // import "jquery-ui-rotatable/jquery.ui.rotatable";
    // import "jquery-ui/themes/base/resizable.css";

    import io from "socket.io-client";

    // import Picker from "vanilla-picker";
    import { dom } from "@fortawesome/fontawesome-svg-core";
    import pdfjsLib from "pdfjs-dist";
    import keybinds from "./js/keybinds";
    import whiteboard from "./js/whiteboard";
    import shortcutFunctions from "./js/shortcutFunctions";
    import ReadOnlyService from "./js/services/ReadOnlyService";
    import InfoService from "./js/services/InfoService";
    import { getSubDir } from "./js/utils";
    import ConfigService from "./js/services/ConfigService";
    import { v4 as uuidv4 } from "uuid";

    export default {
        middleware: ['refreshToken', 'authenticated'],
        head: {
            // title: process.env.npm_package_name || "",
            title: `SpotBrush | Whiteboard`,
            meta: [],
            link: [
                // { rel: 'stylesheet', type: 'text/css', href: '../assets/css/whiteboard/main.css' }
            ],
            script: [
                // {src: '~assets/js/amazon-cognito-auth.min.js', crossorigin :'anonymous'},
                // { src: '../js/cognito_config.js', crossorigin: 'anonymous', body: true },
                // { src: '/js/whiteboard/whiteboard.js', type:'module', crossorigin: 'anonymous', body: true },
                // { src: '/js/whiteboard/keybind.js', type:'module', crossorigin: 'anonymous', body: true },
                { src: "https://code.jquery.com/jquery-3.3.1.slim.min.js", type: "text/javascript" },
            ],
        },
        data() {
            return {
                // urlParams : '',
                whiteboardId: '',
                randomid : '',
                // myUsername: '',
                // accessToken: '',
                signaling_socket: null,
                subdir : null,
                color: '#ff6634ff',
                // mask: '!#XXXXXXXX',
                menu: false,
                isWebDav: false,
                window: {
                    width: 0,
                    height: 0
                },
            }
        },
        mounted() {
            window.addEventListener('resize', this.handleResize);
            this.handleResize();
            // this.urlParams = new URLSearchParams(window.location.search)
            this.whiteboardId = this.urlParams.get('whiteboardid')
            this.randomid = this.urlParams.get('randomid')
            if (this.randomid) {
                this.whiteboardId = uuidv4();
                this.urlParams.delete("randomid");
                window.location.search = this.urlParams;
            }

            if (!this.whiteboardId) {
                this.whiteboardId = "myNewWhiteboard";
            }

            this.whiteboardId = unescape(encodeURIComponent(this.whiteboardId)).replace(/[^a-zA-Z0-9\-]/g, "");

            if (this.urlParams.get("whiteboardid") !== this.whiteboardId) {
                this.urlParams.set("whiteboardid", this.whiteboardId);
                window.location.search = this.urlParams;
            }

            this.myUsername = this.urlParams.get("username") || "Anonymus" + (Math.random() + "").substring(2, 6);
            this.accessToken = this.urlParams.get("accesstoken") || "";

            this.subdir = getSubDir()
            this.main()
        },
        destroyed() {
            window.removeEventListener('resize', this.handleResize)
        },
        computed: {
            swatchStyle() {
                const { color, menu } = this
                return {
                    backgroundColor: color,
                    cursor: 'pointer',
                    height: '30px',
                    width: '30px',
                    borderRadius: menu ? '50%' : '4px',
                    transition: 'border-radius 200ms ease-in-out'
                }
            },
            urlParams() {
                return new URLSearchParams(window.location.search)
            },
        },
        methods: {
            updateDrawColor() {
                // debugger
                whiteboard.setDrawColor(this.color);
            },
            handleResize() {
                this.window.width = window.innerWidth;
                this.window.height = window.innerHeight;
            },
            main() {
                // debugger
                // this.accessToken = this.$store.state.auth.jwt
                const { email,jwt } = this.$store.state.auth
                const whiteboardId = this.whiteboardId
                const {width, height} = this.window
                let signaling_socket = this.signaling_socket
                signaling_socket = io("", { path: this.subdir + "/ws-api" }); // Connect even if we are in a subdir behind a reverse proxy
                let $self = this

                signaling_socket.on("connect", function() {
                    console.log("Websocket connected!");

                    signaling_socket.on("whiteboardConfig", (serverResponse) => {
                        ConfigService.initFromServer(serverResponse);
                        // Inti whiteboard only when we have the config from the server
                        $self.initWhiteboard(signaling_socket);
                    });

                    signaling_socket.on("whiteboardInfoUpdate", (info) => {
                        // debugger
                        InfoService.updateInfoFromServer(info);
                        whiteboard.updateSmallestScreenResolution();
                    });

                    signaling_socket.on("drawToWhiteboard", function(content) {
                        // debugger
                        whiteboard.handleEventsAndData(content, true);
                        InfoService.incrementNbMessagesReceived();
                    });

                    signaling_socket.on("refreshUserBadges", function() {
                        whiteboard.refreshUserBadges();
                    });

                    let accessDenied = false;
                    signaling_socket.on("wrongAccessToken", function() {
                        if (!accessDenied) {
                            accessDenied = true;
                            showBasicAlert("Access denied! Wrong accessToken!");
                        }
                    });

                    // debugger
                    signaling_socket.emit("joinWhiteboard", {
                        wid: whiteboardId,
                        at: jwt,
                        windowWidthHeight: { w: width, h: height },
                    });
                });
            },

            showBasicAlert(html, newOptions) {
                var options = {
                    header: "INFO MESSAGE",
                    okBtnText: "Ok",
                    headercolor: "#d25d5d",
                    hideAfter: false,
                    onOkClick: false,
                };
                if (newOptions) {
                    for (var i in newOptions) {
                        options[i] = newOptions[i];
                    }
                }
                var alertHtml = $(
                    '<div class="basicalert" style="position:absolute; left:0px; width:100%; top:70px; font-family: monospace;">' +
                    '<div style="width: 30%; margin: auto; background: #aaaaaa; border-radius: 5px; font-size: 1.2em; border: 1px solid gray;">' +
                    '<div style="border-bottom: 1px solid #676767; background: ' +
                    options["headercolor"] +
                    '; padding-left: 5px; font-size: 0.8em;">' +
                    options["header"] +
                    '<div style="float: right; margin-right: 4px; color: #373737; cursor: pointer;" class="closeAlert">x</div></div>' +
                    '<div style="padding: 10px;" class="htmlcontent"></div>' +
                    '<div style="height: 20px; padding: 10px;"><button class="modalBtn okbtn" style="float: right;">' +
                    options["okBtnText"] +
                    "</button></div>" +
                    "</div>" +
                    "</div>"
                );
                alertHtml.find(".htmlcontent").append(html);
                $("body").append(alertHtml);
                alertHtml
                    .find(".okbtn")
                    .off("click")
                    .click(function() {
                        if (options.onOkClick) {
                            options.onOkClick();
                        }
                        alertHtml.remove();
                    });
                alertHtml
                    .find(".closeAlert")
                    .off("click")
                    .click(function() {
                        alertHtml.remove();
                    });

                if (options.hideAfter) {
                    setTimeout(function() {
                        alertHtml.find(".okbtn").click();
                    }, 1000 * options.hideAfter);
                }
            },

            initWhiteboard(socketIO) {
                // by default set in readOnly mode
                // import keymage from 'keymage'
                const { email,jwt } = this.$store.state.auth
                const {width, height} = this.window
                ReadOnlyService.activateReadOnlyMode();
                let $self = this
                // let signaling_socket = io("", { path: this.subdir + "/ws-api" });

                if (this.urlParams.get("webdav") === "true") {
                    // $("#uploadWebDavBtn").show();
                    this.isWebDav = true
                }

                whiteboard.loadWhiteboard("#whiteboardContainer", {
                    //Load the whiteboard
                    whiteboardId: this.whiteboardId,
                    username: btoa(this.myUsername),
                    backgroundGridUrl: "./images/" + ConfigService.backgroundGridImage,
                    sendFunction: function(content) {
                        if (ReadOnlyService.readOnlyActive) return;
                        //ADD IN LATER THROUGH CONFIG
                        // if (content.t === 'cursor') {
                        //     if (whiteboard.drawFlag) return;
                        // }
                        content["at"] = $self.$store.state.auth.jwt;
                        socketIO.emit("drawToWhiteboard", content);
                        InfoService.incrementNbMessagesSent();
                    },
                });

                // request whiteboard from server
                /* $.get(this.subdir + "/api/loadwhiteboard", { wid: this.whiteboardId, at: jwt }).done(
                    function(data) {
                        whiteboard.loadData(data);
                    }
                ); */
                // debugger
                this.$axios.$get(this.subdir + "/api/loadwhiteboard", {
                    params: {
                        email: email,
                        wid: this.whiteboardId,
                        at: jwt,
                    },
                    headers: {
                        Accept: 'application/json',
                        Content: 'application/json',
                        Authorization: `Bearer ${jwt}`,
                        email: email,
                        wid: this.whiteboardId,
                        at: jwt
                    },
                }).then(res => {
                    const data = res
                    // debugger
                    whiteboard.loadData(data.ret);
                }).catch((err) => {
                    // debugger
                    console.log(err.message)
                })

                $(window).resize(function() {
                    socketIO.emit("updateScreenResolution", {
                        at: jwt,
                        windowWidthHeight: { w:width, h: height },
                    });
                });

                /*----------------/
                Whiteboard actions
                /----------------*/

                var tempLineTool = false;
                var strgPressed = false;
                //Handle key actions
                /* $(document).on("keydown", function(e) {
                    if (e.which == 16) {
                        if (whiteboard.tool == "pen" && !strgPressed) {
                            tempLineTool = true;
                            whiteboard.ownCursor.hide();
                            if (whiteboard.drawFlag) {
                                whiteboard.mouseup({
                                    offsetX: whiteboard.prevPos.x,
                                    offsetY: whiteboard.prevPos.y,
                                });
                                shortcutFunctions.setTool_line();
                                whiteboard.mousedown({
                                    offsetX: whiteboard.prevPos.x,
                                    offsetY: whiteboard.prevPos.y,
                                });
                            } else {
                                shortcutFunctions.setTool_line();
                            }
                        }
                        whiteboard.pressedKeys["shift"] = true; //Used for straight lines...
                    } else if (e.which == 17) {
                        strgPressed = true;
                    }
                    //console.log(e.which);
                });
                $(document).on("keyup", function(e) {
                    if (e.which == 16) {
                        if (tempLineTool) {
                            tempLineTool = false;
                            shortcutFunctions.setTool_pen();
                            whiteboard.ownCursor.show();
                        }
                        whiteboard.pressedKeys["shift"] = false;
                    } else if (e.which == 17) {
                        strgPressed = false;
                    }
                });

                //Load keybindings from keybinds.js to given functions
                Object.entries(keybinds).forEach(([key, functionName]) => {
                    const associatedShortcutFunction = shortcutFunctions[functionName];
                    if (associatedShortcutFunction) {
                        keymage(key, associatedShortcutFunction, { preventDefault: true });
                    } else {
                        console.error(
                            "Function you want to keybind on key:",
                            key,
                            "named:",
                            functionName,
                            "is not available!"
                        );
                    }
                }); */

                // whiteboard clear button
                $("#whiteboardTrashBtn")
                    .off("click")
                    .click(function() {
                        $("#whiteboardTrashBtnConfirm").show().focus();
                        $(this).css({ visibility: "hidden" });
                    });

                $("#whiteboardTrashBtnConfirm").mouseout(function() {
                    $(this).hide();
                    $("#whiteboardTrashBtn").css({ visibility: "inherit" });
                });

                $("#whiteboardTrashBtnConfirm")
                    .off("click")
                    .click(function() {
                        $(this).hide();
                        $("#whiteboardTrashBtn").css({ visibility: "inherit" });
                        whiteboard.clearWhiteboard();
                    });

                // undo button
                $("#whiteboardUndoBtn")
                    .off("click")
                    .click(function() {
                        whiteboard.undoWhiteboardClick();
                    });

                // redo button
                $("#whiteboardRedoBtn")
                    .off("click")
                    .click(function() {
                        whiteboard.redoWhiteboardClick();
                    });

                // view only
                $("#whiteboardLockBtn")
                    .off("click")
                    .click(() => {
                        ReadOnlyService.deactivateReadOnlyMode();
                    });
                $("#whiteboardUnlockBtn")
                    .off("click")
                    .click(() => {
                        ReadOnlyService.activateReadOnlyMode();
                    });
                $("#whiteboardUnlockBtn").hide();
                $("#whiteboardLockBtn").show();

                // switch tool
                $(".whiteboard-tool")
                    .off("click")
                    .click(function() {
                        $(".whiteboard-tool").removeClass("active");
                        $(this).addClass("active");
                        var activeTool = $(this).attr("tool");
                        whiteboard.setTool(activeTool);
                        if (activeTool == "mouse" || activeTool == "recSelect") {
                            $(".activeToolIcon").empty();
                        } else {
                            $(".activeToolIcon").html($(this).html()); //Set Active icon the same as the button icon
                        }
                    });

                // upload image button
                $("#addImgToCanvasBtn")
                    .off("click")
                    .click(function() {
                        if (ReadOnlyService.readOnlyActive) return;
                        showBasicAlert("Please drag the image into the browser.");
                    });

                // save image as imgae
                $("#saveAsImageBtn")
                    .off("click")
                    .click(function() {
                        whiteboard.getImageDataBase64({
                                imageFormat: ConfigService.imageDownloadFormat,
                                drawBackgroundGrid: ConfigService.drawBackgroundGrid,
                            },
                            function(imgData) {
                                var w = window.open("about:blank"); //Firefox will not allow downloads without extra window
                                setTimeout(function() {
                                    //FireFox seems to require a setTimeout for this to work.
                                    var a = document.createElement("a");
                                    a.href = imgData;
                                    a.download = "whiteboard." + ConfigService.imageDownloadFormat;
                                    w.document.body.appendChild(a);
                                    a.click();
                                    w.document.body.removeChild(a);
                                    setTimeout(function() {
                                        w.close();
                                    }, 100);
                                }, 0);
                            }
                        );
                    });

                // save image to json containing steps
                $("#saveAsJSONBtn")
                    .off("click")
                    .click(function() {
                        var imgData = whiteboard.getImageDataJson();

                        var w = window.open("about:blank"); //Firefox will not allow downloads without extra window
                        setTimeout(function() {
                            //FireFox seems to require a setTimeout for this to work.
                            var a = document.createElement("a");
                            a.href = window.URL.createObjectURL(new Blob([imgData], { type: "text/json" }));
                            a.download = "whiteboard.json";
                            w.document.body.appendChild(a);
                            a.click();
                            w.document.body.removeChild(a);
                            setTimeout(function() {
                                w.close();
                            }, 100);
                        }, 0);
                    });

                $("#uploadWebDavBtn")
                    .off("click")
                    .click(function() {
                        if ($(".webdavUploadBtn").length > 0) {
                            return;
                        }

                        var webdavserver = localStorage.getItem("webdavserver") || "";
                        var webdavpath = localStorage.getItem("webdavpath") || "/";
                        var webdavusername = localStorage.getItem("webdavusername") || "";
                        var webdavpassword = localStorage.getItem("webdavpassword") || "";
                        var webDavHtml = $(
                            "<div>" +
                            "<table>" +
                            "<tr>" +
                            "<td>Server URL:</td>" +
                            '<td><input class="webdavserver" type="text" value="' +
                            webdavserver +
                            '" placeholder="https://yourserver.com/remote.php/webdav/"></td>' +
                            "<td></td>" +
                            "</tr>" +
                            "<tr>" +
                            "<td>Path:</td>" +
                            '<td><input class="webdavpath" type="text" placeholder="folder" value="' +
                            webdavpath +
                            '"></td>' +
                            '<td style="font-size: 0.7em;"><i>path always have to start & end with "/"</i></td>' +
                            "</tr>" +
                            "<tr>" +
                            "<td>Username:</td>" +
                            '<td><input class="webdavusername" type="text" value="' +
                            webdavusername +
                            '" placeholder="username"></td>' +
                            '<td style="font-size: 0.7em;"></td>' +
                            "</tr>" +
                            "<tr>" +
                            "<td>Password:</td>" +
                            '<td><input class="webdavpassword" type="password" value="' +
                            webdavpassword +
                            '" placeholder="password"></td>' +
                            '<td style="font-size: 0.7em;"></td>' +
                            "</tr>" +
                            "<tr>" +
                            '<td style="font-size: 0.7em;" colspan="3">Note: You have to generate and use app credentials if you have 2 Factor Auth activated on your dav/nextcloud server!</td>' +
                            "</tr>" +
                            "<tr>" +
                            "<td></td>" +
                            '<td colspan="2"><span class="loadingWebdavText" style="display:none;">Saving to webdav, please wait...</span><button class="modalBtn webdavUploadBtn"><i class="fas fa-upload"></i> Start Upload</button></td>' +
                            "</tr>" +
                            "</table>" +
                            "</div>"
                        );
                        webDavHtml
                            .find(".webdavUploadBtn")
                            .off("click")
                            .click(function() {
                                var webdavserver = webDavHtml.find(".webdavserver").val();
                                localStorage.setItem("webdavserver", webdavserver);
                                var webdavpath = webDavHtml.find(".webdavpath").val();
                                localStorage.setItem("webdavpath", webdavpath);
                                var webdavusername = webDavHtml.find(".webdavusername").val();
                                localStorage.setItem("webdavusername", webdavusername);
                                var webdavpassword = webDavHtml.find(".webdavpassword").val();
                                localStorage.setItem("webdavpassword", webdavpassword);
                                whiteboard.getImageDataBase64({
                                        imageFormat: ConfigService.imageDownloadFormat,
                                        drawBackgroundGrid: ConfigService.drawBackgroundGrid,
                                    },
                                    function(base64data) {
                                        var webdavaccess = {
                                            webdavserver: webdavserver,
                                            webdavpath: webdavpath,
                                            webdavusername: webdavusername,
                                            webdavpassword: webdavpassword,
                                        };
                                        webDavHtml.find(".loadingWebdavText").show();
                                        webDavHtml.find(".webdavUploadBtn").hide();
                                        saveWhiteboardToWebdav(base64data, webdavaccess, function(err) {
                                            if (err) {
                                                webDavHtml.find(".loadingWebdavText").hide();
                                                webDavHtml.find(".webdavUploadBtn").show();
                                            } else {
                                                webDavHtml.parents(".basicalert").remove();
                                            }
                                        });
                                    }
                                );
                            });
                        showBasicAlert(webDavHtml, {
                            header: "Save to Webdav",
                            okBtnText: "cancel",
                            headercolor: "#0082c9",
                        });
                        // render newly added icons
                        dom.i2svg();
                    });

                // upload json containing steps
                $("#uploadJsonBtn")
                    .off("click")
                    .click(function() {
                        $("#myFile").click();
                    });

                $("#shareWhiteboardBtn")
                    .off("click")
                    .click(() => {
                        function urlToClipboard(whiteboardId = null) {
                            const { protocol, host, pathname, search } = window.location;
                            const basePath = `${protocol}//${host}${pathname}`;
                            const getParams = new URLSearchParams(search);

                            // Clear ursername from get parameters
                            getParams.delete("username");

                            if (whiteboardId) {
                                // override whiteboardId value in URL
                                getParams.set("whiteboardid", whiteboardId);
                            }

                            const url = `${basePath}?${getParams.toString()}`;
                            $("<textarea/>")
                                .appendTo("body")
                                .val(url)
                                .select()
                                .each(() => {
                                    document.execCommand("copy");
                                })
                                .remove();
                        }

                        // UI related
                        // clear message
                        $("#shareWhiteboardDialogMessage").toggleClass("displayNone", true);

                        $("#shareWhiteboardDialog").toggleClass("displayNone", false);
                        $("#shareWhiteboardDialogGoBack")
                            .off("click")
                            .click(() => {
                                $("#shareWhiteboardDialog").toggleClass("displayNone", true);
                            });

                        $("#shareWhiteboardDialogCopyReadOnlyLink")
                            .off("click")
                            .click(() => {
                                urlToClipboard(ConfigService.correspondingReadOnlyWid);

                                $("#shareWhiteboardDialogMessage")
                                    .toggleClass("displayNone", false)
                                    .text("Read-only link copied to clipboard ✓");
                            });

                        $("#shareWhiteboardDialogCopyReadWriteLink")
                            .toggleClass("displayNone", ConfigService.isReadOnly)
                            .click(() => {
                                $("#shareWhiteboardDialogMessage")
                                    .toggleClass("displayNone", false)
                                    .text("Read/write link copied to clipboard ✓");
                                urlToClipboard();
                            });
                    });

                $("#displayWhiteboardInfoBtn")
                    .off("click")
                    .click(() => {
                        InfoService.toggleDisplayInfo();
                    });

                var btnsMini = false;
                $("#minMaxBtn")
                    .off("click")
                    .click(function() {
                        if (!btnsMini) {
                            $("#toolbar").find(".btn-group:not(.minGroup)").hide();
                            $(this).find("#minBtn").hide();
                            $(this).find("#maxBtn").show();
                        } else {
                            $("#toolbar").find(".btn-group").show();
                            $(this).find("#minBtn").show();
                            $(this).find("#maxBtn").hide();
                        }
                        btnsMini = !btnsMini;
                    });

                // load json to whiteboard
                $("#myFile").on("change", function() {
                    var file = document.getElementById("myFile").files[0];
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        try {
                            var j = JSON.parse(e.target.result);
                            whiteboard.loadJsonData(j);
                        } catch (e) {
                            showBasicAlert("File was not a valid JSON!");
                        }
                    };
                    reader.readAsText(file);
                    $(this).val("");
                });

                // On thickness slider change
                $("#whiteboardThicknessSlider").on("input", function() {
                    if (ReadOnlyService.readOnlyActive) return;
                    whiteboard.setStrokeThickness($(this).val());
                });

                // handle drag&drop
                var dragCounter = 0;
                $("#whiteboardContainer").on("dragenter", function(e) {
                    if (ReadOnlyService.readOnlyActive) return;
                    e.preventDefault();
                    e.stopPropagation();
                    dragCounter++;
                    whiteboard.dropIndicator.show();
                });

                $("#whiteboardContainer").on("dragleave", function(e) {
                    if (ReadOnlyService.readOnlyActive) return;

                    e.preventDefault();
                    e.stopPropagation();
                    dragCounter--;
                    if (dragCounter === 0) {
                        whiteboard.dropIndicator.hide();
                    }
                });

                $("#whiteboardContainer").on("drop", function(e) {
                    //Handle drop
                    if (ReadOnlyService.readOnlyActive) return;

                    if (e.originalEvent.dataTransfer) {
                        if (e.originalEvent.dataTransfer.files.length) {
                            //File from harddisc
                            e.preventDefault();
                            e.stopPropagation();
                            var filename = e.originalEvent.dataTransfer.files[0]["name"];
                            if (isImageFileName(filename)) {
                                var blob = e.originalEvent.dataTransfer.files[0];
                                var reader = new window.FileReader();
                                reader.readAsDataURL(blob);
                                reader.onloadend = function() {
                                    const base64data = reader.result;
                                    uploadImgAndAddToWhiteboard(base64data);
                                };
                            } else if (isPDFFileName(filename)) {
                                //Handle PDF Files
                                var blob = e.originalEvent.dataTransfer.files[0];

                                var reader = new window.FileReader();
                                reader.onloadend = function() {
                                    var pdfData = new Uint8Array(this.result);

                                    var loadingTask = pdfjsLib.getDocument({ data: pdfData });
                                    loadingTask.promise.then(
                                        function(pdf) {
                                            console.log("PDF loaded");

                                            var currentDataUrl = null;
                                            var modalDiv = $(
                                                "<div>" +
                                                "Page: <select></select> " +
                                                '<button style="margin-bottom: 3px;" class="modalBtn"><i class="fas fa-upload"></i> Upload to Whiteboard</button>' +
                                                '<img style="width:100%;" src=""/>' +
                                                "</div>"
                                            );

                                            modalDiv.find("select").change(function() {
                                                showPDFPageAsImage(parseInt($(this).val()));
                                            });

                                            modalDiv
                                                .find("button")
                                                .off("click")
                                                .click(function() {
                                                    if (currentDataUrl) {
                                                        $(".basicalert").remove();
                                                        uploadImgAndAddToWhiteboard(currentDataUrl);
                                                    }
                                                });

                                            for (var i = 1; i < pdf.numPages + 1; i++) {
                                                modalDiv
                                                    .find("select")
                                                    .append('<option value="' + i + '">' + i + "</option>");
                                            }

                                            showBasicAlert(modalDiv, {
                                                header: "Pdf to Image",
                                                okBtnText: "cancel",
                                                headercolor: "#0082c9",
                                            });

                                            // render newly added icons
                                            dom.i2svg();

                                            showPDFPageAsImage(1);

                                            function showPDFPageAsImage(pageNumber) {
                                                // Fetch the page
                                                pdf.getPage(pageNumber).then(function(page) {
                                                    console.log("Page loaded");

                                                    var scale = 1.5;
                                                    var viewport = page.getViewport({ scale: scale });

                                                    // Prepare canvas using PDF page dimensions
                                                    var canvas = $("<canvas></canvas>")[0];
                                                    var context = canvas.getContext("2d");
                                                    canvas.height = viewport.height;
                                                    canvas.width = viewport.width;

                                                    // Render PDF page into canvas context
                                                    var renderContext = {
                                                        canvasContext: context,
                                                        viewport: viewport,
                                                    };
                                                    var renderTask = page.render(renderContext);
                                                    renderTask.promise.then(function() {
                                                        var dataUrl = canvas.toDataURL("image/jpeg", 1.0);
                                                        currentDataUrl = dataUrl;
                                                        modalDiv.find("img").attr("src", dataUrl);
                                                        console.log("Page rendered");
                                                    });
                                                });
                                            }
                                        },
                                        function(reason) {
                                            // PDF loading error

                                            showBasicAlert(
                                                "Error loading pdf as image! Check that this is a vaild pdf file!"
                                            );
                                            console.error(reason);
                                        }
                                    );
                                };
                                reader.readAsArrayBuffer(blob);
                            } else {
                                showBasicAlert("File must be an image!");
                            }
                        } else {
                            //File from other browser

                            var fileUrl = e.originalEvent.dataTransfer.getData("URL");
                            var imageUrl = e.originalEvent.dataTransfer.getData("text/html");
                            var rex = /src="?([^"\s]+)"?\s*/;
                            var url = rex.exec(imageUrl);
                            if (url && url.length > 1) {
                                url = url[1];
                            } else {
                                url = "";
                            }

                            isValidImageUrl(fileUrl, function(isImage) {
                                if (isImage && isImageFileName(url)) {
                                    whiteboard.addImgToCanvasByUrl(fileUrl);
                                } else {
                                    isValidImageUrl(url, function(isImage) {
                                        if (isImage) {
                                            if (isImageFileName(url) || url.startsWith("http")) {
                                                whiteboard.addImgToCanvasByUrl(url);
                                            } else {
                                                uploadImgAndAddToWhiteboard(url); //Last option maybe its base64
                                            }
                                        } else {
                                            showBasicAlert("Can only upload Imagedata!");
                                        }
                                    });
                                }
                            });
                        }
                    }
                    dragCounter = 0;
                    whiteboard.dropIndicator.hide();
                });

                /* new Picker({
                    parent: $("#whiteboardColorpicker")[0],
                    color: "#000000",
                    onChange: function(color) {
                        whiteboard.setDrawColor(color.rgbaString);
                    },
                }); */

                whiteboard.setDrawColor(this.color);

                // on startup select mouse
                shortcutFunctions.setTool_mouse();
                // fix bug cursor not showing up
                whiteboard.refreshCursorAppearance();

                if (process.env.NODE_ENV === "production") {
                    if (ConfigService.readOnlyOnWhiteboardLoad) ReadOnlyService.activateReadOnlyMode();
                    else ReadOnlyService.deactivateReadOnlyMode();

                    if (ConfigService.displayInfoOnWhiteboardLoad) InfoService.displayInfo();
                    else InfoService.hideInfo();
                } else {
                    // in dev
                    ReadOnlyService.deactivateReadOnlyMode();
                    InfoService.displayInfo();
                }

                // In any case, if we are on read-only whiteboard we activate read-only mode
                if (ConfigService.isReadOnly) ReadOnlyService.activateReadOnlyMode();
                // $(document).ready(function() {
                // });

                //Prevent site from changing tab on drag&drop
                window.addEventListener(
                    "dragover",
                    function(e) {
                        e = e || event;
                        e.preventDefault();
                    },
                    false
                );
                window.addEventListener(
                    "drop",
                    function(e) {
                        e = e || event;
                        e.preventDefault();
                    },
                    false
                );

                function uploadImgAndAddToWhiteboard(base64data) {
                    const date = +new Date();
                    $.ajax({
                        type: "POST",
                        url: document.URL.substr(0, document.URL.lastIndexOf("/")) + "/api/upload",
                        data: {
                            imagedata: base64data,
                            whiteboardId: whiteboardId,
                            date: date,
                            at: accessToken,
                        },
                        success: function(msg) {
                            const { correspondingReadOnlyWid } = ConfigService;
                            const filename = `${correspondingReadOnlyWid}_${date}.png`;
                            const rootUrl = document.URL.substr(0, document.URL.lastIndexOf("/"));
                            whiteboard.addImgToCanvasByUrl(
                                `${rootUrl}/uploads/${correspondingReadOnlyWid}/${filename}`
                            ); //Add image to canvas
                            console.log("Image uploaded!");
                        },
                        error: function(err) {
                            showBasicAlert("Failed to upload frame: " + JSON.stringify(err));
                        },
                    });
                }

                function saveWhiteboardToWebdav(base64data, webdavaccess, callback) {
                    var date = +new Date();
                    $.ajax({
                        type: "POST",
                        url: document.URL.substr(0, document.URL.lastIndexOf("/")) + "api/upload",
                        data: {
                            imagedata: base64data,
                            whiteboardId: whiteboardId,
                            date: date,
                            at: accessToken,
                            webdavaccess: JSON.stringify(webdavaccess),
                        },
                        success: function(msg) {
                            showBasicAlert("Whiteboard was saved to Webdav!", {
                                headercolor: "#5c9e5c",
                            });
                            console.log("Image uploaded for webdav!");
                            callback();
                        },
                        error: function(err) {
                            if (err.status == 403) {
                                showBasicAlert(
                                    "Could not connect to Webdav folder! Please check the credentials and paths and try again!"
                                );
                            } else {
                                showBasicAlert("Unknown Webdav error! ", err);
                            }
                            callback(err);
                        },
                    });
                }

                // verify if filename refers to an image
                function isImageFileName(filename) {
                    var extension = filename.split(".")[filename.split(".").length - 1];
                    var known_extensions = ["png", "jpg", "jpeg", "gif", "tiff", "bmp", "webp"];
                    return known_extensions.includes(extension.toLowerCase());
                }

                // verify if filename refers to an pdf
                function isPDFFileName(filename) {
                    var extension = filename.split(".")[filename.split(".").length - 1];
                    var known_extensions = ["pdf"];
                    return known_extensions.includes(extension.toLowerCase());
                }

                // verify if given url is url to an image
                function isValidImageUrl(url, callback) {
                    var img = new Image();
                    var timer = null;
                    img.onerror = img.onabort = function() {
                        clearTimeout(timer);
                        callback(false);
                    };
                    img.onload = function() {
                        clearTimeout(timer);
                        callback(true);
                    };
                    timer = setTimeout(function() {
                        callback(false);
                    }, 2000);
                    img.src = url;
                }

                // handle pasting from clipboard
                window.addEventListener("paste", function(e) {
                    if ($(".basicalert").length > 0) {
                        return;
                    }
                    if (e.clipboardData) {
                        var items = e.clipboardData.items;
                        var imgItemFound = false;
                        if (items) {
                            // Loop through all items, looking for any kind of image
                            for (var i = 0; i < items.length; i++) {
                                if (items[i].type.indexOf("image") !== -1) {
                                    imgItemFound = true;
                                    // We need to represent the image as a file,
                                    var blob = items[i].getAsFile();

                                    var reader = new window.FileReader();
                                    reader.readAsDataURL(blob);
                                    reader.onloadend = function() {
                                        console.log("Uploading image!");
                                        let base64data = reader.result;
                                        uploadImgAndAddToWhiteboard(base64data);
                                    };
                                }
                            }
                        }

                        if (!imgItemFound && whiteboard.tool != "text") {
                            showBasicAlert(
                                "Please Drag&Drop the image or pdf into the Whiteboard. (Browsers don't allow copy+past from the filesystem directly)"
                            );
                        }
                    }
                });
            },
        },
    }

    // const urlParams = new URLSearchParams(window.location.search);
    /* let whiteboardId = urlParams.get("whiteboardid");
    const randomid = urlParams.get("randomid");

    if (randomid) {
        whiteboardId = uuidv4();
        urlParams.delete("randomid");
        window.location.search = urlParams;
    }

    if (!whiteboardId) {
        whiteboardId = "myNewWhiteboard";
    }

    whiteboardId = unescape(encodeURIComponent(whiteboardId)).replace(/[^a-zA-Z0-9\-]/g, "");

    if (urlParams.get("whiteboardid") !== whiteboardId) {
        urlParams.set("whiteboardid", whiteboardId);
        window.location.search = urlParams;
    }

    const myUsername = urlParams.get("username") || "unknown" + (Math.random() + "").substring(2, 6);
    const accessToken = urlParams.get("accesstoken") || "";

    // Custom Html Title
    const title = urlParams.get("title");
    if (title) {
        document.title = decodeURIComponent(title);
    }

    const subdir = getSubDir();
    let signaling_socket; */
</script>

<style lang="scss" scoped>
    @import '~assets/css/whiteboard/main.css';
    i.v-icon {
        color: black;
    }
    #whiteboardContainer {
        background: url(~assets/images/bg_grid.png);
    }
    .activeToolIcon {
        .v-icon {
            font-size: 1.5em;
        }
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
                div{
                    height: 100% !important;
                    width: 100% !important;
                }
            }
        }
    }
</style>
