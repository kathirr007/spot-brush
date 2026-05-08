import { mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc, V as VCard, d as VForm, f as VTextField, g as VDivider, h as VCardActions, i as VBtn, j as VSpacer } from './server.mjs';
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
  data: () => ({
    email: void 0,
    valid: false,
    //   isLoading: false,
    password: void 0,
    rules: {
      email: (v) => !!(v || "").match(/@/) || "Please enter a valid email",
      length: (len) => (v) => (v || "").length >= len || `Invalid character length, required ${len}`,
      password: (v) => !!(v || "").match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) || "Password must contain an upper case letter, a numeric character, and a special character",
      required: (v) => !!v || "This field is required"
    }
  })
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(ssrRenderComponent(VCard, mergeProps({ class: "mx-auto w-75" }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VForm, {
          ref: "form",
          modelValue: _ctx.valid,
          "onUpdate:modelValue": ($event) => _ctx.valid = $event,
          class: "pa-4 pt-6"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VTextField, {
                modelValue: _ctx.password,
                "onUpdate:modelValue": ($event) => _ctx.password = $event,
                rules: [_ctx.rules.password, _ctx.rules.length(6)],
                color: "deep-purple",
                counter: "6",
                label: "Password",
                style: { "min-height": "96px" },
                type: "password"
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VTextField, {
                modelValue: _ctx.email,
                "onUpdate:modelValue": ($event) => _ctx.email = $event,
                rules: [_ctx.rules.email],
                color: "deep-purple",
                label: "Email address",
                type: "email"
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(VTextField, {
                  modelValue: _ctx.password,
                  "onUpdate:modelValue": ($event) => _ctx.password = $event,
                  rules: [_ctx.rules.password, _ctx.rules.length(6)],
                  color: "deep-purple",
                  counter: "6",
                  label: "Password",
                  style: { "min-height": "96px" },
                  type: "password"
                }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                createVNode(VTextField, {
                  modelValue: _ctx.email,
                  "onUpdate:modelValue": ($event) => _ctx.email = $event,
                  rules: [_ctx.rules.email],
                  color: "deep-purple",
                  label: "Email address",
                  type: "email"
                }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(VDivider, null, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(VCardActions, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VBtn, {
                text: "",
                onClick: ($event) => _ctx.$refs.form.reset()
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(` Clear `);
                  } else {
                    return [
                      createTextVNode(" Clear ")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VSpacer, null, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VBtn, {
                disabled: !_ctx.valid,
                class: "white--text",
                color: "deep-purple accent-4",
                depressed: ""
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`Submit`);
                  } else {
                    return [
                      createTextVNode("Submit")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(VBtn, {
                  text: "",
                  onClick: ($event) => _ctx.$refs.form.reset()
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Clear ")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(VSpacer),
                createVNode(VBtn, {
                  disabled: !_ctx.valid,
                  class: "white--text",
                  color: "deep-purple accent-4",
                  depressed: ""
                }, {
                  default: withCtx(() => [
                    createTextVNode("Submit")
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(VForm, {
            ref: "form",
            modelValue: _ctx.valid,
            "onUpdate:modelValue": ($event) => _ctx.valid = $event,
            class: "pa-4 pt-6"
          }, {
            default: withCtx(() => [
              createVNode(VTextField, {
                modelValue: _ctx.password,
                "onUpdate:modelValue": ($event) => _ctx.password = $event,
                rules: [_ctx.rules.password, _ctx.rules.length(6)],
                color: "deep-purple",
                counter: "6",
                label: "Password",
                style: { "min-height": "96px" },
                type: "password"
              }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
              createVNode(VTextField, {
                modelValue: _ctx.email,
                "onUpdate:modelValue": ($event) => _ctx.email = $event,
                rules: [_ctx.rules.email],
                color: "deep-purple",
                label: "Email address",
                type: "email"
              }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"])
            ]),
            _: 1
          }, 8, ["modelValue", "onUpdate:modelValue"]),
          createVNode(VDivider),
          createVNode(VCardActions, null, {
            default: withCtx(() => [
              createVNode(VBtn, {
                text: "",
                onClick: ($event) => _ctx.$refs.form.reset()
              }, {
                default: withCtx(() => [
                  createTextVNode(" Clear ")
                ]),
                _: 1
              }, 8, ["onClick"]),
              createVNode(VSpacer),
              createVNode(VBtn, {
                disabled: !_ctx.valid,
                class: "white--text",
                color: "deep-purple accent-4",
                depressed: ""
              }, {
                default: withCtx(() => [
                  createTextVNode("Submit")
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
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/test.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const test = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { test as default };
//# sourceMappingURL=test-CXeMejEE.mjs.map
