import { resolveComponent, withCtx, createVNode, createTextVNode, openBlock, createBlock, toDisplayString, createCommentVNode, withModifiers, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
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
  middleware: ["notAuthenticated"],
  data() {
    return {
      email: "",
      password: "",
      error: ""
    };
  },
  methods: {
    loginUser() {
      const { email, password } = this;
      const data = { email, password };
      this.$axios("/auth/login", {
        method: "post",
        headers: {
          Accept: "application/json",
          Content: "application/json"
        },
        data
      }).then((res) => {
        const auth = res.data;
        this.$store.commit("setAuth", auth);
        this.$router.push("/");
      }).catch((err) => {
        this.error = err.response.data.error.message;
        this.$store.commit("setAuth", null);
        if (err.response.data.error.code == "UserNotConfirmedException") {
          setTimeout(() => {
            this.$router.push("/auth/confirm/" + email);
          }, 3e3);
        }
      });
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_b_container = resolveComponent("b-container");
  const _component_b_row = resolveComponent("b-row");
  const _component_b_col = resolveComponent("b-col");
  const _component_b_card = resolveComponent("b-card");
  const _component_b_form_group = resolveComponent("b-form-group");
  const _component_b_form_input = resolveComponent("b-form-input");
  const _component_b_button = resolveComponent("b-button");
  _push(ssrRenderComponent(_component_b_container, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_b_row, { "align-v": "center" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_b_col, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_b_card, {
                      "bg-variant": "light",
                      "label-cols-lg": "12"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          if ($data.error) {
                            _push5(`<p${_scopeId4}>${ssrInterpolate($data.error)}</p>`);
                          } else {
                            _push5(`<!---->`);
                          }
                          _push5(`<form${_scopeId4}>`);
                          _push5(ssrRenderComponent(_component_b_form_group, {
                            "label-cols-lg": "12",
                            label: "Sign in",
                            "label-size": "lg",
                            "label-class": "font-weight-bold pt-0",
                            class: "mb-0"
                          }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(ssrRenderComponent(_component_b_form_group, {
                                  "label-cols-sm": "4",
                                  label: "Email:",
                                  "label-align-sm": "right",
                                  "label-for": "nested-email"
                                }, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(ssrRenderComponent(_component_b_form_input, {
                                        id: "nested-email",
                                        type: "text",
                                        value: "demo",
                                        modelValue: $data.email,
                                        "onUpdate:modelValue": ($event) => $data.email = $event,
                                        required: ""
                                      }, null, _parent7, _scopeId6));
                                    } else {
                                      return [
                                        createVNode(_component_b_form_input, {
                                          id: "nested-email",
                                          type: "text",
                                          value: "demo",
                                          modelValue: $data.email,
                                          "onUpdate:modelValue": ($event) => $data.email = $event,
                                          required: ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(_component_b_form_group, {
                                  "label-cols-sm": "4",
                                  label: "Password:",
                                  "label-align-sm": "right",
                                  "label-for": "nested-password"
                                }, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(ssrRenderComponent(_component_b_form_input, {
                                        id: "nested-password",
                                        type: "password",
                                        value: "demo",
                                        modelValue: $data.password,
                                        "onUpdate:modelValue": ($event) => $data.password = $event
                                      }, null, _parent7, _scopeId6));
                                    } else {
                                      return [
                                        createVNode(_component_b_form_input, {
                                          id: "nested-password",
                                          type: "password",
                                          value: "demo",
                                          modelValue: $data.password,
                                          "onUpdate:modelValue": ($event) => $data.password = $event
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(_component_b_button, { type: "submit" }, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(`Sign In`);
                                    } else {
                                      return [
                                        createTextVNode("Sign In")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(_component_b_button, { to: "/auth/register" }, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(`Register`);
                                    } else {
                                      return [
                                        createTextVNode("Register")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                              } else {
                                return [
                                  createVNode(_component_b_form_group, {
                                    "label-cols-sm": "4",
                                    label: "Email:",
                                    "label-align-sm": "right",
                                    "label-for": "nested-email"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_b_form_input, {
                                        id: "nested-email",
                                        type: "text",
                                        value: "demo",
                                        modelValue: $data.email,
                                        "onUpdate:modelValue": ($event) => $data.email = $event,
                                        required: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_b_form_group, {
                                    "label-cols-sm": "4",
                                    label: "Password:",
                                    "label-align-sm": "right",
                                    "label-for": "nested-password"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_b_form_input, {
                                        id: "nested-password",
                                        type: "password",
                                        value: "demo",
                                        modelValue: $data.password,
                                        "onUpdate:modelValue": ($event) => $data.password = $event
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_b_button, { type: "submit" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Sign In")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_b_button, { to: "/auth/register" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Register")
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                          _push5(`</form>`);
                        } else {
                          return [
                            $data.error ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString($data.error), 1)) : createCommentVNode("", true),
                            createVNode("form", {
                              onSubmit: withModifiers($options.loginUser, ["prevent"])
                            }, [
                              createVNode(_component_b_form_group, {
                                "label-cols-lg": "12",
                                label: "Sign in",
                                "label-size": "lg",
                                "label-class": "font-weight-bold pt-0",
                                class: "mb-0"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_b_form_group, {
                                    "label-cols-sm": "4",
                                    label: "Email:",
                                    "label-align-sm": "right",
                                    "label-for": "nested-email"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_b_form_input, {
                                        id: "nested-email",
                                        type: "text",
                                        value: "demo",
                                        modelValue: $data.email,
                                        "onUpdate:modelValue": ($event) => $data.email = $event,
                                        required: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_b_form_group, {
                                    "label-cols-sm": "4",
                                    label: "Password:",
                                    "label-align-sm": "right",
                                    "label-for": "nested-password"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_b_form_input, {
                                        id: "nested-password",
                                        type: "password",
                                        value: "demo",
                                        modelValue: $data.password,
                                        "onUpdate:modelValue": ($event) => $data.password = $event
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_b_button, { type: "submit" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Sign In")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_b_button, { to: "/auth/register" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Register")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ], 40, ["onSubmit"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_b_card, {
                        "bg-variant": "light",
                        "label-cols-lg": "12"
                      }, {
                        default: withCtx(() => [
                          $data.error ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString($data.error), 1)) : createCommentVNode("", true),
                          createVNode("form", {
                            onSubmit: withModifiers($options.loginUser, ["prevent"])
                          }, [
                            createVNode(_component_b_form_group, {
                              "label-cols-lg": "12",
                              label: "Sign in",
                              "label-size": "lg",
                              "label-class": "font-weight-bold pt-0",
                              class: "mb-0"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_b_form_group, {
                                  "label-cols-sm": "4",
                                  label: "Email:",
                                  "label-align-sm": "right",
                                  "label-for": "nested-email"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_b_form_input, {
                                      id: "nested-email",
                                      type: "text",
                                      value: "demo",
                                      modelValue: $data.email,
                                      "onUpdate:modelValue": ($event) => $data.email = $event,
                                      required: ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_b_form_group, {
                                  "label-cols-sm": "4",
                                  label: "Password:",
                                  "label-align-sm": "right",
                                  "label-for": "nested-password"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_b_form_input, {
                                      id: "nested-password",
                                      type: "password",
                                      value: "demo",
                                      modelValue: $data.password,
                                      "onUpdate:modelValue": ($event) => $data.password = $event
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_b_button, { type: "submit" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Sign In")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_b_button, { to: "/auth/register" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Register")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ], 40, ["onSubmit"])
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
                createVNode(_component_b_col, null, {
                  default: withCtx(() => [
                    createVNode(_component_b_card, {
                      "bg-variant": "light",
                      "label-cols-lg": "12"
                    }, {
                      default: withCtx(() => [
                        $data.error ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString($data.error), 1)) : createCommentVNode("", true),
                        createVNode("form", {
                          onSubmit: withModifiers($options.loginUser, ["prevent"])
                        }, [
                          createVNode(_component_b_form_group, {
                            "label-cols-lg": "12",
                            label: "Sign in",
                            "label-size": "lg",
                            "label-class": "font-weight-bold pt-0",
                            class: "mb-0"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_b_form_group, {
                                "label-cols-sm": "4",
                                label: "Email:",
                                "label-align-sm": "right",
                                "label-for": "nested-email"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_b_form_input, {
                                    id: "nested-email",
                                    type: "text",
                                    value: "demo",
                                    modelValue: $data.email,
                                    "onUpdate:modelValue": ($event) => $data.email = $event,
                                    required: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_b_form_group, {
                                "label-cols-sm": "4",
                                label: "Password:",
                                "label-align-sm": "right",
                                "label-for": "nested-password"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_b_form_input, {
                                    id: "nested-password",
                                    type: "password",
                                    value: "demo",
                                    modelValue: $data.password,
                                    "onUpdate:modelValue": ($event) => $data.password = $event
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_b_button, { type: "submit" }, {
                                default: withCtx(() => [
                                  createTextVNode("Sign In")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_b_button, { to: "/auth/register" }, {
                                default: withCtx(() => [
                                  createTextVNode("Register")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ], 40, ["onSubmit"])
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
          createVNode(_component_b_row, { "align-v": "center" }, {
            default: withCtx(() => [
              createVNode(_component_b_col, null, {
                default: withCtx(() => [
                  createVNode(_component_b_card, {
                    "bg-variant": "light",
                    "label-cols-lg": "12"
                  }, {
                    default: withCtx(() => [
                      $data.error ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString($data.error), 1)) : createCommentVNode("", true),
                      createVNode("form", {
                        onSubmit: withModifiers($options.loginUser, ["prevent"])
                      }, [
                        createVNode(_component_b_form_group, {
                          "label-cols-lg": "12",
                          label: "Sign in",
                          "label-size": "lg",
                          "label-class": "font-weight-bold pt-0",
                          class: "mb-0"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_b_form_group, {
                              "label-cols-sm": "4",
                              label: "Email:",
                              "label-align-sm": "right",
                              "label-for": "nested-email"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_b_form_input, {
                                  id: "nested-email",
                                  type: "text",
                                  value: "demo",
                                  modelValue: $data.email,
                                  "onUpdate:modelValue": ($event) => $data.email = $event,
                                  required: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_b_form_group, {
                              "label-cols-sm": "4",
                              label: "Password:",
                              "label-align-sm": "right",
                              "label-for": "nested-password"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_b_form_input, {
                                  id: "nested-password",
                                  type: "password",
                                  value: "demo",
                                  modelValue: $data.password,
                                  "onUpdate:modelValue": ($event) => $data.password = $event
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_b_button, { type: "submit" }, {
                              default: withCtx(() => [
                                createTextVNode("Sign In")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_b_button, { to: "/auth/register" }, {
                              default: withCtx(() => [
                                createTextVNode("Register")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ], 40, ["onSubmit"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { login as default };
//# sourceMappingURL=login-CwfyBV9B.mjs.map
