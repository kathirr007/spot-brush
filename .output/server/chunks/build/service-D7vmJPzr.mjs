import { defineComponent, ref, withCtx, createVNode, isRef, unref, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { k as VContainer, l as VRow, m as VCol, j as VSpacer, f as VTextField } from './server.mjs';
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
  __name: "service",
  __ssrInlineRender: true,
  setup(__props) {
    const search = ref("");
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
                        _push4(`<h2 class="text-h4"${_scopeId3}>Service</h2>`);
                      } else {
                        return [
                          createVNode("h2", { class: "text-h4" }, "Service")
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
                          modelValue: unref(search),
                          "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
                          "hide-details": "",
                          variant: "solo",
                          "prepend-inner-icon": "mdi-magnify",
                          label: "Search",
                          clearable: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: unref(search),
                            "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
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
                        createVNode("h2", { class: "text-h4" }, "Service")
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
                          modelValue: unref(search),
                          "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
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
          } else {
            return [
              createVNode(VRow, { align: "center" }, {
                default: withCtx(() => [
                  createVNode(VCol, {
                    cols: "12",
                    sm: "4"
                  }, {
                    default: withCtx(() => [
                      createVNode("h2", { class: "text-h4" }, "Service")
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
                        modelValue: unref(search),
                        "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/service.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=service-D7vmJPzr.mjs.map
