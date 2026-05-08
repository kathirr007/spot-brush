import { _ as __nuxt_component_0 } from './nuxt-link-h2V6O_st.mjs';
import { withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc, k as VContainer, l as VRow, m as VCol, V as VCard, p as VCardTitle, q as VCardText } from './server.mjs';
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

const _sfc_main = {
  middleware: ["refreshToken", "notAuthenticated"],
  validate({ params }) {
    if (!params.email) return false;
    return true;
  },
  data() {
    return {
      code: "",
      error: "",
      email: ""
    };
  },
  asyncData(context) {
    return {
      email: context.params.email
    };
  },
  methods: {
    confirm() {
      const { code, email } = this;
      const data = { code, email };
      this.$axios("/auth/confirm", {
        method: "post",
        headers: {
          Accept: "application/json",
          Content: "application/json"
        },
        data
      }).then((res) => {
        res.data;
        this.$router.push("/auth/login");
      }).catch((err) => {
        this.error = err.response.data.error;
      });
    },
    resendConfirmEmail() {
      const { email } = this;
      const data = { email };
      this.$axios("/auth/resendConfirmEmail", {
        method: "post",
        headers: {
          Accept: "application/json",
          Content: "application/json"
        },
        data
      }).then((res) => {
        debugger;
        res.data;
        this.$router.push("/auth/login");
      }).catch((err) => {
        debugger;
        console.log(err);
        this.error = err.response.data.error;
      });
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_nuxt_link = __nuxt_component_0;
  _push(ssrRenderComponent(VContainer, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VRow, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VCol, {
                cols: "7",
                class: "mx-auto"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(VCard, {
                      color: "",
                      class: "w-100 rounded-xl pa-5"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(VCardTitle, { class: "headline justify-center text-center primary--text break-word text-h5" }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(`Please confirm your email`);
                              } else {
                                return [
                                  createTextVNode("Please confirm your email")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                          _push5(ssrRenderComponent(VCardText, { class: "text-center" }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(` We&#39;ve send an email confirmation to your registered <strong class="primary--text"${_scopeId5}>${ssrInterpolate($data.email)}</strong>. <br${_scopeId5}> Please check and confirm your registration. `);
                              } else {
                                return [
                                  createTextVNode(" We've send an email confirmation to your registered "),
                                  createVNode("strong", { class: "primary--text" }, toDisplayString($data.email), 1),
                                  createTextVNode(". "),
                                  createVNode("br"),
                                  createTextVNode(" Please check and confirm your registration. ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                          _push5(ssrRenderComponent(VCardText, { class: "text-center text-body-1 px-0" }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(` Already confirmed the registration? `);
                                _push6(ssrRenderComponent(_component_nuxt_link, { to: "/auth/signin" }, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(`Click Here`);
                                    } else {
                                      return [
                                        createTextVNode("Click Here")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                              } else {
                                return [
                                  createTextVNode(" Already confirmed the registration? "),
                                  createVNode(_component_nuxt_link, { to: "/auth/signin" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Click Here")
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(VCardTitle, { class: "headline justify-center text-center primary--text break-word text-h5" }, {
                              default: withCtx(() => [
                                createTextVNode("Please confirm your email")
                              ]),
                              _: 1
                            }),
                            createVNode(VCardText, { class: "text-center" }, {
                              default: withCtx(() => [
                                createTextVNode(" We've send an email confirmation to your registered "),
                                createVNode("strong", { class: "primary--text" }, toDisplayString($data.email), 1),
                                createTextVNode(". "),
                                createVNode("br"),
                                createTextVNode(" Please check and confirm your registration. ")
                              ]),
                              _: 1
                            }),
                            createVNode(VCardText, { class: "text-center text-body-1 px-0" }, {
                              default: withCtx(() => [
                                createTextVNode(" Already confirmed the registration? "),
                                createVNode(_component_nuxt_link, { to: "/auth/signin" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Click Here")
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
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VCard, {
                        color: "",
                        class: "w-100 rounded-xl pa-5"
                      }, {
                        default: withCtx(() => [
                          createVNode(VCardTitle, { class: "headline justify-center text-center primary--text break-word text-h5" }, {
                            default: withCtx(() => [
                              createTextVNode("Please confirm your email")
                            ]),
                            _: 1
                          }),
                          createVNode(VCardText, { class: "text-center" }, {
                            default: withCtx(() => [
                              createTextVNode(" We've send an email confirmation to your registered "),
                              createVNode("strong", { class: "primary--text" }, toDisplayString($data.email), 1),
                              createTextVNode(". "),
                              createVNode("br"),
                              createTextVNode(" Please check and confirm your registration. ")
                            ]),
                            _: 1
                          }),
                          createVNode(VCardText, { class: "text-center text-body-1 px-0" }, {
                            default: withCtx(() => [
                              createTextVNode(" Already confirmed the registration? "),
                              createVNode(_component_nuxt_link, { to: "/auth/signin" }, {
                                default: withCtx(() => [
                                  createTextVNode("Click Here")
                                ]),
                                _: 1
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
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(VCol, {
                  cols: "7",
                  class: "mx-auto"
                }, {
                  default: withCtx(() => [
                    createVNode(VCard, {
                      color: "",
                      class: "w-100 rounded-xl pa-5"
                    }, {
                      default: withCtx(() => [
                        createVNode(VCardTitle, { class: "headline justify-center text-center primary--text break-word text-h5" }, {
                          default: withCtx(() => [
                            createTextVNode("Please confirm your email")
                          ]),
                          _: 1
                        }),
                        createVNode(VCardText, { class: "text-center" }, {
                          default: withCtx(() => [
                            createTextVNode(" We've send an email confirmation to your registered "),
                            createVNode("strong", { class: "primary--text" }, toDisplayString($data.email), 1),
                            createTextVNode(". "),
                            createVNode("br"),
                            createTextVNode(" Please check and confirm your registration. ")
                          ]),
                          _: 1
                        }),
                        createVNode(VCardText, { class: "text-center text-body-1 px-0" }, {
                          default: withCtx(() => [
                            createTextVNode(" Already confirmed the registration? "),
                            createVNode(_component_nuxt_link, { to: "/auth/signin" }, {
                              default: withCtx(() => [
                                createTextVNode("Click Here")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
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
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(VRow, null, {
            default: withCtx(() => [
              createVNode(VCol, {
                cols: "7",
                class: "mx-auto"
              }, {
                default: withCtx(() => [
                  createVNode(VCard, {
                    color: "",
                    class: "w-100 rounded-xl pa-5"
                  }, {
                    default: withCtx(() => [
                      createVNode(VCardTitle, { class: "headline justify-center text-center primary--text break-word text-h5" }, {
                        default: withCtx(() => [
                          createTextVNode("Please confirm your email")
                        ]),
                        _: 1
                      }),
                      createVNode(VCardText, { class: "text-center" }, {
                        default: withCtx(() => [
                          createTextVNode(" We've send an email confirmation to your registered "),
                          createVNode("strong", { class: "primary--text" }, toDisplayString($data.email), 1),
                          createTextVNode(". "),
                          createVNode("br"),
                          createTextVNode(" Please check and confirm your registration. ")
                        ]),
                        _: 1
                      }),
                      createVNode(VCardText, { class: "text-center text-body-1 px-0" }, {
                        default: withCtx(() => [
                          createTextVNode(" Already confirmed the registration? "),
                          createVNode(_component_nuxt_link, { to: "/auth/signin" }, {
                            default: withCtx(() => [
                              createTextVNode("Click Here")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/confirm/_email/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { index as default };
//# sourceMappingURL=index-RL8ai1xk.mjs.map
