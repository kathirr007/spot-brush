import { defineComponent, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { _ as __nuxt_component_0 } from './nuxt-link-h2V6O_st.mjs';
import { _ as _export_sfc } from './server.mjs';
import { u as useAuthStore } from './auth-CbAKS0YR.mjs';
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

const _sfc_main$1 = {
  props: {
    title: {
      required: true,
      type: String
    },
    status: {
      required: true,
      type: String
    },
    navigateToPage: {
      required: true,
      type: String
    },
    navigateToText: {
      required: true,
      type: String
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  var _a;
  const _component_nuxt_link = __nuxt_component_0;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "notFoundContainer text-center w-100" }, _attrs))} data-v-11f57eab><div class="m-b-xxl" data-v-11f57eab><h1 class="title" data-v-11f57eab>${(_a = $props.title) != null ? _a : ""}</h1>`);
  _push(ssrRenderComponent(_component_nuxt_link, {
    to: $props.navigateToPage,
    class: "button is-primary"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`${ssrInterpolate($props.navigateToText)}`);
      } else {
        return [
          createTextVNode(toDisplayString($props.navigateToText), 1)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><h2 class="subtitle" data-v-11f57eab><span class="d-block mdi mdi-emoticon-sad-outline" data-v-11f57eab></span>${ssrInterpolate($props.status)}</h2></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/ErrorView.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ErrorView = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-11f57eab"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "error",
  __ssrInlineRender: true,
  setup(__props) {
    const auth = useAuthStore();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container pa-0 align-center d-flex h-100" }, _attrs))}>`);
      _push(ssrRenderComponent(ErrorView, {
        title: `Ooooops, the page you are trying to access doesn't exist.`,
        status: "404",
        "navigate-to-page": unref(auth).isAuthenticated ? "/dashboard" : "/",
        "navigate-to-text": unref(auth).isAuthenticated ? "Navigate back to Dashboard" : "Navigate back to Home Page"
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/error.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=error-CgVXjkoX.mjs.map
