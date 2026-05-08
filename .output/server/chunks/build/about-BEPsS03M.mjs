import { mergeProps, withCtx, createTextVNode, openBlock, createBlock, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _imports_0 } from './hero-v8fm5W4Y.mjs';
import { _ as _export_sfc, k as VContainer, l as VRow, m as VCol, i as VBtn } from './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
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
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';
import 'axios';

const _sfc_main = {
  middleware: ["refreshToken", "notAuthenticated"],
  head: {
    title: `SpotBrush | About`
  },
  components: {}
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(ssrRenderComponent(VContainer, mergeProps({ class: "h-100 d-flex align-center" }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VRow, {
          column: "",
          "justify-center": "",
          "align-center": ""
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VCol, {
                cols: "12",
                sm: "5",
                class: "d-flex align-center align-sm-start justify-center flex-column"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<div class="w-100 text-center text-sm-left"${_scopeId3}><h1${_scopeId3}>About SpotBrush</h1><p${_scopeId3}>Lorem ipsum sit dolor amet nuev done</p>`);
                    _push4(ssrRenderComponent(VCol, {
                      cols: "8",
                      sm: "9",
                      class: "px-0 text-center text-sm-left ma-auto ma-sm-0"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          if (_ctx.$store.state.auth) {
                            _push5(ssrRenderComponent(VBtn, {
                              "x-large": "",
                              class: "w-100",
                              onClick: _ctx.createBoard,
                              color: "primary px-16"
                            }, {
                              default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                if (_push6) {
                                  _push6(`Create Board`);
                                } else {
                                  return [
                                    createTextVNode("Create Board")
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent5, _scopeId4));
                          } else {
                            _push5(ssrRenderComponent(VBtn, {
                              "x-large": "",
                              class: "w-100",
                              color: "primary px-16",
                              to: "/auth/signin"
                            }, {
                              default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                if (_push6) {
                                  _push6(`Get started`);
                                } else {
                                  return [
                                    createTextVNode("Get started")
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent5, _scopeId4));
                          }
                        } else {
                          return [
                            _ctx.$store.state.auth ? (openBlock(), createBlock(VBtn, {
                              key: 0,
                              "x-large": "",
                              class: "w-100",
                              onClick: _ctx.createBoard,
                              color: "primary px-16"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Create Board")
                              ]),
                              _: 1
                            }, 8, ["onClick"])) : (openBlock(), createBlock(VBtn, {
                              key: 1,
                              "x-large": "",
                              class: "w-100",
                              color: "primary px-16",
                              to: "/auth/signin"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Get started")
                              ]),
                              _: 1
                            }))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "w-100 text-center text-sm-left" }, [
                        createVNode("h1", null, "About SpotBrush"),
                        createVNode("p", null, "Lorem ipsum sit dolor amet nuev done"),
                        createVNode(VCol, {
                          cols: "8",
                          sm: "9",
                          class: "px-0 text-center text-sm-left ma-auto ma-sm-0"
                        }, {
                          default: withCtx(() => [
                            _ctx.$store.state.auth ? (openBlock(), createBlock(VBtn, {
                              key: 0,
                              "x-large": "",
                              class: "w-100",
                              onClick: _ctx.createBoard,
                              color: "primary px-16"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Create Board")
                              ]),
                              _: 1
                            }, 8, ["onClick"])) : (openBlock(), createBlock(VBtn, {
                              key: 1,
                              "x-large": "",
                              class: "w-100",
                              color: "primary px-16",
                              to: "/auth/signin"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Get started")
                              ]),
                              _: 1
                            }))
                          ]),
                          _: 1
                        })
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VCol, {
                cols: "12",
                sm: "7",
                class: "d-flex align-center align-sm-start justify-center flex-column"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<img class="mw-100"${ssrRenderAttr("src", _imports_0)} alt=""${_scopeId3}>`);
                  } else {
                    return [
                      createVNode("img", {
                        class: "mw-100",
                        src: _imports_0,
                        alt: ""
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(VCol, {
                  cols: "12",
                  sm: "5",
                  class: "d-flex align-center align-sm-start justify-center flex-column"
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "w-100 text-center text-sm-left" }, [
                      createVNode("h1", null, "About SpotBrush"),
                      createVNode("p", null, "Lorem ipsum sit dolor amet nuev done"),
                      createVNode(VCol, {
                        cols: "8",
                        sm: "9",
                        class: "px-0 text-center text-sm-left ma-auto ma-sm-0"
                      }, {
                        default: withCtx(() => [
                          _ctx.$store.state.auth ? (openBlock(), createBlock(VBtn, {
                            key: 0,
                            "x-large": "",
                            class: "w-100",
                            onClick: _ctx.createBoard,
                            color: "primary px-16"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Create Board")
                            ]),
                            _: 1
                          }, 8, ["onClick"])) : (openBlock(), createBlock(VBtn, {
                            key: 1,
                            "x-large": "",
                            class: "w-100",
                            color: "primary px-16",
                            to: "/auth/signin"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Get started")
                            ]),
                            _: 1
                          }))
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 1
                }),
                createVNode(VCol, {
                  cols: "12",
                  sm: "7",
                  class: "d-flex align-center align-sm-start justify-center flex-column"
                }, {
                  default: withCtx(() => [
                    createVNode("img", {
                      class: "mw-100",
                      src: _imports_0,
                      alt: ""
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
          createVNode(VRow, {
            column: "",
            "justify-center": "",
            "align-center": ""
          }, {
            default: withCtx(() => [
              createVNode(VCol, {
                cols: "12",
                sm: "5",
                class: "d-flex align-center align-sm-start justify-center flex-column"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "w-100 text-center text-sm-left" }, [
                    createVNode("h1", null, "About SpotBrush"),
                    createVNode("p", null, "Lorem ipsum sit dolor amet nuev done"),
                    createVNode(VCol, {
                      cols: "8",
                      sm: "9",
                      class: "px-0 text-center text-sm-left ma-auto ma-sm-0"
                    }, {
                      default: withCtx(() => [
                        _ctx.$store.state.auth ? (openBlock(), createBlock(VBtn, {
                          key: 0,
                          "x-large": "",
                          class: "w-100",
                          onClick: _ctx.createBoard,
                          color: "primary px-16"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Create Board")
                          ]),
                          _: 1
                        }, 8, ["onClick"])) : (openBlock(), createBlock(VBtn, {
                          key: 1,
                          "x-large": "",
                          class: "w-100",
                          color: "primary px-16",
                          to: "/auth/signin"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Get started")
                          ]),
                          _: 1
                        }))
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              }),
              createVNode(VCol, {
                cols: "12",
                sm: "7",
                class: "d-flex align-center align-sm-start justify-center flex-column"
              }, {
                default: withCtx(() => [
                  createVNode("img", {
                    class: "mw-100",
                    src: _imports_0,
                    alt: ""
                  })
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
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const about = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { about as default };
//# sourceMappingURL=about-BEPsS03M.mjs.map
