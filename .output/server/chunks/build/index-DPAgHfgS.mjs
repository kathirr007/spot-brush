import { ref, reactive, computed, unref, withCtx, createTextVNode, isRef, createVNode, mergeProps, toHandlers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderAttr } from 'vue/server-renderer';
import { u as useAuthStore } from './auth-CbAKS0YR.mjs';
import whiteboard from './whiteboard-DD4_hElL.mjs';
import { _ as _export_sfc, a as useNuxtApp, x as VIcon, f as VTextField, s as VMenu, V as VCard, q as VCardText, z as VColorPicker, i as VBtn } from './server.mjs';
import { u as useHead } from './v3-uI-0S7-w.mjs';
import '@fortawesome/fontawesome-svg-core';
import './Point-DM7E_x-Y.mjs';
import './utils-Dg8BbwNB.mjs';
import './ReadOnlyService-_MP-1Xik.mjs';
import './ConfigService-DEOCz6AH.mjs';
import './ConfigService.utils-DxoHktcq.mjs';
import './InfoService-KuEphH0M.mjs';
import './ThrottlingService-Cft2UPc7.mjs';
import 'html2canvas';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'body-parser';
import 'events';
import 'merge-descriptors';
import 'finalhandler';
import 'array-flatten';
import 'path-to-regexp';
import 'methods';
import 'utils-merge';
import 'depd';
import 'parseurl';
import 'setprototypeof';
import 'qs';
import 'path';
import 'fs';
import 'http';
import 'safe-buffer';
import 'content-disposition';
import 'content-type';
import 'send';
import 'etag';
import 'proxy-addr';
import 'querystring';
import 'accepts';
import 'net';
import 'type-is';
import 'fresh';
import 'range-parser';
import 'http-errors';
import 'encodeurl';
import 'escape-html';
import 'on-finished';
import 'statuses';
import 'cookie-signature';
import 'cookie';
import 'vary';
import 'serve-static';
import 'zlib';
import 'stream';
import 'engine.io';
import '@socket.io/component-emitter';
import 'base64id';
import 'ws';
import 'crypto';
import 'cors';
import 'cookie-parser';
import 'compression';
import 'amazon-cognito-identity-js';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';
import 'axios';

const _imports_0 = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20width='220px'%20height='14px'%20viewBox='0%200%20220%2014'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3ctitle%3eBE12FC0E-FD5E-426C-9BBF-550FC50194C3%3c/title%3e%3cdefs%3e%3c/defs%3e%3cg%20id='Main'%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%3e%3cg%20id='Popupovi---razmaci'%20transform='translate(-678.000000,%20-342.000000)'%20fill='%23D9D9D9'%3e%3cg%20id='Group-5-Copy-4'%20transform='translate(618.000000,%20241.000000)'%3e%3cg%20id='Group-4'%20transform='translate(19.000000,%2074.000000)'%3e%3cg%20id='Group-16'%20transform='translate(38.000000,%2027.000000)'%3e%3cpath%20d='M3.99962831,5.97241081%20L216.002602,0.190511533%20L216.002602,0.190511533%20C219.763198,0.0879498169%20222.894906,3.05337273%20222.997468,6.81396899%20C222.999156,6.87585608%20223,6.9377633%20223,6.9996734%20L223,6.9996734%20L223,6.9996734%20C223,10.761668%20219.950301,13.8113671%20216.188306,13.8113671%20C216.126396,13.8113671%20216.064489,13.8105231%20216.002602,13.8088353%20L3.99962831,8.02693599%20L3.99962831,8.02693599%20C3.44319453,8.01176053%203,7.55631408%203,6.9996734%20L3,6.9996734%20L3,6.9996734%20C3,6.44303273%203.44319453,5.98758628%203.99962831,5.97241081%20Z'%20id='slider-background'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e";
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({ title: "SpotBrush | Whiteboard" });
    useAuthStore();
    const { $axios } = useNuxtApp();
    ref("");
    const color = ref("#ff6634ff");
    const menu = ref(false);
    const isWebDav = ref(false);
    const readOnlyActive = ref(true);
    const disableTool = ref(false);
    ref(false);
    ref(false);
    ref(false);
    reactive({ width: 0, height: 0 });
    const swatchStyle = computed(() => ({
      backgroundColor: color.value,
      cursor: "pointer",
      height: "30px",
      width: "30px",
      borderRadius: menu.value ? "50%" : "4px",
      transition: "border-radius 200ms ease-in-out"
    }));
    function updateDrawColor() {
      whiteboard.setDrawColor(color.value);
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-832ab625><div id="whiteboardContainer" data-v-832ab625></div><div id="toolbar" style="${ssrRenderStyle({ "position": "absolute", "top": "10px", "left": "10px" })}" data-v-832ab625><div class="btn-group" data-v-832ab625>`);
      if (unref(readOnlyActive)) {
        _push(`<button id="whiteboardLockBtn" style="${ssrRenderStyle({ "background-color": "orange" })}" title="View and Write" type="button" data-v-832ab625>`);
        _push(ssrRenderComponent(VIcon, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`mdi-lock`);
            } else {
              return [
                createTextVNode("mdi-lock")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</button>`);
      } else {
        _push(`<button id="whiteboardUnlockBtn" title="View Only" type="button" data-v-832ab625>`);
        _push(ssrRenderComponent(VIcon, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`mdi-lock-open`);
            } else {
              return [
                createTextVNode("mdi-lock-open")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</button>`);
      }
      _push(`</div><div class="${ssrRenderClass([unref(disableTool) ? "group-disabled" : "", "btn-group whiteboard-edit-group"])}" data-v-832ab625><button id="whiteboardTrashBtn" title="Clear the whiteboard" type="button" data-v-832ab625>`);
      _push(ssrRenderComponent(VIcon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`mdi-delete`);
          } else {
            return [
              createTextVNode("mdi-delete")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</button><button style="${ssrRenderStyle({ "position": "absolute", "left": "0px", "top": "0px", "width": "46px", "display": "none" })}" id="whiteboardTrashBtnConfirm" title="Confirm clear..." type="button" data-v-832ab625>`);
      _push(ssrRenderComponent(VIcon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`mdi-check`);
          } else {
            return [
              createTextVNode("mdi-check")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</button><button id="whiteboardUndoBtn" title="Undo your last step" type="button" data-v-832ab625>`);
      _push(ssrRenderComponent(VIcon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`mdi-undo-variant`);
          } else {
            return [
              createTextVNode("mdi-undo-variant")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</button><button id="whiteboardRedoBtn" title="Redo your last undo" type="button" data-v-832ab625>`);
      _push(ssrRenderComponent(VIcon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`mdi-redo-variant`);
          } else {
            return [
              createTextVNode("mdi-redo-variant")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</button></div><div class="${ssrRenderClass([unref(disableTool) ? "group-disabled" : "", "btn-group whiteboard-edit-group"])}" data-v-832ab625><button tool="mouse" title="Take the mouse" type="button" class="whiteboard-tool"${ssrIncludeBooleanAttr(unref(disableTool)) ? " disabled" : ""} data-v-832ab625>`);
      _push(ssrRenderComponent(VIcon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`mdi-arrow-top-left-thick`);
          } else {
            return [
              createTextVNode("mdi-arrow-top-left-thick")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</button><button tool="recSelect" title="Select an area" type="button" class="whiteboard-tool"${ssrIncludeBooleanAttr(unref(disableTool)) ? " disabled" : ""} data-v-832ab625>`);
      _push(ssrRenderComponent(VIcon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`mdi-border-none-variant`);
          } else {
            return [
              createTextVNode("mdi-border-none-variant")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</button><button tool="pen" title="Take the pen" type="button" class="whiteboard-tool active"${ssrIncludeBooleanAttr(unref(disableTool)) ? " disabled" : ""} data-v-832ab625>`);
      _push(ssrRenderComponent(VIcon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`mdi-lead-pencil`);
          } else {
            return [
              createTextVNode("mdi-lead-pencil")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</button><button style="${ssrRenderStyle({ "padding-bottom": "8px", "padding-top": "6px" })}" tool="line" title="draw a line" type="button" class="whiteboard-tool"${ssrIncludeBooleanAttr(unref(disableTool)) ? " disabled" : ""} data-v-832ab625> \u2571 </button><button tool="rect" title="draw a rectangle" type="button" class="whiteboard-tool"${ssrIncludeBooleanAttr(unref(disableTool)) ? " disabled" : ""} data-v-832ab625>`);
      _push(ssrRenderComponent(VIcon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`mdi-square-outline`);
          } else {
            return [
              createTextVNode("mdi-square-outline")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</button><button tool="circle" title="draw a circle" type="button" class="whiteboard-tool"${ssrIncludeBooleanAttr(unref(disableTool)) ? " disabled" : ""} data-v-832ab625>`);
      _push(ssrRenderComponent(VIcon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`mdi-circle-outline`);
          } else {
            return [
              createTextVNode("mdi-circle-outline")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</button><button tool="text" title="write text" type="button" class="whiteboard-tool"${ssrIncludeBooleanAttr(unref(disableTool)) ? " disabled" : ""} data-v-832ab625>`);
      _push(ssrRenderComponent(VIcon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`mdi-format-text-variant`);
          } else {
            return [
              createTextVNode("mdi-format-text-variant")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</button><button tool="eraser" title="take the eraser" type="button" class="whiteboard-tool"${ssrIncludeBooleanAttr(unref(disableTool)) ? " disabled" : ""} data-v-832ab625>`);
      _push(ssrRenderComponent(VIcon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`mdi-eraser-variant`);
          } else {
            return [
              createTextVNode("mdi-eraser-variant")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</button></div><div class="${ssrRenderClass([unref(disableTool) ? "group-disabled" : "", "btn-group whiteboard-edit-group"])}" data-v-832ab625><button tool="sticky" title="Add Sticky Note" type="button" class="whiteboard-tool"${ssrIncludeBooleanAttr(unref(disableTool)) ? " disabled" : ""} data-v-832ab625>`);
      _push(ssrRenderComponent(VIcon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`mdi-bookmark-plus`);
          } else {
            return [
              createTextVNode("mdi-bookmark-plus")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</button></div><div class="${ssrRenderClass([unref(disableTool) ? "group-disabled" : "", "btn-group whiteboard-edit-group"])}" data-v-832ab625><button style="${ssrRenderStyle({ "width": "190px", "cursor": "default" })}"${ssrIncludeBooleanAttr(unref(disableTool)) ? " disabled" : ""} data-v-832ab625><div class="activeToolIcon" style="${ssrRenderStyle({ "position": "absolute", "top": "2px", "left": "2px", "font-size": "0.6em" })}" data-v-832ab625><i class="fa fa-pencil-alt" data-v-832ab625></i></div><img alt="" style="${ssrRenderStyle({ "position": "absolute", "left": "11px", "top": "16px", "height": "14px", "width": "130px" })}"${ssrRenderAttr("src", _imports_0)} data-v-832ab625><input title="Thickness" id="whiteboardThicknessSlider" style="${ssrRenderStyle({ "position": "absolute", "left": "9px", "width": "130px", "top": "15px" })}" type="range" min="1" max="50" value="3" data-v-832ab625>`);
      _push(ssrRenderComponent(VTextField, {
        "hide-mode-switch": "",
        modelValue: unref(color),
        "onUpdate:modelValue": ($event) => isRef(color) ? color.value = $event : null,
        width: "40",
        "hide-details": "",
        class: "ma-0 pa-0 select-brush-color",
        solo: "",
        id: "whiteboardColorpicker",
        style: { "position": "absolute", "left": "155px", "top": "10px", "width": "25px", "height": "25px", "border-radius": "4px", "border": "1px solid darkgrey" }
      }, {
        append: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VMenu, {
              modelValue: unref(menu),
              "onUpdate:modelValue": ($event) => isRef(menu) ? menu.value = $event : null,
              top: "",
              "nudge-bottom": "105",
              "nudge-left": "16",
              "close-on-content-click": false
            }, {
              activator: withCtx(({ on }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="select-brush-color-menu" style="${ssrRenderStyle(unref(swatchStyle))}" data-v-832ab625${_scopeId2}></div>`);
                } else {
                  return [
                    createVNode("div", mergeProps({
                      class: "select-brush-color-menu",
                      style: unref(swatchStyle)
                    }, toHandlers(on, true)), null, 16)
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCard, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCardText, { class: "pa-0" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VColorPicker, {
                                modelValue: unref(color),
                                "onUpdate:modelValue": ($event) => isRef(color) ? color.value = $event : null,
                                onInput: updateDrawColor,
                                flat: ""
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VColorPicker, {
                                  modelValue: unref(color),
                                  "onUpdate:modelValue": ($event) => isRef(color) ? color.value = $event : null,
                                  onInput: updateDrawColor,
                                  flat: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCardText, { class: "pa-0" }, {
                            default: withCtx(() => [
                              createVNode(VColorPicker, {
                                modelValue: unref(color),
                                "onUpdate:modelValue": ($event) => isRef(color) ? color.value = $event : null,
                                onInput: updateDrawColor,
                                flat: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCard, null, {
                      default: withCtx(() => [
                        createVNode(VCardText, { class: "pa-0" }, {
                          default: withCtx(() => [
                            createVNode(VColorPicker, {
                              modelValue: unref(color),
                              "onUpdate:modelValue": ($event) => isRef(color) ? color.value = $event : null,
                              onInput: updateDrawColor,
                              flat: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VMenu, {
                modelValue: unref(menu),
                "onUpdate:modelValue": ($event) => isRef(menu) ? menu.value = $event : null,
                top: "",
                "nudge-bottom": "105",
                "nudge-left": "16",
                "close-on-content-click": false
              }, {
                activator: withCtx(({ on }) => [
                  createVNode("div", mergeProps({
                    class: "select-brush-color-menu",
                    style: unref(swatchStyle)
                  }, toHandlers(on, true)), null, 16)
                ]),
                default: withCtx(() => [
                  createVNode(VCard, null, {
                    default: withCtx(() => [
                      createVNode(VCardText, { class: "pa-0" }, {
                        default: withCtx(() => [
                          createVNode(VColorPicker, {
                            modelValue: unref(color),
                            "onUpdate:modelValue": ($event) => isRef(color) ? color.value = $event : null,
                            onInput: updateDrawColor,
                            flat: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</button></div><div class="${ssrRenderClass([unref(disableTool) ? "group-disabled" : "", "btn-group whiteboard-edit-group"])}" data-v-832ab625><button id="addImgToCanvasBtn" title="Upload Image to whiteboard" type="button"${ssrIncludeBooleanAttr(unref(disableTool)) ? " disabled" : ""} data-v-832ab625>`);
      _push(ssrRenderComponent(VIcon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`mdi-image`);
          } else {
            return [
              createTextVNode("mdi-image")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VIcon, { style: { "position": "absolute", "top": "3px", "left": "2px", "color": "#000000", "font-size": "0.6em" } }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`mdi-upload`);
          } else {
            return [
              createTextVNode("mdi-upload")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</button><button style="${ssrRenderStyle({ "position": "relative" })}" id="uploadJsonBtn" title="Load saved JSON to whiteboard" type="button"${ssrIncludeBooleanAttr(unref(disableTool)) ? " disabled" : ""} data-v-832ab625>`);
      _push(ssrRenderComponent(VIcon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`mdi-file-document-outline`);
          } else {
            return [
              createTextVNode("mdi-file-document-outline")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VIcon, { style: { "position": "absolute", "top": "3px", "left": "2px", "color": "#000000", "font-size": "0.6em" } }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`mdi-upload`);
          } else {
            return [
              createTextVNode("mdi-upload")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</button><input style="${ssrRenderStyle({ "display": "none" })}" id="myFile" type="file" data-v-832ab625></div><div class="btn-group" data-v-832ab625><button id="saveAsImageBtn" title="Save whiteboard as image" type="button" data-v-832ab625>`);
      _push(ssrRenderComponent(VIcon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`mdi-image`);
          } else {
            return [
              createTextVNode("mdi-image")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VIcon, { style: { "position": "absolute", "top": "3px", "left": "2px", "color": "#000000", "font-size": "0.6em" } }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`mdi-content-save`);
          } else {
            return [
              createTextVNode("mdi-content-save")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</button>`);
      if (unref(isWebDav)) {
        _push(`<button style="${ssrRenderStyle({ "position": "relative" })}" id="uploadWebDavBtn" title="Save whiteboard to webdav" type="button" data-v-832ab625>`);
        _push(ssrRenderComponent(VIcon, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`mdi-earth`);
            } else {
              return [
                createTextVNode("mdi-earth")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(VIcon, { style: { "position": "absolute", "top": "3px", "left": "2px", "color": "#000000", "font-size": "0.6em" } }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`mdi-content-save`);
            } else {
              return [
                createTextVNode("mdi-content-save")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button style="${ssrRenderStyle({ "position": "relative" })}" id="saveAsJSONBtn" title="Save whiteboard as JSON" type="button" data-v-832ab625>`);
      _push(ssrRenderComponent(VIcon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`mdi-file-document-outline`);
          } else {
            return [
              createTextVNode("mdi-file-document-outline")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VIcon, { style: { "position": "absolute", "top": "3px", "left": "2px", "color": "#000000", "font-size": "0.6em" } }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`mdi-content-save`);
          } else {
            return [
              createTextVNode("mdi-content-save")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</button><button id="shareWhiteboardBtn" title="share whiteboard" type="button" data-v-832ab625>`);
      _push(ssrRenderComponent(VIcon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`mdi-share-all`);
          } else {
            return [
              createTextVNode("mdi-share-all")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</button><button id="displayWhiteboardInfoBtn" title="Show whiteboard info" type="button" data-v-832ab625>`);
      _push(ssrRenderComponent(VIcon, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`mdi-information`);
          } else {
            return [
              createTextVNode("mdi-information")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</button></div><div class="btn-group minGroup" data-v-832ab625><button style="${ssrRenderStyle({ "width": "25px" })}" id="minMaxBtn" title="hide buttons" type="button" data-v-832ab625>`);
      _push(ssrRenderComponent(VIcon, {
        id: "minBtn",
        style: {}
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`mdi-chevron-left`);
          } else {
            return [
              createTextVNode("mdi-chevron-left")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VIcon, {
        id: "maxBtn",
        style: { "display": "none" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`mdi-chevron-right`);
          } else {
            return [
              createTextVNode("mdi-chevron-right")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</button></div></div><div id="whiteboardInfoContainer" data-v-832ab625><p data-v-832ab625><b data-v-832ab625>Whiteboard information:</b></p><p data-v-832ab625># connected users: <i id="connectedUsersCount" data-v-832ab625>0</i></p><p data-v-832ab625>Smallest screen resolution: <i id="smallestScreenResolution" data-v-832ab625>Unknown.</i></p><p data-v-832ab625># msg. sent to server: <i id="messageSentCount" data-v-832ab625>0</i></p><p data-v-832ab625># msg. received from server: <i id="messageReceivedCount" data-v-832ab625>0</i></p></div><div id="shareWhiteboardDialog" class="displayNone" data-v-832ab625><div class="shareWhiteboardDialogContent" data-v-832ab625><div class="share-whiteboard share-whiteboard info white--text pa-3 rounded-lg d-flex flex-column" data-v-832ab625>`);
      _push(ssrRenderComponent(VBtn, {
        text: "",
        color: "white",
        class: "shareWhiteboardDialogItem whtie--text text-capitalize",
        id: "shareWhiteboardDialogCopyReadOnlyLink"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VIcon, {
              class: "white--text",
              left: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`mdi-lock`);
                } else {
                  return [
                    createTextVNode("mdi-lock")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` Share read-only link`);
          } else {
            return [
              createVNode(VIcon, {
                class: "white--text",
                left: ""
              }, {
                default: withCtx(() => [
                  createTextVNode("mdi-lock")
                ]),
                _: 1
              }),
              createTextVNode(" Share read-only link")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VBtn, {
        text: "",
        color: "white",
        class: "whtie--text text-capitalize shareWhiteboardDialogItem",
        id: "shareWhiteboardDialogCopyReadWriteLink"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VIcon, {
              class: "white--text",
              left: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`mdi-lock-open`);
                } else {
                  return [
                    createTextVNode("mdi-lock-open")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`\xA0Share read/write link`);
          } else {
            return [
              createVNode(VIcon, {
                class: "white--text",
                left: ""
              }, {
                default: withCtx(() => [
                  createTextVNode("mdi-lock-open")
                ]),
                _: 1
              }),
              createTextVNode("\xA0Share read/write link")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VBtn, {
        text: "",
        color: "white",
        class: "whtie--text text-capitalize shareWhiteboardDialogItem",
        id: "shareWhiteboardDialogGoBack"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Go back to the whiteboard`);
          } else {
            return [
              createTextVNode("Go back to the whiteboard")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p class="shareWhiteboardDialogItem displayNone" id="shareWhiteboardDialogMessage" data-v-832ab625></p></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/whiteboard/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-832ab625"]]);

export { index as default };
//# sourceMappingURL=index-DPAgHfgS.mjs.map
