import { _ as __nuxt_component_0 } from './nuxt-link-h2V6O_st.mjs';
import { defineComponent, ref, withCtx, createTextVNode, unref, toDisplayString, isRef, createVNode, openBlock, createBlock, createCommentVNode, withModifiers, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { _ as _imports_0 } from './sb-logo-Cc2o13Y-.mjs';
import { u as useToast } from './index-DGjfQkMK.mjs';
import { u as useAuthStore } from './auth-CbAKS0YR.mjs';
import { _ as _export_sfc, u as useRouter$1, a as useNuxtApp, k as VContainer, V as VCard, p as VCardTitle, q as VCardText, d as VForm, f as VTextField, i as VBtn } from './server.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "signin",
  __ssrInlineRender: true,
  setup(__props) {
    const auth = useAuthStore();
    const router = useRouter$1();
    const { $axios } = useNuxtApp();
    const toast = useToast();
    const form = ref();
    const valid = ref(false);
    const email = ref("");
    const password = ref("");
    const show1 = ref(false);
    const error = ref("");
    const rules = {
      required: (name) => (v) => !!v || `${name} field is required`,
      length: (name, len) => (v) => (v || "").length >= len || `${name} should be at least ${len} characters`,
      email: (v) => !!(v || "").match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) || "Please enter a valid email address",
      password: (v) => !!(v || "").match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) || "Password must contain upper case, number, and special character"
    };
    async function loginUser() {
      var _a, _b, _c, _d, _e, _f;
      const { valid: isValid } = await form.value.validate();
      if (!isValid) return;
      try {
        const res = await $axios.post("/auth/login", { data: { email: email.value, password: password.value } });
        const authData = res.data;
        auth.setAuth(authData);
        auth.setWhiteboard(false);
        toast.success(`Hello ${authData.given_name}! Welcome to SpotBrush.`);
        router.push("/dashboard");
      } catch (err) {
        error.value = ((_c = (_b = (_a = err.response) == null ? void 0 : _a.data) == null ? void 0 : _b.error) == null ? void 0 : _c.message) || "Login failed";
        auth.setAuth(null);
        const code = (_f = (_e = (_d = err.response) == null ? void 0 : _d.data) == null ? void 0 : _e.error) == null ? void 0 : _f.code;
        if (code === "UserNotConfirmedException") {
          toast.warning("Please confirm your email before signing in.");
          router.push("/auth/confirm/" + email.value);
        } else if (code === "NotAuthorizedException") {
          toast.error(err.response.data.error.message);
        }
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(ssrRenderComponent(VContainer, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="row" data-v-8f144f9b${_scopeId}><div class="d-none d-sm-flex col-sm-5 justify-center" data-v-8f144f9b${_scopeId}><img class="w-60 form-promo"${ssrRenderAttr("src", _imports_0)} alt="" data-v-8f144f9b${_scopeId}></div><div class="col-12 col-sm-7 d-flex align-center justify-center" data-v-8f144f9b${_scopeId}>`);
            _push2(ssrRenderComponent(VCard, { class: "px-5 pb-5 w-100 rounded-xl" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardTitle, { class: "justify-center text-center text-primary text-h5" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Login to your account`);
                      } else {
                        return [
                          createTextVNode("Login to your account")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (unref(error)) {
                    _push3(ssrRenderComponent(VCardText, { class: "text-error text-center text-body-1 px-0" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(unref(error))}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(unref(error)), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(VForm, {
                    ref_key: "form",
                    ref: form,
                    modelValue: unref(valid),
                    "onUpdate:modelValue": ($event) => isRef(valid) ? valid.value = $event : null,
                    class: "w-100",
                    onSubmit: loginUser
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(email),
                          "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                          rules: [rules.required("Email"), rules.email],
                          label: "E-mail",
                          required: ""
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(password),
                          "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                          rules: [rules.required("Password"), rules.length("Password", 8), rules.password],
                          "append-inner-icon": unref(show1) ? "mdi-eye" : "mdi-eye-off",
                          type: unref(show1) ? "text" : "password",
                          label: "Password",
                          counter: "",
                          "onClick:appendInner": ($event) => show1.value = !unref(show1)
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCardText, { class: "text-right text-body-1 px-0" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Forgot password? `);
                              _push5(ssrRenderComponent(_component_NuxtLink, { to: "/auth/forgotpassword" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Click Here`);
                                  } else {
                                    return [
                                      createTextVNode("Click Here")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createTextVNode(" Forgot password? "),
                                createVNode(_component_NuxtLink, { to: "/auth/forgotpassword" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Click Here")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          disabled: !unref(valid),
                          color: "primary",
                          size: "x-large",
                          class: "w-100",
                          onClick: loginUser
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Sign In`);
                            } else {
                              return [
                                createTextVNode("Sign In")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCardText, { class: "text-center text-body-1 px-0" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Not Registered with us? `);
                              _push5(ssrRenderComponent(_component_NuxtLink, { to: "/auth/signup" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Click Here`);
                                  } else {
                                    return [
                                      createTextVNode("Click Here")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createTextVNode(" Not Registered with us? "),
                                createVNode(_component_NuxtLink, { to: "/auth/signup" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Click Here")
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
                          createVNode(VTextField, {
                            modelValue: unref(email),
                            "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                            rules: [rules.required("Email"), rules.email],
                            label: "E-mail",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                          createVNode(VTextField, {
                            modelValue: unref(password),
                            "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                            rules: [rules.required("Password"), rules.length("Password", 8), rules.password],
                            "append-inner-icon": unref(show1) ? "mdi-eye" : "mdi-eye-off",
                            type: unref(show1) ? "text" : "password",
                            label: "Password",
                            counter: "",
                            "onClick:appendInner": ($event) => show1.value = !unref(show1)
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "rules", "append-inner-icon", "type", "onClick:appendInner"]),
                          createVNode(VCardText, { class: "text-right text-body-1 px-0" }, {
                            default: withCtx(() => [
                              createTextVNode(" Forgot password? "),
                              createVNode(_component_NuxtLink, { to: "/auth/forgotpassword" }, {
                                default: withCtx(() => [
                                  createTextVNode("Click Here")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VBtn, {
                            disabled: !unref(valid),
                            color: "primary",
                            size: "x-large",
                            class: "w-100",
                            onClick: loginUser
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Sign In")
                            ]),
                            _: 1
                          }, 8, ["disabled"]),
                          createVNode(VCardText, { class: "text-center text-body-1 px-0" }, {
                            default: withCtx(() => [
                              createTextVNode(" Not Registered with us? "),
                              createVNode(_component_NuxtLink, { to: "/auth/signup" }, {
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCardTitle, { class: "justify-center text-center text-primary text-h5" }, {
                      default: withCtx(() => [
                        createTextVNode("Login to your account")
                      ]),
                      _: 1
                    }),
                    unref(error) ? (openBlock(), createBlock(VCardText, {
                      key: 0,
                      class: "text-error text-center text-body-1 px-0"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(error)), 1)
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    createVNode(VForm, {
                      ref_key: "form",
                      ref: form,
                      modelValue: unref(valid),
                      "onUpdate:modelValue": ($event) => isRef(valid) ? valid.value = $event : null,
                      class: "w-100",
                      onSubmit: withModifiers(loginUser, ["prevent"])
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(email),
                          "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                          rules: [rules.required("Email"), rules.email],
                          label: "E-mail",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                        createVNode(VTextField, {
                          modelValue: unref(password),
                          "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                          rules: [rules.required("Password"), rules.length("Password", 8), rules.password],
                          "append-inner-icon": unref(show1) ? "mdi-eye" : "mdi-eye-off",
                          type: unref(show1) ? "text" : "password",
                          label: "Password",
                          counter: "",
                          "onClick:appendInner": ($event) => show1.value = !unref(show1)
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "rules", "append-inner-icon", "type", "onClick:appendInner"]),
                        createVNode(VCardText, { class: "text-right text-body-1 px-0" }, {
                          default: withCtx(() => [
                            createTextVNode(" Forgot password? "),
                            createVNode(_component_NuxtLink, { to: "/auth/forgotpassword" }, {
                              default: withCtx(() => [
                                createTextVNode("Click Here")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(VBtn, {
                          disabled: !unref(valid),
                          color: "primary",
                          size: "x-large",
                          class: "w-100",
                          onClick: loginUser
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Sign In")
                          ]),
                          _: 1
                        }, 8, ["disabled"]),
                        createVNode(VCardText, { class: "text-center text-body-1 px-0" }, {
                          default: withCtx(() => [
                            createTextVNode(" Not Registered with us? "),
                            createVNode(_component_NuxtLink, { to: "/auth/signup" }, {
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
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "row" }, [
                createVNode("div", { class: "d-none d-sm-flex col-sm-5 justify-center" }, [
                  createVNode("img", {
                    class: "w-60 form-promo",
                    src: _imports_0,
                    alt: ""
                  })
                ]),
                createVNode("div", { class: "col-12 col-sm-7 d-flex align-center justify-center" }, [
                  createVNode(VCard, { class: "px-5 pb-5 w-100 rounded-xl" }, {
                    default: withCtx(() => [
                      createVNode(VCardTitle, { class: "justify-center text-center text-primary text-h5" }, {
                        default: withCtx(() => [
                          createTextVNode("Login to your account")
                        ]),
                        _: 1
                      }),
                      unref(error) ? (openBlock(), createBlock(VCardText, {
                        key: 0,
                        class: "text-error text-center text-body-1 px-0"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(error)), 1)
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      createVNode(VForm, {
                        ref_key: "form",
                        ref: form,
                        modelValue: unref(valid),
                        "onUpdate:modelValue": ($event) => isRef(valid) ? valid.value = $event : null,
                        class: "w-100",
                        onSubmit: withModifiers(loginUser, ["prevent"])
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: unref(email),
                            "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                            rules: [rules.required("Email"), rules.email],
                            label: "E-mail",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                          createVNode(VTextField, {
                            modelValue: unref(password),
                            "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                            rules: [rules.required("Password"), rules.length("Password", 8), rules.password],
                            "append-inner-icon": unref(show1) ? "mdi-eye" : "mdi-eye-off",
                            type: unref(show1) ? "text" : "password",
                            label: "Password",
                            counter: "",
                            "onClick:appendInner": ($event) => show1.value = !unref(show1)
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "rules", "append-inner-icon", "type", "onClick:appendInner"]),
                          createVNode(VCardText, { class: "text-right text-body-1 px-0" }, {
                            default: withCtx(() => [
                              createTextVNode(" Forgot password? "),
                              createVNode(_component_NuxtLink, { to: "/auth/forgotpassword" }, {
                                default: withCtx(() => [
                                  createTextVNode("Click Here")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VBtn, {
                            disabled: !unref(valid),
                            color: "primary",
                            size: "x-large",
                            class: "w-100",
                            onClick: loginUser
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Sign In")
                            ]),
                            _: 1
                          }, 8, ["disabled"]),
                          createVNode(VCardText, { class: "text-center text-body-1 px-0" }, {
                            default: withCtx(() => [
                              createTextVNode(" Not Registered with us? "),
                              createVNode(_component_NuxtLink, { to: "/auth/signup" }, {
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
                      }, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/signin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const signin = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8f144f9b"]]);

export { signin as default };
//# sourceMappingURL=signin-Sz-yM_W0.mjs.map
