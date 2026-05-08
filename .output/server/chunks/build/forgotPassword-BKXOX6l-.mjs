import { _ as __nuxt_component_0 } from './nuxt-link-h2V6O_st.mjs';
import { defineComponent, ref, computed, withCtx, unref, createTextVNode, toDisplayString, isRef, createVNode, withModifiers, openBlock, createBlock, Fragment, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { u as useToast } from './index-DGjfQkMK.mjs';
import { u as useRouter$1, a as useNuxtApp, k as VContainer, l as VRow, m as VCol, V as VCard, A as VProgressLinear, p as VCardTitle, q as VCardText, d as VForm, f as VTextField, i as VBtn } from './server.mjs';
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
  __name: "forgotPassword",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter$1();
    const { $axios } = useNuxtApp();
    const toast = useToast();
    const form = ref();
    const valid = ref(false);
    const codeSent = ref(false);
    const email = ref("");
    const verificationCode = ref("");
    const newPassword = ref("");
    const confirmPassword = ref("");
    const show1 = ref(false);
    const error = ref("");
    const isLoading = ref(false);
    const rules = {
      required: (name) => (v) => !!v || `${name} field is required`,
      length: (name, len) => (v) => (v || "").length >= len || `${name} should be at least ${len} characters`,
      email: (v) => !!(v || "").match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) || "Please enter a valid email address",
      password: (v) => !!(v || "").match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) || "Password must contain upper case, number, and special character"
    };
    const confirmPasswordRule = computed(
      () => newPassword.value === confirmPassword.value || "Confirm Password must match"
    );
    async function resetPassword() {
      isLoading.value = true;
      try {
        const res = await $axios.post("/auth/forgotpassword", { email: email.value });
        const data = res.data.message;
        if ((data == null ? void 0 : data.code) === "LimitExceededException") {
          error.value = data.message;
        } else {
          toast.success(`Verification code sent to ${email.value}.`);
          error.value = "";
          codeSent.value = true;
        }
      } catch (err) {
        error.value = err.message;
      } finally {
        isLoading.value = false;
      }
    }
    async function confirmNewPassword() {
      isLoading.value = true;
      try {
        const res = await $axios.post("/auth/confirmPasswordChange", {
          email: email.value,
          verificationCode: verificationCode.value,
          newPassword: newPassword.value
        });
        toast.success(res.data.message);
        router.push("/auth/signin");
      } catch (err) {
        error.value = err.message;
      } finally {
        isLoading.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(ssrRenderComponent(VContainer, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    sm: "7",
                    class: "mx-auto"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCard, { class: "w-100 rounded-xl pa-5" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (unref(isLoading)) {
                                _push5(ssrRenderComponent(VProgressLinear, {
                                  indeterminate: "",
                                  rounded: "",
                                  color: "primary"
                                }, null, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(ssrRenderComponent(VCardTitle, { class: "justify-center text-center text-primary text-h5" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`${ssrInterpolate(unref(codeSent) ? "Reset Password" : "Get Verification Code")}`);
                                  } else {
                                    return [
                                      createTextVNode(toDisplayString(unref(codeSent) ? "Reset Password" : "Get Verification Code"), 1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              if (unref(error)) {
                                _push5(ssrRenderComponent(VCardText, { class: "text-error text-center text-body-1 px-0" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(unref(error))}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(unref(error)), 1)
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(ssrRenderComponent(VForm, {
                                ref_key: "form",
                                ref: form,
                                modelValue: unref(valid),
                                "onUpdate:modelValue": ($event) => isRef(valid) ? valid.value = $event : null,
                                class: "w-100",
                                onSubmit: () => {
                                }
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    if (unref(codeSent)) {
                                      _push6(`<!--[-->`);
                                      _push6(ssrRenderComponent(VTextField, {
                                        modelValue: unref(verificationCode),
                                        "onUpdate:modelValue": ($event) => isRef(verificationCode) ? verificationCode.value = $event : null,
                                        rules: [rules.required("Verification Code")],
                                        label: "Verification Code",
                                        required: ""
                                      }, null, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VTextField, {
                                        modelValue: unref(newPassword),
                                        "onUpdate:modelValue": ($event) => isRef(newPassword) ? newPassword.value = $event : null,
                                        rules: [rules.required("New Password"), rules.length("Password", 8), rules.password],
                                        "append-inner-icon": unref(show1) ? "mdi-eye" : "mdi-eye-off",
                                        type: unref(show1) ? "text" : "password",
                                        label: "New Password",
                                        counter: "",
                                        "onClick:appendInner": ($event) => show1.value = !unref(show1)
                                      }, null, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VTextField, {
                                        modelValue: unref(confirmPassword),
                                        "onUpdate:modelValue": ($event) => isRef(confirmPassword) ? confirmPassword.value = $event : null,
                                        rules: [rules.required("Confirm Password"), unref(confirmPasswordRule)],
                                        "append-inner-icon": unref(show1) ? "mdi-eye" : "mdi-eye-off",
                                        type: unref(show1) ? "text" : "password",
                                        label: "Confirm Password",
                                        counter: "",
                                        "onClick:appendInner": ($event) => show1.value = !unref(show1)
                                      }, null, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VCardText, { class: "text-right text-body-1 px-0" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(` Not received code? <a${_scopeId6}>Resend code</a>`);
                                          } else {
                                            return [
                                              createTextVNode(" Not received code? "),
                                              createVNode("a", {
                                                onClick: withModifiers(resetPassword, ["prevent"])
                                              }, "Resend code")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VBtn, {
                                        disabled: !unref(valid),
                                        color: "primary",
                                        size: "x-large",
                                        class: "w-100",
                                        onClick: confirmNewPassword
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Reset Password`);
                                          } else {
                                            return [
                                              createTextVNode("Reset Password")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(`<!--]-->`);
                                    } else {
                                      _push6(`<!--[-->`);
                                      _push6(ssrRenderComponent(VTextField, {
                                        modelValue: unref(email),
                                        "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                                        rules: [rules.required("Email"), rules.email],
                                        label: "E-mail",
                                        required: ""
                                      }, null, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VBtn, {
                                        disabled: !unref(valid),
                                        color: "primary",
                                        size: "x-large",
                                        class: "w-100",
                                        onClick: resetPassword
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Get Code`);
                                          } else {
                                            return [
                                              createTextVNode("Get Code")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(`<!--]-->`);
                                    }
                                    _push6(ssrRenderComponent(VCardText, { class: "text-center text-body-1 px-0" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` Remember old password? `);
                                          _push7(ssrRenderComponent(_component_NuxtLink, { to: "/auth/signin" }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Click Here`);
                                              } else {
                                                return [
                                                  createTextVNode("Click Here")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createTextVNode(" Remember old password? "),
                                            createVNode(_component_NuxtLink, { to: "/auth/signin" }, {
                                              default: withCtx(() => [
                                                createTextVNode("Click Here")
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      unref(codeSent) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                        createVNode(VTextField, {
                                          modelValue: unref(verificationCode),
                                          "onUpdate:modelValue": ($event) => isRef(verificationCode) ? verificationCode.value = $event : null,
                                          rules: [rules.required("Verification Code")],
                                          label: "Verification Code",
                                          required: ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                                        createVNode(VTextField, {
                                          modelValue: unref(newPassword),
                                          "onUpdate:modelValue": ($event) => isRef(newPassword) ? newPassword.value = $event : null,
                                          rules: [rules.required("New Password"), rules.length("Password", 8), rules.password],
                                          "append-inner-icon": unref(show1) ? "mdi-eye" : "mdi-eye-off",
                                          type: unref(show1) ? "text" : "password",
                                          label: "New Password",
                                          counter: "",
                                          "onClick:appendInner": ($event) => show1.value = !unref(show1)
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "rules", "append-inner-icon", "type", "onClick:appendInner"]),
                                        createVNode(VTextField, {
                                          modelValue: unref(confirmPassword),
                                          "onUpdate:modelValue": ($event) => isRef(confirmPassword) ? confirmPassword.value = $event : null,
                                          rules: [rules.required("Confirm Password"), unref(confirmPasswordRule)],
                                          "append-inner-icon": unref(show1) ? "mdi-eye" : "mdi-eye-off",
                                          type: unref(show1) ? "text" : "password",
                                          label: "Confirm Password",
                                          counter: "",
                                          "onClick:appendInner": ($event) => show1.value = !unref(show1)
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "rules", "append-inner-icon", "type", "onClick:appendInner"]),
                                        createVNode(VCardText, { class: "text-right text-body-1 px-0" }, {
                                          default: withCtx(() => [
                                            createTextVNode(" Not received code? "),
                                            createVNode("a", {
                                              onClick: withModifiers(resetPassword, ["prevent"])
                                            }, "Resend code")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VBtn, {
                                          disabled: !unref(valid),
                                          color: "primary",
                                          size: "x-large",
                                          class: "w-100",
                                          onClick: confirmNewPassword
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("Reset Password")
                                          ]),
                                          _: 1
                                        }, 8, ["disabled"])
                                      ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                        createVNode(VTextField, {
                                          modelValue: unref(email),
                                          "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                                          rules: [rules.required("Email"), rules.email],
                                          label: "E-mail",
                                          required: ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                                        createVNode(VBtn, {
                                          disabled: !unref(valid),
                                          color: "primary",
                                          size: "x-large",
                                          class: "w-100",
                                          onClick: resetPassword
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("Get Code")
                                          ]),
                                          _: 1
                                        }, 8, ["disabled"])
                                      ], 64)),
                                      createVNode(VCardText, { class: "text-center text-body-1 px-0" }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Remember old password? "),
                                          createVNode(_component_NuxtLink, { to: "/auth/signin" }, {
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
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                unref(isLoading) ? (openBlock(), createBlock(VProgressLinear, {
                                  key: 0,
                                  indeterminate: "",
                                  rounded: "",
                                  color: "primary"
                                })) : createCommentVNode("", true),
                                createVNode(VCardTitle, { class: "justify-center text-center text-primary text-h5" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(unref(codeSent) ? "Reset Password" : "Get Verification Code"), 1)
                                  ]),
                                  _: 1
                                }),
                                unref(error) ? (openBlock(), createBlock(VCardText, {
                                  key: 1,
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
                                  onSubmit: withModifiers(() => {
                                  }, ["prevent"])
                                }, {
                                  default: withCtx(() => [
                                    unref(codeSent) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                      createVNode(VTextField, {
                                        modelValue: unref(verificationCode),
                                        "onUpdate:modelValue": ($event) => isRef(verificationCode) ? verificationCode.value = $event : null,
                                        rules: [rules.required("Verification Code")],
                                        label: "Verification Code",
                                        required: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                                      createVNode(VTextField, {
                                        modelValue: unref(newPassword),
                                        "onUpdate:modelValue": ($event) => isRef(newPassword) ? newPassword.value = $event : null,
                                        rules: [rules.required("New Password"), rules.length("Password", 8), rules.password],
                                        "append-inner-icon": unref(show1) ? "mdi-eye" : "mdi-eye-off",
                                        type: unref(show1) ? "text" : "password",
                                        label: "New Password",
                                        counter: "",
                                        "onClick:appendInner": ($event) => show1.value = !unref(show1)
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "rules", "append-inner-icon", "type", "onClick:appendInner"]),
                                      createVNode(VTextField, {
                                        modelValue: unref(confirmPassword),
                                        "onUpdate:modelValue": ($event) => isRef(confirmPassword) ? confirmPassword.value = $event : null,
                                        rules: [rules.required("Confirm Password"), unref(confirmPasswordRule)],
                                        "append-inner-icon": unref(show1) ? "mdi-eye" : "mdi-eye-off",
                                        type: unref(show1) ? "text" : "password",
                                        label: "Confirm Password",
                                        counter: "",
                                        "onClick:appendInner": ($event) => show1.value = !unref(show1)
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "rules", "append-inner-icon", "type", "onClick:appendInner"]),
                                      createVNode(VCardText, { class: "text-right text-body-1 px-0" }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Not received code? "),
                                          createVNode("a", {
                                            onClick: withModifiers(resetPassword, ["prevent"])
                                          }, "Resend code")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VBtn, {
                                        disabled: !unref(valid),
                                        color: "primary",
                                        size: "x-large",
                                        class: "w-100",
                                        onClick: confirmNewPassword
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("Reset Password")
                                        ]),
                                        _: 1
                                      }, 8, ["disabled"])
                                    ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                      createVNode(VTextField, {
                                        modelValue: unref(email),
                                        "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                                        rules: [rules.required("Email"), rules.email],
                                        label: "E-mail",
                                        required: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                                      createVNode(VBtn, {
                                        disabled: !unref(valid),
                                        color: "primary",
                                        size: "x-large",
                                        class: "w-100",
                                        onClick: resetPassword
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("Get Code")
                                        ]),
                                        _: 1
                                      }, 8, ["disabled"])
                                    ], 64)),
                                    createVNode(VCardText, { class: "text-center text-body-1 px-0" }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Remember old password? "),
                                        createVNode(_component_NuxtLink, { to: "/auth/signin" }, {
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
                                }, 8, ["modelValue", "onUpdate:modelValue", "onSubmit"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCard, { class: "w-100 rounded-xl pa-5" }, {
                            default: withCtx(() => [
                              unref(isLoading) ? (openBlock(), createBlock(VProgressLinear, {
                                key: 0,
                                indeterminate: "",
                                rounded: "",
                                color: "primary"
                              })) : createCommentVNode("", true),
                              createVNode(VCardTitle, { class: "justify-center text-center text-primary text-h5" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(unref(codeSent) ? "Reset Password" : "Get Verification Code"), 1)
                                ]),
                                _: 1
                              }),
                              unref(error) ? (openBlock(), createBlock(VCardText, {
                                key: 1,
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
                                onSubmit: withModifiers(() => {
                                }, ["prevent"])
                              }, {
                                default: withCtx(() => [
                                  unref(codeSent) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                    createVNode(VTextField, {
                                      modelValue: unref(verificationCode),
                                      "onUpdate:modelValue": ($event) => isRef(verificationCode) ? verificationCode.value = $event : null,
                                      rules: [rules.required("Verification Code")],
                                      label: "Verification Code",
                                      required: ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                                    createVNode(VTextField, {
                                      modelValue: unref(newPassword),
                                      "onUpdate:modelValue": ($event) => isRef(newPassword) ? newPassword.value = $event : null,
                                      rules: [rules.required("New Password"), rules.length("Password", 8), rules.password],
                                      "append-inner-icon": unref(show1) ? "mdi-eye" : "mdi-eye-off",
                                      type: unref(show1) ? "text" : "password",
                                      label: "New Password",
                                      counter: "",
                                      "onClick:appendInner": ($event) => show1.value = !unref(show1)
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "rules", "append-inner-icon", "type", "onClick:appendInner"]),
                                    createVNode(VTextField, {
                                      modelValue: unref(confirmPassword),
                                      "onUpdate:modelValue": ($event) => isRef(confirmPassword) ? confirmPassword.value = $event : null,
                                      rules: [rules.required("Confirm Password"), unref(confirmPasswordRule)],
                                      "append-inner-icon": unref(show1) ? "mdi-eye" : "mdi-eye-off",
                                      type: unref(show1) ? "text" : "password",
                                      label: "Confirm Password",
                                      counter: "",
                                      "onClick:appendInner": ($event) => show1.value = !unref(show1)
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "rules", "append-inner-icon", "type", "onClick:appendInner"]),
                                    createVNode(VCardText, { class: "text-right text-body-1 px-0" }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Not received code? "),
                                        createVNode("a", {
                                          onClick: withModifiers(resetPassword, ["prevent"])
                                        }, "Resend code")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VBtn, {
                                      disabled: !unref(valid),
                                      color: "primary",
                                      size: "x-large",
                                      class: "w-100",
                                      onClick: confirmNewPassword
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("Reset Password")
                                      ]),
                                      _: 1
                                    }, 8, ["disabled"])
                                  ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                    createVNode(VTextField, {
                                      modelValue: unref(email),
                                      "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                                      rules: [rules.required("Email"), rules.email],
                                      label: "E-mail",
                                      required: ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                                    createVNode(VBtn, {
                                      disabled: !unref(valid),
                                      color: "primary",
                                      size: "x-large",
                                      class: "w-100",
                                      onClick: resetPassword
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("Get Code")
                                      ]),
                                      _: 1
                                    }, 8, ["disabled"])
                                  ], 64)),
                                  createVNode(VCardText, { class: "text-center text-body-1 px-0" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Remember old password? "),
                                      createVNode(_component_NuxtLink, { to: "/auth/signin" }, {
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
                              }, 8, ["modelValue", "onUpdate:modelValue", "onSubmit"])
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
                      cols: "12",
                      sm: "7",
                      class: "mx-auto"
                    }, {
                      default: withCtx(() => [
                        createVNode(VCard, { class: "w-100 rounded-xl pa-5" }, {
                          default: withCtx(() => [
                            unref(isLoading) ? (openBlock(), createBlock(VProgressLinear, {
                              key: 0,
                              indeterminate: "",
                              rounded: "",
                              color: "primary"
                            })) : createCommentVNode("", true),
                            createVNode(VCardTitle, { class: "justify-center text-center text-primary text-h5" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(codeSent) ? "Reset Password" : "Get Verification Code"), 1)
                              ]),
                              _: 1
                            }),
                            unref(error) ? (openBlock(), createBlock(VCardText, {
                              key: 1,
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
                              onSubmit: withModifiers(() => {
                              }, ["prevent"])
                            }, {
                              default: withCtx(() => [
                                unref(codeSent) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                  createVNode(VTextField, {
                                    modelValue: unref(verificationCode),
                                    "onUpdate:modelValue": ($event) => isRef(verificationCode) ? verificationCode.value = $event : null,
                                    rules: [rules.required("Verification Code")],
                                    label: "Verification Code",
                                    required: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                                  createVNode(VTextField, {
                                    modelValue: unref(newPassword),
                                    "onUpdate:modelValue": ($event) => isRef(newPassword) ? newPassword.value = $event : null,
                                    rules: [rules.required("New Password"), rules.length("Password", 8), rules.password],
                                    "append-inner-icon": unref(show1) ? "mdi-eye" : "mdi-eye-off",
                                    type: unref(show1) ? "text" : "password",
                                    label: "New Password",
                                    counter: "",
                                    "onClick:appendInner": ($event) => show1.value = !unref(show1)
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "rules", "append-inner-icon", "type", "onClick:appendInner"]),
                                  createVNode(VTextField, {
                                    modelValue: unref(confirmPassword),
                                    "onUpdate:modelValue": ($event) => isRef(confirmPassword) ? confirmPassword.value = $event : null,
                                    rules: [rules.required("Confirm Password"), unref(confirmPasswordRule)],
                                    "append-inner-icon": unref(show1) ? "mdi-eye" : "mdi-eye-off",
                                    type: unref(show1) ? "text" : "password",
                                    label: "Confirm Password",
                                    counter: "",
                                    "onClick:appendInner": ($event) => show1.value = !unref(show1)
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "rules", "append-inner-icon", "type", "onClick:appendInner"]),
                                  createVNode(VCardText, { class: "text-right text-body-1 px-0" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Not received code? "),
                                      createVNode("a", {
                                        onClick: withModifiers(resetPassword, ["prevent"])
                                      }, "Resend code")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VBtn, {
                                    disabled: !unref(valid),
                                    color: "primary",
                                    size: "x-large",
                                    class: "w-100",
                                    onClick: confirmNewPassword
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("Reset Password")
                                    ]),
                                    _: 1
                                  }, 8, ["disabled"])
                                ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                  createVNode(VTextField, {
                                    modelValue: unref(email),
                                    "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                                    rules: [rules.required("Email"), rules.email],
                                    label: "E-mail",
                                    required: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                                  createVNode(VBtn, {
                                    disabled: !unref(valid),
                                    color: "primary",
                                    size: "x-large",
                                    class: "w-100",
                                    onClick: resetPassword
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("Get Code")
                                    ]),
                                    _: 1
                                  }, 8, ["disabled"])
                                ], 64)),
                                createVNode(VCardText, { class: "text-center text-body-1 px-0" }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Remember old password? "),
                                    createVNode(_component_NuxtLink, { to: "/auth/signin" }, {
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
                            }, 8, ["modelValue", "onUpdate:modelValue", "onSubmit"])
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
                    cols: "12",
                    sm: "7",
                    class: "mx-auto"
                  }, {
                    default: withCtx(() => [
                      createVNode(VCard, { class: "w-100 rounded-xl pa-5" }, {
                        default: withCtx(() => [
                          unref(isLoading) ? (openBlock(), createBlock(VProgressLinear, {
                            key: 0,
                            indeterminate: "",
                            rounded: "",
                            color: "primary"
                          })) : createCommentVNode("", true),
                          createVNode(VCardTitle, { class: "justify-center text-center text-primary text-h5" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(codeSent) ? "Reset Password" : "Get Verification Code"), 1)
                            ]),
                            _: 1
                          }),
                          unref(error) ? (openBlock(), createBlock(VCardText, {
                            key: 1,
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
                            onSubmit: withModifiers(() => {
                            }, ["prevent"])
                          }, {
                            default: withCtx(() => [
                              unref(codeSent) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                createVNode(VTextField, {
                                  modelValue: unref(verificationCode),
                                  "onUpdate:modelValue": ($event) => isRef(verificationCode) ? verificationCode.value = $event : null,
                                  rules: [rules.required("Verification Code")],
                                  label: "Verification Code",
                                  required: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                                createVNode(VTextField, {
                                  modelValue: unref(newPassword),
                                  "onUpdate:modelValue": ($event) => isRef(newPassword) ? newPassword.value = $event : null,
                                  rules: [rules.required("New Password"), rules.length("Password", 8), rules.password],
                                  "append-inner-icon": unref(show1) ? "mdi-eye" : "mdi-eye-off",
                                  type: unref(show1) ? "text" : "password",
                                  label: "New Password",
                                  counter: "",
                                  "onClick:appendInner": ($event) => show1.value = !unref(show1)
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "rules", "append-inner-icon", "type", "onClick:appendInner"]),
                                createVNode(VTextField, {
                                  modelValue: unref(confirmPassword),
                                  "onUpdate:modelValue": ($event) => isRef(confirmPassword) ? confirmPassword.value = $event : null,
                                  rules: [rules.required("Confirm Password"), unref(confirmPasswordRule)],
                                  "append-inner-icon": unref(show1) ? "mdi-eye" : "mdi-eye-off",
                                  type: unref(show1) ? "text" : "password",
                                  label: "Confirm Password",
                                  counter: "",
                                  "onClick:appendInner": ($event) => show1.value = !unref(show1)
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "rules", "append-inner-icon", "type", "onClick:appendInner"]),
                                createVNode(VCardText, { class: "text-right text-body-1 px-0" }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Not received code? "),
                                    createVNode("a", {
                                      onClick: withModifiers(resetPassword, ["prevent"])
                                    }, "Resend code")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VBtn, {
                                  disabled: !unref(valid),
                                  color: "primary",
                                  size: "x-large",
                                  class: "w-100",
                                  onClick: confirmNewPassword
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Reset Password")
                                  ]),
                                  _: 1
                                }, 8, ["disabled"])
                              ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                createVNode(VTextField, {
                                  modelValue: unref(email),
                                  "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                                  rules: [rules.required("Email"), rules.email],
                                  label: "E-mail",
                                  required: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                                createVNode(VBtn, {
                                  disabled: !unref(valid),
                                  color: "primary",
                                  size: "x-large",
                                  class: "w-100",
                                  onClick: resetPassword
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Get Code")
                                  ]),
                                  _: 1
                                }, 8, ["disabled"])
                              ], 64)),
                              createVNode(VCardText, { class: "text-center text-body-1 px-0" }, {
                                default: withCtx(() => [
                                  createTextVNode(" Remember old password? "),
                                  createVNode(_component_NuxtLink, { to: "/auth/signin" }, {
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
                          }, 8, ["modelValue", "onUpdate:modelValue", "onSubmit"])
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
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/forgotPassword.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=forgotPassword-BKXOX6l-.mjs.map
