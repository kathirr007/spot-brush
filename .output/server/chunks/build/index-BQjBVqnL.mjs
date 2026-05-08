import { defineComponent, ref, withCtx, createVNode, isRef, unref, createTextVNode, withModifiers, mergeProps, toDisplayString, openBlock, createBlock, Fragment, renderList, withKeys, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { u as useToast } from './index-DGjfQkMK.mjs';
import { u as useAuthStore } from './auth-CbAKS0YR.mjs';
import { u as useRouter$1, a as useNuxtApp, k as VContainer, l as VRow, m as VCol, j as VSpacer, f as VTextField, V as VCard, p as VCardTitle, q as VCardText, i as VBtn, s as VMenu, v as VList, w as VListItem, x as VIcon, y as VDialog, d as VForm, h as VCardActions } from './server.mjs';
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
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const auth = useAuthStore();
    const router = useRouter$1();
    const { $axios } = useNuxtApp();
    const toast = useToast();
    const dialog = ref(false);
    const boardName = ref("");
    const searchDash = ref("");
    const valid = ref(false);
    const rules = {
      required: (name) => (v) => !!v || `${name} field is required`,
      length: (name, len) => (v) => (v || "").length >= len || `${name} should be at least ${len} characters`
    };
    const contentItems = [
      { id: 1, icon: "mdi-folder", name: "Folder Name", meta: "136MB | 6 months ago" },
      { id: 2, icon: "mdi-folder", name: "Folder Name", meta: "136MB | 6 months ago" },
      { id: 3, icon: "mdi-file", name: "File Name", meta: "136MB | 6 months ago" },
      { id: 4, icon: "mdi-folder", name: "Folder Name", meta: "136MB | 6 months ago" }
    ];
    async function createBoard() {
      var _a, _b, _c, _d;
      dialog.value = false;
      try {
        const res = await $axios.post(
          "/auth/createboard",
          { data: { email: (_a = auth.auth) == null ? void 0 : _a.email, given_name: (_b = auth.auth) == null ? void 0 : _b.given_name, boardName: boardName.value } },
          { headers: { Authorization: `Bearer ${(_c = auth.auth) == null ? void 0 : _c.jwt}` } }
        );
        toast.success("Board created!");
        router.push(`/whiteboard?whiteboardid=${res.data.boardName}&username=${(_d = auth.auth) == null ? void 0 : _d.given_name}`);
      } catch (err) {
        console.error(err.message);
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VContainer, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, { align: "center" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    sm: "4"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<h2 class="text-h4"${_scopeId3}>Dashboard</h2>`);
                      } else {
                        return [
                          createVNode("h2", { class: "text-h4" }, "Dashboard")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VSpacer, null, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    sm: "6",
                    md: "4"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: unref(searchDash),
                          "onUpdate:modelValue": ($event) => isRef(searchDash) ? searchDash.value = $event : null,
                          "hide-details": "",
                          variant: "solo",
                          "prepend-inner-icon": "mdi-magnify",
                          label: "Search",
                          clearable: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(searchDash),
                            "onUpdate:modelValue": ($event) => isRef(searchDash) ? searchDash.value = $event : null,
                            "hide-details": "",
                            variant: "solo",
                            "prepend-inner-icon": "mdi-magnify",
                            label: "Search",
                            clearable: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, {
                      cols: "12",
                      sm: "4"
                    }, {
                      default: withCtx(() => [
                        createVNode("h2", { class: "text-h4" }, "Dashboard")
                      ]),
                      _: 1
                    }),
                    createVNode(VSpacer),
                    createVNode(VCol, {
                      cols: "12",
                      sm: "6",
                      md: "4"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: unref(searchDash),
                          "onUpdate:modelValue": ($event) => isRef(searchDash) ? searchDash.value = $event : null,
                          "hide-details": "",
                          variant: "solo",
                          "prepend-inner-icon": "mdi-magnify",
                          label: "Search",
                          clearable: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    sm: "6",
                    md: "4",
                    lg: "3"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCard, {
                          class: "rounded-lg",
                          "min-height": "130"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCardTitle, { class: "text-h5" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Storage`);
                                  } else {
                                    return [
                                      createTextVNode("Storage")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCardText, { class: "text-center text-h5" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<span class="text-h3 text-primary"${_scopeId5}>10</span> / 100 GB`);
                                  } else {
                                    return [
                                      createVNode("span", { class: "text-h3 text-primary" }, "10"),
                                      createTextVNode(" / 100 GB")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCardTitle, { class: "text-h5" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Storage")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCardText, { class: "text-center text-h5" }, {
                                  default: withCtx(() => [
                                    createVNode("span", { class: "text-h3 text-primary" }, "10"),
                                    createTextVNode(" / 100 GB")
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
                            class: "rounded-lg",
                            "min-height": "130"
                          }, {
                            default: withCtx(() => [
                              createVNode(VCardTitle, { class: "text-h5" }, {
                                default: withCtx(() => [
                                  createTextVNode("Storage")
                                ]),
                                _: 1
                              }),
                              createVNode(VCardText, { class: "text-center text-h5" }, {
                                default: withCtx(() => [
                                  createVNode("span", { class: "text-h3 text-primary" }, "10"),
                                  createTextVNode(" / 100 GB")
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
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    sm: "6",
                    md: "4",
                    lg: "3"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCard, {
                          class: "rounded-lg",
                          "min-height": "130"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCardTitle, { class: "text-h5" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Shared`);
                                  } else {
                                    return [
                                      createTextVNode("Shared")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCardText, { class: "d-flex justify-space-between" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<span${_scopeId5}><span class="text-h4 text-primary"${_scopeId5}>100</span> Files</span><span${_scopeId5}><span class="text-h4 text-primary"${_scopeId5}>60</span> Folders</span>`);
                                  } else {
                                    return [
                                      createVNode("span", null, [
                                        createVNode("span", { class: "text-h4 text-primary" }, "100"),
                                        createTextVNode(" Files")
                                      ]),
                                      createVNode("span", null, [
                                        createVNode("span", { class: "text-h4 text-primary" }, "60"),
                                        createTextVNode(" Folders")
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCardTitle, { class: "text-h5" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Shared")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCardText, { class: "d-flex justify-space-between" }, {
                                  default: withCtx(() => [
                                    createVNode("span", null, [
                                      createVNode("span", { class: "text-h4 text-primary" }, "100"),
                                      createTextVNode(" Files")
                                    ]),
                                    createVNode("span", null, [
                                      createVNode("span", { class: "text-h4 text-primary" }, "60"),
                                      createTextVNode(" Folders")
                                    ])
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
                            class: "rounded-lg",
                            "min-height": "130"
                          }, {
                            default: withCtx(() => [
                              createVNode(VCardTitle, { class: "text-h5" }, {
                                default: withCtx(() => [
                                  createTextVNode("Shared")
                                ]),
                                _: 1
                              }),
                              createVNode(VCardText, { class: "d-flex justify-space-between" }, {
                                default: withCtx(() => [
                                  createVNode("span", null, [
                                    createVNode("span", { class: "text-h4 text-primary" }, "100"),
                                    createTextVNode(" Files")
                                  ]),
                                  createVNode("span", null, [
                                    createVNode("span", { class: "text-h4 text-primary" }, "60"),
                                    createTextVNode(" Folders")
                                  ])
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
                      cols: "12",
                      sm: "6",
                      md: "4",
                      lg: "3"
                    }, {
                      default: withCtx(() => [
                        createVNode(VCard, {
                          class: "rounded-lg",
                          "min-height": "130"
                        }, {
                          default: withCtx(() => [
                            createVNode(VCardTitle, { class: "text-h5" }, {
                              default: withCtx(() => [
                                createTextVNode("Storage")
                              ]),
                              _: 1
                            }),
                            createVNode(VCardText, { class: "text-center text-h5" }, {
                              default: withCtx(() => [
                                createVNode("span", { class: "text-h3 text-primary" }, "10"),
                                createTextVNode(" / 100 GB")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      sm: "6",
                      md: "4",
                      lg: "3"
                    }, {
                      default: withCtx(() => [
                        createVNode(VCard, {
                          class: "rounded-lg",
                          "min-height": "130"
                        }, {
                          default: withCtx(() => [
                            createVNode(VCardTitle, { class: "text-h5" }, {
                              default: withCtx(() => [
                                createTextVNode("Shared")
                              ]),
                              _: 1
                            }),
                            createVNode(VCardText, { class: "d-flex justify-space-between" }, {
                              default: withCtx(() => [
                                createVNode("span", null, [
                                  createVNode("span", { class: "text-h4 text-primary" }, "100"),
                                  createTextVNode(" Files")
                                ]),
                                createVNode("span", null, [
                                  createVNode("span", { class: "text-h4 text-primary" }, "60"),
                                  createTextVNode(" Folders")
                                ])
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
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, {
                    offset: "3",
                    "offset-sm": "0",
                    cols: "6",
                    sm: "4",
                    md: "3",
                    lg: "2"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VBtn, {
                          class: "w-100 text-capitalize mb-5",
                          variant: "outlined",
                          color: "primary",
                          onClick: ($event) => dialog.value = true
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`+ Create`);
                            } else {
                              return [
                                createTextVNode("+ Create")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VBtn, {
                            class: "w-100 text-capitalize mb-5",
                            variant: "outlined",
                            color: "primary",
                            onClick: withModifiers(($event) => dialog.value = true, ["stop"])
                          }, {
                            default: withCtx(() => [
                              createTextVNode("+ Create")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    sm: "8",
                    md: "9",
                    lg: "10",
                    class: "py-0"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VRow, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(contentItems, (item) => {
                                _push5(ssrRenderComponent(VCol, {
                                  key: item.id,
                                  cols: "12",
                                  sm: "6",
                                  md: "4",
                                  lg: "3",
                                  xl: "2"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VCard, {
                                        class: "text-center",
                                        style: { "position": "relative" }
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(VMenu, null, {
                                              activator: withCtx(({ props }, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(VBtn, mergeProps({ icon: "" }, { ref_for: true }, props, {
                                                    variant: "text",
                                                    style: { "position": "absolute", "top": "0", "right": "0" }
                                                  }), {
                                                    default: withCtx((_7, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(ssrRenderComponent(VIcon, null, {
                                                          default: withCtx((_8, _push10, _parent10, _scopeId9) => {
                                                            if (_push10) {
                                                              _push10(`mdi-dots-vertical`);
                                                            } else {
                                                              return [
                                                                createTextVNode("mdi-dots-vertical")
                                                              ];
                                                            }
                                                          }),
                                                          _: 2
                                                        }, _parent9, _scopeId8));
                                                      } else {
                                                        return [
                                                          createVNode(VIcon, null, {
                                                            default: withCtx(() => [
                                                              createTextVNode("mdi-dots-vertical")
                                                            ]),
                                                            _: 1
                                                          })
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                } else {
                                                  return [
                                                    createVNode(VBtn, mergeProps({ icon: "" }, { ref_for: true }, props, {
                                                      variant: "text",
                                                      style: { "position": "absolute", "top": "0", "right": "0" }
                                                    }), {
                                                      default: withCtx(() => [
                                                        createVNode(VIcon, null, {
                                                          default: withCtx(() => [
                                                            createTextVNode("mdi-dots-vertical")
                                                          ]),
                                                          _: 1
                                                        })
                                                      ]),
                                                      _: 1
                                                    }, 16)
                                                  ];
                                                }
                                              }),
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(VList, null, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(ssrRenderComponent(VListItem, { title: "Option 1" }, null, _parent9, _scopeId8));
                                                        _push9(ssrRenderComponent(VListItem, {
                                                          title: "Option 2",
                                                          disabled: ""
                                                        }, null, _parent9, _scopeId8));
                                                        _push9(ssrRenderComponent(VListItem, { title: "Option 3" }, null, _parent9, _scopeId8));
                                                      } else {
                                                        return [
                                                          createVNode(VListItem, { title: "Option 1" }),
                                                          createVNode(VListItem, {
                                                            title: "Option 2",
                                                            disabled: ""
                                                          }),
                                                          createVNode(VListItem, { title: "Option 3" })
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                } else {
                                                  return [
                                                    createVNode(VList, null, {
                                                      default: withCtx(() => [
                                                        createVNode(VListItem, { title: "Option 1" }),
                                                        createVNode(VListItem, {
                                                          title: "Option 2",
                                                          disabled: ""
                                                        }),
                                                        createVNode(VListItem, { title: "Option 3" })
                                                      ]),
                                                      _: 1
                                                    })
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(VCardTitle, { class: "justify-center" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(VIcon, {
                                                    class: "text-primary",
                                                    size: "64"
                                                  }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`${ssrInterpolate(item.icon)}`);
                                                      } else {
                                                        return [
                                                          createTextVNode(toDisplayString(item.icon), 1)
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                } else {
                                                  return [
                                                    createVNode(VIcon, {
                                                      class: "text-primary",
                                                      size: "64"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(item.icon), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(VCardText, { class: "px-2 pb-2" }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(item.name)}<small class="d-block text-grey"${_scopeId7}>${ssrInterpolate(item.meta)}</small>`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(item.name), 1),
                                                    createVNode("small", { class: "d-block text-grey" }, toDisplayString(item.meta), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(VMenu, null, {
                                                activator: withCtx(({ props }) => [
                                                  createVNode(VBtn, mergeProps({ icon: "" }, { ref_for: true }, props, {
                                                    variant: "text",
                                                    style: { "position": "absolute", "top": "0", "right": "0" }
                                                  }), {
                                                    default: withCtx(() => [
                                                      createVNode(VIcon, null, {
                                                        default: withCtx(() => [
                                                          createTextVNode("mdi-dots-vertical")
                                                        ]),
                                                        _: 1
                                                      })
                                                    ]),
                                                    _: 1
                                                  }, 16)
                                                ]),
                                                default: withCtx(() => [
                                                  createVNode(VList, null, {
                                                    default: withCtx(() => [
                                                      createVNode(VListItem, { title: "Option 1" }),
                                                      createVNode(VListItem, {
                                                        title: "Option 2",
                                                        disabled: ""
                                                      }),
                                                      createVNode(VListItem, { title: "Option 3" })
                                                    ]),
                                                    _: 1
                                                  })
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(VCardTitle, { class: "justify-center" }, {
                                                default: withCtx(() => [
                                                  createVNode(VIcon, {
                                                    class: "text-primary",
                                                    size: "64"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(toDisplayString(item.icon), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(VCardText, { class: "px-2 pb-2" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(item.name), 1),
                                                  createVNode("small", { class: "d-block text-grey" }, toDisplayString(item.meta), 1)
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(VCard, {
                                          class: "text-center",
                                          style: { "position": "relative" }
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VMenu, null, {
                                              activator: withCtx(({ props }) => [
                                                createVNode(VBtn, mergeProps({ icon: "" }, { ref_for: true }, props, {
                                                  variant: "text",
                                                  style: { "position": "absolute", "top": "0", "right": "0" }
                                                }), {
                                                  default: withCtx(() => [
                                                    createVNode(VIcon, null, {
                                                      default: withCtx(() => [
                                                        createTextVNode("mdi-dots-vertical")
                                                      ]),
                                                      _: 1
                                                    })
                                                  ]),
                                                  _: 1
                                                }, 16)
                                              ]),
                                              default: withCtx(() => [
                                                createVNode(VList, null, {
                                                  default: withCtx(() => [
                                                    createVNode(VListItem, { title: "Option 1" }),
                                                    createVNode(VListItem, {
                                                      title: "Option 2",
                                                      disabled: ""
                                                    }),
                                                    createVNode(VListItem, { title: "Option 3" })
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(VCardTitle, { class: "justify-center" }, {
                                              default: withCtx(() => [
                                                createVNode(VIcon, {
                                                  class: "text-primary",
                                                  size: "64"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(item.icon), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(VCardText, { class: "px-2 pb-2" }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(item.name), 1),
                                                createVNode("small", { class: "d-block text-grey" }, toDisplayString(item.meta), 1)
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(), createBlock(Fragment, null, renderList(contentItems, (item) => {
                                  return createVNode(VCol, {
                                    key: item.id,
                                    cols: "12",
                                    sm: "6",
                                    md: "4",
                                    lg: "3",
                                    xl: "2"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VCard, {
                                        class: "text-center",
                                        style: { "position": "relative" }
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VMenu, null, {
                                            activator: withCtx(({ props }) => [
                                              createVNode(VBtn, mergeProps({ icon: "" }, { ref_for: true }, props, {
                                                variant: "text",
                                                style: { "position": "absolute", "top": "0", "right": "0" }
                                              }), {
                                                default: withCtx(() => [
                                                  createVNode(VIcon, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("mdi-dots-vertical")
                                                    ]),
                                                    _: 1
                                                  })
                                                ]),
                                                _: 1
                                              }, 16)
                                            ]),
                                            default: withCtx(() => [
                                              createVNode(VList, null, {
                                                default: withCtx(() => [
                                                  createVNode(VListItem, { title: "Option 1" }),
                                                  createVNode(VListItem, {
                                                    title: "Option 2",
                                                    disabled: ""
                                                  }),
                                                  createVNode(VListItem, { title: "Option 3" })
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(VCardTitle, { class: "justify-center" }, {
                                            default: withCtx(() => [
                                              createVNode(VIcon, {
                                                class: "text-primary",
                                                size: "64"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(item.icon), 1)
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(VCardText, { class: "px-2 pb-2" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(item.name), 1),
                                              createVNode("small", { class: "d-block text-grey" }, toDisplayString(item.meta), 1)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 64))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(contentItems, (item) => {
                                return createVNode(VCol, {
                                  key: item.id,
                                  cols: "12",
                                  sm: "6",
                                  md: "4",
                                  lg: "3",
                                  xl: "2"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VCard, {
                                      class: "text-center",
                                      style: { "position": "relative" }
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VMenu, null, {
                                          activator: withCtx(({ props }) => [
                                            createVNode(VBtn, mergeProps({ icon: "" }, { ref_for: true }, props, {
                                              variant: "text",
                                              style: { "position": "absolute", "top": "0", "right": "0" }
                                            }), {
                                              default: withCtx(() => [
                                                createVNode(VIcon, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("mdi-dots-vertical")
                                                  ]),
                                                  _: 1
                                                })
                                              ]),
                                              _: 1
                                            }, 16)
                                          ]),
                                          default: withCtx(() => [
                                            createVNode(VList, null, {
                                              default: withCtx(() => [
                                                createVNode(VListItem, { title: "Option 1" }),
                                                createVNode(VListItem, {
                                                  title: "Option 2",
                                                  disabled: ""
                                                }),
                                                createVNode(VListItem, { title: "Option 3" })
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCardTitle, { class: "justify-center" }, {
                                          default: withCtx(() => [
                                            createVNode(VIcon, {
                                              class: "text-primary",
                                              size: "64"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(item.icon), 1)
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(VCardText, { class: "px-2 pb-2" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(item.name), 1),
                                            createVNode("small", { class: "d-block text-grey" }, toDisplayString(item.meta), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024);
                              }), 64))
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
                      offset: "3",
                      "offset-sm": "0",
                      cols: "6",
                      sm: "4",
                      md: "3",
                      lg: "2"
                    }, {
                      default: withCtx(() => [
                        createVNode(VBtn, {
                          class: "w-100 text-capitalize mb-5",
                          variant: "outlined",
                          color: "primary",
                          onClick: withModifiers(($event) => dialog.value = true, ["stop"])
                        }, {
                          default: withCtx(() => [
                            createTextVNode("+ Create")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      sm: "8",
                      md: "9",
                      lg: "10",
                      class: "py-0"
                    }, {
                      default: withCtx(() => [
                        createVNode(VRow, null, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(Fragment, null, renderList(contentItems, (item) => {
                              return createVNode(VCol, {
                                key: item.id,
                                cols: "12",
                                sm: "6",
                                md: "4",
                                lg: "3",
                                xl: "2"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VCard, {
                                    class: "text-center",
                                    style: { "position": "relative" }
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VMenu, null, {
                                        activator: withCtx(({ props }) => [
                                          createVNode(VBtn, mergeProps({ icon: "" }, { ref_for: true }, props, {
                                            variant: "text",
                                            style: { "position": "absolute", "top": "0", "right": "0" }
                                          }), {
                                            default: withCtx(() => [
                                              createVNode(VIcon, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("mdi-dots-vertical")
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 1
                                          }, 16)
                                        ]),
                                        default: withCtx(() => [
                                          createVNode(VList, null, {
                                            default: withCtx(() => [
                                              createVNode(VListItem, { title: "Option 1" }),
                                              createVNode(VListItem, {
                                                title: "Option 2",
                                                disabled: ""
                                              }),
                                              createVNode(VListItem, { title: "Option 3" })
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCardTitle, { class: "justify-center" }, {
                                        default: withCtx(() => [
                                          createVNode(VIcon, {
                                            class: "text-primary",
                                            size: "64"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(item.icon), 1)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(VCardText, { class: "px-2 pb-2" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(item.name), 1),
                                          createVNode("small", { class: "d-block text-grey" }, toDisplayString(item.meta), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024);
                            }), 64))
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
            _push2(ssrRenderComponent(VDialog, {
              modelValue: unref(dialog),
              "onUpdate:modelValue": ($event) => isRef(dialog) ? dialog.value = $event : null,
              persistent: "",
              "max-width": "600px"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCard, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCardTitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Create whiteboard`);
                            } else {
                              return [
                                createTextVNode("Create whiteboard")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VContainer, { class: "py-0" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VForm, {
                                modelValue: unref(valid),
                                "onUpdate:modelValue": ($event) => isRef(valid) ? valid.value = $event : null
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCol, { cols: "12" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VTextField, {
                                            modelValue: unref(boardName),
                                            "onUpdate:modelValue": ($event) => isRef(boardName) ? boardName.value = $event : null,
                                            rules: [rules.required("Board Name"), rules.length("Board Name", 3)],
                                            label: "Board name",
                                            required: "",
                                            onKeyup: createBoard
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VTextField, {
                                              modelValue: unref(boardName),
                                              "onUpdate:modelValue": ($event) => isRef(boardName) ? boardName.value = $event : null,
                                              rules: [rules.required("Board Name"), rules.length("Board Name", 3)],
                                              label: "Board name",
                                              required: "",
                                              onKeyup: withKeys(createBoard, ["enter"])
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCol, { cols: "12" }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: unref(boardName),
                                            "onUpdate:modelValue": ($event) => isRef(boardName) ? boardName.value = $event : null,
                                            rules: [rules.required("Board Name"), rules.length("Board Name", 3)],
                                            label: "Board name",
                                            required: "",
                                            onKeyup: withKeys(createBoard, ["enter"])
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"])
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
                                createVNode(VForm, {
                                  modelValue: unref(valid),
                                  "onUpdate:modelValue": ($event) => isRef(valid) ? valid.value = $event : null
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VCol, { cols: "12" }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: unref(boardName),
                                          "onUpdate:modelValue": ($event) => isRef(boardName) ? boardName.value = $event : null,
                                          rules: [rules.required("Board Name"), rules.length("Board Name", 3)],
                                          label: "Board name",
                                          required: "",
                                          onKeyup: withKeys(createBoard, ["enter"])
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"])
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
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCardActions, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VSpacer, null, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VBtn, {
                                onClick: ($event) => dialog.value = false
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Cancel`);
                                  } else {
                                    return [
                                      createTextVNode("Cancel")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VBtn, {
                                color: "primary",
                                disabled: !unref(valid),
                                onClick: createBoard
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
                              return [
                                createVNode(VSpacer),
                                createVNode(VBtn, {
                                  onClick: ($event) => dialog.value = false
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Cancel")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"]),
                                createVNode(VBtn, {
                                  color: "primary",
                                  disabled: !unref(valid),
                                  onClick: createBoard
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Create Board")
                                  ]),
                                  _: 1
                                }, 8, ["disabled"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCardTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Create whiteboard")
                            ]),
                            _: 1
                          }),
                          createVNode(VContainer, { class: "py-0" }, {
                            default: withCtx(() => [
                              createVNode(VForm, {
                                modelValue: unref(valid),
                                "onUpdate:modelValue": ($event) => isRef(valid) ? valid.value = $event : null
                              }, {
                                default: withCtx(() => [
                                  createVNode(VCol, { cols: "12" }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: unref(boardName),
                                        "onUpdate:modelValue": ($event) => isRef(boardName) ? boardName.value = $event : null,
                                        rules: [rules.required("Board Name"), rules.length("Board Name", 3)],
                                        label: "Board name",
                                        required: "",
                                        onKeyup: withKeys(createBoard, ["enter"])
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(VCardActions, null, {
                            default: withCtx(() => [
                              createVNode(VSpacer),
                              createVNode(VBtn, {
                                onClick: ($event) => dialog.value = false
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Cancel")
                                ]),
                                _: 1
                              }, 8, ["onClick"]),
                              createVNode(VBtn, {
                                color: "primary",
                                disabled: !unref(valid),
                                onClick: createBoard
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Create Board")
                                ]),
                                _: 1
                              }, 8, ["disabled"])
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
                        createVNode(VCardTitle, null, {
                          default: withCtx(() => [
                            createTextVNode("Create whiteboard")
                          ]),
                          _: 1
                        }),
                        createVNode(VContainer, { class: "py-0" }, {
                          default: withCtx(() => [
                            createVNode(VForm, {
                              modelValue: unref(valid),
                              "onUpdate:modelValue": ($event) => isRef(valid) ? valid.value = $event : null
                            }, {
                              default: withCtx(() => [
                                createVNode(VCol, { cols: "12" }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: unref(boardName),
                                      "onUpdate:modelValue": ($event) => isRef(boardName) ? boardName.value = $event : null,
                                      rules: [rules.required("Board Name"), rules.length("Board Name", 3)],
                                      label: "Board name",
                                      required: "",
                                      onKeyup: withKeys(createBoard, ["enter"])
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(VCardActions, null, {
                          default: withCtx(() => [
                            createVNode(VSpacer),
                            createVNode(VBtn, {
                              onClick: ($event) => dialog.value = false
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Cancel")
                              ]),
                              _: 1
                            }, 8, ["onClick"]),
                            createVNode(VBtn, {
                              color: "primary",
                              disabled: !unref(valid),
                              onClick: createBoard
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Create Board")
                              ]),
                              _: 1
                            }, 8, ["disabled"])
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
              createVNode(VRow, { align: "center" }, {
                default: withCtx(() => [
                  createVNode(VCol, {
                    cols: "12",
                    sm: "4"
                  }, {
                    default: withCtx(() => [
                      createVNode("h2", { class: "text-h4" }, "Dashboard")
                    ]),
                    _: 1
                  }),
                  createVNode(VSpacer),
                  createVNode(VCol, {
                    cols: "12",
                    sm: "6",
                    md: "4"
                  }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: unref(searchDash),
                        "onUpdate:modelValue": ($event) => isRef(searchDash) ? searchDash.value = $event : null,
                        "hide-details": "",
                        variant: "solo",
                        "prepend-inner-icon": "mdi-magnify",
                        label: "Search",
                        clearable: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, {
                    cols: "12",
                    sm: "6",
                    md: "4",
                    lg: "3"
                  }, {
                    default: withCtx(() => [
                      createVNode(VCard, {
                        class: "rounded-lg",
                        "min-height": "130"
                      }, {
                        default: withCtx(() => [
                          createVNode(VCardTitle, { class: "text-h5" }, {
                            default: withCtx(() => [
                              createTextVNode("Storage")
                            ]),
                            _: 1
                          }),
                          createVNode(VCardText, { class: "text-center text-h5" }, {
                            default: withCtx(() => [
                              createVNode("span", { class: "text-h3 text-primary" }, "10"),
                              createTextVNode(" / 100 GB")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    sm: "6",
                    md: "4",
                    lg: "3"
                  }, {
                    default: withCtx(() => [
                      createVNode(VCard, {
                        class: "rounded-lg",
                        "min-height": "130"
                      }, {
                        default: withCtx(() => [
                          createVNode(VCardTitle, { class: "text-h5" }, {
                            default: withCtx(() => [
                              createTextVNode("Shared")
                            ]),
                            _: 1
                          }),
                          createVNode(VCardText, { class: "d-flex justify-space-between" }, {
                            default: withCtx(() => [
                              createVNode("span", null, [
                                createVNode("span", { class: "text-h4 text-primary" }, "100"),
                                createTextVNode(" Files")
                              ]),
                              createVNode("span", null, [
                                createVNode("span", { class: "text-h4 text-primary" }, "60"),
                                createTextVNode(" Folders")
                              ])
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
              }),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, {
                    offset: "3",
                    "offset-sm": "0",
                    cols: "6",
                    sm: "4",
                    md: "3",
                    lg: "2"
                  }, {
                    default: withCtx(() => [
                      createVNode(VBtn, {
                        class: "w-100 text-capitalize mb-5",
                        variant: "outlined",
                        color: "primary",
                        onClick: withModifiers(($event) => dialog.value = true, ["stop"])
                      }, {
                        default: withCtx(() => [
                          createTextVNode("+ Create")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    sm: "8",
                    md: "9",
                    lg: "10",
                    class: "py-0"
                  }, {
                    default: withCtx(() => [
                      createVNode(VRow, null, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(Fragment, null, renderList(contentItems, (item) => {
                            return createVNode(VCol, {
                              key: item.id,
                              cols: "12",
                              sm: "6",
                              md: "4",
                              lg: "3",
                              xl: "2"
                            }, {
                              default: withCtx(() => [
                                createVNode(VCard, {
                                  class: "text-center",
                                  style: { "position": "relative" }
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VMenu, null, {
                                      activator: withCtx(({ props }) => [
                                        createVNode(VBtn, mergeProps({ icon: "" }, { ref_for: true }, props, {
                                          variant: "text",
                                          style: { "position": "absolute", "top": "0", "right": "0" }
                                        }), {
                                          default: withCtx(() => [
                                            createVNode(VIcon, null, {
                                              default: withCtx(() => [
                                                createTextVNode("mdi-dots-vertical")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }, 16)
                                      ]),
                                      default: withCtx(() => [
                                        createVNode(VList, null, {
                                          default: withCtx(() => [
                                            createVNode(VListItem, { title: "Option 1" }),
                                            createVNode(VListItem, {
                                              title: "Option 2",
                                              disabled: ""
                                            }),
                                            createVNode(VListItem, { title: "Option 3" })
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCardTitle, { class: "justify-center" }, {
                                      default: withCtx(() => [
                                        createVNode(VIcon, {
                                          class: "text-primary",
                                          size: "64"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(item.icon), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(VCardText, { class: "px-2 pb-2" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(item.name), 1),
                                        createVNode("small", { class: "d-block text-grey" }, toDisplayString(item.meta), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024);
                          }), 64))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VDialog, {
                modelValue: unref(dialog),
                "onUpdate:modelValue": ($event) => isRef(dialog) ? dialog.value = $event : null,
                persistent: "",
                "max-width": "600px"
              }, {
                default: withCtx(() => [
                  createVNode(VCard, null, {
                    default: withCtx(() => [
                      createVNode(VCardTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Create whiteboard")
                        ]),
                        _: 1
                      }),
                      createVNode(VContainer, { class: "py-0" }, {
                        default: withCtx(() => [
                          createVNode(VForm, {
                            modelValue: unref(valid),
                            "onUpdate:modelValue": ($event) => isRef(valid) ? valid.value = $event : null
                          }, {
                            default: withCtx(() => [
                              createVNode(VCol, { cols: "12" }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: unref(boardName),
                                    "onUpdate:modelValue": ($event) => isRef(boardName) ? boardName.value = $event : null,
                                    rules: [rules.required("Board Name"), rules.length("Board Name", 3)],
                                    label: "Board name",
                                    required: "",
                                    onKeyup: withKeys(createBoard, ["enter"])
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCardActions, null, {
                        default: withCtx(() => [
                          createVNode(VSpacer),
                          createVNode(VBtn, {
                            onClick: ($event) => dialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(VBtn, {
                            color: "primary",
                            disabled: !unref(valid),
                            onClick: createBoard
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Create Board")
                            ]),
                            _: 1
                          }, 8, ["disabled"])
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
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BQjBVqnL.mjs.map
