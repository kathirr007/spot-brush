import { defineComponent, withCtx, renderSlot, unref, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, ref, computed, isRef, createTextVNode, Fragment, renderList, withModifiers, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrInterpolate, ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderStyle } from 'vue/server-renderer';
import { _ as __nuxt_component_0 } from './nuxt-link-h2V6O_st.mjs';
import { _ as _imports_0 } from './sb-logo-Cc2o13Y-.mjs';
import { u as useAuthStore } from './auth-CbAKS0YR.mjs';
import { M as VApp, N as VMain, H as VFooter, _ as _export_sfc, u as useRouter$1, a as useNuxtApp, D as VNavigationDrawer, v as VList, w as VListItem, E as VListItemTitle, F as VListItemSubtitle, G as VAvatar, g as VDivider, x as VIcon, I as VAppBar, J as VAppBarNavIcon, K as VToolbarTitle, j as VSpacer, L as VToolbarItems, i as VBtn } from './server.mjs';
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

const title$1 = "spotbrush";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "topNavBar",
  __ssrInlineRender: true,
  setup(__props) {
    const auth = useAuthStore();
    const router = useRouter$1();
    const { $axios } = useNuxtApp();
    const drawer = ref(false);
    const miniVariant = ref(true);
    const expandOnHover = ref(true);
    const menuItems = computed(() => {
      if (auth.isAuthenticated) {
        return [
          { icon: "mdi-view-dashboard", title: "Dashboard", link: "/dashboard" },
          { icon: "mdi-cog", title: "Settings", link: "/dashboard/settings" },
          { icon: "mdi-bell", title: "Notifications", link: "/dashboard/notifications" },
          { icon: "mdi-information", title: "Service", link: "/dashboard/service" }
        ];
      }
      return [
        { icon: "mdi-home", title: "Home", link: "/" },
        { icon: "mdi-information", title: "About", link: "/about" },
        { icon: "mdi-server", title: "Service", link: "/service" },
        { icon: "mdi-login", title: "Sign in", link: "/auth/signin" }
      ];
    });
    async function onLogout() {
      try {
        await $axios.post("/auth/logout");
      } catch {
      }
      auth.setAuth(null);
      auth.setWhiteboard(false);
      drawer.value = false;
      router.push("/");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-85b2a688>`);
      _push(ssrRenderComponent(VNavigationDrawer, {
        modelValue: unref(drawer),
        "onUpdate:modelValue": ($event) => isRef(drawer) ? drawer.value = $event : null,
        color: "white",
        permanent: unref(auth).isAuthenticated,
        "expand-on-hover": unref(expandOnHover),
        rail: unref(miniVariant),
        "rail-width": "70",
        app: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VList, { class: "py-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(auth).isAuthenticated) {
                    _push3(ssrRenderComponent(VListItem, { lines: "two" }, {
                      prepend: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VAvatar, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<img src="https://randomuser.me/api/portraits/men/81.jpg" alt="avatar" data-v-85b2a688${_scopeId4}>`);
                              } else {
                                return [
                                  createVNode("img", {
                                    src: "https://randomuser.me/api/portraits/men/81.jpg",
                                    alt: "avatar"
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VAvatar, null, {
                              default: withCtx(() => [
                                createVNode("img", {
                                  src: "https://randomuser.me/api/portraits/men/81.jpg",
                                  alt: "avatar"
                                })
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VListItemTitle, { class: "text-primary" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              var _a, _b;
                              if (_push5) {
                                _push5(`${ssrInterpolate(((_a = unref(auth).auth) == null ? void 0 : _a.given_name) || "User name")}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(((_b = unref(auth).auth) == null ? void 0 : _b.given_name) || "User name"), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(VListItemSubtitle, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              var _a, _b;
                              if (_push5) {
                                _push5(`${ssrInterpolate(((_a = unref(auth).auth) == null ? void 0 : _a.nickname) || "")}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(((_b = unref(auth).auth) == null ? void 0 : _b.nickname) || ""), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VListItemTitle, { class: "text-primary" }, {
                              default: withCtx(() => {
                                var _a;
                                return [
                                  createTextVNode(toDisplayString(((_a = unref(auth).auth) == null ? void 0 : _a.given_name) || "User name"), 1)
                                ];
                              }),
                              _: 1
                            }),
                            createVNode(VListItemSubtitle, null, {
                              default: withCtx(() => {
                                var _a;
                                return [
                                  createTextVNode(toDisplayString(((_a = unref(auth).auth) == null ? void 0 : _a.nickname) || ""), 1)
                                ];
                              }),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(ssrRenderComponent(VListItem, {
                      to: "/",
                      class: "justify-center"
                    }, {
                      prepend: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VAvatar, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<img${ssrRenderAttr("src", _imports_0)} alt="logo" data-v-85b2a688${_scopeId4}>`);
                              } else {
                                return [
                                  createVNode("img", {
                                    src: _imports_0,
                                    alt: "logo"
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VAvatar, null, {
                              default: withCtx(() => [
                                createVNode("img", {
                                  src: _imports_0,
                                  alt: "logo"
                                })
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  }
                  _push3(ssrRenderComponent(VDivider, null, null, _parent3, _scopeId2));
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(menuItems), (item) => {
                    _push3(ssrRenderComponent(VListItem, {
                      key: item.title,
                      to: item.link,
                      exact: ""
                    }, {
                      prepend: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VIcon, { class: "text-primary" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(item.icon)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(item.icon), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VIcon, { class: "text-primary" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item.icon), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ];
                        }
                      }),
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VListItemTitle, { class: "text-primary" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(item.title)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(item.title), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VListItemTitle, { class: "text-primary" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item.title), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                  if (unref(auth).isAuthenticated) {
                    _push3(ssrRenderComponent(VListItem, { onClick: onLogout }, {
                      prepend: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VIcon, { class: "text-primary" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`mdi-logout`);
                              } else {
                                return [
                                  createTextVNode("mdi-logout")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VIcon, { class: "text-primary" }, {
                              default: withCtx(() => [
                                createTextVNode("mdi-logout")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VListItemTitle, { class: "text-primary" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Logout`);
                              } else {
                                return [
                                  createTextVNode("Logout")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VListItemTitle, { class: "text-primary" }, {
                              default: withCtx(() => [
                                createTextVNode("Logout")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    unref(auth).isAuthenticated ? (openBlock(), createBlock(VListItem, {
                      key: 0,
                      lines: "two"
                    }, {
                      prepend: withCtx(() => [
                        createVNode(VAvatar, null, {
                          default: withCtx(() => [
                            createVNode("img", {
                              src: "https://randomuser.me/api/portraits/men/81.jpg",
                              alt: "avatar"
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      default: withCtx(() => [
                        createVNode(VListItemTitle, { class: "text-primary" }, {
                          default: withCtx(() => {
                            var _a;
                            return [
                              createTextVNode(toDisplayString(((_a = unref(auth).auth) == null ? void 0 : _a.given_name) || "User name"), 1)
                            ];
                          }),
                          _: 1
                        }),
                        createVNode(VListItemSubtitle, null, {
                          default: withCtx(() => {
                            var _a;
                            return [
                              createTextVNode(toDisplayString(((_a = unref(auth).auth) == null ? void 0 : _a.nickname) || ""), 1)
                            ];
                          }),
                          _: 1
                        })
                      ]),
                      _: 1
                    })) : (openBlock(), createBlock(VListItem, {
                      key: 1,
                      to: "/",
                      class: "justify-center"
                    }, {
                      prepend: withCtx(() => [
                        createVNode(VAvatar, null, {
                          default: withCtx(() => [
                            createVNode("img", {
                              src: _imports_0,
                              alt: "logo"
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })),
                    createVNode(VDivider),
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(menuItems), (item) => {
                      return openBlock(), createBlock(VListItem, {
                        key: item.title,
                        to: item.link,
                        exact: ""
                      }, {
                        prepend: withCtx(() => [
                          createVNode(VIcon, { class: "text-primary" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.icon), 1)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        default: withCtx(() => [
                          createVNode(VListItemTitle, { class: "text-primary" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.title), 1)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1032, ["to"]);
                    }), 128)),
                    unref(auth).isAuthenticated ? (openBlock(), createBlock(VListItem, {
                      key: 2,
                      onClick: onLogout
                    }, {
                      prepend: withCtx(() => [
                        createVNode(VIcon, { class: "text-primary" }, {
                          default: withCtx(() => [
                            createTextVNode("mdi-logout")
                          ]),
                          _: 1
                        })
                      ]),
                      default: withCtx(() => [
                        createVNode(VListItemTitle, { class: "text-primary" }, {
                          default: withCtx(() => [
                            createTextVNode("Logout")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VFooter, {
              color: "white",
              class: "text-primary justify-center"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<img${ssrRenderAttr("src", _imports_0)} style="${ssrRenderStyle({ "width": "20px" })}" alt="logo" data-v-85b2a688${_scopeId2}><span class="ml-2" data-v-85b2a688${_scopeId2}>${ssrInterpolate(title$1)}</span>`);
                } else {
                  return [
                    createVNode("img", {
                      src: _imports_0,
                      style: { "width": "20px" },
                      alt: "logo"
                    }),
                    createVNode("span", { class: "ml-2" }, toDisplayString(title$1))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VList, { class: "py-0" }, {
                default: withCtx(() => [
                  unref(auth).isAuthenticated ? (openBlock(), createBlock(VListItem, {
                    key: 0,
                    lines: "two"
                  }, {
                    prepend: withCtx(() => [
                      createVNode(VAvatar, null, {
                        default: withCtx(() => [
                          createVNode("img", {
                            src: "https://randomuser.me/api/portraits/men/81.jpg",
                            alt: "avatar"
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    default: withCtx(() => [
                      createVNode(VListItemTitle, { class: "text-primary" }, {
                        default: withCtx(() => {
                          var _a;
                          return [
                            createTextVNode(toDisplayString(((_a = unref(auth).auth) == null ? void 0 : _a.given_name) || "User name"), 1)
                          ];
                        }),
                        _: 1
                      }),
                      createVNode(VListItemSubtitle, null, {
                        default: withCtx(() => {
                          var _a;
                          return [
                            createTextVNode(toDisplayString(((_a = unref(auth).auth) == null ? void 0 : _a.nickname) || ""), 1)
                          ];
                        }),
                        _: 1
                      })
                    ]),
                    _: 1
                  })) : (openBlock(), createBlock(VListItem, {
                    key: 1,
                    to: "/",
                    class: "justify-center"
                  }, {
                    prepend: withCtx(() => [
                      createVNode(VAvatar, null, {
                        default: withCtx(() => [
                          createVNode("img", {
                            src: _imports_0,
                            alt: "logo"
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })),
                  createVNode(VDivider),
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(menuItems), (item) => {
                    return openBlock(), createBlock(VListItem, {
                      key: item.title,
                      to: item.link,
                      exact: ""
                    }, {
                      prepend: withCtx(() => [
                        createVNode(VIcon, { class: "text-primary" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(item.icon), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      default: withCtx(() => [
                        createVNode(VListItemTitle, { class: "text-primary" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(item.title), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1032, ["to"]);
                  }), 128)),
                  unref(auth).isAuthenticated ? (openBlock(), createBlock(VListItem, {
                    key: 2,
                    onClick: onLogout
                  }, {
                    prepend: withCtx(() => [
                      createVNode(VIcon, { class: "text-primary" }, {
                        default: withCtx(() => [
                          createTextVNode("mdi-logout")
                        ]),
                        _: 1
                      })
                    ]),
                    default: withCtx(() => [
                      createVNode(VListItemTitle, { class: "text-primary" }, {
                        default: withCtx(() => [
                          createTextVNode("Logout")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ]),
                _: 1
              }),
              createVNode(VFooter, {
                color: "white",
                class: "text-primary justify-center"
              }, {
                default: withCtx(() => [
                  createVNode("img", {
                    src: _imports_0,
                    style: { "width": "20px" },
                    alt: "logo"
                  }),
                  createVNode("span", { class: "ml-2" }, toDisplayString(title$1))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      if (!unref(auth).isAuthenticated) {
        _push(ssrRenderComponent(VAppBar, {
          app: "",
          color: "white"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(VAppBarNavIcon, {
                class: "d-flex d-sm-none",
                onClick: ($event) => drawer.value = !unref(drawer)
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(VToolbarTitle, { class: "pl-2 pl-sm-0" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_NuxtLink, {
                      to: "/",
                      class: "text-primary text-decoration-none font-weight-bold text-h4"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(title$1)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(title$1))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_NuxtLink, {
                        to: "/",
                        class: "text-primary text-decoration-none font-weight-bold text-h4"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(title$1))
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(VSpacer, null, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(VToolbarItems, { class: "d-none d-sm-flex" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(unref(menuItems), (item) => {
                      _push3(ssrRenderComponent(VBtn, {
                        key: item.title,
                        variant: "text",
                        to: item.link,
                        class: "text-capitalize"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(VIcon, {
                              start: "",
                              class: "d-none d-md-flex"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(item.icon)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(item.icon), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(` ${ssrInterpolate(item.title)}`);
                          } else {
                            return [
                              createVNode(VIcon, {
                                start: "",
                                class: "d-none d-md-flex"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.icon), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createTextVNode(" " + toDisplayString(item.title), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                    if (unref(auth).isAuthenticated) {
                      _push3(ssrRenderComponent(VBtn, {
                        variant: "text",
                        class: "text-capitalize",
                        onClick: onLogout
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(VIcon, { start: "" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`mdi-logout`);
                                } else {
                                  return [
                                    createTextVNode("mdi-logout")
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent4, _scopeId3));
                            _push4(` Logout `);
                          } else {
                            return [
                              createVNode(VIcon, { start: "" }, {
                                default: withCtx(() => [
                                  createTextVNode("mdi-logout")
                                ]),
                                _: 1
                              }),
                              createTextVNode(" Logout ")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(menuItems), (item) => {
                        return openBlock(), createBlock(VBtn, {
                          key: item.title,
                          variant: "text",
                          to: item.link,
                          class: "text-capitalize"
                        }, {
                          default: withCtx(() => [
                            createVNode(VIcon, {
                              start: "",
                              class: "d-none d-md-flex"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item.icon), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createTextVNode(" " + toDisplayString(item.title), 1)
                          ]),
                          _: 2
                        }, 1032, ["to"]);
                      }), 128)),
                      unref(auth).isAuthenticated ? (openBlock(), createBlock(VBtn, {
                        key: 0,
                        variant: "text",
                        class: "text-capitalize",
                        onClick: onLogout
                      }, {
                        default: withCtx(() => [
                          createVNode(VIcon, { start: "" }, {
                            default: withCtx(() => [
                              createTextVNode("mdi-logout")
                            ]),
                            _: 1
                          }),
                          createTextVNode(" Logout ")
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(VAppBarNavIcon, {
                  class: "d-flex d-sm-none",
                  onClick: withModifiers(($event) => drawer.value = !unref(drawer), ["stop"])
                }, null, 8, ["onClick"]),
                createVNode(VToolbarTitle, { class: "pl-2 pl-sm-0" }, {
                  default: withCtx(() => [
                    createVNode(_component_NuxtLink, {
                      to: "/",
                      class: "text-primary text-decoration-none font-weight-bold text-h4"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(title$1))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(VSpacer),
                createVNode(VToolbarItems, { class: "d-none d-sm-flex" }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(menuItems), (item) => {
                      return openBlock(), createBlock(VBtn, {
                        key: item.title,
                        variant: "text",
                        to: item.link,
                        class: "text-capitalize"
                      }, {
                        default: withCtx(() => [
                          createVNode(VIcon, {
                            start: "",
                            class: "d-none d-md-flex"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.icon), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createTextVNode(" " + toDisplayString(item.title), 1)
                        ]),
                        _: 2
                      }, 1032, ["to"]);
                    }), 128)),
                    unref(auth).isAuthenticated ? (openBlock(), createBlock(VBtn, {
                      key: 0,
                      variant: "text",
                      class: "text-capitalize",
                      onClick: onLogout
                    }, {
                      default: withCtx(() => [
                        createVNode(VIcon, { start: "" }, {
                          default: withCtx(() => [
                            createTextVNode("mdi-logout")
                          ]),
                          _: 1
                        }),
                        createTextVNode(" Logout ")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/topNavBar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const topNavBar = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-85b2a688"]]);
const title = "spotbrush";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const auth = useAuthStore();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VApp, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(topNavBar, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(VMain, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "default")
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
            if (!unref(auth).isAuthenticated) {
              _push2(ssrRenderComponent(VFooter, {
                app: "",
                class: "justify-center"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span class="text-primary mr-2"${_scopeId2}>${ssrInterpolate(title)}</span><span${_scopeId2}>\xA9 ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())}</span>`);
                  } else {
                    return [
                      createVNode("span", { class: "text-primary mr-2" }, toDisplayString(title)),
                      createVNode("span", null, "\xA9 " + toDisplayString((/* @__PURE__ */ new Date()).getFullYear()), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(topNavBar),
              createVNode(VMain, null, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              }),
              !unref(auth).isAuthenticated ? (openBlock(), createBlock(VFooter, {
                key: 0,
                app: "",
                class: "justify-center"
              }, {
                default: withCtx(() => [
                  createVNode("span", { class: "text-primary mr-2" }, toDisplayString(title)),
                  createVNode("span", null, "\xA9 " + toDisplayString((/* @__PURE__ */ new Date()).getFullYear()), 1)
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-CkiawNbE.mjs.map
