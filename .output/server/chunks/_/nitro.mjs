import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import http$2 from 'node:http';
import https from 'node:https';
import { EventEmitter } from 'node:events';
import { Buffer as Buffer$2 } from 'node:buffer';
import { promises, existsSync } from 'node:fs';
import { resolve as resolve$3, dirname as dirname$2, join as join$1 } from 'node:path';
import { createHash } from 'node:crypto';
import * as bodyParser from 'body-parser';
import bodyParser__default from 'body-parser';
import * as require$$0$3$1 from 'events';
import * as mergeDescriptors from 'merge-descriptors';
import * as finalhandler from 'finalhandler';
import * as arrayFlatten from 'array-flatten';
import * as pathToRegexp from 'path-to-regexp';
import * as methods$2 from 'methods';
import * as utilsMerge from 'utils-merge';
import * as depd from 'depd';
import * as parseurl from 'parseurl';
import * as setprototypeof from 'setprototypeof';
import * as qs from 'qs';
import * as path$2 from 'path';
import * as fs$1 from 'fs';
import * as require$$2$8 from 'http';
import * as safeBuffer from 'safe-buffer';
import * as contentDisposition$1 from 'content-disposition';
import * as contentType from 'content-type';
import * as send$2 from 'send';
import * as etag from 'etag';
import * as proxyAddr from 'proxy-addr';
import * as querystring from 'querystring';
import * as accepts$1 from 'accepts';
import * as require$$3$4 from 'net';
import * as typeIs from 'type-is';
import * as fresh$1 from 'fresh';
import * as rangeParser from 'range-parser';
import * as httpErrors from 'http-errors';
import * as encodeurl from 'encodeurl';
import * as escapeHtml$1 from 'escape-html';
import * as onFinished$1 from 'on-finished';
import * as statuses$1 from 'statuses';
import * as cookieSignature from 'cookie-signature';
import * as cookie$1 from 'cookie';
import cookie__default from 'cookie';
import * as vary$1 from 'vary';
import * as serveStatic from 'serve-static';
import * as require$$0$5 from 'zlib';
import * as require$$0$2$1 from 'stream';
import * as engine from 'engine.io';
import { Emitter } from '@socket.io/component-emitter';
import * as base64id from 'base64id';
import * as ws from 'ws';
import * as crypto from 'crypto';
import * as cors from 'cors';
import cors__default from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import { fileURLToPath } from 'node:url';

const suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  if (value[0] === '"' && value[value.length - 1] === '"' && value.indexOf("\\") === -1) {
    return value.slice(1, -1);
  }
  const _value = value.trim();
  if (_value.length <= 9) {
    switch (_value.toLowerCase()) {
      case "true": {
        return true;
      }
      case "false": {
        return false;
      }
      case "undefined": {
        return void 0;
      }
      case "null": {
        return null;
      }
      case "nan": {
        return Number.NaN;
      }
      case "infinity": {
        return Number.POSITIVE_INFINITY;
      }
      case "-infinity": {
        return Number.NEGATIVE_INFINITY;
      }
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const IM_RE = /\?/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
const ENC_SLASH_RE = /%2f/gi;
const ENC_ENC_SLASH_RE = /%252f/gi;
function encode$1(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode$1(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function encodePath(text) {
  return encode$1(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F").replace(ENC_ENC_SLASH_RE, "%2F").replace(AMPERSAND_RE, "%26").replace(PLUS_RE, "%2B");
}
function decode$1(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodePath(text) {
  return decode$1(text.replace(ENC_SLASH_RE, "%252F"));
}
function decodeQueryKey(text) {
  return decode$1(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode$1(text.replace(PLUS_RE, " "));
}

function parseQuery(parametersString = "") {
  const object = /* @__PURE__ */ Object.create(null);
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map(
      (_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`
    ).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}

const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const PROTOCOL_SCRIPT_RE = /^[\s\0]*(blob|data|javascript|vbscript):$/i;
const TRAILING_SLASH_RE = /\/$|\/\?|\/#/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function isScriptProtocol(protocol) {
  return !!protocol && PROTOCOL_SCRIPT_RE.test(protocol);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/");
  }
  return TRAILING_SLASH_RE.test(input);
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
  if (!hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex !== -1) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
  }
  const [s0, ...s] = path.split("?");
  const cleanPath = s0.endsWith("/") ? s0.slice(0, -1) : s0;
  return (cleanPath || "/") + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/") ? input : input + "/";
  }
  if (hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex !== -1) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
    if (!path) {
      return fragment;
    }
  }
  const [s0, ...s] = path.split("?");
  return s0 + "/" + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withLeadingSlash(input = "") {
  return hasLeadingSlash(input) ? input : "/" + input;
}
function withBase(input, base) {
  if (isEmptyURL(base) || hasProtocol(input)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (input.startsWith(_base)) {
    const nextChar = input[_base.length];
    if (!nextChar || nextChar === "/" || nextChar === "?") {
      return input;
    }
  }
  return joinURL(_base, input);
}
function withoutBase(input, base) {
  if (isEmptyURL(base)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (!input.startsWith(_base)) {
    return input;
  }
  const nextChar = input[_base.length];
  if (nextChar && nextChar !== "/" && nextChar !== "?") {
    return input;
  }
  const trimmed = input.slice(_base.length).replace(/^\/+/, "");
  return "/" + trimmed;
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function getQuery$1(input) {
  return parseQuery(parseURL(input).search);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}
function joinRelativeURL(..._input) {
  const JOIN_SEGMENT_SPLIT_RE = /\/(?!\/)/;
  const input = _input.filter(Boolean);
  const segments = [];
  let segmentsDepth = 0;
  for (const i of input) {
    if (!i || i === "/") {
      continue;
    }
    for (const [sindex, s] of i.split(JOIN_SEGMENT_SPLIT_RE).entries()) {
      if (!s || s === ".") {
        continue;
      }
      if (s === "..") {
        if (segments.length === 1 && hasProtocol(segments[0])) {
          continue;
        }
        segments.pop();
        segmentsDepth--;
        continue;
      }
      if (sindex === 1 && segments[segments.length - 1]?.endsWith(":/")) {
        segments[segments.length - 1] += "/" + s;
        continue;
      }
      segments.push(s);
      segmentsDepth++;
    }
  }
  let url = segments.join("/");
  if (segmentsDepth >= 0) {
    if (input[0]?.startsWith("/") && !url.startsWith("/")) {
      url = "/" + url;
    } else if (input[0]?.startsWith("./") && !url.startsWith("./")) {
      url = "./" + url;
    }
  } else {
    url = "../".repeat(-1 * segmentsDepth) + url;
  }
  if (input[input.length - 1]?.endsWith("/") && !url.endsWith("/")) {
    url += "/";
  }
  return url;
}

const protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  if (protocol === "file:") {
    path = path.replace(/\/(?=[A-Za-z]:)/, "");
  }
  const { pathname, search, hash } = parsePath(path);
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}

const NODE_TYPES = {
  NORMAL: 0,
  WILDCARD: 1,
  PLACEHOLDER: 2
};

function createRouter$1(options = {}) {
  const ctx = {
    options,
    rootNode: createRadixNode(),
    staticRoutesMap: {}
  };
  const normalizeTrailingSlash = (p) => options.strictTrailingSlash ? p : p.replace(/\/$/, "") || "/";
  if (options.routes) {
    for (const path in options.routes) {
      insert(ctx, normalizeTrailingSlash(path), options.routes[path]);
    }
  }
  return {
    ctx,
    lookup: (path) => lookup(ctx, normalizeTrailingSlash(path)),
    insert: (path, data) => insert(ctx, normalizeTrailingSlash(path), data),
    remove: (path) => remove(ctx, normalizeTrailingSlash(path))
  };
}
function lookup(ctx, path) {
  const staticPathNode = ctx.staticRoutesMap[path];
  if (staticPathNode) {
    return staticPathNode.data;
  }
  const sections = path.split("/");
  const params = {};
  let paramsFound = false;
  let wildcardNode = null;
  let node = ctx.rootNode;
  let wildCardParam = null;
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (node.wildcardChildNode !== null) {
      wildcardNode = node.wildcardChildNode;
      wildCardParam = sections.slice(i).join("/");
    }
    const nextNode = node.children.get(section);
    if (nextNode === void 0) {
      if (node && node.placeholderChildren.length > 1) {
        const remaining = sections.length - i;
        node = node.placeholderChildren.find((c) => c.maxDepth === remaining) || null;
      } else {
        node = node.placeholderChildren[0] || null;
      }
      if (!node) {
        break;
      }
      if (node.paramName) {
        params[node.paramName] = section;
      }
      paramsFound = true;
    } else {
      node = nextNode;
    }
  }
  if ((node === null || node.data === null) && wildcardNode !== null) {
    node = wildcardNode;
    params[node.paramName || "_"] = wildCardParam;
    paramsFound = true;
  }
  if (!node) {
    return null;
  }
  if (paramsFound) {
    return {
      ...node.data,
      params: paramsFound ? params : void 0
    };
  }
  return node.data;
}
function insert(ctx, path, data) {
  let isStaticRoute = true;
  const sections = path.split("/");
  let node = ctx.rootNode;
  let _unnamedPlaceholderCtr = 0;
  const matchedNodes = [node];
  for (const section of sections) {
    let childNode;
    if (childNode = node.children.get(section)) {
      node = childNode;
    } else {
      const type = getNodeType(section);
      childNode = createRadixNode({ type, parent: node });
      node.children.set(section, childNode);
      if (type === NODE_TYPES.PLACEHOLDER) {
        childNode.paramName = section === "*" ? `_${_unnamedPlaceholderCtr++}` : section.slice(1);
        node.placeholderChildren.push(childNode);
        isStaticRoute = false;
      } else if (type === NODE_TYPES.WILDCARD) {
        node.wildcardChildNode = childNode;
        childNode.paramName = section.slice(
          3
          /* "**:" */
        ) || "_";
        isStaticRoute = false;
      }
      matchedNodes.push(childNode);
      node = childNode;
    }
  }
  for (const [depth, node2] of matchedNodes.entries()) {
    node2.maxDepth = Math.max(matchedNodes.length - depth, node2.maxDepth || 0);
  }
  node.data = data;
  if (isStaticRoute === true) {
    ctx.staticRoutesMap[path] = node;
  }
  return node;
}
function remove(ctx, path) {
  let success = false;
  const sections = path.split("/");
  let node = ctx.rootNode;
  for (const section of sections) {
    node = node.children.get(section);
    if (!node) {
      return success;
    }
  }
  if (node.data) {
    const lastSection = sections.at(-1) || "";
    node.data = null;
    if (Object.keys(node.children).length === 0 && node.parent) {
      node.parent.children.delete(lastSection);
      node.parent.wildcardChildNode = null;
      node.parent.placeholderChildren = [];
    }
    success = true;
  }
  return success;
}
function createRadixNode(options = {}) {
  return {
    type: options.type || NODE_TYPES.NORMAL,
    maxDepth: 0,
    parent: options.parent || null,
    children: /* @__PURE__ */ new Map(),
    data: options.data || null,
    paramName: options.paramName || null,
    wildcardChildNode: null,
    placeholderChildren: []
  };
}
function getNodeType(str) {
  if (str.startsWith("**")) {
    return NODE_TYPES.WILDCARD;
  }
  if (str[0] === ":" || str === "*") {
    return NODE_TYPES.PLACEHOLDER;
  }
  return NODE_TYPES.NORMAL;
}

function toRouteMatcher(router) {
  const table = _routerNodeToTable("", router.ctx.rootNode);
  return _createMatcher(table, router.ctx.options.strictTrailingSlash);
}
function _createMatcher(table, strictTrailingSlash) {
  return {
    ctx: { table },
    matchAll: (path) => _matchRoutes(path, table, strictTrailingSlash)
  };
}
function _createRouteTable() {
  return {
    static: /* @__PURE__ */ new Map(),
    wildcard: /* @__PURE__ */ new Map(),
    dynamic: /* @__PURE__ */ new Map()
  };
}
function _matchRoutes(path, table, strictTrailingSlash) {
  if (strictTrailingSlash !== true && path.endsWith("/")) {
    path = path.slice(0, -1) || "/";
  }
  const matches = [];
  for (const [key, value] of _sortRoutesMap(table.wildcard)) {
    if (path === key || path.startsWith(key + "/")) {
      matches.push(value);
    }
  }
  for (const [key, value] of _sortRoutesMap(table.dynamic)) {
    if (path.startsWith(key + "/")) {
      const subPath = "/" + path.slice(key.length).split("/").splice(2).join("/");
      matches.push(..._matchRoutes(subPath, value));
    }
  }
  const staticMatch = table.static.get(path);
  if (staticMatch) {
    matches.push(staticMatch);
  }
  return matches.filter(Boolean);
}
function _sortRoutesMap(m) {
  return [...m.entries()].sort((a, b) => a[0].length - b[0].length);
}
function _routerNodeToTable(initialPath, initialNode) {
  const table = _createRouteTable();
  function _addNode(path, node) {
    if (path) {
      if (node.type === NODE_TYPES.NORMAL && !(path.includes("*") || path.includes(":"))) {
        if (node.data) {
          table.static.set(path, node.data);
        }
      } else if (node.type === NODE_TYPES.WILDCARD) {
        table.wildcard.set(path.replace("/**", ""), node.data);
      } else if (node.type === NODE_TYPES.PLACEHOLDER) {
        const subTable = _routerNodeToTable("", node);
        if (node.data) {
          subTable.static.set("/", node.data);
        }
        table.dynamic.set(path.replace(/\/\*|\/:\w+/, ""), subTable);
        return;
      }
    }
    for (const [childPath, child] of node.children.entries()) {
      _addNode(`${path}/${childPath}`.replace("//", "/"), child);
    }
  }
  _addNode(initialPath, initialNode);
  return table;
}

function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}

function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = { ...defaults };
  for (const key of Object.keys(baseObject)) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject(value) && isPlainObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defu = createDefu();
const defuFn = createDefu((object, key, currentValue) => {
  if (object[key] !== void 0 && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});

function o(n){throw new Error(`${n} is not implemented yet!`)}let i$2 = class i extends EventEmitter{__unenv__={};readableEncoding=null;readableEnded=true;readableFlowing=false;readableHighWaterMark=0;readableLength=0;readableObjectMode=false;readableAborted=false;readableDidRead=false;closed=false;errored=null;readable=false;destroyed=false;static from(e,t){return new i(t)}constructor(e){super();}_read(e){}read(e){}setEncoding(e){return this}pause(){return this}resume(){return this}isPaused(){return  true}unpipe(e){return this}unshift(e,t){}wrap(e){return this}push(e,t){return  false}_destroy(e,t){this.removeAllListeners();}destroy(e){return this.destroyed=true,this._destroy(e),this}pipe(e,t){return {}}compose(e,t){throw new Error("Method not implemented.")}[Symbol.asyncDispose](){return this.destroy(),Promise.resolve()}async*[Symbol.asyncIterator](){throw o("Readable.asyncIterator")}iterator(e){throw o("Readable.iterator")}map(e,t){throw o("Readable.map")}filter(e,t){throw o("Readable.filter")}forEach(e,t){throw o("Readable.forEach")}reduce(e,t,r){throw o("Readable.reduce")}find(e,t){throw o("Readable.find")}findIndex(e,t){throw o("Readable.findIndex")}some(e,t){throw o("Readable.some")}toArray(e){throw o("Readable.toArray")}every(e,t){throw o("Readable.every")}flatMap(e,t){throw o("Readable.flatMap")}drop(e,t){throw o("Readable.drop")}take(e,t){throw o("Readable.take")}asIndexedPairs(e){throw o("Readable.asIndexedPairs")}};let l$1 = class l extends EventEmitter{__unenv__={};writable=true;writableEnded=false;writableFinished=false;writableHighWaterMark=0;writableLength=0;writableObjectMode=false;writableCorked=0;closed=false;errored=null;writableNeedDrain=false;writableAborted=false;destroyed=false;_data;_encoding="utf8";constructor(e){super();}pipe(e,t){return {}}_write(e,t,r){if(this.writableEnded){r&&r();return}if(this._data===void 0)this._data=e;else {const s=typeof this._data=="string"?Buffer$2.from(this._data,this._encoding||t||"utf8"):this._data,a=typeof e=="string"?Buffer$2.from(e,t||this._encoding||"utf8"):e;this._data=Buffer$2.concat([s,a]);}this._encoding=t,r&&r();}_writev(e,t){}_destroy(e,t){}_final(e){}write(e,t,r){const s=typeof t=="string"?this._encoding:"utf8",a=typeof t=="function"?t:typeof r=="function"?r:void 0;return this._write(e,s,a),true}setDefaultEncoding(e){return this}end(e,t,r){const s=typeof e=="function"?e:typeof t=="function"?t:typeof r=="function"?r:void 0;if(this.writableEnded)return s&&s(),this;const a=e===s?void 0:e;if(a){const u=t===s?void 0:t;this.write(a,u,s);}return this.writableEnded=true,this.writableFinished=true,this.emit("close"),this.emit("finish"),this}cork(){}uncork(){}destroy(e){return this.destroyed=true,delete this._data,this.removeAllListeners(),this}compose(e,t){throw new Error("Method not implemented.")}[Symbol.asyncDispose](){return Promise.resolve()}};const c=class{allowHalfOpen=true;_destroy;constructor(e=new i$2,t=new l$1){Object.assign(this,e),Object.assign(this,t),this._destroy=m(e._destroy,t._destroy);}};function _(){return Object.assign(c.prototype,i$2.prototype),Object.assign(c.prototype,l$1.prototype),c}function m(...n){return function(...e){for(const t of n)t(...e);}}const g=_();class A extends g{__unenv__={};bufferSize=0;bytesRead=0;bytesWritten=0;connecting=false;destroyed=false;pending=false;localAddress="";localPort=0;remoteAddress="";remoteFamily="";remotePort=0;autoSelectFamilyAttemptedAddresses=[];readyState="readOnly";constructor(e){super();}write(e,t,r){return  false}connect(e,t,r){return this}end(e,t,r){return this}setEncoding(e){return this}pause(){return this}resume(){return this}setTimeout(e,t){return this}setNoDelay(e){return this}setKeepAlive(e,t){return this}address(){return {}}unref(){return this}ref(){return this}destroySoon(){this.destroy();}resetAndDestroy(){const e=new Error("ERR_SOCKET_CLOSED");return e.code="ERR_SOCKET_CLOSED",this.destroy(e),this}}class y extends i$2{aborted=false;httpVersion="1.1";httpVersionMajor=1;httpVersionMinor=1;complete=true;connection;socket;headers={};trailers={};method="GET";url="/";statusCode=200;statusMessage="";closed=false;errored=null;readable=false;constructor(e){super(),this.socket=this.connection=e||new A;}get rawHeaders(){const e=this.headers,t=[];for(const r in e)if(Array.isArray(e[r]))for(const s of e[r])t.push(r,s);else t.push(r,e[r]);return t}get rawTrailers(){return []}setTimeout(e,t){return this}get headersDistinct(){return p(this.headers)}get trailersDistinct(){return p(this.trailers)}}function p(n){const e={};for(const[t,r]of Object.entries(n))t&&(e[t]=(Array.isArray(r)?r:[r]).filter(Boolean));return e}class w extends l$1{statusCode=200;statusMessage="";upgrading=false;chunkedEncoding=false;shouldKeepAlive=false;useChunkedEncodingByDefault=false;sendDate=false;finished=false;headersSent=false;strictContentLength=false;connection=null;socket=null;req;_headers={};constructor(e){super(),this.req=e;}assignSocket(e){e._httpMessage=this,this.socket=e,this.connection=e,this.emit("socket",e),this._flush();}_flush(){this.flushHeaders();}detachSocket(e){}writeContinue(e){}writeHead(e,t,r){e&&(this.statusCode=e),typeof t=="string"&&(this.statusMessage=t,t=void 0);const s=r||t;if(s&&!Array.isArray(s))for(const a in s)this.setHeader(a,s[a]);return this.headersSent=true,this}writeProcessing(){}setTimeout(e,t){return this}appendHeader(e,t){e=e.toLowerCase();const r=this._headers[e],s=[...Array.isArray(r)?r:[r],...Array.isArray(t)?t:[t]].filter(Boolean);return this._headers[e]=s.length>1?s:s[0],this}setHeader(e,t){return this._headers[e.toLowerCase()]=t,this}setHeaders(e){for(const[t,r]of Object.entries(e))this.setHeader(t,r);return this}getHeader(e){return this._headers[e.toLowerCase()]}getHeaders(){return this._headers}getHeaderNames(){return Object.keys(this._headers)}hasHeader(e){return e.toLowerCase()in this._headers}removeHeader(e){delete this._headers[e.toLowerCase()];}addTrailers(e){}flushHeaders(){}writeEarlyHints(e,t){typeof t=="function"&&t();}}const E=(()=>{const n=function(){};return n.prototype=Object.create(null),n})();function R(n={}){const e=new E,t=Array.isArray(n)||H(n)?n:Object.entries(n);for(const[r,s]of t)if(s){if(e[r]===void 0){e[r]=s;continue}e[r]=[...Array.isArray(e[r])?e[r]:[e[r]],...Array.isArray(s)?s:[s]];}return e}function H(n){return typeof n?.entries=="function"}function v(n={}){if(n instanceof Headers)return n;const e=new Headers;for(const[t,r]of Object.entries(n))if(r!==void 0){if(Array.isArray(r)){for(const s of r)e.append(t,String(s));continue}e.set(t,String(r));}return e}const S=new Set([101,204,205,304]);async function b(n,e){const t=new y,r=new w(t);t.url=e.url?.toString()||"/";let s;if(!t.url.startsWith("/")){const d=new URL(t.url);s=d.host,t.url=d.pathname+d.search+d.hash;}t.method=e.method||"GET",t.headers=R(e.headers||{}),t.headers.host||(t.headers.host=e.host||s||"localhost"),t.connection.encrypted=t.connection.encrypted||e.protocol==="https",t.body=e.body||null,t.__unenv__=e.context,await n(t,r);let a=r._data;(S.has(r.statusCode)||t.method.toUpperCase()==="HEAD")&&(a=null,delete r._headers["content-length"]);const u={status:r.statusCode,statusText:r.statusMessage,headers:r._headers,body:a};return t.destroy(),r.destroy(),u}async function C(n,e,t={}){try{const r=await b(n,{url:e,...t});return new Response(r.body,{status:r.status,statusText:r.statusText,headers:v(r.headers)})}catch(r){return new Response(r.toString(),{status:Number.parseInt(r.statusCode||r.code)||500,statusText:r.statusText})}}

function hasProp(obj, prop) {
  try {
    return prop in obj;
  } catch {
    return false;
  }
}

class H3Error extends Error {
  static __h3_error__ = true;
  statusCode = 500;
  fatal = false;
  unhandled = false;
  statusMessage;
  data;
  cause;
  constructor(message, opts = {}) {
    super(message, opts);
    if (opts.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
  toJSON() {
    const obj = {
      message: this.message,
      statusCode: sanitizeStatusCode(this.statusCode, 500)
    };
    if (this.statusMessage) {
      obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
    }
    if (this.data !== void 0) {
      obj.data = this.data;
    }
    return obj;
  }
}
function createError$2(input) {
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error(input.message ?? input.statusMessage ?? "", {
    cause: input.cause || input
  });
  if (hasProp(input, "stack")) {
    try {
      Object.defineProperty(err, "stack", {
        get() {
          return input.stack;
        }
      });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.statusCode) {
    err.statusCode = sanitizeStatusCode(input.statusCode, err.statusCode);
  } else if (input.status) {
    err.statusCode = sanitizeStatusCode(input.status, err.statusCode);
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  } else if (input.statusText) {
    err.statusMessage = input.statusText;
  }
  if (err.statusMessage) {
    const originalMessage = err.statusMessage;
    const sanitizedMessage = sanitizeStatusMessage(err.statusMessage);
    if (sanitizedMessage !== originalMessage) {
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default."
      );
    }
  }
  if (input.fatal !== void 0) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== void 0) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function sendError(event, error, debug) {
  if (event.handled) {
    return;
  }
  const h3Error = isError(error) ? error : createError$2(error);
  const responseBody = {
    statusCode: h3Error.statusCode,
    statusMessage: h3Error.statusMessage,
    stack: [],
    data: h3Error.data
  };
  if (debug) {
    responseBody.stack = (h3Error.stack || "").split("\n").map((l) => l.trim());
  }
  if (event.handled) {
    return;
  }
  const _code = Number.parseInt(h3Error.statusCode);
  setResponseStatus(event, _code, h3Error.statusMessage);
  event.node.res.setHeader("content-type", MIMES.json);
  event.node.res.end(JSON.stringify(responseBody, void 0, 2));
}
function isError(input) {
  return input?.constructor?.__h3_error__ === true;
}

function getQuery(event) {
  return getQuery$1(event.path || "");
}
function isMethod(event, expected, allowHead) {
  if (typeof expected === "string") {
    if (event.method === expected) {
      return true;
    }
  } else if (expected.includes(event.method)) {
    return true;
  }
  return false;
}
function assertMethod(event, expected, allowHead) {
  if (!isMethod(event, expected)) {
    throw createError$2({
      statusCode: 405,
      statusMessage: "HTTP method is not allowed."
    });
  }
}
function getRequestHeaders(event) {
  const _headers = {};
  for (const key in event.node.req.headers) {
    const val = event.node.req.headers[key];
    _headers[key] = Array.isArray(val) ? val.filter(Boolean).join(", ") : val;
  }
  return _headers;
}
function getRequestHeader(event, name) {
  const headers = getRequestHeaders(event);
  const value = headers[name.toLowerCase()];
  return value;
}
function getRequestHost(event, opts = {}) {
  if (opts.xForwardedHost) {
    const _header = event.node.req.headers["x-forwarded-host"];
    const xForwardedHost = (_header || "").split(",").shift()?.trim();
    if (xForwardedHost) {
      return xForwardedHost;
    }
  }
  return event.node.req.headers.host || "localhost";
}
function getRequestProtocol(event, opts = {}) {
  if (opts.xForwardedProto !== false && event.node.req.headers["x-forwarded-proto"] === "https") {
    return "https";
  }
  return event.node.req.connection?.encrypted ? "https" : "http";
}
function getRequestURL(event, opts = {}) {
  const host = getRequestHost(event, opts);
  const protocol = getRequestProtocol(event, opts);
  const path = (event.node.req.originalUrl || event.path).replace(
    /^[/\\]+/g,
    "/"
  );
  return new URL(path, `${protocol}://${host}`);
}

const RawBodySymbol = Symbol.for("h3RawBody");
const PayloadMethods$1 = ["PATCH", "POST", "PUT", "DELETE"];
function readRawBody(event, encoding = "utf8") {
  assertMethod(event, PayloadMethods$1);
  const _rawBody = event._requestBody || event.web?.request?.body || event.node.req[RawBodySymbol] || event.node.req.rawBody || event.node.req.body;
  if (_rawBody) {
    const promise2 = Promise.resolve(_rawBody).then((_resolved) => {
      if (Buffer.isBuffer(_resolved)) {
        return _resolved;
      }
      if (typeof _resolved.pipeTo === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.pipeTo(
            new WritableStream({
              write(chunk) {
                chunks.push(chunk);
              },
              close() {
                resolve(Buffer.concat(chunks));
              },
              abort(reason) {
                reject(reason);
              }
            })
          ).catch(reject);
        });
      } else if (typeof _resolved.pipe === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.on("data", (chunk) => {
            chunks.push(chunk);
          }).on("end", () => {
            resolve(Buffer.concat(chunks));
          }).on("error", reject);
        });
      }
      if (_resolved.constructor === Object) {
        return Buffer.from(JSON.stringify(_resolved));
      }
      if (_resolved instanceof URLSearchParams) {
        return Buffer.from(_resolved.toString());
      }
      if (_resolved instanceof FormData) {
        return new Response(_resolved).bytes().then((uint8arr) => Buffer.from(uint8arr));
      }
      return Buffer.from(_resolved);
    });
    return encoding ? promise2.then((buff) => buff.toString(encoding)) : promise2;
  }
  if (!Number.parseInt(event.node.req.headers["content-length"] || "") && !/\bchunked\b/i.test(
    String(event.node.req.headers["transfer-encoding"] ?? "")
  )) {
    return Promise.resolve(void 0);
  }
  const promise = event.node.req[RawBodySymbol] = new Promise(
    (resolve, reject) => {
      const bodyData = [];
      event.node.req.on("error", (err) => {
        reject(err);
      }).on("data", (chunk) => {
        bodyData.push(chunk);
      }).on("end", () => {
        resolve(Buffer.concat(bodyData));
      });
    }
  );
  const result = encoding ? promise.then((buff) => buff.toString(encoding)) : promise;
  return result;
}
function getRequestWebStream(event) {
  if (!PayloadMethods$1.includes(event.method)) {
    return;
  }
  const bodyStream = event.web?.request?.body || event._requestBody;
  if (bodyStream) {
    return bodyStream;
  }
  const _hasRawBody = RawBodySymbol in event.node.req || "rawBody" in event.node.req || "body" in event.node.req || "__unenv__" in event.node.req;
  if (_hasRawBody) {
    return new ReadableStream({
      async start(controller) {
        const _rawBody = await readRawBody(event, false);
        if (_rawBody) {
          controller.enqueue(_rawBody);
        }
        controller.close();
      }
    });
  }
  return new ReadableStream({
    start: (controller) => {
      event.node.req.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      event.node.req.on("end", () => {
        controller.close();
      });
      event.node.req.on("error", (err) => {
        controller.error(err);
      });
    }
  });
}

function handleCacheHeaders(event, opts) {
  const cacheControls = ["public", ...opts.cacheControls || []];
  let cacheMatched = false;
  if (opts.maxAge !== void 0) {
    cacheControls.push(`max-age=${+opts.maxAge}`, `s-maxage=${+opts.maxAge}`);
  }
  if (opts.modifiedTime) {
    const modifiedTime = new Date(opts.modifiedTime);
    const ifModifiedSince = event.node.req.headers["if-modified-since"];
    event.node.res.setHeader("last-modified", modifiedTime.toUTCString());
    if (ifModifiedSince && new Date(ifModifiedSince) >= modifiedTime) {
      cacheMatched = true;
    }
  }
  if (opts.etag) {
    event.node.res.setHeader("etag", opts.etag);
    const ifNonMatch = event.node.req.headers["if-none-match"];
    if (ifNonMatch === opts.etag) {
      cacheMatched = true;
    }
  }
  event.node.res.setHeader("cache-control", cacheControls.join(", "));
  if (cacheMatched) {
    event.node.res.statusCode = 304;
    if (!event.handled) {
      event.node.res.end();
    }
    return true;
  }
  return false;
}

const MIMES = {
  html: "text/html",
  json: "application/json"
};

const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) {
    return defaultStatusCode;
  }
  if (typeof statusCode === "string") {
    statusCode = Number.parseInt(statusCode, 10);
  }
  if (statusCode < 100 || statusCode > 999) {
    return defaultStatusCode;
  }
  return statusCode;
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString.flatMap((c) => splitCookiesString(c));
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  const cookiesStrings = [];
  let pos = 0;
  let start;
  let ch;
  let lastComma;
  let nextStart;
  let cookiesSeparatorFound;
  const skipWhitespace = () => {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  };
  const notSpecialChar = () => {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  };
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.slice(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.slice(start));
    }
  }
  return cookiesStrings;
}

const defer = typeof setImmediate === "undefined" ? (fn) => fn() : setImmediate;
function send$1(event, data, type) {
  if (type) {
    defaultContentType(event, type);
  }
  return new Promise((resolve) => {
    defer(() => {
      if (!event.handled) {
        event.node.res.end(data);
      }
      resolve();
    });
  });
}
function sendNoContent(event, code) {
  if (event.handled) {
    return;
  }
  if (!code && event.node.res.statusCode !== 200) {
    code = event.node.res.statusCode;
  }
  const _code = sanitizeStatusCode(code, 204);
  if (_code === 204) {
    event.node.res.removeHeader("content-length");
  }
  event.node.res.writeHead(_code);
  event.node.res.end();
}
function setResponseStatus(event, code, text) {
  if (code) {
    event.node.res.statusCode = sanitizeStatusCode(
      code,
      event.node.res.statusCode
    );
  }
  if (text) {
    event.node.res.statusMessage = sanitizeStatusMessage(text);
  }
}
function getResponseStatus(event) {
  return event.node.res.statusCode;
}
function getResponseStatusText(event) {
  return event.node.res.statusMessage;
}
function defaultContentType(event, type) {
  if (type && event.node.res.statusCode !== 304 && !event.node.res.getHeader("content-type")) {
    event.node.res.setHeader("content-type", type);
  }
}
function sendRedirect(event, location, code = 302) {
  event.node.res.statusCode = sanitizeStatusCode(
    code,
    event.node.res.statusCode
  );
  event.node.res.setHeader("location", location);
  const encodedLoc = location.replace(/"/g, "%22");
  const html = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`;
  return send$1(event, html, MIMES.html);
}
function getResponseHeader(event, name) {
  return event.node.res.getHeader(name);
}
function setResponseHeaders(event, headers) {
  for (const [name, value] of Object.entries(headers)) {
    event.node.res.setHeader(
      name,
      value
    );
  }
}
const setHeaders = setResponseHeaders;
function setResponseHeader(event, name, value) {
  event.node.res.setHeader(name, value);
}
function appendResponseHeader(event, name, value) {
  let current = event.node.res.getHeader(name);
  if (!current) {
    event.node.res.setHeader(name, value);
    return;
  }
  if (!Array.isArray(current)) {
    current = [current.toString()];
  }
  event.node.res.setHeader(name, [...current, value]);
}
function removeResponseHeader(event, name) {
  return event.node.res.removeHeader(name);
}
function isStream(data) {
  if (!data || typeof data !== "object") {
    return false;
  }
  if (typeof data.pipe === "function") {
    if (typeof data._read === "function") {
      return true;
    }
    if (typeof data.abort === "function") {
      return true;
    }
  }
  if (typeof data.pipeTo === "function") {
    return true;
  }
  return false;
}
function isWebResponse(data) {
  return typeof Response !== "undefined" && data instanceof Response;
}
function sendStream(event, stream) {
  if (!stream || typeof stream !== "object") {
    throw new Error("[h3] Invalid stream provided.");
  }
  event.node.res._data = stream;
  if (!event.node.res.socket) {
    event._handled = true;
    return Promise.resolve();
  }
  if (hasProp(stream, "pipeTo") && typeof stream.pipeTo === "function") {
    return stream.pipeTo(
      new WritableStream({
        write(chunk) {
          event.node.res.write(chunk);
        }
      })
    ).then(() => {
      event.node.res.end();
    });
  }
  if (hasProp(stream, "pipe") && typeof stream.pipe === "function") {
    return new Promise((resolve, reject) => {
      stream.pipe(event.node.res);
      if (stream.on) {
        stream.on("end", () => {
          event.node.res.end();
          resolve();
        });
        stream.on("error", (error) => {
          reject(error);
        });
      }
      event.node.res.on("close", () => {
        if (stream.abort) {
          stream.abort();
        }
      });
    });
  }
  throw new Error("[h3] Invalid or incompatible stream provided.");
}
function sendWebResponse(event, response) {
  for (const [key, value] of response.headers) {
    if (key === "set-cookie") {
      event.node.res.appendHeader(key, splitCookiesString(value));
    } else {
      event.node.res.setHeader(key, value);
    }
  }
  if (response.status) {
    event.node.res.statusCode = sanitizeStatusCode(
      response.status,
      event.node.res.statusCode
    );
  }
  if (response.statusText) {
    event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  }
  if (response.redirected) {
    event.node.res.setHeader("location", response.url);
  }
  if (!response.body) {
    event.node.res.end();
    return;
  }
  return sendStream(event, response.body);
}

const PayloadMethods = /* @__PURE__ */ new Set(["PATCH", "POST", "PUT", "DELETE"]);
const ignoredHeaders = /* @__PURE__ */ new Set([
  "transfer-encoding",
  "accept-encoding",
  "connection",
  "keep-alive",
  "upgrade",
  "expect",
  "host",
  "accept"
]);
async function proxyRequest(event, target, opts = {}) {
  let body;
  let duplex;
  if (PayloadMethods.has(event.method)) {
    if (opts.streamRequest) {
      body = getRequestWebStream(event);
      duplex = "half";
    } else {
      body = await readRawBody(event, false).catch(() => void 0);
    }
  }
  const method = opts.fetchOptions?.method || event.method;
  const fetchHeaders = mergeHeaders$1(
    getProxyRequestHeaders(event, { host: target.startsWith("/") }),
    opts.fetchOptions?.headers,
    opts.headers
  );
  return sendProxy(event, target, {
    ...opts,
    fetchOptions: {
      method,
      body,
      duplex,
      ...opts.fetchOptions,
      headers: fetchHeaders
    }
  });
}
async function sendProxy(event, target, opts = {}) {
  let response;
  try {
    response = await _getFetch(opts.fetch)(target, {
      headers: opts.headers,
      ignoreResponseError: true,
      // make $ofetch.raw transparent
      ...opts.fetchOptions
    });
  } catch (error) {
    throw createError$2({
      status: 502,
      statusMessage: "Bad Gateway",
      cause: error
    });
  }
  event.node.res.statusCode = sanitizeStatusCode(
    response.status,
    event.node.res.statusCode
  );
  event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  const cookies = [];
  for (const [key, value] of response.headers.entries()) {
    if (key === "content-encoding") {
      continue;
    }
    if (key === "content-length") {
      continue;
    }
    if (key === "set-cookie") {
      cookies.push(...splitCookiesString(value));
      continue;
    }
    event.node.res.setHeader(key, value);
  }
  if (cookies.length > 0) {
    event.node.res.setHeader(
      "set-cookie",
      cookies.map((cookie) => {
        if (opts.cookieDomainRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookieDomainRewrite,
            "domain"
          );
        }
        if (opts.cookiePathRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookiePathRewrite,
            "path"
          );
        }
        return cookie;
      })
    );
  }
  if (opts.onResponse) {
    await opts.onResponse(event, response);
  }
  if (response._data !== void 0) {
    return response._data;
  }
  if (event.handled) {
    return;
  }
  if (opts.sendStream === false) {
    const data = new Uint8Array(await response.arrayBuffer());
    return event.node.res.end(data);
  }
  if (response.body) {
    for await (const chunk of response.body) {
      event.node.res.write(chunk);
    }
  }
  return event.node.res.end();
}
function getProxyRequestHeaders(event, opts) {
  const headers = /* @__PURE__ */ Object.create(null);
  const reqHeaders = getRequestHeaders(event);
  for (const name in reqHeaders) {
    if (!ignoredHeaders.has(name) || name === "host" && opts?.host) {
      headers[name] = reqHeaders[name];
    }
  }
  return headers;
}
function fetchWithEvent(event, req, init, options) {
  return _getFetch(options?.fetch)(req, {
    ...init,
    context: init?.context || event.context,
    headers: {
      ...getProxyRequestHeaders(event, {
        host: typeof req === "string" && req.startsWith("/")
      }),
      ...init?.headers
    }
  });
}
function _getFetch(_fetch) {
  if (_fetch) {
    return _fetch;
  }
  if (globalThis.fetch) {
    return globalThis.fetch;
  }
  throw new Error(
    "fetch is not available. Try importing `node-fetch-native/polyfill` for Node.js."
  );
}
function rewriteCookieProperty(header, map, property) {
  const _map = typeof map === "string" ? { "*": map } : map;
  return header.replace(
    new RegExp(`(;\\s*${property}=)([^;]+)`, "gi"),
    (match, prefix, previousValue) => {
      let newValue;
      if (previousValue in _map) {
        newValue = _map[previousValue];
      } else if ("*" in _map) {
        newValue = _map["*"];
      } else {
        return match;
      }
      return newValue ? prefix + newValue : "";
    }
  );
}
function mergeHeaders$1(defaults, ...inputs) {
  const _inputs = inputs.filter(Boolean);
  if (_inputs.length === 0) {
    return defaults;
  }
  const merged = new Headers(defaults);
  for (const input of _inputs) {
    const entries = Array.isArray(input) ? input : typeof input.entries === "function" ? input.entries() : Object.entries(input);
    for (const [key, value] of entries) {
      if (value !== void 0) {
        merged.set(key, value);
      }
    }
  }
  return merged;
}

class H3Event {
  "__is_event__" = true;
  // Context
  node;
  // Node
  web;
  // Web
  context = {};
  // Shared
  // Request
  _method;
  _path;
  _headers;
  _requestBody;
  // Response
  _handled = false;
  // Hooks
  _onBeforeResponseCalled;
  _onAfterResponseCalled;
  constructor(req, res) {
    this.node = { req, res };
  }
  // --- Request ---
  get method() {
    if (!this._method) {
      this._method = (this.node.req.method || "GET").toUpperCase();
    }
    return this._method;
  }
  get path() {
    return this._path || this.node.req.url || "/";
  }
  get headers() {
    if (!this._headers) {
      this._headers = _normalizeNodeHeaders(this.node.req.headers);
    }
    return this._headers;
  }
  // --- Respoonse ---
  get handled() {
    return this._handled || this.node.res.writableEnded || this.node.res.headersSent;
  }
  respondWith(response) {
    return Promise.resolve(response).then(
      (_response) => sendWebResponse(this, _response)
    );
  }
  // --- Utils ---
  toString() {
    return `[${this.method}] ${this.path}`;
  }
  toJSON() {
    return this.toString();
  }
  // --- Deprecated ---
  /** @deprecated Please use `event.node.req` instead. */
  get req() {
    return this.node.req;
  }
  /** @deprecated Please use `event.node.res` instead. */
  get res() {
    return this.node.res;
  }
}
function isEvent(input) {
  return hasProp(input, "__is_event__");
}
function createEvent(req, res) {
  return new H3Event(req, res);
}
function _normalizeNodeHeaders(nodeHeaders) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(nodeHeaders)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(name, item);
      }
    } else if (value) {
      headers.set(name, value);
    }
  }
  return headers;
}

function defineEventHandler(handler) {
  if (typeof handler === "function") {
    handler.__is_handler__ = true;
    return handler;
  }
  const _hooks = {
    onRequest: _normalizeArray(handler.onRequest),
    onBeforeResponse: _normalizeArray(handler.onBeforeResponse)
  };
  const _handler = (event) => {
    return _callHandler(event, handler.handler, _hooks);
  };
  _handler.__is_handler__ = true;
  _handler.__resolve__ = handler.handler.__resolve__;
  _handler.__websocket__ = handler.websocket;
  return _handler;
}
function _normalizeArray(input) {
  return input ? Array.isArray(input) ? input : [input] : void 0;
}
async function _callHandler(event, handler, hooks) {
  if (hooks.onRequest) {
    for (const hook of hooks.onRequest) {
      await hook(event);
      if (event.handled) {
        return;
      }
    }
  }
  const body = await handler(event);
  const response = { body };
  if (hooks.onBeforeResponse) {
    for (const hook of hooks.onBeforeResponse) {
      await hook(event, response);
    }
  }
  return response.body;
}
const eventHandler = defineEventHandler;
function isEventHandler(input) {
  return hasProp(input, "__is_handler__");
}
function toEventHandler(input, _, _route) {
  return input;
}
function defineLazyEventHandler(factory) {
  let _promise;
  let _resolved;
  const resolveHandler = () => {
    if (_resolved) {
      return Promise.resolve(_resolved);
    }
    if (!_promise) {
      _promise = Promise.resolve(factory()).then((r) => {
        const handler2 = r.default || r;
        if (typeof handler2 !== "function") {
          throw new TypeError(
            "Invalid lazy handler result. It should be a function:",
            handler2
          );
        }
        _resolved = { handler: toEventHandler(r.default || r) };
        return _resolved;
      });
    }
    return _promise;
  };
  const handler = eventHandler((event) => {
    if (_resolved) {
      return _resolved.handler(event);
    }
    return resolveHandler().then((r) => r.handler(event));
  });
  handler.__resolve__ = resolveHandler;
  return handler;
}
const lazyEventHandler = defineLazyEventHandler;

function createApp(options = {}) {
  const stack = [];
  const handler = createAppEventHandler(stack, options);
  const resolve = createResolver(stack);
  handler.__resolve__ = resolve;
  const getWebsocket = cachedFn(() => websocketOptions(resolve, options));
  const app = {
    // @ts-expect-error
    use: (arg1, arg2, arg3) => use(app, arg1, arg2, arg3),
    resolve,
    handler,
    stack,
    options,
    get websocket() {
      return getWebsocket();
    }
  };
  return app;
}
function use(app, arg1, arg2, arg3) {
  if (Array.isArray(arg1)) {
    for (const i of arg1) {
      use(app, i, arg2, arg3);
    }
  } else if (Array.isArray(arg2)) {
    for (const i of arg2) {
      use(app, arg1, i, arg3);
    }
  } else if (typeof arg1 === "string") {
    app.stack.push(
      normalizeLayer({ ...arg3, route: arg1, handler: arg2 })
    );
  } else if (typeof arg1 === "function") {
    app.stack.push(normalizeLayer({ ...arg2, handler: arg1 }));
  } else {
    app.stack.push(normalizeLayer({ ...arg1 }));
  }
  return app;
}
function createAppEventHandler(stack, options) {
  const spacing = options.debug ? 2 : void 0;
  return eventHandler(async (event) => {
    event.node.req.originalUrl = event.node.req.originalUrl || event.node.req.url || "/";
    const _rawReqUrl = event.node.req.url || "/";
    const _reqPath = _decodePath(event._path || _rawReqUrl);
    event._path = _reqPath;
    const _needsRawUrl = _reqPath !== _rawReqUrl;
    let _layerPath;
    if (options.onRequest) {
      await options.onRequest(event);
    }
    for (const layer of stack) {
      if (layer.route.length > 1) {
        if (!_reqPath.startsWith(layer.route)) {
          continue;
        }
        _layerPath = _reqPath.slice(layer.route.length) || "/";
      } else {
        _layerPath = _reqPath;
      }
      if (layer.match && !layer.match(_layerPath, event)) {
        continue;
      }
      event._path = _layerPath;
      event.node.req.url = _needsRawUrl ? layer.route.length > 1 ? _rawReqUrl.slice(layer.route.length) || "/" : _rawReqUrl : _layerPath;
      const val = await layer.handler(event);
      const _body = val === void 0 ? void 0 : await val;
      if (_body !== void 0) {
        const _response = { body: _body };
        if (options.onBeforeResponse) {
          event._onBeforeResponseCalled = true;
          await options.onBeforeResponse(event, _response);
        }
        await handleHandlerResponse(event, _response.body, spacing);
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, _response);
        }
        return;
      }
      if (event.handled) {
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, void 0);
        }
        return;
      }
    }
    if (!event.handled) {
      throw createError$2({
        statusCode: 404,
        statusMessage: `Cannot find any path matching ${event.path || "/"}.`
      });
    }
    if (options.onAfterResponse) {
      event._onAfterResponseCalled = true;
      await options.onAfterResponse(event, void 0);
    }
  });
}
function createResolver(stack) {
  return async (path) => {
    let _layerPath;
    for (const layer of stack) {
      if (layer.route === "/" && !layer.handler.__resolve__) {
        continue;
      }
      if (!path.startsWith(layer.route)) {
        continue;
      }
      _layerPath = path.slice(layer.route.length) || "/";
      if (layer.match && !layer.match(_layerPath, void 0)) {
        continue;
      }
      let res = { route: layer.route, handler: layer.handler };
      if (res.handler.__resolve__) {
        const _res = await res.handler.__resolve__(_layerPath);
        if (!_res) {
          continue;
        }
        res = {
          ...res,
          ..._res,
          route: joinURL(res.route || "/", _res.route || "/")
        };
      }
      return res;
    }
  };
}
function normalizeLayer(input) {
  let handler = input.handler;
  if (handler.handler) {
    handler = handler.handler;
  }
  if (input.lazy) {
    handler = lazyEventHandler(handler);
  } else if (!isEventHandler(handler)) {
    handler = toEventHandler(handler, void 0, input.route);
  }
  return {
    route: withoutTrailingSlash(input.route),
    match: input.match,
    handler
  };
}
function handleHandlerResponse(event, val, jsonSpace) {
  if (val === null) {
    return sendNoContent(event);
  }
  if (val) {
    if (isWebResponse(val)) {
      return sendWebResponse(event, val);
    }
    if (isStream(val)) {
      return sendStream(event, val);
    }
    if (val.buffer) {
      return send$1(event, val);
    }
    if (val.arrayBuffer && typeof val.arrayBuffer === "function") {
      return val.arrayBuffer().then((arrayBuffer) => {
        return send$1(event, Buffer.from(arrayBuffer), val.type);
      });
    }
    if (val instanceof Error) {
      throw createError$2(val);
    }
    if (typeof val.end === "function") {
      return true;
    }
  }
  const valType = typeof val;
  if (valType === "string") {
    return send$1(event, val, MIMES.html);
  }
  if (valType === "object" || valType === "boolean" || valType === "number") {
    return send$1(event, JSON.stringify(val, void 0, jsonSpace), MIMES.json);
  }
  if (valType === "bigint") {
    return send$1(event, val.toString(), MIMES.json);
  }
  throw createError$2({
    statusCode: 500,
    statusMessage: `[h3] Cannot send ${valType} as response.`
  });
}
function cachedFn(fn) {
  let cache;
  return () => {
    if (!cache) {
      cache = fn();
    }
    return cache;
  };
}
function _decodePath(url) {
  const qIndex = url.indexOf("?");
  const path = qIndex === -1 ? url : url.slice(0, qIndex);
  const query = qIndex === -1 ? "" : url.slice(qIndex);
  const decodedPath = path.includes("%25") ? decodePath(path.replace(/%25/g, "%2525")) : decodePath(path);
  return decodedPath + query;
}
function websocketOptions(evResolver, appOptions) {
  return {
    ...appOptions.websocket,
    async resolve(info) {
      const url = info.request?.url || info.url || "/";
      const { pathname } = typeof url === "string" ? parseURL(url) : url;
      const resolved = await evResolver(pathname);
      return resolved?.handler?.__websocket__ || {};
    }
  };
}

const RouterMethods = [
  "connect",
  "delete",
  "get",
  "head",
  "options",
  "post",
  "put",
  "trace",
  "patch"
];
function createRouter(opts = {}) {
  const _router = createRouter$1({});
  const routes = {};
  let _matcher;
  const router = {};
  const addRoute = (path, handler, method) => {
    let route = routes[path];
    if (!route) {
      routes[path] = route = { path, handlers: {} };
      _router.insert(path, route);
    }
    if (Array.isArray(method)) {
      for (const m of method) {
        addRoute(path, handler, m);
      }
    } else {
      route.handlers[method] = toEventHandler(handler);
    }
    return router;
  };
  router.use = router.add = (path, handler, method) => addRoute(path, handler, method || "all");
  for (const method of RouterMethods) {
    router[method] = (path, handle) => router.add(path, handle, method);
  }
  const matchHandler = (path = "/", method = "get") => {
    const qIndex = path.indexOf("?");
    if (qIndex !== -1) {
      path = path.slice(0, Math.max(0, qIndex));
    }
    const matched = _router.lookup(path);
    if (!matched || !matched.handlers) {
      return {
        error: createError$2({
          statusCode: 404,
          name: "Not Found",
          statusMessage: `Cannot find any route matching ${path || "/"}.`
        })
      };
    }
    let handler = matched.handlers[method] || matched.handlers.all;
    if (!handler) {
      if (!_matcher) {
        _matcher = toRouteMatcher(_router);
      }
      const _matches = _matcher.matchAll(path).reverse();
      for (const _match of _matches) {
        if (_match.handlers[method]) {
          handler = _match.handlers[method];
          matched.handlers[method] = matched.handlers[method] || handler;
          break;
        }
        if (_match.handlers.all) {
          handler = _match.handlers.all;
          matched.handlers.all = matched.handlers.all || handler;
          break;
        }
      }
    }
    if (!handler) {
      return {
        error: createError$2({
          statusCode: 405,
          name: "Method Not Allowed",
          statusMessage: `Method ${method} is not allowed on this route.`
        })
      };
    }
    return { matched, handler };
  };
  const isPreemptive = opts.preemptive || opts.preemtive;
  router.handler = eventHandler((event) => {
    const match = matchHandler(
      event.path,
      event.method.toLowerCase()
    );
    if ("error" in match) {
      if (isPreemptive) {
        throw match.error;
      } else {
        return;
      }
    }
    event.context.matchedRoute = match.matched;
    const params = match.matched.params || {};
    event.context.params = params;
    return Promise.resolve(match.handler(event)).then((res) => {
      if (res === void 0 && isPreemptive) {
        return null;
      }
      return res;
    });
  });
  router.handler.__resolve__ = async (path) => {
    path = withLeadingSlash(path);
    const match = matchHandler(path);
    if ("error" in match) {
      return;
    }
    let res = {
      route: match.matched.path,
      handler: match.handler
    };
    if (match.handler.__resolve__) {
      const _res = await match.handler.__resolve__(path);
      if (!_res) {
        return;
      }
      res = { ...res, ..._res };
    }
    return res;
  };
  return router;
}
function toNodeListener(app) {
  const toNodeHandle = async function(req, res) {
    const event = createEvent(req, res);
    try {
      await app.handler(event);
    } catch (_error) {
      const error = createError$2(_error);
      if (!isError(_error)) {
        error.unhandled = true;
      }
      setResponseStatus(event, error.statusCode, error.statusMessage);
      if (app.options.onError) {
        await app.options.onError(error, event);
      }
      if (event.handled) {
        return;
      }
      if (error.unhandled || error.fatal) {
        console.error("[h3]", error.fatal ? "[fatal]" : "[unhandled]", error);
      }
      if (app.options.onBeforeResponse && !event._onBeforeResponseCalled) {
        await app.options.onBeforeResponse(event, { body: error });
      }
      await sendError(event, error, !!app.options.debug);
      if (app.options.onAfterResponse && !event._onAfterResponseCalled) {
        await app.options.onAfterResponse(event, { body: error });
      }
    }
  };
  return toNodeHandle;
}

function flatHooks(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
const defaultTask = { run: (function_) => function_() };
const _createTask = () => defaultTask;
const createTask = typeof console.createTask !== "undefined" ? console.createTask : _createTask;
function serialTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return hooks.reduce(
    (promise, hookFunction) => promise.then(() => task.run(() => hookFunction(...args))),
    Promise.resolve()
  );
}
function parallelTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
}
function callEachWith(callbacks, arg0) {
  for (const callback of [...callbacks]) {
    callback(arg0);
  }
}

class Hookable {
  constructor() {
    this._hooks = {};
    this._before = void 0;
    this._after = void 0;
    this._deprecatedMessages = void 0;
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, function_, options = {}) {
    if (!name || typeof function_ !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let dep;
    while (this._deprecatedHooks[name]) {
      dep = this._deprecatedHooks[name];
      name = dep.to;
    }
    if (dep && !options.allowDeprecated) {
      let message = dep.message;
      if (!message) {
        message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
      }
      if (!this._deprecatedMessages) {
        this._deprecatedMessages = /* @__PURE__ */ new Set();
      }
      if (!this._deprecatedMessages.has(message)) {
        console.warn(message);
        this._deprecatedMessages.add(message);
      }
    }
    if (!function_.name) {
      try {
        Object.defineProperty(function_, "name", {
          get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
          configurable: true
        });
      } catch {
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(function_);
    return () => {
      if (function_) {
        this.removeHook(name, function_);
        function_ = void 0;
      }
    };
  }
  hookOnce(name, function_) {
    let _unreg;
    let _function = (...arguments_) => {
      if (typeof _unreg === "function") {
        _unreg();
      }
      _unreg = void 0;
      _function = void 0;
      return function_(...arguments_);
    };
    _unreg = this.hook(name, _function);
    return _unreg;
  }
  removeHook(name, function_) {
    if (this._hooks[name]) {
      const index = this._hooks[name].indexOf(function_);
      if (index !== -1) {
        this._hooks[name].splice(index, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
    const _hooks = this._hooks[name] || [];
    delete this._hooks[name];
    for (const hook of _hooks) {
      this.hook(name, hook);
    }
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
    for (const name in deprecatedHooks) {
      this.deprecateHook(name, deprecatedHooks[name]);
    }
  }
  addHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    const removeFns = Object.keys(hooks).map(
      (key) => this.hook(key, hooks[key])
    );
    return () => {
      for (const unreg of removeFns.splice(0, removeFns.length)) {
        unreg();
      }
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  removeAllHooks() {
    for (const key in this._hooks) {
      delete this._hooks[key];
    }
  }
  callHook(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(serialTaskCaller, name, ...arguments_);
  }
  callHookParallel(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(parallelTaskCaller, name, ...arguments_);
  }
  callHookWith(caller, name, ...arguments_) {
    const event = this._before || this._after ? { name, args: arguments_, context: {} } : void 0;
    if (this._before) {
      callEachWith(this._before, event);
    }
    const result = caller(
      name in this._hooks ? [...this._hooks[name]] : [],
      arguments_
    );
    if (result instanceof Promise) {
      return result.finally(() => {
        if (this._after && event) {
          callEachWith(this._after, event);
        }
      });
    }
    if (this._after && event) {
      callEachWith(this._after, event);
    }
    return result;
  }
  beforeEach(function_) {
    this._before = this._before || [];
    this._before.push(function_);
    return () => {
      if (this._before !== void 0) {
        const index = this._before.indexOf(function_);
        if (index !== -1) {
          this._before.splice(index, 1);
        }
      }
    };
  }
  afterEach(function_) {
    this._after = this._after || [];
    this._after.push(function_);
    return () => {
      if (this._after !== void 0) {
        const index = this._after.indexOf(function_);
        if (index !== -1) {
          this._after.splice(index, 1);
        }
      }
    };
  }
}
function createHooks() {
  return new Hookable();
}

const s$1=globalThis.Headers,i$1=globalThis.AbortController,l=globalThis.fetch||(()=>{throw new Error("[node-fetch-native] Failed to fetch: `globalThis.fetch` is not available!")});

class FetchError extends Error {
  constructor(message, opts) {
    super(message, opts);
    this.name = "FetchError";
    if (opts?.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
}
function createFetchError(ctx) {
  const errorMessage = ctx.error?.message || ctx.error?.toString() || "";
  const method = ctx.request?.method || ctx.options?.method || "GET";
  const url = ctx.request?.url || String(ctx.request) || "/";
  const requestStr = `[${method}] ${JSON.stringify(url)}`;
  const statusStr = ctx.response ? `${ctx.response.status} ${ctx.response.statusText}` : "<no response>";
  const message = `${requestStr}: ${statusStr}${errorMessage ? ` ${errorMessage}` : ""}`;
  const fetchError = new FetchError(
    message,
    ctx.error ? { cause: ctx.error } : void 0
  );
  for (const key of ["request", "options", "response"]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx[key];
      }
    });
  }
  for (const [key, refKey] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx.response && ctx.response[refKey];
      }
    });
  }
  return fetchError;
}

const payloadMethods = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
  if (value === void 0) {
    return false;
  }
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  if (value.buffer) {
    return false;
  }
  if (value instanceof FormData || value instanceof URLSearchParams) {
    return false;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (contentType === "text/event-stream") {
    return "stream";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
function resolveFetchOptions(request, input, defaults, Headers) {
  const headers = mergeHeaders(
    input?.headers ?? request?.headers,
    defaults?.headers,
    Headers
  );
  let query;
  if (defaults?.query || defaults?.params || input?.params || input?.query) {
    query = {
      ...defaults?.params,
      ...defaults?.query,
      ...input?.params,
      ...input?.query
    };
  }
  return {
    ...defaults,
    ...input,
    query,
    params: query,
    headers
  };
}
function mergeHeaders(input, defaults, Headers) {
  if (!defaults) {
    return new Headers(input);
  }
  const headers = new Headers(defaults);
  if (input) {
    for (const [key, value] of Symbol.iterator in input || Array.isArray(input) ? input : new Headers(input)) {
      headers.set(key, value);
    }
  }
  return headers;
}
async function callHooks(context, hooks) {
  if (hooks) {
    if (Array.isArray(hooks)) {
      for (const hook of hooks) {
        await hook(context);
      }
    } else {
      await hooks(context);
    }
  }
}

const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early (Experimental)
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  // Gateway Timeout
]);
const nullBodyResponses = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createFetch(globalOptions = {}) {
  const {
    fetch = globalThis.fetch,
    Headers = globalThis.Headers,
    AbortController = globalThis.AbortController
  } = globalOptions;
  async function onError(context) {
    const isAbort = context.error && context.error.name === "AbortError" && !context.options.timeout || false;
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }
      const responseCode = context.response && context.response.status || 500;
      if (retries > 0 && (Array.isArray(context.options.retryStatusCodes) ? context.options.retryStatusCodes.includes(responseCode) : retryStatusCodes.has(responseCode))) {
        const retryDelay = typeof context.options.retryDelay === "function" ? context.options.retryDelay(context) : context.options.retryDelay || 0;
        if (retryDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
        return $fetchRaw(context.request, {
          ...context.options,
          retry: retries - 1
        });
      }
    }
    const error = createFetchError(context);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, $fetchRaw);
    }
    throw error;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
    const context = {
      request: _request,
      options: resolveFetchOptions(
        _request,
        _options,
        globalOptions.defaults,
        Headers
      ),
      response: void 0,
      error: void 0
    };
    if (context.options.method) {
      context.options.method = context.options.method.toUpperCase();
    }
    if (context.options.onRequest) {
      await callHooks(context, context.options.onRequest);
      if (!(context.options.headers instanceof Headers)) {
        context.options.headers = new Headers(
          context.options.headers || {}
          /* compat */
        );
      }
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query) {
        context.request = withQuery(context.request, context.options.query);
        delete context.options.query;
      }
      if ("query" in context.options) {
        delete context.options.query;
      }
      if ("params" in context.options) {
        delete context.options.params;
      }
    }
    if (context.options.body && isPayloadMethod(context.options.method)) {
      if (isJSONSerializable(context.options.body)) {
        const contentType = context.options.headers.get("content-type");
        if (typeof context.options.body !== "string") {
          context.options.body = contentType === "application/x-www-form-urlencoded" ? new URLSearchParams(
            context.options.body
          ).toString() : JSON.stringify(context.options.body);
        }
        if (!contentType) {
          context.options.headers.set("content-type", "application/json");
        }
        if (!context.options.headers.has("accept")) {
          context.options.headers.set("accept", "application/json");
        }
      } else if (
        // ReadableStream Body
        "pipeTo" in context.options.body && typeof context.options.body.pipeTo === "function" || // Node.js Stream Body
        typeof context.options.body.pipe === "function"
      ) {
        if (!("duplex" in context.options)) {
          context.options.duplex = "half";
        }
      }
    }
    let abortTimeout;
    if (!context.options.signal && context.options.timeout) {
      const controller = new AbortController();
      abortTimeout = setTimeout(() => {
        const error = new Error(
          "[TimeoutError]: The operation was aborted due to timeout"
        );
        error.name = "TimeoutError";
        error.code = 23;
        controller.abort(error);
      }, context.options.timeout);
      context.options.signal = controller.signal;
    }
    try {
      context.response = await fetch(
        context.request,
        context.options
      );
    } catch (error) {
      context.error = error;
      if (context.options.onRequestError) {
        await callHooks(
          context,
          context.options.onRequestError
        );
      }
      return await onError(context);
    } finally {
      if (abortTimeout) {
        clearTimeout(abortTimeout);
      }
    }
    const hasBody = (context.response.body || // https://github.com/unjs/ofetch/issues/324
    // https://github.com/unjs/ofetch/issues/294
    // https://github.com/JakeChampion/fetch/issues/1454
    context.response._bodyInit) && !nullBodyResponses.has(context.response.status) && context.options.method !== "HEAD";
    if (hasBody) {
      const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
      switch (responseType) {
        case "json": {
          const data = await context.response.text();
          const parseFunction = context.options.parseResponse || destr;
          context.response._data = parseFunction(data);
          break;
        }
        case "stream": {
          context.response._data = context.response.body || context.response._bodyInit;
          break;
        }
        default: {
          context.response._data = await context.response[responseType]();
        }
      }
    }
    if (context.options.onResponse) {
      await callHooks(
        context,
        context.options.onResponse
      );
    }
    if (!context.options.ignoreResponseError && context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await callHooks(
          context,
          context.options.onResponseError
        );
      }
      return await onError(context);
    }
    return context.response;
  };
  const $fetch = async function $fetch2(request, options) {
    const r = await $fetchRaw(request, options);
    return r._data;
  };
  $fetch.raw = $fetchRaw;
  $fetch.native = (...args) => fetch(...args);
  $fetch.create = (defaultOptions = {}, customGlobalOptions = {}) => createFetch({
    ...globalOptions,
    ...customGlobalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...customGlobalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch;
}

function createNodeFetch() {
  const useKeepAlive = JSON.parse(process.env.FETCH_KEEP_ALIVE || "false");
  if (!useKeepAlive) {
    return l;
  }
  const agentOptions = { keepAlive: true };
  const httpAgent = new http$2.Agent(agentOptions);
  const httpsAgent = new https.Agent(agentOptions);
  const nodeFetchOptions = {
    agent(parsedURL) {
      return parsedURL.protocol === "http:" ? httpAgent : httpsAgent;
    }
  };
  return function nodeFetchWithKeepAlive(input, init) {
    return l(input, { ...nodeFetchOptions, ...init });
  };
}
const fetch = globalThis.fetch ? (...args) => globalThis.fetch(...args) : createNodeFetch();
const Headers$1 = globalThis.Headers || s$1;
const AbortController = globalThis.AbortController || i$1;
const ofetch = createFetch({ fetch, Headers: Headers$1, AbortController });
const $fetch = ofetch;

function wrapToPromise(value) {
  if (!value || typeof value.then !== "function") {
    return Promise.resolve(value);
  }
  return value;
}
function asyncCall(function_, ...arguments_) {
  try {
    return wrapToPromise(function_(...arguments_));
  } catch (error) {
    return Promise.reject(error);
  }
}
function isPrimitive(value) {
  const type = typeof value;
  return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
  const proto = Object.getPrototypeOf(value);
  return !proto || proto.isPrototypeOf(Object);
}
function stringify$1(value) {
  if (isPrimitive(value)) {
    return String(value);
  }
  if (isPureObject(value) || Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (typeof value.toJSON === "function") {
    return stringify$1(value.toJSON());
  }
  throw new Error("[unstorage] Cannot stringify value!");
}
const BASE64_PREFIX = "base64:";
function serializeRaw(value) {
  if (typeof value === "string") {
    return value;
  }
  return BASE64_PREFIX + base64Encode(value);
}
function deserializeRaw(value) {
  if (typeof value !== "string") {
    return value;
  }
  if (!value.startsWith(BASE64_PREFIX)) {
    return value;
  }
  return base64Decode(value.slice(BASE64_PREFIX.length));
}
function base64Decode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input, "base64");
  }
  return Uint8Array.from(
    globalThis.atob(input),
    (c) => c.codePointAt(0)
  );
}
function base64Encode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input).toString("base64");
  }
  return globalThis.btoa(String.fromCodePoint(...input));
}

const storageKeyProperties = [
  "has",
  "hasItem",
  "get",
  "getItem",
  "getItemRaw",
  "set",
  "setItem",
  "setItemRaw",
  "del",
  "remove",
  "removeItem",
  "getMeta",
  "setMeta",
  "removeMeta",
  "getKeys",
  "clear",
  "mount",
  "unmount"
];
function prefixStorage(storage, base) {
  base = normalizeBaseKey(base);
  if (!base) {
    return storage;
  }
  const nsStorage = { ...storage };
  for (const property of storageKeyProperties) {
    nsStorage[property] = (key = "", ...args) => (
      // @ts-ignore
      storage[property](base + key, ...args)
    );
  }
  nsStorage.getKeys = (key = "", ...arguments_) => storage.getKeys(base + key, ...arguments_).then((keys) => keys.map((key2) => key2.slice(base.length)));
  nsStorage.keys = nsStorage.getKeys;
  nsStorage.getItems = async (items, commonOptions) => {
    const prefixedItems = items.map(
      (item) => typeof item === "string" ? base + item : { ...item, key: base + item.key }
    );
    const results = await storage.getItems(prefixedItems, commonOptions);
    return results.map((entry) => ({
      key: entry.key.slice(base.length),
      value: entry.value
    }));
  };
  nsStorage.setItems = async (items, commonOptions) => {
    const prefixedItems = items.map((item) => ({
      key: base + item.key,
      value: item.value,
      options: item.options
    }));
    return storage.setItems(prefixedItems, commonOptions);
  };
  return nsStorage;
}
function normalizeKey$1(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
}
function joinKeys(...keys) {
  return normalizeKey$1(keys.join(":"));
}
function normalizeBaseKey(base) {
  base = normalizeKey$1(base);
  return base ? base + ":" : "";
}
function filterKeyByDepth(key, depth) {
  if (depth === void 0) {
    return true;
  }
  let substrCount = 0;
  let index = key.indexOf(":");
  while (index > -1) {
    substrCount++;
    index = key.indexOf(":", index + 1);
  }
  return substrCount <= depth;
}
function filterKeyByBase(key, base) {
  if (base) {
    return key.startsWith(base) && key[key.length - 1] !== "$";
  }
  return key[key.length - 1] !== "$";
}

function defineDriver$1(factory) {
  return factory;
}

const DRIVER_NAME$1 = "memory";
const memory = defineDriver$1(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME$1,
    getInstance: () => data,
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) ?? null;
    },
    getItemRaw(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return [...data.keys()];
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});

function createStorage(options = {}) {
  const context = {
    mounts: { "": options.driver || memory() },
    mountpoints: [""],
    watching: false,
    watchListeners: [],
    unwatch: {}
  };
  const getMount = (key) => {
    for (const base of context.mountpoints) {
      if (key.startsWith(base)) {
        return {
          base,
          relativeKey: key.slice(base.length),
          driver: context.mounts[base]
        };
      }
    }
    return {
      base: "",
      relativeKey: key,
      driver: context.mounts[""]
    };
  };
  const getMounts = (base, includeParent) => {
    return context.mountpoints.filter(
      (mountpoint) => mountpoint.startsWith(base) || includeParent && base.startsWith(mountpoint)
    ).map((mountpoint) => ({
      relativeBase: base.length > mountpoint.length ? base.slice(mountpoint.length) : void 0,
      mountpoint,
      driver: context.mounts[mountpoint]
    }));
  };
  const onChange = (event, key) => {
    if (!context.watching) {
      return;
    }
    key = normalizeKey$1(key);
    for (const listener of context.watchListeners) {
      listener(event, key);
    }
  };
  const startWatch = async () => {
    if (context.watching) {
      return;
    }
    context.watching = true;
    for (const mountpoint in context.mounts) {
      context.unwatch[mountpoint] = await watch(
        context.mounts[mountpoint],
        onChange,
        mountpoint
      );
    }
  };
  const stopWatch = async () => {
    if (!context.watching) {
      return;
    }
    for (const mountpoint in context.unwatch) {
      await context.unwatch[mountpoint]();
    }
    context.unwatch = {};
    context.watching = false;
  };
  const runBatch = (items, commonOptions, cb) => {
    const batches = /* @__PURE__ */ new Map();
    const getBatch = (mount) => {
      let batch = batches.get(mount.base);
      if (!batch) {
        batch = {
          driver: mount.driver,
          base: mount.base,
          items: []
        };
        batches.set(mount.base, batch);
      }
      return batch;
    };
    for (const item of items) {
      const isStringItem = typeof item === "string";
      const key = normalizeKey$1(isStringItem ? item : item.key);
      const value = isStringItem ? void 0 : item.value;
      const options2 = isStringItem || !item.options ? commonOptions : { ...commonOptions, ...item.options };
      const mount = getMount(key);
      getBatch(mount).items.push({
        key,
        value,
        relativeKey: mount.relativeKey,
        options: options2
      });
    }
    return Promise.all([...batches.values()].map((batch) => cb(batch))).then(
      (r) => r.flat()
    );
  };
  const storage = {
    // Item
    hasItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.hasItem, relativeKey, opts);
    },
    getItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => destr(value)
      );
    },
    getItems(items, commonOptions = {}) {
      return runBatch(items, commonOptions, (batch) => {
        if (batch.driver.getItems) {
          return asyncCall(
            batch.driver.getItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              options: item.options
            })),
            commonOptions
          ).then(
            (r) => r.map((item) => ({
              key: joinKeys(batch.base, item.key),
              value: destr(item.value)
            }))
          );
        }
        return Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.getItem,
              item.relativeKey,
              item.options
            ).then((value) => ({
              key: item.key,
              value: destr(value)
            }));
          })
        );
      });
    },
    getItemRaw(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.getItemRaw) {
        return asyncCall(driver.getItemRaw, relativeKey, opts);
      }
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => deserializeRaw(value)
      );
    },
    async setItem(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.setItem) {
        return;
      }
      await asyncCall(driver.setItem, relativeKey, stringify$1(value), opts);
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async setItems(items, commonOptions) {
      await runBatch(items, commonOptions, async (batch) => {
        if (batch.driver.setItems) {
          return asyncCall(
            batch.driver.setItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              value: stringify$1(item.value),
              options: item.options
            })),
            commonOptions
          );
        }
        if (!batch.driver.setItem) {
          return;
        }
        await Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.setItem,
              item.relativeKey,
              stringify$1(item.value),
              item.options
            );
          })
        );
      });
    },
    async setItemRaw(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key, opts);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.setItemRaw) {
        await asyncCall(driver.setItemRaw, relativeKey, value, opts);
      } else if (driver.setItem) {
        await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
      } else {
        return;
      }
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async removeItem(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { removeMeta: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.removeItem) {
        return;
      }
      await asyncCall(driver.removeItem, relativeKey, opts);
      if (opts.removeMeta || opts.removeMata) {
        await asyncCall(driver.removeItem, relativeKey + "$", opts);
      }
      if (!driver.watch) {
        onChange("remove", key);
      }
    },
    // Meta
    async getMeta(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { nativeOnly: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      const meta = /* @__PURE__ */ Object.create(null);
      if (driver.getMeta) {
        Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
      }
      if (!opts.nativeOnly) {
        const value = await asyncCall(
          driver.getItem,
          relativeKey + "$",
          opts
        ).then((value_) => destr(value_));
        if (value && typeof value === "object") {
          if (typeof value.atime === "string") {
            value.atime = new Date(value.atime);
          }
          if (typeof value.mtime === "string") {
            value.mtime = new Date(value.mtime);
          }
          Object.assign(meta, value);
        }
      }
      return meta;
    },
    setMeta(key, value, opts = {}) {
      return this.setItem(key + "$", value, opts);
    },
    removeMeta(key, opts = {}) {
      return this.removeItem(key + "$", opts);
    },
    // Keys
    async getKeys(base, opts = {}) {
      base = normalizeBaseKey(base);
      const mounts = getMounts(base, true);
      let maskedMounts = [];
      const allKeys = [];
      let allMountsSupportMaxDepth = true;
      for (const mount of mounts) {
        if (!mount.driver.flags?.maxDepth) {
          allMountsSupportMaxDepth = false;
        }
        const rawKeys = await asyncCall(
          mount.driver.getKeys,
          mount.relativeBase,
          opts
        );
        for (const key of rawKeys) {
          const fullKey = mount.mountpoint + normalizeKey$1(key);
          if (!maskedMounts.some((p) => fullKey.startsWith(p))) {
            allKeys.push(fullKey);
          }
        }
        maskedMounts = [
          mount.mountpoint,
          ...maskedMounts.filter((p) => !p.startsWith(mount.mountpoint))
        ];
      }
      const shouldFilterByDepth = opts.maxDepth !== void 0 && !allMountsSupportMaxDepth;
      return allKeys.filter(
        (key) => (!shouldFilterByDepth || filterKeyByDepth(key, opts.maxDepth)) && filterKeyByBase(key, base)
      );
    },
    // Utils
    async clear(base, opts = {}) {
      base = normalizeBaseKey(base);
      await Promise.all(
        getMounts(base, false).map(async (m) => {
          if (m.driver.clear) {
            return asyncCall(m.driver.clear, m.relativeBase, opts);
          }
          if (m.driver.removeItem) {
            const keys = await m.driver.getKeys(m.relativeBase || "", opts);
            return Promise.all(
              keys.map((key) => m.driver.removeItem(key, opts))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(context.mounts).map((driver) => dispose(driver))
      );
    },
    async watch(callback) {
      await startWatch();
      context.watchListeners.push(callback);
      return async () => {
        context.watchListeners = context.watchListeners.filter(
          (listener) => listener !== callback
        );
        if (context.watchListeners.length === 0) {
          await stopWatch();
        }
      };
    },
    async unwatch() {
      context.watchListeners = [];
      await stopWatch();
    },
    // Mount
    mount(base, driver) {
      base = normalizeBaseKey(base);
      if (base && context.mounts[base]) {
        throw new Error(`already mounted at ${base}`);
      }
      if (base) {
        context.mountpoints.push(base);
        context.mountpoints.sort((a, b) => b.length - a.length);
      }
      context.mounts[base] = driver;
      if (context.watching) {
        Promise.resolve(watch(driver, onChange, base)).then((unwatcher) => {
          context.unwatch[base] = unwatcher;
        }).catch(console.error);
      }
      return storage;
    },
    async unmount(base, _dispose = true) {
      base = normalizeBaseKey(base);
      if (!base || !context.mounts[base]) {
        return;
      }
      if (context.watching && base in context.unwatch) {
        context.unwatch[base]?.();
        delete context.unwatch[base];
      }
      if (_dispose) {
        await dispose(context.mounts[base]);
      }
      context.mountpoints = context.mountpoints.filter((key) => key !== base);
      delete context.mounts[base];
    },
    getMount(key = "") {
      key = normalizeKey$1(key) + ":";
      const m = getMount(key);
      return {
        driver: m.driver,
        base: m.base
      };
    },
    getMounts(base = "", opts = {}) {
      base = normalizeKey$1(base);
      const mounts = getMounts(base, opts.parents);
      return mounts.map((m) => ({
        driver: m.driver,
        base: m.mountpoint
      }));
    },
    // Aliases
    keys: (base, opts = {}) => storage.getKeys(base, opts),
    get: (key, opts = {}) => storage.getItem(key, opts),
    set: (key, value, opts = {}) => storage.setItem(key, value, opts),
    has: (key, opts = {}) => storage.hasItem(key, opts),
    del: (key, opts = {}) => storage.removeItem(key, opts),
    remove: (key, opts = {}) => storage.removeItem(key, opts)
  };
  return storage;
}
function watch(driver, onChange, base) {
  return driver.watch ? driver.watch((event, key) => onChange(event, base + key)) : () => {
  };
}
async function dispose(driver) {
  if (typeof driver.dispose === "function") {
    await asyncCall(driver.dispose);
  }
}

const _assets = {

};

const normalizeKey = function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
};

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

function defineDriver(factory) {
  return factory;
}
function createError$1(driver, message, opts) {
  const err = new Error(`[unstorage] [${driver}] ${message}`, opts);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(err, createError$1);
  }
  return err;
}
function createRequiredError(driver, name) {
  if (Array.isArray(name)) {
    return createError$1(
      driver,
      `Missing some of the required options ${name.map((n) => "`" + n + "`").join(", ")}`
    );
  }
  return createError$1(driver, `Missing required option \`${name}\`.`);
}

function ignoreNotfound(err) {
  return err.code === "ENOENT" || err.code === "EISDIR" ? null : err;
}
function ignoreExists(err) {
  return err.code === "EEXIST" ? null : err;
}
async function writeFile(path, data, encoding) {
  await ensuredir(dirname$2(path));
  return promises.writeFile(path, data, encoding);
}
function readFile(path, encoding) {
  return promises.readFile(path, encoding).catch(ignoreNotfound);
}
function unlink(path) {
  return promises.unlink(path).catch(ignoreNotfound);
}
function readdir(dir) {
  return promises.readdir(dir, { withFileTypes: true }).catch(ignoreNotfound).then((r) => r || []);
}
async function ensuredir(dir) {
  if (existsSync(dir)) {
    return;
  }
  await ensuredir(dirname$2(dir)).catch(ignoreExists);
  await promises.mkdir(dir).catch(ignoreExists);
}
async function readdirRecursive(dir, ignore, maxDepth) {
  if (ignore && ignore(dir)) {
    return [];
  }
  const entries = await readdir(dir);
  const files = [];
  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = resolve$3(dir, entry.name);
      if (entry.isDirectory()) {
        if (maxDepth === void 0 || maxDepth > 0) {
          const dirFiles = await readdirRecursive(
            entryPath,
            ignore,
            maxDepth === void 0 ? void 0 : maxDepth - 1
          );
          files.push(...dirFiles.map((f) => entry.name + "/" + f));
        }
      } else {
        if (!(ignore && ignore(entry.name))) {
          files.push(entry.name);
        }
      }
    })
  );
  return files;
}
async function rmRecursive(dir) {
  const entries = await readdir(dir);
  await Promise.all(
    entries.map((entry) => {
      const entryPath = resolve$3(dir, entry.name);
      if (entry.isDirectory()) {
        return rmRecursive(entryPath).then(() => promises.rmdir(entryPath));
      } else {
        return promises.unlink(entryPath);
      }
    })
  );
}

const PATH_TRAVERSE_RE = /\.\.:|\.\.$/;
const DRIVER_NAME = "fs-lite";
const unstorage_47drivers_47fs_45lite = defineDriver((opts = {}) => {
  if (!opts.base) {
    throw createRequiredError(DRIVER_NAME, "base");
  }
  opts.base = resolve$3(opts.base);
  const r = (key) => {
    if (PATH_TRAVERSE_RE.test(key)) {
      throw createError$1(
        DRIVER_NAME,
        `Invalid key: ${JSON.stringify(key)}. It should not contain .. segments`
      );
    }
    const resolved = join$1(opts.base, key.replace(/:/g, "/"));
    return resolved;
  };
  return {
    name: DRIVER_NAME,
    options: opts,
    flags: {
      maxDepth: true
    },
    hasItem(key) {
      return existsSync(r(key));
    },
    getItem(key) {
      return readFile(r(key), "utf8");
    },
    getItemRaw(key) {
      return readFile(r(key));
    },
    async getMeta(key) {
      const { atime, mtime, size, birthtime, ctime } = await promises.stat(r(key)).catch(() => ({}));
      return { atime, mtime, size, birthtime, ctime };
    },
    setItem(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value, "utf8");
    },
    setItemRaw(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value);
    },
    removeItem(key) {
      if (opts.readOnly) {
        return;
      }
      return unlink(r(key));
    },
    getKeys(_base, topts) {
      return readdirRecursive(r("."), opts.ignore, topts?.maxDepth);
    },
    async clear() {
      if (opts.readOnly || opts.noClear) {
        return;
      }
      await rmRecursive(r("."));
    }
  };
});

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('data', unstorage_47drivers_47fs_45lite({"driver":"fsLite","base":"./.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const e=globalThis.process?.getBuiltinModule?.("crypto")?.hash,r="sha256",s="base64url";function digest(t){if(e)return e(r,t,s);const o=createHash(r).update(t);return globalThis.process?.versions?.webcontainer?o.digest().toString(s):o.digest(s)}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.waitUntil = incomingEvent.waitUntil;
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

function klona(x) {
	if (typeof x !== 'object') return x;

	var k, tmp, str=Object.prototype.toString.call(x);

	if (str === '[object Object]') {
		if (x.constructor !== Object && typeof x.constructor === 'function') {
			tmp = new x.constructor();
			for (k in x) {
				if (x.hasOwnProperty(k) && tmp[k] !== x[k]) {
					tmp[k] = klona(x[k]);
				}
			}
		} else {
			tmp = {}; // null
			for (k in x) {
				if (k === '__proto__') {
					Object.defineProperty(tmp, k, {
						value: klona(x[k]),
						configurable: true,
						enumerable: true,
						writable: true,
					});
				} else {
					tmp[k] = klona(x[k]);
				}
			}
		}
		return tmp;
	}

	if (str === '[object Array]') {
		k = x.length;
		for (tmp=Array(k); k--;) {
			tmp[k] = klona(x[k]);
		}
		return tmp;
	}

	if (str === '[object Set]') {
		tmp = new Set;
		x.forEach(function (val) {
			tmp.add(klona(val));
		});
		return tmp;
	}

	if (str === '[object Map]') {
		tmp = new Map;
		x.forEach(function (val, key) {
			tmp.set(klona(key), klona(val));
		});
		return tmp;
	}

	if (str === '[object Date]') {
		return new Date(+x);
	}

	if (str === '[object RegExp]') {
		tmp = new RegExp(x.source, x.flags);
		tmp.lastIndex = x.lastIndex;
		return tmp;
	}

	if (str === '[object DataView]') {
		return new x.constructor( klona(x.buffer) );
	}

	if (str === '[object ArrayBuffer]') {
		return x.slice(0);
	}

	// ArrayBuffer.isView(x)
	// ~> `new` bcuz `Buffer.slice` => ref
	if (str.slice(-6) === 'Array]') {
		return new x.constructor(x);
	}

	return x;
}

const inlineAppConfig = {
  "nuxt": {}
};



const appConfig = defuFn(inlineAppConfig);

const NUMBER_CHAR_RE = /\d/;
const STR_SPLITTERS = ["-", "_", "/", "."];
function isUppercase(char = "") {
  if (NUMBER_CHAR_RE.test(char)) {
    return void 0;
  }
  return char !== char.toLowerCase();
}
function splitByCase(str, separators) {
  const splitters = STR_SPLITTERS;
  const parts = [];
  if (!str || typeof str !== "string") {
    return parts;
  }
  let buff = "";
  let previousUpper;
  let previousSplitter;
  for (const char of str) {
    const isSplitter = splitters.includes(char);
    if (isSplitter === true) {
      parts.push(buff);
      buff = "";
      previousUpper = void 0;
      continue;
    }
    const isUpper = isUppercase(char);
    if (previousSplitter === false) {
      if (previousUpper === false && isUpper === true) {
        parts.push(buff);
        buff = char;
        previousUpper = isUpper;
        continue;
      }
      if (previousUpper === true && isUpper === false && buff.length > 1) {
        const lastChar = buff.at(-1);
        parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
        buff = lastChar + char;
        previousUpper = isUpper;
        continue;
      }
    }
    buff += char;
    previousUpper = isUpper;
    previousSplitter = isSplitter;
  }
  parts.push(buff);
  return parts;
}
function kebabCase(str, joiner) {
  return str ? (Array.isArray(str) ? str : splitByCase(str)).map((p) => p.toLowerCase()).join(joiner) : "";
}
function snakeCase(str) {
  return kebabCase(str || "", "_");
}

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "60395eb0-c22b-439c-a4af-a5ea1cd93e71",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      },
      "/_nuxt/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      }
    }
  },
  "public": {
    "baseURL": "http://localhost:5600"
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

function createContext(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext({ ...defaultOpts, ...opts });
      }
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
const defaultNamespace = _globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const getContext = (key, opts = {}) => defaultNamespace.get(key, opts);
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());
function executeAsync(function_) {
  const restores = [];
  for (const leaveHandler of asyncHandlers) {
    const restore2 = leaveHandler();
    if (restore2) {
      restores.push(restore2);
    }
  }
  const restore = () => {
    for (const restore2 of restores) {
      restore2();
    }
  };
  let awaitable = function_();
  if (awaitable && typeof awaitable === "object" && "catch" in awaitable) {
    awaitable = awaitable.catch((error) => {
      restore();
      throw error;
    });
  }
  return [awaitable, restore];
}

function isPathInScope(pathname, base) {
  let canonical;
  try {
    const pre = pathname.replace(/%2f/gi, "/").replace(/%5c/gi, "\\");
    canonical = new URL(pre, "http://_").pathname;
  } catch {
    return false;
  }
  return !base || canonical === base || canonical.startsWith(base + "/");
}

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter$1({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          if (!isPathInScope(event.path.split("?")[0], strpBase)) {
            throw createError$2({ statusCode: 400 });
          }
          targetPath = withoutBase(targetPath, strpBase);
        } else if (targetPath.startsWith("//")) {
          targetPath = targetPath.replace(/^\/+/, "/");
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          if (!isPathInScope(event.path.split("?")[0], strpBase)) {
            throw createError$2({ statusCode: 400 });
          }
          targetPath = withoutBase(targetPath, strpBase);
        } else if (targetPath.startsWith("//")) {
          targetPath = targetPath.replace(/^\/+/, "/");
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

function isJsonRequest(event) {
	
	if (hasReqHeader(event, "accept", "text/html")) {
		return false;
	}
	return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function hasReqHeader(event, name, includes) {
	const value = getRequestHeader(event, name);
	return !!(value && typeof value === "string" && value.toLowerCase().includes(includes));
}

const errorHandler$0 = (async function errorhandler(error, event, { defaultHandler }) {
	if (event.handled || isJsonRequest(event)) {
		
		return;
	}
	
	const defaultRes = await defaultHandler(error, event, { json: true });
	
	const status = error.status || error.statusCode || 500;
	if (status === 404 && defaultRes.status === 302) {
		setResponseHeaders(event, defaultRes.headers);
		setResponseStatus(event, defaultRes.status, defaultRes.statusText);
		return send$1(event, JSON.stringify(defaultRes.body, null, 2));
	}
	const errorObject = defaultRes.body;
	
	const url = new URL(errorObject.url);
	errorObject.url = withoutBase(url.pathname, useRuntimeConfig(event).app.baseURL) + url.search + url.hash;
	
	errorObject.message = error.unhandled ? errorObject.message || "Server Error" : error.message || errorObject.message || "Server Error";
	
	errorObject.data ||= error.data;
	errorObject.statusText ||= error.statusText || error.statusMessage;
	delete defaultRes.headers["content-type"];
	delete defaultRes.headers["content-security-policy"];
	setResponseHeaders(event, defaultRes.headers);
	
	const reqHeaders = getRequestHeaders(event);
	
	const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
	
	const res = isRenderingError ? null : await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject), {
		headers: {
			...reqHeaders,
			"x-nuxt-error": "true"
		},
		redirect: "manual"
	}).catch(() => null);
	if (event.handled) {
		return;
	}
	
	if (!res) {
		const { template } = await import('./error-500.mjs');
		setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
		return send$1(event, template(errorObject));
	}
	const html = await res.text();
	for (const [header, value] of res.headers.entries()) {
		if (header === "set-cookie") {
			appendResponseHeader(event, header, value);
			continue;
		}
		setResponseHeader(event, header, value);
	}
	setResponseStatus(event, res.status && res.status !== 200 ? res.status : defaultRes.status, res.statusText || defaultRes.statusText);
	return send$1(event, html);
});

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$1 = defineNitroErrorHandler(
  function defaultNitroErrorHandler(error, event) {
    const res = defaultHandler(error, event);
    setResponseHeaders(event, res.headers);
    setResponseStatus(event, res.status, res.statusText);
    return send$1(event, JSON.stringify(res.body, null, 2));
  }
);
function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    console.error(`[request error] ${tags} [${event.method}] ${url}
`, error);
  }
  const headers = {
    "content-type": "application/json",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'none'; frame-ancestors 'none';"
  };
  setResponseStatus(event, statusCode, statusMessage);
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = {
    error: true,
    url: url.href,
    statusCode,
    statusMessage,
    message: isSensitive ? "Server Error" : error.message,
    data: isSensitive ? void 0 : error.data
  };
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}

const errorHandlers = [errorHandler$0, errorHandler$1];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

function defineNitroPlugin(def) {
  return def;
}

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function getDefaultExportFromNamespaceIfNotNamed (n) {
	return n && Object.prototype.hasOwnProperty.call(n, 'default') && Object.keys(n).length === 1 ? n['default'] : n;
}

var express$2 = {exports: {}};

const require$$0$4 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(bodyParser);

const require$$8$3 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(require$$0$3$1);

const require$$2$7 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(mergeDescriptors);

var application = {exports: {}};

const require$$0$3 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(finalhandler);

var router$1 = {exports: {}};

function createDebug(namespace) {
	return Object.assign((...args) => {
		const env = globalThis.process?.env.DEBUG;
		if (!env || env !== "*" && !env.startsWith(namespace)) return;
		console.debug(...args);
	}, {
		color: "#000000",
		diff: 0,
		enabled: true,
		log: console.debug.bind(console),
		namespace,
		destroy: () => false,
		extend: (ns, _del) => createDebug(namespace + ns)
	});
}
const debug$b = Object.assign(createDebug, {
	coerce: (val) => val,
	disable: () => "",
	enable: (_namespaces) => {},
	enabled: (_namespaces) => true,
	formatArgs(args) {
		args[0] = `${this.namespace} ${args[0]}`;
	},
	log: console.debug.bind(console),
	selectColor: (_namespace) => 0,
	humanize: (num) => `${num}ms`,
	inspectOpts: {},
	names: [],
	skips: [],
	formatters: {}
});
const coerce = debug$b.coerce;
const disable = debug$b.disable;
const enable = debug$b.enable;
const enabled = debug$b.enabled;
const formatArgs = debug$b.formatArgs;
const log = debug$b.log;
const selectColor = debug$b.selectColor;
const humanize = debug$b.humanize;
const names = debug$b.names;
const skips = debug$b.skips;
const formatters = debug$b.formatters;

const debug$c = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  coerce: coerce,
  default: debug$b,
  disable: disable,
  enable: enable,
  enabled: enabled,
  formatArgs: formatArgs,
  formatters: formatters,
  humanize: humanize,
  log: log,
  names: names,
  selectColor: selectColor,
  skips: skips
}, Symbol.toStringTag, { value: 'Module' }));

const require$$13$2 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(debug$c);

const require$$10$1 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(arrayFlatten);

const require$$0$2 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(pathToRegexp);

/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * Module dependencies.
 * @private
 */

var pathRegexp = require$$0$2;
var debug$a = require$$13$2('express:router:layer');

/**
 * Module variables.
 * @private
 */

var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Module exports.
 * @public
 */

var layer = Layer$2;

function Layer$2(path, options, fn) {
  if (!(this instanceof Layer$2)) {
    return new Layer$2(path, options, fn);
  }

  debug$a('new %o', path);
  var opts = options || {};

  this.handle = fn;
  this.name = fn.name || '<anonymous>';
  this.params = undefined;
  this.path = undefined;
  this.regexp = pathRegexp(path, this.keys = [], opts);

  // set fast path flags
  this.regexp.fast_star = path === '*';
  this.regexp.fast_slash = path === '/' && opts.end === false;
}

/**
 * Handle the error for the layer.
 *
 * @param {Error} error
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 * @api private
 */

Layer$2.prototype.handle_error = function handle_error(error, req, res, next) {
  var fn = this.handle;

  if (fn.length !== 4) {
    // not a standard error handler
    return next(error);
  }

  try {
    fn(error, req, res, next);
  } catch (err) {
    next(err);
  }
};

/**
 * Handle the request for the layer.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 * @api private
 */

Layer$2.prototype.handle_request = function handle(req, res, next) {
  var fn = this.handle;

  if (fn.length > 3) {
    // not a standard request handler
    return next();
  }

  try {
    fn(req, res, next);
  } catch (err) {
    next(err);
  }
};

/**
 * Check if this route matches `path`, if so
 * populate `.params`.
 *
 * @param {String} path
 * @return {Boolean}
 * @api private
 */

Layer$2.prototype.match = function match(path) {
  var match;

  if (path != null) {
    // fast path non-ending match for / (any path matches)
    if (this.regexp.fast_slash) {
      this.params = {};
      this.path = '';
      return true
    }

    // fast path for * (everything matched in a param)
    if (this.regexp.fast_star) {
      this.params = {'0': decode_param(path)};
      this.path = path;
      return true
    }

    // match the path
    match = this.regexp.exec(path);
  }

  if (!match) {
    this.params = undefined;
    this.path = undefined;
    return false;
  }

  // store values
  this.params = {};
  this.path = match[0];

  var keys = this.keys;
  var params = this.params;

  for (var i = 1; i < match.length; i++) {
    var key = keys[i - 1];
    var prop = key.name;
    var val = decode_param(match[i]);

    if (val !== undefined || !(hasOwnProperty.call(params, prop))) {
      params[prop] = val;
    }
  }

  return true;
};

/**
 * Decode param value.
 *
 * @param {string} val
 * @return {string}
 * @private
 */

function decode_param(val) {
  if (typeof val !== 'string' || val.length === 0) {
    return val;
  }

  try {
    return decodeURIComponent(val);
  } catch (err) {
    if (err instanceof URIError) {
      err.message = 'Failed to decode param \'' + val + '\'';
      err.status = err.statusCode = 400;
    }

    throw err;
  }
}

const require$$2$6 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(methods$2);

/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * Module dependencies.
 * @private
 */

var debug$9 = require$$13$2('express:router:route');
var flatten$1 = require$$10$1;
var Layer$1 = layer;
var methods$1 = require$$2$6;

/**
 * Module variables.
 * @private
 */

var slice$1 = Array.prototype.slice;
var toString$2 = Object.prototype.toString;

/**
 * Module exports.
 * @public
 */

var route = Route$1;

/**
 * Initialize `Route` with the given `path`,
 *
 * @param {String} path
 * @public
 */

function Route$1(path) {
  this.path = path;
  this.stack = [];

  debug$9('new %o', path);

  // route handlers for various http methods
  this.methods = {};
}

/**
 * Determine if the route handles a given method.
 * @private
 */

Route$1.prototype._handles_method = function _handles_method(method) {
  if (this.methods._all) {
    return true;
  }

  // normalize name
  var name = typeof method === 'string'
    ? method.toLowerCase()
    : method;

  if (name === 'head' && !this.methods['head']) {
    name = 'get';
  }

  return Boolean(this.methods[name]);
};

/**
 * @return {Array} supported HTTP methods
 * @private
 */

Route$1.prototype._options = function _options() {
  var methods = Object.keys(this.methods);

  // append automatic head
  if (this.methods.get && !this.methods.head) {
    methods.push('head');
  }

  for (var i = 0; i < methods.length; i++) {
    // make upper case
    methods[i] = methods[i].toUpperCase();
  }

  return methods;
};

/**
 * dispatch req, res into this route
 * @private
 */

Route$1.prototype.dispatch = function dispatch(req, res, done) {
  var idx = 0;
  var stack = this.stack;
  var sync = 0;

  if (stack.length === 0) {
    return done();
  }
  var method = typeof req.method === 'string'
    ? req.method.toLowerCase()
    : req.method;

  if (method === 'head' && !this.methods['head']) {
    method = 'get';
  }

  req.route = this;

  next();

  function next(err) {
    // signal to exit route
    if (err && err === 'route') {
      return done();
    }

    // signal to exit router
    if (err && err === 'router') {
      return done(err)
    }

    // max sync stack
    if (++sync > 100) {
      return setImmediate(next, err)
    }

    var layer = stack[idx++];

    // end of layers
    if (!layer) {
      return done(err)
    }

    if (layer.method && layer.method !== method) {
      next(err);
    } else if (err) {
      layer.handle_error(err, req, res, next);
    } else {
      layer.handle_request(req, res, next);
    }

    sync = 0;
  }
};

/**
 * Add a handler for all HTTP verbs to this route.
 *
 * Behaves just like middleware and can respond or call `next`
 * to continue processing.
 *
 * You can use multiple `.all` call to add multiple handlers.
 *
 *   function check_something(req, res, next){
 *     next();
 *   };
 *
 *   function validate_user(req, res, next){
 *     next();
 *   };
 *
 *   route
 *   .all(validate_user)
 *   .all(check_something)
 *   .get(function(req, res, next){
 *     res.send('hello world');
 *   });
 *
 * @param {function} handler
 * @return {Route} for chaining
 * @api public
 */

Route$1.prototype.all = function all() {
  var handles = flatten$1(slice$1.call(arguments));

  for (var i = 0; i < handles.length; i++) {
    var handle = handles[i];

    if (typeof handle !== 'function') {
      var type = toString$2.call(handle);
      var msg = 'Route.all() requires a callback function but got a ' + type;
      throw new TypeError(msg);
    }

    var layer = Layer$1('/', {}, handle);
    layer.method = undefined;

    this.methods._all = true;
    this.stack.push(layer);
  }

  return this;
};

methods$1.forEach(function(method){
  Route$1.prototype[method] = function(){
    var handles = flatten$1(slice$1.call(arguments));

    for (var i = 0; i < handles.length; i++) {
      var handle = handles[i];

      if (typeof handle !== 'function') {
        var type = toString$2.call(handle);
        var msg = 'Route.' + method + '() requires a callback function but got a ' + type;
        throw new Error(msg);
      }

      debug$9('%s %o', method, this.path);

      var layer = Layer$1('/', {}, handle);
      layer.method = method;

      this.methods[method] = true;
      this.stack.push(layer);
    }

    return this;
  };
});

const require$$11 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(utilsMerge);

const require$$3$3 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(depd);

const require$$7 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(parseurl);

const require$$13$1 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(setprototypeof);

/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * Module dependencies.
 * @private
 */

var Route = route;
var Layer = layer;
var methods = require$$2$6;
var mixin = require$$11;
var debug$8 = require$$13$2('express:router');
var deprecate$2 = require$$3$3('express');
var flatten = require$$10$1;
var parseUrl = require$$7;
var setPrototypeOf$1 = require$$13$1;

/**
 * Module variables.
 * @private
 */

var objectRegExp = /^\[object (\S+)\]$/;
var slice = Array.prototype.slice;
var toString$1 = Object.prototype.toString;

/**
 * Initialize a new `Router` with the given `options`.
 *
 * @param {Object} [options]
 * @return {Router} which is a callable function
 * @public
 */

var proto = router$1.exports = function(options) {
  var opts = options || {};

  function router(req, res, next) {
    router.handle(req, res, next);
  }

  // mixin Router class functions
  setPrototypeOf$1(router, proto);

  router.params = {};
  router._params = [];
  router.caseSensitive = opts.caseSensitive;
  router.mergeParams = opts.mergeParams;
  router.strict = opts.strict;
  router.stack = [];

  return router;
};

/**
 * Map the given param placeholder `name`(s) to the given callback.
 *
 * Parameter mapping is used to provide pre-conditions to routes
 * which use normalized placeholders. For example a _:user_id_ parameter
 * could automatically load a user's information from the database without
 * any additional code,
 *
 * The callback uses the same signature as middleware, the only difference
 * being that the value of the placeholder is passed, in this case the _id_
 * of the user. Once the `next()` function is invoked, just like middleware
 * it will continue on to execute the route, or subsequent parameter functions.
 *
 * Just like in middleware, you must either respond to the request or call next
 * to avoid stalling the request.
 *
 *  app.param('user_id', function(req, res, next, id){
 *    User.find(id, function(err, user){
 *      if (err) {
 *        return next(err);
 *      } else if (!user) {
 *        return next(new Error('failed to load user'));
 *      }
 *      req.user = user;
 *      next();
 *    });
 *  });
 *
 * @param {String} name
 * @param {Function} fn
 * @return {app} for chaining
 * @public
 */

proto.param = function param(name, fn) {
  // param logic
  if (typeof name === 'function') {
    deprecate$2('router.param(fn): Refactor to use path params');
    this._params.push(name);
    return;
  }

  // apply param functions
  var params = this._params;
  var len = params.length;
  var ret;

  if (name[0] === ':') {
    deprecate$2('router.param(' + JSON.stringify(name) + ', fn): Use router.param(' + JSON.stringify(name.slice(1)) + ', fn) instead');
    name = name.slice(1);
  }

  for (var i = 0; i < len; ++i) {
    if (ret = params[i](name, fn)) {
      fn = ret;
    }
  }

  // ensure we end up with a
  // middleware function
  if ('function' !== typeof fn) {
    throw new Error('invalid param() call for ' + name + ', got ' + fn);
  }

  (this.params[name] = this.params[name] || []).push(fn);
  return this;
};

/**
 * Dispatch a req, res into the router.
 * @private
 */

proto.handle = function handle(req, res, out) {
  var self = this;

  debug$8('dispatching %s %s', req.method, req.url);

  var idx = 0;
  var protohost = getProtohost(req.url) || '';
  var removed = '';
  var slashAdded = false;
  var sync = 0;
  var paramcalled = {};

  // store options for OPTIONS request
  // only used if OPTIONS request
  var options = [];

  // middleware and routes
  var stack = self.stack;

  // manage inter-router variables
  var parentParams = req.params;
  var parentUrl = req.baseUrl || '';
  var done = restore(out, req, 'baseUrl', 'next', 'params');

  // setup next layer
  req.next = next;

  // for options requests, respond with a default if nothing else responds
  if (req.method === 'OPTIONS') {
    done = wrap(done, function(old, err) {
      if (err || options.length === 0) return old(err);
      sendOptionsResponse(res, options, old);
    });
  }

  // setup basic req values
  req.baseUrl = parentUrl;
  req.originalUrl = req.originalUrl || req.url;

  next();

  function next(err) {
    var layerError = err === 'route'
      ? null
      : err;

    // remove added slash
    if (slashAdded) {
      req.url = req.url.slice(1);
      slashAdded = false;
    }

    // restore altered req.url
    if (removed.length !== 0) {
      req.baseUrl = parentUrl;
      req.url = protohost + removed + req.url.slice(protohost.length);
      removed = '';
    }

    // signal to exit router
    if (layerError === 'router') {
      setImmediate(done, null);
      return
    }

    // no more matching layers
    if (idx >= stack.length) {
      setImmediate(done, layerError);
      return;
    }

    // max sync stack
    if (++sync > 100) {
      return setImmediate(next, err)
    }

    // get pathname of request
    var path = getPathname(req);

    if (path == null) {
      return done(layerError);
    }

    // find next matching layer
    var layer;
    var match;
    var route;

    while (match !== true && idx < stack.length) {
      layer = stack[idx++];
      match = matchLayer(layer, path);
      route = layer.route;

      if (typeof match !== 'boolean') {
        // hold on to layerError
        layerError = layerError || match;
      }

      if (match !== true) {
        continue;
      }

      if (!route) {
        // process non-route handlers normally
        continue;
      }

      if (layerError) {
        // routes do not match with a pending error
        match = false;
        continue;
      }

      var method = req.method;
      var has_method = route._handles_method(method);

      // build up automatic options response
      if (!has_method && method === 'OPTIONS') {
        appendMethods(options, route._options());
      }

      // don't even bother matching route
      if (!has_method && method !== 'HEAD') {
        match = false;
      }
    }

    // no match
    if (match !== true) {
      return done(layerError);
    }

    // store route for dispatch on change
    if (route) {
      req.route = route;
    }

    // Capture one-time layer values
    req.params = self.mergeParams
      ? mergeParams(layer.params, parentParams)
      : layer.params;
    var layerPath = layer.path;

    // this should be done for the layer
    self.process_params(layer, paramcalled, req, res, function (err) {
      if (err) {
        next(layerError || err);
      } else if (route) {
        layer.handle_request(req, res, next);
      } else {
        trim_prefix(layer, layerError, layerPath, path);
      }

      sync = 0;
    });
  }

  function trim_prefix(layer, layerError, layerPath, path) {
    if (layerPath.length !== 0) {
      // Validate path is a prefix match
      if (layerPath !== path.slice(0, layerPath.length)) {
        next(layerError);
        return
      }

      // Validate path breaks on a path separator
      var c = path[layerPath.length];
      if (c && c !== '/' && c !== '.') return next(layerError)

      // Trim off the part of the url that matches the route
      // middleware (.use stuff) needs to have the path stripped
      debug$8('trim prefix (%s) from url %s', layerPath, req.url);
      removed = layerPath;
      req.url = protohost + req.url.slice(protohost.length + removed.length);

      // Ensure leading slash
      if (!protohost && req.url[0] !== '/') {
        req.url = '/' + req.url;
        slashAdded = true;
      }

      // Setup base URL (no trailing slash)
      req.baseUrl = parentUrl + (removed[removed.length - 1] === '/'
        ? removed.substring(0, removed.length - 1)
        : removed);
    }

    debug$8('%s %s : %s', layer.name, layerPath, req.originalUrl);

    if (layerError) {
      layer.handle_error(layerError, req, res, next);
    } else {
      layer.handle_request(req, res, next);
    }
  }
};

/**
 * Process any parameters for the layer.
 * @private
 */

proto.process_params = function process_params(layer, called, req, res, done) {
  var params = this.params;

  // captured parameters from the layer, keys and values
  var keys = layer.keys;

  // fast track
  if (!keys || keys.length === 0) {
    return done();
  }

  var i = 0;
  var name;
  var paramIndex = 0;
  var key;
  var paramVal;
  var paramCallbacks;
  var paramCalled;

  // process params in order
  // param callbacks can be async
  function param(err) {
    if (err) {
      return done(err);
    }

    if (i >= keys.length ) {
      return done();
    }

    paramIndex = 0;
    key = keys[i++];
    name = key.name;
    paramVal = req.params[name];
    paramCallbacks = params[name];
    paramCalled = called[name];

    if (paramVal === undefined || !paramCallbacks) {
      return param();
    }

    // param previously called with same value or error occurred
    if (paramCalled && (paramCalled.match === paramVal
      || (paramCalled.error && paramCalled.error !== 'route'))) {
      // restore value
      req.params[name] = paramCalled.value;

      // next param
      return param(paramCalled.error);
    }

    called[name] = paramCalled = {
      error: null,
      match: paramVal,
      value: paramVal
    };

    paramCallback();
  }

  // single param callbacks
  function paramCallback(err) {
    var fn = paramCallbacks[paramIndex++];

    // store updated value
    paramCalled.value = req.params[key.name];

    if (err) {
      // store error
      paramCalled.error = err;
      param(err);
      return;
    }

    if (!fn) return param();

    try {
      fn(req, res, paramCallback, paramVal, key.name);
    } catch (e) {
      paramCallback(e);
    }
  }

  param();
};

/**
 * Use the given middleware function, with optional path, defaulting to "/".
 *
 * Use (like `.all`) will run for any http METHOD, but it will not add
 * handlers for those methods so OPTIONS requests will not consider `.use`
 * functions even if they could respond.
 *
 * The other difference is that _route_ path is stripped and not visible
 * to the handler function. The main effect of this feature is that mounted
 * handlers can operate without any code changes regardless of the "prefix"
 * pathname.
 *
 * @public
 */

proto.use = function use(fn) {
  var offset = 0;
  var path = '/';

  // default path to '/'
  // disambiguate router.use([fn])
  if (typeof fn !== 'function') {
    var arg = fn;

    while (Array.isArray(arg) && arg.length !== 0) {
      arg = arg[0];
    }

    // first arg is the path
    if (typeof arg !== 'function') {
      offset = 1;
      path = fn;
    }
  }

  var callbacks = flatten(slice.call(arguments, offset));

  if (callbacks.length === 0) {
    throw new TypeError('Router.use() requires a middleware function')
  }

  for (var i = 0; i < callbacks.length; i++) {
    var fn = callbacks[i];

    if (typeof fn !== 'function') {
      throw new TypeError('Router.use() requires a middleware function but got a ' + gettype(fn))
    }

    // add the middleware
    debug$8('use %o %s', path, fn.name || '<anonymous>');

    var layer = new Layer(path, {
      sensitive: this.caseSensitive,
      strict: false,
      end: false
    }, fn);

    layer.route = undefined;

    this.stack.push(layer);
  }

  return this;
};

/**
 * Create a new Route for the given path.
 *
 * Each route contains a separate middleware stack and VERB handlers.
 *
 * See the Route api documentation for details on adding handlers
 * and middleware to routes.
 *
 * @param {String} path
 * @return {Route}
 * @public
 */

proto.route = function route(path) {
  var route = new Route(path);

  var layer = new Layer(path, {
    sensitive: this.caseSensitive,
    strict: this.strict,
    end: true
  }, route.dispatch.bind(route));

  layer.route = route;

  this.stack.push(layer);
  return route;
};

// create Router#VERB functions
methods.concat('all').forEach(function(method){
  proto[method] = function(path){
    var route = this.route(path);
    route[method].apply(route, slice.call(arguments, 1));
    return this;
  };
});

// append methods to a list of methods
function appendMethods(list, addition) {
  for (var i = 0; i < addition.length; i++) {
    var method = addition[i];
    if (list.indexOf(method) === -1) {
      list.push(method);
    }
  }
}

// get pathname of request
function getPathname(req) {
  try {
    return parseUrl(req).pathname;
  } catch (err) {
    return undefined;
  }
}

// Get get protocol + host for a URL
function getProtohost(url) {
  if (typeof url !== 'string' || url.length === 0 || url[0] === '/') {
    return undefined
  }

  var searchIndex = url.indexOf('?');
  var pathLength = searchIndex !== -1
    ? searchIndex
    : url.length;
  var fqdnIndex = url.slice(0, pathLength).indexOf('://');

  return fqdnIndex !== -1
    ? url.substring(0, url.indexOf('/', 3 + fqdnIndex))
    : undefined
}

// get type for error message
function gettype(obj) {
  var type = typeof obj;

  if (type !== 'object') {
    return type;
  }

  // inspect [[Class]] for objects
  return toString$1.call(obj)
    .replace(objectRegExp, '$1');
}

/**
 * Match path to a layer.
 *
 * @param {Layer} layer
 * @param {string} path
 * @private
 */

function matchLayer(layer, path) {
  try {
    return layer.match(path);
  } catch (err) {
    return err;
  }
}

// merge params with parent params
function mergeParams(params, parent) {
  if (typeof parent !== 'object' || !parent) {
    return params;
  }

  // make copy of parent for base
  var obj = mixin({}, parent);

  // simple non-numeric merging
  if (!(0 in params) || !(0 in parent)) {
    return mixin(obj, params);
  }

  var i = 0;
  var o = 0;

  // determine numeric gaps
  while (i in params) {
    i++;
  }

  while (o in parent) {
    o++;
  }

  // offset numeric indices in params before merge
  for (i--; i >= 0; i--) {
    params[i + o] = params[i];

    // create holes for the merge when necessary
    if (i < o) {
      delete params[i];
    }
  }

  return mixin(obj, params);
}

// restore obj props after function
function restore(fn, obj) {
  var props = new Array(arguments.length - 2);
  var vals = new Array(arguments.length - 2);

  for (var i = 0; i < props.length; i++) {
    props[i] = arguments[i + 2];
    vals[i] = obj[props[i]];
  }

  return function () {
    // restore vals
    for (var i = 0; i < props.length; i++) {
      obj[props[i]] = vals[i];
    }

    return fn.apply(this, arguments);
  };
}

// send an OPTIONS response
function sendOptionsResponse(res, options, next) {
  try {
    var body = options.join(',');
    res.set('Allow', body);
    res.send(body);
  } catch (err) {
    next(err);
  }
}

// wrap a function
function wrap(old, fn) {
  return function proxy() {
    var args = new Array(arguments.length + 1);

    args[0] = old;
    for (var i = 0, len = arguments.length; i < len; i++) {
      args[i + 1] = arguments[i];
    }

    fn.apply(this, args);
  };
}

var routerExports = router$1.exports;

var init = {};

/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * Module dependencies.
 * @private
 */

var setPrototypeOf = require$$13$1;

/**
 * Initialization middleware, exposing the
 * request and response to each other, as well
 * as defaulting the X-Powered-By header field.
 *
 * @param {Function} app
 * @return {Function}
 * @api private
 */

init.init = function(app){
  return function expressInit(req, res, next){
    if (app.enabled('x-powered-by')) res.setHeader('X-Powered-By', 'Express');
    req.res = res;
    res.req = req;
    req.next = next;

    setPrototypeOf(req, app.request);
    setPrototypeOf(res, app.response);

    res.locals = res.locals || Object.create(null);

    next();
  };
};

const require$$8$2 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(qs);

/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */

var query;
var hasRequiredQuery;

function requireQuery () {
	if (hasRequiredQuery) return query;
	hasRequiredQuery = 1;

	/**
	 * Module dependencies.
	 */

	var merge = require$$11;
	var parseUrl = require$$7;
	var qs = require$$8$2;

	/**
	 * @param {Object} options
	 * @return {Function}
	 * @api public
	 */

	query = function query(options) {
	  var opts = merge({}, options);
	  var queryparse = qs.parse;

	  if (typeof options === 'function') {
	    queryparse = options;
	    opts = undefined;
	  }

	  if (opts !== undefined && opts.allowPrototypes === undefined) {
	    // back-compat for qs module
	    opts.allowPrototypes = true;
	  }

	  return function query(req, res, next){
	    if (!req.query) {
	      var val = parseUrl(req).query;
	      req.query = queryparse(val, opts);
	    }

	    next();
	  };
	};
	return query;
}

function commonjsRequire(path) {
	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}

const require$$5$2 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(path$2);

const require$$1$1 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(fs$1);

/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * Module dependencies.
 * @private
 */

var debug$7 = require$$13$2('express:view');
var path$1 = require$$5$2;
var fs = require$$1$1;

/**
 * Module variables.
 * @private
 */

var dirname$1 = path$1.dirname;
var basename = path$1.basename;
var extname$1 = path$1.extname;
var join = path$1.join;
var resolve$2 = path$1.resolve;

/**
 * Module exports.
 * @public
 */

var view = View;

/**
 * Initialize a new `View` with the given `name`.
 *
 * Options:
 *
 *   - `defaultEngine` the default template engine name
 *   - `engines` template engine require() cache
 *   - `root` root path for view lookup
 *
 * @param {string} name
 * @param {object} options
 * @public
 */

function View(name, options) {
  var opts = options || {};

  this.defaultEngine = opts.defaultEngine;
  this.ext = extname$1(name);
  this.name = name;
  this.root = opts.root;

  if (!this.ext && !this.defaultEngine) {
    throw new Error('No default engine was specified and no extension was provided.');
  }

  var fileName = name;

  if (!this.ext) {
    // get extension from default engine name
    this.ext = this.defaultEngine[0] !== '.'
      ? '.' + this.defaultEngine
      : this.defaultEngine;

    fileName += this.ext;
  }

  if (!opts.engines[this.ext]) {
    // load engine
    var mod = this.ext.slice(1);
    debug$7('require "%s"', mod);

    // default engine export
    var fn = commonjsRequire(mod).__express;

    if (typeof fn !== 'function') {
      throw new Error('Module "' + mod + '" does not provide a view engine.')
    }

    opts.engines[this.ext] = fn;
  }

  // store loaded engine
  this.engine = opts.engines[this.ext];

  // lookup path
  this.path = this.lookup(fileName);
}

/**
 * Lookup view by the given `name`
 *
 * @param {string} name
 * @private
 */

View.prototype.lookup = function lookup(name) {
  var path;
  var roots = [].concat(this.root);

  debug$7('lookup "%s"', name);

  for (var i = 0; i < roots.length && !path; i++) {
    var root = roots[i];

    // resolve the path
    var loc = resolve$2(root, name);
    var dir = dirname$1(loc);
    var file = basename(loc);

    // resolve the file
    path = this.resolve(dir, file);
  }

  return path;
};

/**
 * Render with the given options.
 *
 * @param {object} options
 * @param {function} callback
 * @private
 */

View.prototype.render = function render(options, callback) {
  debug$7('render "%s"', this.path);
  this.engine(this.path, options, callback);
};

/**
 * Resolve the file within the given directory.
 *
 * @param {string} dir
 * @param {string} file
 * @private
 */

View.prototype.resolve = function resolve(dir, file) {
  var ext = this.ext;

  // <path>.<ext>
  var path = join(dir, file);
  var stat = tryStat(path);

  if (stat && stat.isFile()) {
    return path;
  }

  // <path>/index.<ext>
  path = join(dir, basename(file, ext), 'index' + ext);
  stat = tryStat(path);

  if (stat && stat.isFile()) {
    return path;
  }
};

/**
 * Return a stat, maybe.
 *
 * @param {string} path
 * @return {fs.Stats}
 * @private
 */

function tryStat(path) {
  debug$7('stat "%s"', path);

  try {
    return fs.statSync(path);
  } catch (e) {
    return undefined;
  }
}

const require$$0$1 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(require$$2$8);

var utils = {};

const require$$0 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(safeBuffer);

const require$$1 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(contentDisposition$1);

const require$$2$5 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(contentType);

const require$$14 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(send$2);

const require$$6$2 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(etag);

const require$$8$1 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(proxyAddr);

const require$$9$1 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(querystring);

/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */

(function (exports) {

	/**
	 * Module dependencies.
	 * @api private
	 */

	var Buffer = require$$0.Buffer;
	var contentDisposition = require$$1;
	var contentType = require$$2$5;
	var deprecate = require$$3$3('express');
	var flatten = require$$10$1;
	var mime = require$$14.mime;
	var etag = require$$6$2;
	var proxyaddr = require$$8$1;
	var qs = require$$8$2;
	var querystring = require$$9$1;

	/**
	 * Return strong ETag for `body`.
	 *
	 * @param {String|Buffer} body
	 * @param {String} [encoding]
	 * @return {String}
	 * @api private
	 */

	exports.etag = createETagGenerator({ weak: false });

	/**
	 * Return weak ETag for `body`.
	 *
	 * @param {String|Buffer} body
	 * @param {String} [encoding]
	 * @return {String}
	 * @api private
	 */

	exports.wetag = createETagGenerator({ weak: true });

	/**
	 * Check if `path` looks absolute.
	 *
	 * @param {String} path
	 * @return {Boolean}
	 * @api private
	 */

	exports.isAbsolute = function(path){
	  if ('/' === path[0]) return true;
	  if (':' === path[1] && ('\\' === path[2] || '/' === path[2])) return true; // Windows device path
	  if ('\\\\' === path.substring(0, 2)) return true; // Microsoft Azure absolute path
	};

	/**
	 * Flatten the given `arr`.
	 *
	 * @param {Array} arr
	 * @return {Array}
	 * @api private
	 */

	exports.flatten = deprecate.function(flatten,
	  'utils.flatten: use array-flatten npm module instead');

	/**
	 * Normalize the given `type`, for example "html" becomes "text/html".
	 *
	 * @param {String} type
	 * @return {Object}
	 * @api private
	 */

	exports.normalizeType = function(type){
	  return ~type.indexOf('/')
	    ? acceptParams(type)
	    : { value: mime.lookup(type), params: {} };
	};

	/**
	 * Normalize `types`, for example "html" becomes "text/html".
	 *
	 * @param {Array} types
	 * @return {Array}
	 * @api private
	 */

	exports.normalizeTypes = function(types){
	  var ret = [];

	  for (var i = 0; i < types.length; ++i) {
	    ret.push(exports.normalizeType(types[i]));
	  }

	  return ret;
	};

	/**
	 * Generate Content-Disposition header appropriate for the filename.
	 * non-ascii filenames are urlencoded and a filename* parameter is added
	 *
	 * @param {String} filename
	 * @return {String}
	 * @api private
	 */

	exports.contentDisposition = deprecate.function(contentDisposition,
	  'utils.contentDisposition: use content-disposition npm module instead');

	/**
	 * Parse accept params `str` returning an
	 * object with `.value`, `.quality` and `.params`.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */

	function acceptParams (str) {
	  var parts = str.split(/ *; */);
	  var ret = { value: parts[0], quality: 1, params: {} };

	  for (var i = 1; i < parts.length; ++i) {
	    var pms = parts[i].split(/ *= */);
	    if ('q' === pms[0]) {
	      ret.quality = parseFloat(pms[1]);
	    } else {
	      ret.params[pms[0]] = pms[1];
	    }
	  }

	  return ret;
	}

	/**
	 * Compile "etag" value to function.
	 *
	 * @param  {Boolean|String|Function} val
	 * @return {Function}
	 * @api private
	 */

	exports.compileETag = function(val) {
	  var fn;

	  if (typeof val === 'function') {
	    return val;
	  }

	  switch (val) {
	    case true:
	    case 'weak':
	      fn = exports.wetag;
	      break;
	    case false:
	      break;
	    case 'strong':
	      fn = exports.etag;
	      break;
	    default:
	      throw new TypeError('unknown value for etag function: ' + val);
	  }

	  return fn;
	};

	/**
	 * Compile "query parser" value to function.
	 *
	 * @param  {String|Function} val
	 * @return {Function}
	 * @api private
	 */

	exports.compileQueryParser = function compileQueryParser(val) {
	  var fn;

	  if (typeof val === 'function') {
	    return val;
	  }

	  switch (val) {
	    case true:
	    case 'simple':
	      fn = querystring.parse;
	      break;
	    case false:
	      fn = newObject;
	      break;
	    case 'extended':
	      fn = parseExtendedQueryString;
	      break;
	    default:
	      throw new TypeError('unknown value for query parser function: ' + val);
	  }

	  return fn;
	};

	/**
	 * Compile "proxy trust" value to function.
	 *
	 * @param  {Boolean|String|Number|Array|Function} val
	 * @return {Function}
	 * @api private
	 */

	exports.compileTrust = function(val) {
	  if (typeof val === 'function') return val;

	  if (val === true) {
	    // Support plain true/false
	    return function(){ return true };
	  }

	  if (typeof val === 'number') {
	    // Support trusting hop count
	    return function(a, i){ return i < val };
	  }

	  if (typeof val === 'string') {
	    // Support comma-separated values
	    val = val.split(',')
	      .map(function (v) { return v.trim() });
	  }

	  return proxyaddr.compile(val || []);
	};

	/**
	 * Set the charset in a given Content-Type string.
	 *
	 * @param {String} type
	 * @param {String} charset
	 * @return {String}
	 * @api private
	 */

	exports.setCharset = function setCharset(type, charset) {
	  if (!type || !charset) {
	    return type;
	  }

	  // parse type
	  var parsed = contentType.parse(type);

	  // set charset
	  parsed.parameters.charset = charset;

	  // format type
	  return contentType.format(parsed);
	};

	/**
	 * Create an ETag generator function, generating ETags with
	 * the given options.
	 *
	 * @param {object} options
	 * @return {function}
	 * @private
	 */

	function createETagGenerator (options) {
	  return function generateETag (body, encoding) {
	    var buf = !Buffer.isBuffer(body)
	      ? Buffer.from(body, encoding)
	      : body;

	    return etag(buf, options)
	  }
	}

	/**
	 * Parse an extended query string with qs.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @private
	 */

	function parseExtendedQueryString(str) {
	  return qs.parse(str, {
	    allowPrototypes: true
	  });
	}

	/**
	 * Return new empty object.
	 *
	 * @return {Object}
	 * @api private
	 */

	function newObject() {
	  return {};
	} 
} (utils));

/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */

(function (module, exports) {

	/**
	 * Module dependencies.
	 * @private
	 */

	var finalhandler = require$$0$3;
	var Router = routerExports;
	var methods = require$$2$6;
	var middleware = init;
	var query = /*@__PURE__*/ requireQuery();
	var debug = require$$13$2('express:application');
	var View = view;
	var http = require$$0$1;
	var compileETag = utils.compileETag;
	var compileQueryParser = utils.compileQueryParser;
	var compileTrust = utils.compileTrust;
	var deprecate = require$$3$3('express');
	var flatten = require$$10$1;
	var merge = require$$11;
	var resolve = require$$5$2.resolve;
	var setPrototypeOf = require$$13$1;

	/**
	 * Module variables.
	 * @private
	 */

	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var slice = Array.prototype.slice;

	/**
	 * Application prototype.
	 */

	var app = module.exports = {};

	/**
	 * Variable for trust proxy inheritance back-compat
	 * @private
	 */

	var trustProxyDefaultSymbol = '@@symbol:trust_proxy_default';

	/**
	 * Initialize the server.
	 *
	 *   - setup default configuration
	 *   - setup default middleware
	 *   - setup route reflection methods
	 *
	 * @private
	 */

	app.init = function init() {
	  this.cache = {};
	  this.engines = {};
	  this.settings = {};

	  this.defaultConfiguration();
	};

	/**
	 * Initialize application configuration.
	 * @private
	 */

	app.defaultConfiguration = function defaultConfiguration() {
	  var env = "production";

	  // default settings
	  this.enable('x-powered-by');
	  this.set('etag', 'weak');
	  this.set('env', env);
	  this.set('query parser', 'extended');
	  this.set('subdomain offset', 2);
	  this.set('trust proxy', false);

	  // trust proxy inherit back-compat
	  Object.defineProperty(this.settings, trustProxyDefaultSymbol, {
	    configurable: true,
	    value: true
	  });

	  debug('booting in %s mode', env);

	  this.on('mount', function onmount(parent) {
	    // inherit trust proxy
	    if (this.settings[trustProxyDefaultSymbol] === true
	      && typeof parent.settings['trust proxy fn'] === 'function') {
	      delete this.settings['trust proxy'];
	      delete this.settings['trust proxy fn'];
	    }

	    // inherit protos
	    setPrototypeOf(this.request, parent.request);
	    setPrototypeOf(this.response, parent.response);
	    setPrototypeOf(this.engines, parent.engines);
	    setPrototypeOf(this.settings, parent.settings);
	  });

	  // setup locals
	  this.locals = Object.create(null);

	  // top-most app is mounted at /
	  this.mountpath = '/';

	  // default locals
	  this.locals.settings = this.settings;

	  // default configuration
	  this.set('view', View);
	  this.set('views', resolve('views'));
	  this.set('jsonp callback name', 'callback');

	  {
	    this.enable('view cache');
	  }

	  Object.defineProperty(this, 'router', {
	    get: function() {
	      throw new Error('\'app.router\' is deprecated!\nPlease see the 3.x to 4.x migration guide for details on how to update your app.');
	    }
	  });
	};

	/**
	 * lazily adds the base router if it has not yet been added.
	 *
	 * We cannot add the base router in the defaultConfiguration because
	 * it reads app settings which might be set after that has run.
	 *
	 * @private
	 */
	app.lazyrouter = function lazyrouter() {
	  if (!this._router) {
	    this._router = new Router({
	      caseSensitive: this.enabled('case sensitive routing'),
	      strict: this.enabled('strict routing')
	    });

	    this._router.use(query(this.get('query parser fn')));
	    this._router.use(middleware.init(this));
	  }
	};

	/**
	 * Dispatch a req, res pair into the application. Starts pipeline processing.
	 *
	 * If no callback is provided, then default error handlers will respond
	 * in the event of an error bubbling through the stack.
	 *
	 * @private
	 */

	app.handle = function handle(req, res, callback) {
	  var router = this._router;

	  // final handler
	  var done = callback || finalhandler(req, res, {
	    env: this.get('env'),
	    onerror: logerror.bind(this)
	  });

	  // no routes
	  if (!router) {
	    debug('no routes defined on app');
	    done();
	    return;
	  }

	  router.handle(req, res, done);
	};

	/**
	 * Proxy `Router#use()` to add middleware to the app router.
	 * See Router#use() documentation for details.
	 *
	 * If the _fn_ parameter is an express app, then it will be
	 * mounted at the _route_ specified.
	 *
	 * @public
	 */

	app.use = function use(fn) {
	  var offset = 0;
	  var path = '/';

	  // default path to '/'
	  // disambiguate app.use([fn])
	  if (typeof fn !== 'function') {
	    var arg = fn;

	    while (Array.isArray(arg) && arg.length !== 0) {
	      arg = arg[0];
	    }

	    // first arg is the path
	    if (typeof arg !== 'function') {
	      offset = 1;
	      path = fn;
	    }
	  }

	  var fns = flatten(slice.call(arguments, offset));

	  if (fns.length === 0) {
	    throw new TypeError('app.use() requires a middleware function')
	  }

	  // setup router
	  this.lazyrouter();
	  var router = this._router;

	  fns.forEach(function (fn) {
	    // non-express app
	    if (!fn || !fn.handle || !fn.set) {
	      return router.use(path, fn);
	    }

	    debug('.use app under %s', path);
	    fn.mountpath = path;
	    fn.parent = this;

	    // restore .app property on req and res
	    router.use(path, function mounted_app(req, res, next) {
	      var orig = req.app;
	      fn.handle(req, res, function (err) {
	        setPrototypeOf(req, orig.request);
	        setPrototypeOf(res, orig.response);
	        next(err);
	      });
	    });

	    // mounted an app
	    fn.emit('mount', this);
	  }, this);

	  return this;
	};

	/**
	 * Proxy to the app `Router#route()`
	 * Returns a new `Route` instance for the _path_.
	 *
	 * Routes are isolated middleware stacks for specific paths.
	 * See the Route api docs for details.
	 *
	 * @public
	 */

	app.route = function route(path) {
	  this.lazyrouter();
	  return this._router.route(path);
	};

	/**
	 * Register the given template engine callback `fn`
	 * as `ext`.
	 *
	 * By default will `require()` the engine based on the
	 * file extension. For example if you try to render
	 * a "foo.ejs" file Express will invoke the following internally:
	 *
	 *     app.engine('ejs', require('ejs').__express);
	 *
	 * For engines that do not provide `.__express` out of the box,
	 * or if you wish to "map" a different extension to the template engine
	 * you may use this method. For example mapping the EJS template engine to
	 * ".html" files:
	 *
	 *     app.engine('html', require('ejs').renderFile);
	 *
	 * In this case EJS provides a `.renderFile()` method with
	 * the same signature that Express expects: `(path, options, callback)`,
	 * though note that it aliases this method as `ejs.__express` internally
	 * so if you're using ".ejs" extensions you don't need to do anything.
	 *
	 * Some template engines do not follow this convention, the
	 * [Consolidate.js](https://github.com/tj/consolidate.js)
	 * library was created to map all of node's popular template
	 * engines to follow this convention, thus allowing them to
	 * work seamlessly within Express.
	 *
	 * @param {String} ext
	 * @param {Function} fn
	 * @return {app} for chaining
	 * @public
	 */

	app.engine = function engine(ext, fn) {
	  if (typeof fn !== 'function') {
	    throw new Error('callback function required');
	  }

	  // get file extension
	  var extension = ext[0] !== '.'
	    ? '.' + ext
	    : ext;

	  // store engine
	  this.engines[extension] = fn;

	  return this;
	};

	/**
	 * Proxy to `Router#param()` with one added api feature. The _name_ parameter
	 * can be an array of names.
	 *
	 * See the Router#param() docs for more details.
	 *
	 * @param {String|Array} name
	 * @param {Function} fn
	 * @return {app} for chaining
	 * @public
	 */

	app.param = function param(name, fn) {
	  this.lazyrouter();

	  if (Array.isArray(name)) {
	    for (var i = 0; i < name.length; i++) {
	      this.param(name[i], fn);
	    }

	    return this;
	  }

	  this._router.param(name, fn);

	  return this;
	};

	/**
	 * Assign `setting` to `val`, or return `setting`'s value.
	 *
	 *    app.set('foo', 'bar');
	 *    app.set('foo');
	 *    // => "bar"
	 *
	 * Mounted servers inherit their parent server's settings.
	 *
	 * @param {String} setting
	 * @param {*} [val]
	 * @return {Server} for chaining
	 * @public
	 */

	app.set = function set(setting, val) {
	  if (arguments.length === 1) {
	    // app.get(setting)
	    var settings = this.settings;

	    while (settings && settings !== Object.prototype) {
	      if (hasOwnProperty.call(settings, setting)) {
	        return settings[setting]
	      }

	      settings = Object.getPrototypeOf(settings);
	    }

	    return undefined
	  }

	  debug('set "%s" to %o', setting, val);

	  // set value
	  this.settings[setting] = val;

	  // trigger matched settings
	  switch (setting) {
	    case 'etag':
	      this.set('etag fn', compileETag(val));
	      break;
	    case 'query parser':
	      this.set('query parser fn', compileQueryParser(val));
	      break;
	    case 'trust proxy':
	      this.set('trust proxy fn', compileTrust(val));

	      // trust proxy inherit back-compat
	      Object.defineProperty(this.settings, trustProxyDefaultSymbol, {
	        configurable: true,
	        value: false
	      });

	      break;
	  }

	  return this;
	};

	/**
	 * Return the app's absolute pathname
	 * based on the parent(s) that have
	 * mounted it.
	 *
	 * For example if the application was
	 * mounted as "/admin", which itself
	 * was mounted as "/blog" then the
	 * return value would be "/blog/admin".
	 *
	 * @return {String}
	 * @private
	 */

	app.path = function path() {
	  return this.parent
	    ? this.parent.path() + this.mountpath
	    : '';
	};

	/**
	 * Check if `setting` is enabled (truthy).
	 *
	 *    app.enabled('foo')
	 *    // => false
	 *
	 *    app.enable('foo')
	 *    app.enabled('foo')
	 *    // => true
	 *
	 * @param {String} setting
	 * @return {Boolean}
	 * @public
	 */

	app.enabled = function enabled(setting) {
	  return Boolean(this.set(setting));
	};

	/**
	 * Check if `setting` is disabled.
	 *
	 *    app.disabled('foo')
	 *    // => true
	 *
	 *    app.enable('foo')
	 *    app.disabled('foo')
	 *    // => false
	 *
	 * @param {String} setting
	 * @return {Boolean}
	 * @public
	 */

	app.disabled = function disabled(setting) {
	  return !this.set(setting);
	};

	/**
	 * Enable `setting`.
	 *
	 * @param {String} setting
	 * @return {app} for chaining
	 * @public
	 */

	app.enable = function enable(setting) {
	  return this.set(setting, true);
	};

	/**
	 * Disable `setting`.
	 *
	 * @param {String} setting
	 * @return {app} for chaining
	 * @public
	 */

	app.disable = function disable(setting) {
	  return this.set(setting, false);
	};

	/**
	 * Delegate `.VERB(...)` calls to `router.VERB(...)`.
	 */

	methods.forEach(function(method){
	  app[method] = function(path){
	    if (method === 'get' && arguments.length === 1) {
	      // app.get(setting)
	      return this.set(path);
	    }

	    this.lazyrouter();

	    var route = this._router.route(path);
	    route[method].apply(route, slice.call(arguments, 1));
	    return this;
	  };
	});

	/**
	 * Special-cased "all" method, applying the given route `path`,
	 * middleware, and callback to _every_ HTTP method.
	 *
	 * @param {String} path
	 * @param {Function} ...
	 * @return {app} for chaining
	 * @public
	 */

	app.all = function all(path) {
	  this.lazyrouter();

	  var route = this._router.route(path);
	  var args = slice.call(arguments, 1);

	  for (var i = 0; i < methods.length; i++) {
	    route[methods[i]].apply(route, args);
	  }

	  return this;
	};

	// del -> delete alias

	app.del = deprecate.function(app.delete, 'app.del: Use app.delete instead');

	/**
	 * Render the given view `name` name with `options`
	 * and a callback accepting an error and the
	 * rendered template string.
	 *
	 * Example:
	 *
	 *    app.render('email', { name: 'Tobi' }, function(err, html){
	 *      // ...
	 *    })
	 *
	 * @param {String} name
	 * @param {Object|Function} options or fn
	 * @param {Function} callback
	 * @public
	 */

	app.render = function render(name, options, callback) {
	  var cache = this.cache;
	  var done = callback;
	  var engines = this.engines;
	  var opts = options;
	  var renderOptions = {};
	  var view;

	  // support callback function as second arg
	  if (typeof options === 'function') {
	    done = options;
	    opts = {};
	  }

	  // merge app.locals
	  merge(renderOptions, this.locals);

	  // merge options._locals
	  if (opts._locals) {
	    merge(renderOptions, opts._locals);
	  }

	  // merge options
	  merge(renderOptions, opts);

	  // set .cache unless explicitly provided
	  if (renderOptions.cache == null) {
	    renderOptions.cache = this.enabled('view cache');
	  }

	  // primed cache
	  if (renderOptions.cache) {
	    view = cache[name];
	  }

	  // view
	  if (!view) {
	    var View = this.get('view');

	    view = new View(name, {
	      defaultEngine: this.get('view engine'),
	      root: this.get('views'),
	      engines: engines
	    });

	    if (!view.path) {
	      var dirs = Array.isArray(view.root) && view.root.length > 1
	        ? 'directories "' + view.root.slice(0, -1).join('", "') + '" or "' + view.root[view.root.length - 1] + '"'
	        : 'directory "' + view.root + '"';
	      var err = new Error('Failed to lookup view "' + name + '" in views ' + dirs);
	      err.view = view;
	      return done(err);
	    }

	    // prime the cache
	    if (renderOptions.cache) {
	      cache[name] = view;
	    }
	  }

	  // render
	  tryRender(view, renderOptions, done);
	};

	/**
	 * Listen for connections.
	 *
	 * A node `http.Server` is returned, with this
	 * application (which is a `Function`) as its
	 * callback. If you wish to create both an HTTP
	 * and HTTPS server you may do so with the "http"
	 * and "https" modules as shown here:
	 *
	 *    var http = require('http')
	 *      , https = require('https')
	 *      , express = require('express')
	 *      , app = express();
	 *
	 *    http.createServer(app).listen(80);
	 *    https.createServer({ ... }, app).listen(443);
	 *
	 * @return {http.Server}
	 * @public
	 */

	app.listen = function listen() {
	  var server = http.createServer(this);
	  return server.listen.apply(server, arguments);
	};

	/**
	 * Log error using console.error.
	 *
	 * @param {Error} err
	 * @private
	 */

	function logerror(err) {
	  /* istanbul ignore next */
	  if (this.get('env') !== 'test') console.error(err.stack || err.toString());
	}

	/**
	 * Try rendering a view.
	 * @private
	 */

	function tryRender(view, options, callback) {
	  try {
	    view.render(options, callback);
	  } catch (err) {
	    callback(err);
	  }
	} 
} (application));

var applicationExports = application.exports;

const require$$3$2 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(accepts$1);

const require$$2$4 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(require$$3$4);

const require$$3$1 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(typeIs);

const require$$5$1 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(fresh$1);

const require$$6$1 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(rangeParser);

/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * Module dependencies.
 * @private
 */

var accepts = require$$3$2;
var deprecate$1 = require$$3$3('express');
var isIP = require$$2$4.isIP;
var typeis = require$$3$1;
var http$1 = require$$0$1;
var fresh = require$$5$1;
var parseRange = require$$6$1;
var parse = require$$7;
var proxyaddr = require$$8$1;

/**
 * Request prototype.
 * @public
 */

var req = Object.create(http$1.IncomingMessage.prototype);

/**
 * Module exports.
 * @public
 */

var request = req;

/**
 * Return request header.
 *
 * The `Referrer` header field is special-cased,
 * both `Referrer` and `Referer` are interchangeable.
 *
 * Examples:
 *
 *     req.get('Content-Type');
 *     // => "text/plain"
 *
 *     req.get('content-type');
 *     // => "text/plain"
 *
 *     req.get('Something');
 *     // => undefined
 *
 * Aliased as `req.header()`.
 *
 * @param {String} name
 * @return {String}
 * @public
 */

req.get =
req.header = function header(name) {
  if (!name) {
    throw new TypeError('name argument is required to req.get');
  }

  if (typeof name !== 'string') {
    throw new TypeError('name must be a string to req.get');
  }

  var lc = name.toLowerCase();

  switch (lc) {
    case 'referer':
    case 'referrer':
      return this.headers.referrer
        || this.headers.referer;
    default:
      return this.headers[lc];
  }
};

/**
 * To do: update docs.
 *
 * Check if the given `type(s)` is acceptable, returning
 * the best match when true, otherwise `undefined`, in which
 * case you should respond with 406 "Not Acceptable".
 *
 * The `type` value may be a single MIME type string
 * such as "application/json", an extension name
 * such as "json", a comma-delimited list such as "json, html, text/plain",
 * an argument list such as `"json", "html", "text/plain"`,
 * or an array `["json", "html", "text/plain"]`. When a list
 * or array is given, the _best_ match, if any is returned.
 *
 * Examples:
 *
 *     // Accept: text/html
 *     req.accepts('html');
 *     // => "html"
 *
 *     // Accept: text/*, application/json
 *     req.accepts('html');
 *     // => "html"
 *     req.accepts('text/html');
 *     // => "text/html"
 *     req.accepts('json, text');
 *     // => "json"
 *     req.accepts('application/json');
 *     // => "application/json"
 *
 *     // Accept: text/*, application/json
 *     req.accepts('image/png');
 *     req.accepts('png');
 *     // => undefined
 *
 *     // Accept: text/*;q=.5, application/json
 *     req.accepts(['html', 'json']);
 *     req.accepts('html', 'json');
 *     req.accepts('html, json');
 *     // => "json"
 *
 * @param {String|Array} type(s)
 * @return {String|Array|Boolean}
 * @public
 */

req.accepts = function(){
  var accept = accepts(this);
  return accept.types.apply(accept, arguments);
};

/**
 * Check if the given `encoding`s are accepted.
 *
 * @param {String} ...encoding
 * @return {String|Array}
 * @public
 */

req.acceptsEncodings = function(){
  var accept = accepts(this);
  return accept.encodings.apply(accept, arguments);
};

req.acceptsEncoding = deprecate$1.function(req.acceptsEncodings,
  'req.acceptsEncoding: Use acceptsEncodings instead');

/**
 * Check if the given `charset`s are acceptable,
 * otherwise you should respond with 406 "Not Acceptable".
 *
 * @param {String} ...charset
 * @return {String|Array}
 * @public
 */

req.acceptsCharsets = function(){
  var accept = accepts(this);
  return accept.charsets.apply(accept, arguments);
};

req.acceptsCharset = deprecate$1.function(req.acceptsCharsets,
  'req.acceptsCharset: Use acceptsCharsets instead');

/**
 * Check if the given `lang`s are acceptable,
 * otherwise you should respond with 406 "Not Acceptable".
 *
 * @param {String} ...lang
 * @return {String|Array}
 * @public
 */

req.acceptsLanguages = function(){
  var accept = accepts(this);
  return accept.languages.apply(accept, arguments);
};

req.acceptsLanguage = deprecate$1.function(req.acceptsLanguages,
  'req.acceptsLanguage: Use acceptsLanguages instead');

/**
 * Parse Range header field, capping to the given `size`.
 *
 * Unspecified ranges such as "0-" require knowledge of your resource length. In
 * the case of a byte range this is of course the total number of bytes. If the
 * Range header field is not given `undefined` is returned, `-1` when unsatisfiable,
 * and `-2` when syntactically invalid.
 *
 * When ranges are returned, the array has a "type" property which is the type of
 * range that is required (most commonly, "bytes"). Each array element is an object
 * with a "start" and "end" property for the portion of the range.
 *
 * The "combine" option can be set to `true` and overlapping & adjacent ranges
 * will be combined into a single range.
 *
 * NOTE: remember that ranges are inclusive, so for example "Range: users=0-3"
 * should respond with 4 users when available, not 3.
 *
 * @param {number} size
 * @param {object} [options]
 * @param {boolean} [options.combine=false]
 * @return {number|array}
 * @public
 */

req.range = function range(size, options) {
  var range = this.get('Range');
  if (!range) return;
  return parseRange(size, range, options);
};

/**
 * Return the value of param `name` when present or `defaultValue`.
 *
 *  - Checks route placeholders, ex: _/user/:id_
 *  - Checks body params, ex: id=12, {"id":12}
 *  - Checks query string params, ex: ?id=12
 *
 * To utilize request bodies, `req.body`
 * should be an object. This can be done by using
 * the `bodyParser()` middleware.
 *
 * @param {String} name
 * @param {Mixed} [defaultValue]
 * @return {String}
 * @public
 */

req.param = function param(name, defaultValue) {
  var params = this.params || {};
  var body = this.body || {};
  var query = this.query || {};

  var args = arguments.length === 1
    ? 'name'
    : 'name, default';
  deprecate$1('req.param(' + args + '): Use req.params, req.body, or req.query instead');

  if (null != params[name] && params.hasOwnProperty(name)) return params[name];
  if (null != body[name]) return body[name];
  if (null != query[name]) return query[name];

  return defaultValue;
};

/**
 * Check if the incoming request contains the "Content-Type"
 * header field, and it contains the given mime `type`.
 *
 * Examples:
 *
 *      // With Content-Type: text/html; charset=utf-8
 *      req.is('html');
 *      req.is('text/html');
 *      req.is('text/*');
 *      // => true
 *
 *      // When Content-Type is application/json
 *      req.is('json');
 *      req.is('application/json');
 *      req.is('application/*');
 *      // => true
 *
 *      req.is('html');
 *      // => false
 *
 * @param {String|Array} types...
 * @return {String|false|null}
 * @public
 */

req.is = function is(types) {
  var arr = types;

  // support flattened arguments
  if (!Array.isArray(types)) {
    arr = new Array(arguments.length);
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arguments[i];
    }
  }

  return typeis(this, arr);
};

/**
 * Return the protocol string "http" or "https"
 * when requested with TLS. When the "trust proxy"
 * setting trusts the socket address, the
 * "X-Forwarded-Proto" header field will be trusted
 * and used if present.
 *
 * If you're running behind a reverse proxy that
 * supplies https for you this may be enabled.
 *
 * @return {String}
 * @public
 */

defineGetter(req, 'protocol', function protocol(){
  var proto = this.connection.encrypted
    ? 'https'
    : 'http';
  var trust = this.app.get('trust proxy fn');

  if (!trust(this.connection.remoteAddress, 0)) {
    return proto;
  }

  // Note: X-Forwarded-Proto is normally only ever a
  //       single value, but this is to be safe.
  var header = this.get('X-Forwarded-Proto') || proto;
  var index = header.indexOf(',');

  return index !== -1
    ? header.substring(0, index).trim()
    : header.trim()
});

/**
 * Short-hand for:
 *
 *    req.protocol === 'https'
 *
 * @return {Boolean}
 * @public
 */

defineGetter(req, 'secure', function secure(){
  return this.protocol === 'https';
});

/**
 * Return the remote address from the trusted proxy.
 *
 * The is the remote address on the socket unless
 * "trust proxy" is set.
 *
 * @return {String}
 * @public
 */

defineGetter(req, 'ip', function ip(){
  var trust = this.app.get('trust proxy fn');
  return proxyaddr(this, trust);
});

/**
 * When "trust proxy" is set, trusted proxy addresses + client.
 *
 * For example if the value were "client, proxy1, proxy2"
 * you would receive the array `["client", "proxy1", "proxy2"]`
 * where "proxy2" is the furthest down-stream and "proxy1" and
 * "proxy2" were trusted.
 *
 * @return {Array}
 * @public
 */

defineGetter(req, 'ips', function ips() {
  var trust = this.app.get('trust proxy fn');
  var addrs = proxyaddr.all(this, trust);

  // reverse the order (to farthest -> closest)
  // and remove socket address
  addrs.reverse().pop();

  return addrs
});

/**
 * Return subdomains as an array.
 *
 * Subdomains are the dot-separated parts of the host before the main domain of
 * the app. By default, the domain of the app is assumed to be the last two
 * parts of the host. This can be changed by setting "subdomain offset".
 *
 * For example, if the domain is "tobi.ferrets.example.com":
 * If "subdomain offset" is not set, req.subdomains is `["ferrets", "tobi"]`.
 * If "subdomain offset" is 3, req.subdomains is `["tobi"]`.
 *
 * @return {Array}
 * @public
 */

defineGetter(req, 'subdomains', function subdomains() {
  var hostname = this.hostname;

  if (!hostname) return [];

  var offset = this.app.get('subdomain offset');
  var subdomains = !isIP(hostname)
    ? hostname.split('.').reverse()
    : [hostname];

  return subdomains.slice(offset);
});

/**
 * Short-hand for `url.parse(req.url).pathname`.
 *
 * @return {String}
 * @public
 */

defineGetter(req, 'path', function path() {
  return parse(this).pathname;
});

/**
 * Parse the "Host" header field to a hostname.
 *
 * When the "trust proxy" setting trusts the socket
 * address, the "X-Forwarded-Host" header field will
 * be trusted.
 *
 * @return {String}
 * @public
 */

defineGetter(req, 'hostname', function hostname(){
  var trust = this.app.get('trust proxy fn');
  var host = this.get('X-Forwarded-Host');

  if (!host || !trust(this.connection.remoteAddress, 0)) {
    host = this.get('Host');
  } else if (host.indexOf(',') !== -1) {
    // Note: X-Forwarded-Host is normally only ever a
    //       single value, but this is to be safe.
    host = host.substring(0, host.indexOf(',')).trimRight();
  }

  if (!host) return;

  // IPv6 literal support
  var offset = host[0] === '['
    ? host.indexOf(']') + 1
    : 0;
  var index = host.indexOf(':', offset);

  return index !== -1
    ? host.substring(0, index)
    : host;
});

// TODO: change req.host to return host in next major

defineGetter(req, 'host', deprecate$1.function(function host(){
  return this.hostname;
}, 'req.host: Use req.hostname instead'));

/**
 * Check if the request is fresh, aka
 * Last-Modified and/or the ETag
 * still match.
 *
 * @return {Boolean}
 * @public
 */

defineGetter(req, 'fresh', function(){
  var method = this.method;
  var res = this.res;
  var status = res.statusCode;

  // GET or HEAD for weak freshness validation only
  if ('GET' !== method && 'HEAD' !== method) return false;

  // 2xx or 304 as per rfc2616 14.26
  if ((status >= 200 && status < 300) || 304 === status) {
    return fresh(this.headers, {
      'etag': res.get('ETag'),
      'last-modified': res.get('Last-Modified')
    })
  }

  return false;
});

/**
 * Check if the request is stale, aka
 * "Last-Modified" and / or the "ETag" for the
 * resource has changed.
 *
 * @return {Boolean}
 * @public
 */

defineGetter(req, 'stale', function stale(){
  return !this.fresh;
});

/**
 * Check if the request was an _XMLHttpRequest_.
 *
 * @return {Boolean}
 * @public
 */

defineGetter(req, 'xhr', function xhr(){
  var val = this.get('X-Requested-With') || '';
  return val.toLowerCase() === 'xmlhttprequest';
});

/**
 * Helper function for creating a getter on an object.
 *
 * @param {Object} obj
 * @param {String} name
 * @param {Function} getter
 * @private
 */
function defineGetter(obj, name, getter) {
  Object.defineProperty(obj, name, {
    configurable: true,
    enumerable: true,
    get: getter
  });
}

const require$$2$3 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(httpErrors);

const require$$4$1 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(encodeurl);

const require$$5 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(escapeHtml$1);

const require$$8 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(onFinished$1);

const require$$10 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(statuses$1);

const require$$12 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(cookieSignature);

const require$$13 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(cookie$1);

const require$$15 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(vary$1);

/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * Module dependencies.
 * @private
 */

var Buffer$1 = require$$0.Buffer;
var contentDisposition = require$$1;
var createError = require$$2$3;
var deprecate = require$$3$3('express');
var encodeUrl = require$$4$1;
var escapeHtml = require$$5;
var http = require$$0$1;
var isAbsolute$1 = utils.isAbsolute;
var onFinished = require$$8;
var path = require$$5$2;
var statuses = require$$10;
var merge = require$$11;
var sign = require$$12.sign;
var normalizeType = utils.normalizeType;
var normalizeTypes = utils.normalizeTypes;
var setCharset = utils.setCharset;
var cookie = require$$13;
var send = require$$14;
var extname = path.extname;
var mime = send.mime;
var resolve$1 = path.resolve;
var vary = require$$15;

/**
 * Response prototype.
 * @public
 */

var res = Object.create(http.ServerResponse.prototype);

/**
 * Module exports.
 * @public
 */

var response = res;

/**
 * Module variables.
 * @private
 */

var charsetRegExp = /;\s*charset\s*=/;

/**
 * Set status `code`.
 *
 * @param {Number} code
 * @return {ServerResponse}
 * @public
 */

res.status = function status(code) {
  if ((typeof code === 'string' || Math.floor(code) !== code) && code > 99 && code < 1000) {
    deprecate('res.status(' + JSON.stringify(code) + '): use res.status(' + Math.floor(code) + ') instead');
  }
  this.statusCode = code;
  return this;
};

/**
 * Set Link header field with the given `links`.
 *
 * Examples:
 *
 *    res.links({
 *      next: 'http://api.example.com/users?page=2',
 *      last: 'http://api.example.com/users?page=5'
 *    });
 *
 * @param {Object} links
 * @return {ServerResponse}
 * @public
 */

res.links = function(links){
  var link = this.get('Link') || '';
  if (link) link += ', ';
  return this.set('Link', link + Object.keys(links).map(function(rel){
    return '<' + links[rel] + '>; rel="' + rel + '"';
  }).join(', '));
};

/**
 * Send a response.
 *
 * Examples:
 *
 *     res.send(Buffer.from('wahoo'));
 *     res.send({ some: 'json' });
 *     res.send('<p>some html</p>');
 *
 * @param {string|number|boolean|object|Buffer} body
 * @public
 */

res.send = function send(body) {
  var chunk = body;
  var encoding;
  var req = this.req;
  var type;

  // settings
  var app = this.app;

  // allow status / body
  if (arguments.length === 2) {
    // res.send(body, status) backwards compat
    if (typeof arguments[0] !== 'number' && typeof arguments[1] === 'number') {
      deprecate('res.send(body, status): Use res.status(status).send(body) instead');
      this.statusCode = arguments[1];
    } else {
      deprecate('res.send(status, body): Use res.status(status).send(body) instead');
      this.statusCode = arguments[0];
      chunk = arguments[1];
    }
  }

  // disambiguate res.send(status) and res.send(status, num)
  if (typeof chunk === 'number' && arguments.length === 1) {
    // res.send(status) will set status message as text string
    if (!this.get('Content-Type')) {
      this.type('txt');
    }

    deprecate('res.send(status): Use res.sendStatus(status) instead');
    this.statusCode = chunk;
    chunk = statuses.message[chunk];
  }

  switch (typeof chunk) {
    // string defaulting to html
    case 'string':
      if (!this.get('Content-Type')) {
        this.type('html');
      }
      break;
    case 'boolean':
    case 'number':
    case 'object':
      if (chunk === null) {
        chunk = '';
      } else if (Buffer$1.isBuffer(chunk)) {
        if (!this.get('Content-Type')) {
          this.type('bin');
        }
      } else {
        return this.json(chunk);
      }
      break;
  }

  // write strings in utf-8
  if (typeof chunk === 'string') {
    encoding = 'utf8';
    type = this.get('Content-Type');

    // reflect this in content-type
    if (typeof type === 'string') {
      this.set('Content-Type', setCharset(type, 'utf-8'));
    }
  }

  // determine if ETag should be generated
  var etagFn = app.get('etag fn');
  var generateETag = !this.get('ETag') && typeof etagFn === 'function';

  // populate Content-Length
  var len;
  if (chunk !== undefined) {
    if (Buffer$1.isBuffer(chunk)) {
      // get length of Buffer
      len = chunk.length;
    } else if (!generateETag && chunk.length < 1000) {
      // just calculate length when no ETag + small chunk
      len = Buffer$1.byteLength(chunk, encoding);
    } else {
      // convert chunk to Buffer and calculate
      chunk = Buffer$1.from(chunk, encoding);
      encoding = undefined;
      len = chunk.length;
    }

    this.set('Content-Length', len);
  }

  // populate ETag
  var etag;
  if (generateETag && len !== undefined) {
    if ((etag = etagFn(chunk, encoding))) {
      this.set('ETag', etag);
    }
  }

  // freshness
  if (req.fresh) this.statusCode = 304;

  // strip irrelevant headers
  if (204 === this.statusCode || 304 === this.statusCode) {
    this.removeHeader('Content-Type');
    this.removeHeader('Content-Length');
    this.removeHeader('Transfer-Encoding');
    chunk = '';
  }

  // alter headers for 205
  if (this.statusCode === 205) {
    this.set('Content-Length', '0');
    this.removeHeader('Transfer-Encoding');
    chunk = '';
  }

  if (req.method === 'HEAD') {
    // skip body for HEAD
    this.end();
  } else {
    // respond
    this.end(chunk, encoding);
  }

  return this;
};

/**
 * Send JSON response.
 *
 * Examples:
 *
 *     res.json(null);
 *     res.json({ user: 'tj' });
 *
 * @param {string|number|boolean|object} obj
 * @public
 */

res.json = function json(obj) {
  var val = obj;

  // allow status / body
  if (arguments.length === 2) {
    // res.json(body, status) backwards compat
    if (typeof arguments[1] === 'number') {
      deprecate('res.json(obj, status): Use res.status(status).json(obj) instead');
      this.statusCode = arguments[1];
    } else {
      deprecate('res.json(status, obj): Use res.status(status).json(obj) instead');
      this.statusCode = arguments[0];
      val = arguments[1];
    }
  }

  // settings
  var app = this.app;
  var escape = app.get('json escape');
  var replacer = app.get('json replacer');
  var spaces = app.get('json spaces');
  var body = stringify(val, replacer, spaces, escape);

  // content-type
  if (!this.get('Content-Type')) {
    this.set('Content-Type', 'application/json');
  }

  return this.send(body);
};

/**
 * Send JSON response with JSONP callback support.
 *
 * Examples:
 *
 *     res.jsonp(null);
 *     res.jsonp({ user: 'tj' });
 *
 * @param {string|number|boolean|object} obj
 * @public
 */

res.jsonp = function jsonp(obj) {
  var val = obj;

  // allow status / body
  if (arguments.length === 2) {
    // res.jsonp(body, status) backwards compat
    if (typeof arguments[1] === 'number') {
      deprecate('res.jsonp(obj, status): Use res.status(status).jsonp(obj) instead');
      this.statusCode = arguments[1];
    } else {
      deprecate('res.jsonp(status, obj): Use res.status(status).jsonp(obj) instead');
      this.statusCode = arguments[0];
      val = arguments[1];
    }
  }

  // settings
  var app = this.app;
  var escape = app.get('json escape');
  var replacer = app.get('json replacer');
  var spaces = app.get('json spaces');
  var body = stringify(val, replacer, spaces, escape);
  var callback = this.req.query[app.get('jsonp callback name')];

  // content-type
  if (!this.get('Content-Type')) {
    this.set('X-Content-Type-Options', 'nosniff');
    this.set('Content-Type', 'application/json');
  }

  // fixup callback
  if (Array.isArray(callback)) {
    callback = callback[0];
  }

  // jsonp
  if (typeof callback === 'string' && callback.length !== 0) {
    this.set('X-Content-Type-Options', 'nosniff');
    this.set('Content-Type', 'text/javascript');

    // restrict callback charset
    callback = callback.replace(/[^\[\]\w$.]/g, '');

    if (body === undefined) {
      // empty argument
      body = '';
    } else if (typeof body === 'string') {
      // replace chars not allowed in JavaScript that are in JSON
      body = body
        .replace(/\u2028/g, '\\u2028')
        .replace(/\u2029/g, '\\u2029');
    }

    // the /**/ is a specific security mitigation for "Rosetta Flash JSONP abuse"
    // the typeof check is just to reduce client error noise
    body = '/**/ typeof ' + callback + ' === \'function\' && ' + callback + '(' + body + ');';
  }

  return this.send(body);
};

/**
 * Send given HTTP status code.
 *
 * Sets the response status to `statusCode` and the body of the
 * response to the standard description from node's http.STATUS_CODES
 * or the statusCode number if no description.
 *
 * Examples:
 *
 *     res.sendStatus(200);
 *
 * @param {number} statusCode
 * @public
 */

res.sendStatus = function sendStatus(statusCode) {
  var body = statuses.message[statusCode] || String(statusCode);

  this.statusCode = statusCode;
  this.type('txt');

  return this.send(body);
};

/**
 * Transfer the file at the given `path`.
 *
 * Automatically sets the _Content-Type_ response header field.
 * The callback `callback(err)` is invoked when the transfer is complete
 * or when an error occurs. Be sure to check `res.headersSent`
 * if you wish to attempt responding, as the header and some data
 * may have already been transferred.
 *
 * Options:
 *
 *   - `maxAge`   defaulting to 0 (can be string converted by `ms`)
 *   - `root`     root directory for relative filenames
 *   - `headers`  object of headers to serve with file
 *   - `dotfiles` serve dotfiles, defaulting to false; can be `"allow"` to send them
 *
 * Other options are passed along to `send`.
 *
 * Examples:
 *
 *  The following example illustrates how `res.sendFile()` may
 *  be used as an alternative for the `static()` middleware for
 *  dynamic situations. The code backing `res.sendFile()` is actually
 *  the same code, so HTTP cache support etc is identical.
 *
 *     app.get('/user/:uid/photos/:file', function(req, res){
 *       var uid = req.params.uid
 *         , file = req.params.file;
 *
 *       req.user.mayViewFilesFrom(uid, function(yes){
 *         if (yes) {
 *           res.sendFile('/uploads/' + uid + '/' + file);
 *         } else {
 *           res.send(403, 'Sorry! you cant see that.');
 *         }
 *       });
 *     });
 *
 * @public
 */

res.sendFile = function sendFile(path, options, callback) {
  var done = callback;
  var req = this.req;
  var res = this;
  var next = req.next;
  var opts = options || {};

  if (!path) {
    throw new TypeError('path argument is required to res.sendFile');
  }

  if (typeof path !== 'string') {
    throw new TypeError('path must be a string to res.sendFile')
  }

  // support function as second arg
  if (typeof options === 'function') {
    done = options;
    opts = {};
  }

  if (!opts.root && !isAbsolute$1(path)) {
    throw new TypeError('path must be absolute or specify root to res.sendFile');
  }

  // create file stream
  var pathname = encodeURI(path);
  var file = send(req, pathname, opts);

  // transfer
  sendfile(res, file, opts, function (err) {
    if (done) return done(err);
    if (err && err.code === 'EISDIR') return next();

    // next() all but write errors
    if (err && err.code !== 'ECONNABORTED' && err.syscall !== 'write') {
      next(err);
    }
  });
};

/**
 * Transfer the file at the given `path`.
 *
 * Automatically sets the _Content-Type_ response header field.
 * The callback `callback(err)` is invoked when the transfer is complete
 * or when an error occurs. Be sure to check `res.headersSent`
 * if you wish to attempt responding, as the header and some data
 * may have already been transferred.
 *
 * Options:
 *
 *   - `maxAge`   defaulting to 0 (can be string converted by `ms`)
 *   - `root`     root directory for relative filenames
 *   - `headers`  object of headers to serve with file
 *   - `dotfiles` serve dotfiles, defaulting to false; can be `"allow"` to send them
 *
 * Other options are passed along to `send`.
 *
 * Examples:
 *
 *  The following example illustrates how `res.sendfile()` may
 *  be used as an alternative for the `static()` middleware for
 *  dynamic situations. The code backing `res.sendfile()` is actually
 *  the same code, so HTTP cache support etc is identical.
 *
 *     app.get('/user/:uid/photos/:file', function(req, res){
 *       var uid = req.params.uid
 *         , file = req.params.file;
 *
 *       req.user.mayViewFilesFrom(uid, function(yes){
 *         if (yes) {
 *           res.sendfile('/uploads/' + uid + '/' + file);
 *         } else {
 *           res.send(403, 'Sorry! you cant see that.');
 *         }
 *       });
 *     });
 *
 * @public
 */

res.sendfile = function (path, options, callback) {
  var done = callback;
  var req = this.req;
  var res = this;
  var next = req.next;
  var opts = options || {};

  // support function as second arg
  if (typeof options === 'function') {
    done = options;
    opts = {};
  }

  // create file stream
  var file = send(req, path, opts);

  // transfer
  sendfile(res, file, opts, function (err) {
    if (done) return done(err);
    if (err && err.code === 'EISDIR') return next();

    // next() all but write errors
    if (err && err.code !== 'ECONNABORTED' && err.syscall !== 'write') {
      next(err);
    }
  });
};

res.sendfile = deprecate.function(res.sendfile,
  'res.sendfile: Use res.sendFile instead');

/**
 * Transfer the file at the given `path` as an attachment.
 *
 * Optionally providing an alternate attachment `filename`,
 * and optional callback `callback(err)`. The callback is invoked
 * when the data transfer is complete, or when an error has
 * occurred. Be sure to check `res.headersSent` if you plan to respond.
 *
 * Optionally providing an `options` object to use with `res.sendFile()`.
 * This function will set the `Content-Disposition` header, overriding
 * any `Content-Disposition` header passed as header options in order
 * to set the attachment and filename.
 *
 * This method uses `res.sendFile()`.
 *
 * @public
 */

res.download = function download (path, filename, options, callback) {
  var done = callback;
  var name = filename;
  var opts = options || null;

  // support function as second or third arg
  if (typeof filename === 'function') {
    done = filename;
    name = null;
    opts = null;
  } else if (typeof options === 'function') {
    done = options;
    opts = null;
  }

  // support optional filename, where options may be in it's place
  if (typeof filename === 'object' &&
    (typeof options === 'function' || options === undefined)) {
    name = null;
    opts = filename;
  }

  // set Content-Disposition when file is sent
  var headers = {
    'Content-Disposition': contentDisposition(name || path)
  };

  // merge user-provided headers
  if (opts && opts.headers) {
    var keys = Object.keys(opts.headers);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (key.toLowerCase() !== 'content-disposition') {
        headers[key] = opts.headers[key];
      }
    }
  }

  // merge user-provided options
  opts = Object.create(opts);
  opts.headers = headers;

  // Resolve the full path for sendFile
  var fullPath = !opts.root
    ? resolve$1(path)
    : path;

  // send file
  return this.sendFile(fullPath, opts, done)
};

/**
 * Set _Content-Type_ response header with `type` through `mime.lookup()`
 * when it does not contain "/", or set the Content-Type to `type` otherwise.
 *
 * Examples:
 *
 *     res.type('.html');
 *     res.type('html');
 *     res.type('json');
 *     res.type('application/json');
 *     res.type('png');
 *
 * @param {String} type
 * @return {ServerResponse} for chaining
 * @public
 */

res.contentType =
res.type = function contentType(type) {
  var ct = type.indexOf('/') === -1
    ? mime.lookup(type)
    : type;

  return this.set('Content-Type', ct);
};

/**
 * Respond to the Acceptable formats using an `obj`
 * of mime-type callbacks.
 *
 * This method uses `req.accepted`, an array of
 * acceptable types ordered by their quality values.
 * When "Accept" is not present the _first_ callback
 * is invoked, otherwise the first match is used. When
 * no match is performed the server responds with
 * 406 "Not Acceptable".
 *
 * Content-Type is set for you, however if you choose
 * you may alter this within the callback using `res.type()`
 * or `res.set('Content-Type', ...)`.
 *
 *    res.format({
 *      'text/plain': function(){
 *        res.send('hey');
 *      },
 *
 *      'text/html': function(){
 *        res.send('<p>hey</p>');
 *      },
 *
 *      'application/json': function () {
 *        res.send({ message: 'hey' });
 *      }
 *    });
 *
 * In addition to canonicalized MIME types you may
 * also use extnames mapped to these types:
 *
 *    res.format({
 *      text: function(){
 *        res.send('hey');
 *      },
 *
 *      html: function(){
 *        res.send('<p>hey</p>');
 *      },
 *
 *      json: function(){
 *        res.send({ message: 'hey' });
 *      }
 *    });
 *
 * By default Express passes an `Error`
 * with a `.status` of 406 to `next(err)`
 * if a match is not made. If you provide
 * a `.default` callback it will be invoked
 * instead.
 *
 * @param {Object} obj
 * @return {ServerResponse} for chaining
 * @public
 */

res.format = function(obj){
  var req = this.req;
  var next = req.next;

  var keys = Object.keys(obj)
    .filter(function (v) { return v !== 'default' });

  var key = keys.length > 0
    ? req.accepts(keys)
    : false;

  this.vary("Accept");

  if (key) {
    this.set('Content-Type', normalizeType(key).value);
    obj[key](req, this, next);
  } else if (obj.default) {
    obj.default(req, this, next);
  } else {
    next(createError(406, {
      types: normalizeTypes(keys).map(function (o) { return o.value })
    }));
  }

  return this;
};

/**
 * Set _Content-Disposition_ header to _attachment_ with optional `filename`.
 *
 * @param {String} filename
 * @return {ServerResponse}
 * @public
 */

res.attachment = function attachment(filename) {
  if (filename) {
    this.type(extname(filename));
  }

  this.set('Content-Disposition', contentDisposition(filename));

  return this;
};

/**
 * Append additional header `field` with value `val`.
 *
 * Example:
 *
 *    res.append('Link', ['<http://localhost/>', '<http://localhost:3000/>']);
 *    res.append('Set-Cookie', 'foo=bar; Path=/; HttpOnly');
 *    res.append('Warning', '199 Miscellaneous warning');
 *
 * @param {String} field
 * @param {String|Array} val
 * @return {ServerResponse} for chaining
 * @public
 */

res.append = function append(field, val) {
  var prev = this.get(field);
  var value = val;

  if (prev) {
    // concat the new and prev vals
    value = Array.isArray(prev) ? prev.concat(val)
      : Array.isArray(val) ? [prev].concat(val)
        : [prev, val];
  }

  return this.set(field, value);
};

/**
 * Set header `field` to `val`, or pass
 * an object of header fields.
 *
 * Examples:
 *
 *    res.set('Foo', ['bar', 'baz']);
 *    res.set('Accept', 'application/json');
 *    res.set({ Accept: 'text/plain', 'X-API-Key': 'tobi' });
 *
 * Aliased as `res.header()`.
 *
 * @param {String|Object} field
 * @param {String|Array} val
 * @return {ServerResponse} for chaining
 * @public
 */

res.set =
res.header = function header(field, val) {
  if (arguments.length === 2) {
    var value = Array.isArray(val)
      ? val.map(String)
      : String(val);

    // add charset to content-type
    if (field.toLowerCase() === 'content-type') {
      if (Array.isArray(value)) {
        throw new TypeError('Content-Type cannot be set to an Array');
      }
      if (!charsetRegExp.test(value)) {
        var charset = mime.charsets.lookup(value.split(';')[0]);
        if (charset) value += '; charset=' + charset.toLowerCase();
      }
    }

    this.setHeader(field, value);
  } else {
    for (var key in field) {
      this.set(key, field[key]);
    }
  }
  return this;
};

/**
 * Get value for header `field`.
 *
 * @param {String} field
 * @return {String}
 * @public
 */

res.get = function(field){
  return this.getHeader(field);
};

/**
 * Clear cookie `name`.
 *
 * @param {String} name
 * @param {Object} [options]
 * @return {ServerResponse} for chaining
 * @public
 */

res.clearCookie = function clearCookie(name, options) {
  if (options) {
    if (options.maxAge) {
      deprecate('res.clearCookie: Passing "options.maxAge" is deprecated. In v5.0.0 of Express, this option will be ignored, as res.clearCookie will automatically set cookies to expire immediately. Please update your code to omit this option.');
    }
    if (options.expires) {
      deprecate('res.clearCookie: Passing "options.expires" is deprecated. In v5.0.0 of Express, this option will be ignored, as res.clearCookie will automatically set cookies to expire immediately. Please update your code to omit this option.');
    }
  }
  var opts = merge({ expires: new Date(1), path: '/' }, options);

  return this.cookie(name, '', opts);
};

/**
 * Set cookie `name` to `value`, with the given `options`.
 *
 * Options:
 *
 *    - `maxAge`   max-age in milliseconds, converted to `expires`
 *    - `signed`   sign the cookie
 *    - `path`     defaults to "/"
 *
 * Examples:
 *
 *    // "Remember Me" for 15 minutes
 *    res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true });
 *
 *    // same as above
 *    res.cookie('rememberme', '1', { maxAge: 900000, httpOnly: true })
 *
 * @param {String} name
 * @param {String|Object} value
 * @param {Object} [options]
 * @return {ServerResponse} for chaining
 * @public
 */

res.cookie = function (name, value, options) {
  var opts = merge({}, options);
  var secret = this.req.secret;
  var signed = opts.signed;

  if (signed && !secret) {
    throw new Error('cookieParser("secret") required for signed cookies');
  }

  var val = typeof value === 'object'
    ? 'j:' + JSON.stringify(value)
    : String(value);

  if (signed) {
    val = 's:' + sign(val, secret);
  }

  if (opts.maxAge != null) {
    var maxAge = opts.maxAge - 0;

    if (!isNaN(maxAge)) {
      opts.expires = new Date(Date.now() + maxAge);
      opts.maxAge = Math.floor(maxAge / 1000);
    }
  }

  if (opts.path == null) {
    opts.path = '/';
  }

  this.append('Set-Cookie', cookie.serialize(name, String(val), opts));

  return this;
};

/**
 * Set the location header to `url`.
 *
 * The given `url` can also be "back", which redirects
 * to the _Referrer_ or _Referer_ headers or "/".
 *
 * Examples:
 *
 *    res.location('/foo/bar').;
 *    res.location('http://example.com');
 *    res.location('../login');
 *
 * @param {String} url
 * @return {ServerResponse} for chaining
 * @public
 */

res.location = function location(url) {
  var loc;

  // "back" is an alias for the referrer
  if (url === 'back') {
    deprecate('res.location("back"): use res.location(req.get("Referrer") || "/") and refer to https://dub.sh/security-redirect for best practices');
    loc = this.req.get('Referrer') || '/';
  } else {
    loc = String(url);
  }

  return this.set('Location', encodeUrl(loc));
};

/**
 * Redirect to the given `url` with optional response `status`
 * defaulting to 302.
 *
 * The resulting `url` is determined by `res.location()`, so
 * it will play nicely with mounted apps, relative paths,
 * `"back"` etc.
 *
 * Examples:
 *
 *    res.redirect('/foo/bar');
 *    res.redirect('http://example.com');
 *    res.redirect(301, 'http://example.com');
 *    res.redirect('../login'); // /blog/post/1 -> /blog/login
 *
 * @public
 */

res.redirect = function redirect(url) {
  var address = url;
  var body;
  var status = 302;

  // allow status / url
  if (arguments.length === 2) {
    if (typeof arguments[0] === 'number') {
      status = arguments[0];
      address = arguments[1];
    } else {
      deprecate('res.redirect(url, status): Use res.redirect(status, url) instead');
      status = arguments[1];
    }
  }

  // Set location header
  address = this.location(address).get('Location');

  // Support text/{plain,html} by default
  this.format({
    text: function(){
      body = statuses.message[status] + '. Redirecting to ' + address;
    },

    html: function(){
      var u = escapeHtml(address);
      body = '<p>' + statuses.message[status] + '. Redirecting to ' + u + '</p>';
    },

    default: function(){
      body = '';
    }
  });

  // Respond
  this.statusCode = status;
  this.set('Content-Length', Buffer$1.byteLength(body));

  if (this.req.method === 'HEAD') {
    this.end();
  } else {
    this.end(body);
  }
};

/**
 * Add `field` to Vary. If already present in the Vary set, then
 * this call is simply ignored.
 *
 * @param {Array|String} field
 * @return {ServerResponse} for chaining
 * @public
 */

res.vary = function(field){
  // checks for back-compat
  if (!field || (Array.isArray(field) && !field.length)) {
    deprecate('res.vary(): Provide a field name');
    return this;
  }

  vary(this, field);

  return this;
};

/**
 * Render `view` with the given `options` and optional callback `fn`.
 * When a callback function is given a response will _not_ be made
 * automatically, otherwise a response of _200_ and _text/html_ is given.
 *
 * Options:
 *
 *  - `cache`     boolean hinting to the engine it should cache
 *  - `filename`  filename of the view being rendered
 *
 * @public
 */

res.render = function render(view, options, callback) {
  var app = this.req.app;
  var done = callback;
  var opts = options || {};
  var req = this.req;
  var self = this;

  // support callback function as second arg
  if (typeof options === 'function') {
    done = options;
    opts = {};
  }

  // merge res.locals
  opts._locals = self.locals;

  // default callback to respond
  done = done || function (err, str) {
    if (err) return req.next(err);
    self.send(str);
  };

  // render
  app.render(view, opts, done);
};

// pipe the send file stream
function sendfile(res, file, options, callback) {
  var done = false;
  var streaming;

  // request aborted
  function onaborted() {
    if (done) return;
    done = true;

    var err = new Error('Request aborted');
    err.code = 'ECONNABORTED';
    callback(err);
  }

  // directory
  function ondirectory() {
    if (done) return;
    done = true;

    var err = new Error('EISDIR, read');
    err.code = 'EISDIR';
    callback(err);
  }

  // errors
  function onerror(err) {
    if (done) return;
    done = true;
    callback(err);
  }

  // ended
  function onend() {
    if (done) return;
    done = true;
    callback();
  }

  // file
  function onfile() {
    streaming = false;
  }

  // finished
  function onfinish(err) {
    if (err && err.code === 'ECONNRESET') return onaborted();
    if (err) return onerror(err);
    if (done) return;

    setImmediate(function () {
      if (streaming !== false && !done) {
        onaborted();
        return;
      }

      if (done) return;
      done = true;
      callback();
    });
  }

  // streaming
  function onstream() {
    streaming = true;
  }

  file.on('directory', ondirectory);
  file.on('end', onend);
  file.on('error', onerror);
  file.on('file', onfile);
  file.on('stream', onstream);
  onFinished(res, onfinish);

  if (options.headers) {
    // set headers on successful transfer
    file.on('headers', function headers(res) {
      var obj = options.headers;
      var keys = Object.keys(obj);

      for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        res.setHeader(k, obj[k]);
      }
    });
  }

  // pipe
  file.pipe(res);
}

/**
 * Stringify JSON, like JSON.stringify, but v8 optimized, with the
 * ability to escape characters that can trigger HTML sniffing.
 *
 * @param {*} value
 * @param {function} replacer
 * @param {number} spaces
 * @param {boolean} escape
 * @returns {string}
 * @private
 */

function stringify (value, replacer, spaces, escape) {
  // v8 checks arguments.length for optimizing simple call
  // https://bugs.chromium.org/p/v8/issues/detail?id=4730
  var json = replacer || spaces
    ? JSON.stringify(value, replacer, spaces)
    : JSON.stringify(value);

  if (escape && typeof json === 'string') {
    json = json.replace(/[<>&]/g, function (c) {
      switch (c.charCodeAt(0)) {
        case 0x3c:
          return '\\u003c'
        case 0x3e:
          return '\\u003e'
        case 0x26:
          return '\\u0026'
        /* istanbul ignore next: unreachable default */
        default:
          return c
      }
    });
  }

  return json
}

const require$$9 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(serveStatic);

/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */

(function (module, exports) {

	/**
	 * Module dependencies.
	 */

	var bodyParser = require$$0$4;
	var EventEmitter = require$$8$3.EventEmitter;
	var mixin = require$$2$7;
	var proto = applicationExports;
	var Route = route;
	var Router = routerExports;
	var req = request;
	var res = response;

	/**
	 * Expose `createApplication()`.
	 */

	exports = module.exports = createApplication;

	/**
	 * Create an express application.
	 *
	 * @return {Function}
	 * @api public
	 */

	function createApplication() {
	  var app = function(req, res, next) {
	    app.handle(req, res, next);
	  };

	  mixin(app, EventEmitter.prototype, false);
	  mixin(app, proto, false);

	  // expose the prototype that will get set on requests
	  app.request = Object.create(req, {
	    app: { configurable: true, enumerable: true, writable: true, value: app }
	  });

	  // expose the prototype that will get set on responses
	  app.response = Object.create(res, {
	    app: { configurable: true, enumerable: true, writable: true, value: app }
	  });

	  app.init();
	  return app;
	}

	/**
	 * Expose the prototypes.
	 */

	exports.application = proto;
	exports.request = req;
	exports.response = res;

	/**
	 * Expose constructors.
	 */

	exports.Route = Route;
	exports.Router = Router;

	/**
	 * Expose middleware
	 */

	exports.json = bodyParser.json;
	exports.query = /*@__PURE__*/ requireQuery();
	exports.raw = bodyParser.raw;
	exports.static = require$$9;
	exports.text = bodyParser.text;
	exports.urlencoded = bodyParser.urlencoded;

	/**
	 * Replace removed middleware with an appropriate error message.
	 */

	var removedMiddlewares = [
	  'bodyParser',
	  'compress',
	  'cookieSession',
	  'session',
	  'logger',
	  'cookieParser',
	  'favicon',
	  'responseTime',
	  'errorHandler',
	  'timeout',
	  'methodOverride',
	  'vhost',
	  'csrf',
	  'directory',
	  'limit',
	  'multipart',
	  'staticCache'
	];

	removedMiddlewares.forEach(function (name) {
	  Object.defineProperty(exports, name, {
	    get: function () {
	      throw new Error('Most middleware (like ' + name + ') is no longer bundled with Express and must be installed separately. Please see https://github.com/senchalabs/connect#middleware.');
	    },
	    configurable: true
	  });
	}); 
} (express$2, express$2.exports));

var expressExports = express$2.exports;

/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */

var express = expressExports;

const express$1 = /*@__PURE__*/getDefaultExportFromCjs(express);

var dist$2 = {exports: {}};

const require$$2$2 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(require$$0$5);

const require$$4 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(require$$0$2$1);

const require$$6 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(engine);

var client = {};

const withNativeArrayBuffer = typeof ArrayBuffer === "function";
const isView = (obj) => {
    return typeof ArrayBuffer.isView === "function"
        ? ArrayBuffer.isView(obj)
        : obj.buffer instanceof ArrayBuffer;
};
const toString = Object.prototype.toString;
const withNativeBlob = typeof Blob === "function" ||
    (typeof Blob !== "undefined" &&
        toString.call(Blob) === "[object BlobConstructor]");
const withNativeFile = typeof File === "function" ||
    (typeof File !== "undefined" &&
        toString.call(File) === "[object FileConstructor]");
/**
 * Returns true if obj is a Buffer, an ArrayBuffer, a Blob or a File.
 *
 * @private
 */
function isBinary(obj) {
    return ((withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj))) ||
        (withNativeBlob && obj instanceof Blob) ||
        (withNativeFile && obj instanceof File));
}
function hasBinary(obj, toJSON) {
    if (!obj || typeof obj !== "object") {
        return false;
    }
    if (Array.isArray(obj)) {
        for (let i = 0, l = obj.length; i < l; i++) {
            if (hasBinary(obj[i])) {
                return true;
            }
        }
        return false;
    }
    if (isBinary(obj)) {
        return true;
    }
    if (obj.toJSON &&
        typeof obj.toJSON === "function" &&
        arguments.length === 1) {
        return hasBinary(obj.toJSON(), true);
    }
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
            return true;
        }
    }
    return false;
}

/**
 * Replaces every Buffer | ArrayBuffer | Blob | File in packet with a numbered placeholder.
 *
 * @param {Object} packet - socket.io event packet
 * @return {Object} with deconstructed packet and list of buffers
 * @public
 */
function deconstructPacket(packet) {
    const buffers = [];
    const packetData = packet.data;
    const pack = packet;
    pack.data = _deconstructPacket(packetData, buffers);
    pack.attachments = buffers.length; // number of binary 'attachments'
    return { packet: pack, buffers: buffers };
}
function _deconstructPacket(data, buffers) {
    if (!data)
        return data;
    if (isBinary(data)) {
        const placeholder = { _placeholder: true, num: buffers.length };
        buffers.push(data);
        return placeholder;
    }
    else if (Array.isArray(data)) {
        const newData = new Array(data.length);
        for (let i = 0; i < data.length; i++) {
            newData[i] = _deconstructPacket(data[i], buffers);
        }
        return newData;
    }
    else if (typeof data === "object" && !(data instanceof Date)) {
        const newData = {};
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                newData[key] = _deconstructPacket(data[key], buffers);
            }
        }
        return newData;
    }
    return data;
}
/**
 * Reconstructs a binary packet from its placeholder packet and buffers
 *
 * @param {Object} packet - event packet with placeholders
 * @param {Array} buffers - binary buffers to put in placeholder positions
 * @return {Object} reconstructed packet
 * @public
 */
function reconstructPacket(packet, buffers) {
    packet.data = _reconstructPacket(packet.data, buffers);
    delete packet.attachments; // no longer useful
    return packet;
}
function _reconstructPacket(data, buffers) {
    if (!data)
        return data;
    if (data && data._placeholder === true) {
        const isIndexValid = typeof data.num === "number" &&
            data.num >= 0 &&
            data.num < buffers.length;
        if (isIndexValid) {
            return buffers[data.num]; // appropriate buffer (should be natural order anyway)
        }
        else {
            throw new Error("illegal attachments");
        }
    }
    else if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
            data[i] = _reconstructPacket(data[i], buffers);
        }
    }
    else if (typeof data === "object") {
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                data[key] = _reconstructPacket(data[key], buffers);
            }
        }
    }
    return data;
}

const debug$6 = debug$b("socket.io-parser"); // debug()
/**
 * These strings must not be used as event names, as they have a special meaning.
 */
const RESERVED_EVENTS = [
    "connect", // used on the client side
    "connect_error", // used on the client side
    "disconnect", // used on both sides
    "disconnecting", // used on the server side
    "newListener", // used by the Node.js EventEmitter
    "removeListener", // used by the Node.js EventEmitter
];
/**
 * Protocol version.
 *
 * @public
 */
const protocol = 5;
var PacketType;
(function (PacketType) {
    PacketType[PacketType["CONNECT"] = 0] = "CONNECT";
    PacketType[PacketType["DISCONNECT"] = 1] = "DISCONNECT";
    PacketType[PacketType["EVENT"] = 2] = "EVENT";
    PacketType[PacketType["ACK"] = 3] = "ACK";
    PacketType[PacketType["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
    PacketType[PacketType["BINARY_EVENT"] = 5] = "BINARY_EVENT";
    PacketType[PacketType["BINARY_ACK"] = 6] = "BINARY_ACK";
})(PacketType || (PacketType = {}));
/**
 * A socket.io Encoder instance
 */
class Encoder {
    /**
     * Encoder constructor
     *
     * @param {function} replacer - custom replacer to pass down to JSON.parse
     */
    constructor(replacer) {
        this.replacer = replacer;
    }
    /**
     * Encode a packet as a single string if non-binary, or as a
     * buffer sequence, depending on packet type.
     *
     * @param {Object} obj - packet object
     */
    encode(obj) {
        debug$6("encoding packet %j", obj);
        if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
            if (hasBinary(obj)) {
                return this.encodeAsBinary({
                    type: obj.type === PacketType.EVENT
                        ? PacketType.BINARY_EVENT
                        : PacketType.BINARY_ACK,
                    nsp: obj.nsp,
                    data: obj.data,
                    id: obj.id,
                });
            }
        }
        return [this.encodeAsString(obj)];
    }
    /**
     * Encode packet as string.
     */
    encodeAsString(obj) {
        // first is type
        let str = "" + obj.type;
        // attachments if we have them
        if (obj.type === PacketType.BINARY_EVENT ||
            obj.type === PacketType.BINARY_ACK) {
            str += obj.attachments + "-";
        }
        // if we have a namespace other than `/`
        // we append it followed by a comma `,`
        if (obj.nsp && "/" !== obj.nsp) {
            str += obj.nsp + ",";
        }
        // immediately followed by the id
        if (null != obj.id) {
            str += obj.id;
        }
        // json data
        if (null != obj.data) {
            str += JSON.stringify(obj.data, this.replacer);
        }
        debug$6("encoded %j as %s", obj, str);
        return str;
    }
    /**
     * Encode packet as 'buffer sequence' by removing blobs, and
     * deconstructing packet into object with placeholders and
     * a list of buffers.
     */
    encodeAsBinary(obj) {
        const deconstruction = deconstructPacket(obj);
        const pack = this.encodeAsString(deconstruction.packet);
        const buffers = deconstruction.buffers;
        buffers.unshift(pack); // add packet info to beginning of data list
        return buffers; // write all the buffers
    }
}
/**
 * A socket.io Decoder instance
 *
 * @return {Object} decoder
 */
class Decoder extends Emitter {
    /**
     * Decoder constructor
     */
    constructor(opts) {
        super();
        this.opts = Object.assign({
            reviver: undefined,
            maxAttachments: 10,
        }, typeof opts === "function" ? { reviver: opts } : opts);
    }
    /**
     * Decodes an encoded packet string into packet JSON.
     *
     * @param {String} obj - encoded packet
     */
    add(obj) {
        let packet;
        if (typeof obj === "string") {
            if (this.reconstructor) {
                throw new Error("got plaintext data when reconstructing a packet");
            }
            packet = this.decodeString(obj);
            const isBinaryEvent = packet.type === PacketType.BINARY_EVENT;
            if (isBinaryEvent || packet.type === PacketType.BINARY_ACK) {
                packet.type = isBinaryEvent ? PacketType.EVENT : PacketType.ACK;
                // binary packet's json
                this.reconstructor = new BinaryReconstructor(packet);
                // no attachments, labeled binary but no binary data to follow
                if (packet.attachments === 0) {
                    super.emitReserved("decoded", packet);
                }
            }
            else {
                // non-binary full packet
                super.emitReserved("decoded", packet);
            }
        }
        else if (isBinary(obj) || obj.base64) {
            // raw binary data
            if (!this.reconstructor) {
                throw new Error("got binary data when not reconstructing a packet");
            }
            else {
                packet = this.reconstructor.takeBinaryData(obj);
                if (packet) {
                    // received final buffer
                    this.reconstructor = null;
                    super.emitReserved("decoded", packet);
                }
            }
        }
        else {
            throw new Error("Unknown type: " + obj);
        }
    }
    /**
     * Decode a packet String (JSON data)
     *
     * @param {String} str
     * @return {Object} packet
     */
    decodeString(str) {
        let i = 0;
        // look up type
        const p = {
            type: Number(str.charAt(0)),
        };
        if (PacketType[p.type] === undefined) {
            throw new Error("unknown packet type " + p.type);
        }
        // look up attachments if type binary
        if (p.type === PacketType.BINARY_EVENT ||
            p.type === PacketType.BINARY_ACK) {
            const start = i + 1;
            while (str.charAt(++i) !== "-" && i != str.length) { }
            const buf = str.substring(start, i);
            if (buf != Number(buf) || str.charAt(i) !== "-") {
                throw new Error("Illegal attachments");
            }
            const n = Number(buf);
            if (!isInteger(n) || n < 0) {
                throw new Error("Illegal attachments");
            }
            else if (n > this.opts.maxAttachments) {
                throw new Error("too many attachments");
            }
            p.attachments = n;
        }
        // look up namespace (if any)
        if ("/" === str.charAt(i + 1)) {
            const start = i + 1;
            while (++i) {
                const c = str.charAt(i);
                if ("," === c)
                    break;
                if (i === str.length)
                    break;
            }
            p.nsp = str.substring(start, i);
        }
        else {
            p.nsp = "/";
        }
        // look up id
        const next = str.charAt(i + 1);
        if ("" !== next && Number(next) == next) {
            const start = i + 1;
            while (++i) {
                const c = str.charAt(i);
                if (null == c || Number(c) != c) {
                    --i;
                    break;
                }
                if (i === str.length)
                    break;
            }
            p.id = Number(str.substring(start, i + 1));
        }
        // look up json data
        if (str.charAt(++i)) {
            const payload = this.tryParse(str.substr(i));
            if (Decoder.isPayloadValid(p.type, payload)) {
                p.data = payload;
            }
            else {
                throw new Error("invalid payload");
            }
        }
        debug$6("decoded %s as %j", str, p);
        return p;
    }
    tryParse(str) {
        try {
            return JSON.parse(str, this.opts.reviver);
        }
        catch (e) {
            return false;
        }
    }
    static isPayloadValid(type, payload) {
        switch (type) {
            case PacketType.CONNECT:
                return isObject(payload);
            case PacketType.DISCONNECT:
                return payload === undefined;
            case PacketType.CONNECT_ERROR:
                return typeof payload === "string" || isObject(payload);
            case PacketType.EVENT:
            case PacketType.BINARY_EVENT:
                return (Array.isArray(payload) &&
                    (typeof payload[0] === "number" ||
                        (typeof payload[0] === "string" &&
                            RESERVED_EVENTS.indexOf(payload[0]) === -1)));
            case PacketType.ACK:
            case PacketType.BINARY_ACK:
                return Array.isArray(payload);
        }
    }
    /**
     * Deallocates a parser's resources
     */
    destroy() {
        if (this.reconstructor) {
            this.reconstructor.finishedReconstruction();
            this.reconstructor = null;
        }
    }
}
/**
 * A manager of a binary event's 'buffer sequence'. Should
 * be constructed whenever a packet of type BINARY_EVENT is
 * decoded.
 *
 * @param {Object} packet
 * @return {BinaryReconstructor} initialized reconstructor
 */
class BinaryReconstructor {
    constructor(packet) {
        this.packet = packet;
        this.buffers = [];
        this.reconPack = packet;
    }
    /**
     * Method to be called when binary data received from connection
     * after a BINARY_EVENT packet.
     *
     * @param {Buffer | ArrayBuffer} binData - the raw binary data received
     * @return {null | Object} returns null if more binary data is expected or
     *   a reconstructed packet object if all buffers have been received.
     */
    takeBinaryData(binData) {
        this.buffers.push(binData);
        if (this.buffers.length === this.reconPack.attachments) {
            // done with buffer list
            const packet = reconstructPacket(this.reconPack, this.buffers);
            this.finishedReconstruction();
            return packet;
        }
        return null;
    }
    /**
     * Cleans up binary packet reconstruction variables.
     */
    finishedReconstruction() {
        this.reconPack = null;
        this.buffers = [];
    }
}
function isNamespaceValid(nsp) {
    return typeof nsp === "string";
}
// see https://caniuse.com/mdn-javascript_builtins_number_isinteger
const isInteger = Number.isInteger ||
    function (value) {
        return (typeof value === "number" &&
            isFinite(value) &&
            Math.floor(value) === value);
    };
function isAckIdValid(id) {
    return id === undefined || isInteger(id);
}
// see https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript
function isObject(value) {
    return Object.prototype.toString.call(value) === "[object Object]";
}
function isDataValid(type, payload) {
    switch (type) {
        case PacketType.CONNECT:
            return payload === undefined || isObject(payload);
        case PacketType.DISCONNECT:
            return payload === undefined;
        case PacketType.EVENT:
            return (Array.isArray(payload) &&
                (typeof payload[0] === "number" ||
                    (typeof payload[0] === "string" &&
                        RESERVED_EVENTS.indexOf(payload[0]) === -1)));
        case PacketType.ACK:
            return Array.isArray(payload);
        case PacketType.CONNECT_ERROR:
            return typeof payload === "string" || isObject(payload);
        default:
            return false;
    }
}
function isPacketValid(packet) {
    return (isNamespaceValid(packet.nsp) &&
        isAckIdValid(packet.id) &&
        isDataValid(packet.type, packet.data));
}

const parser = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Decoder: Decoder,
  Encoder: Encoder,
  get PacketType () { return PacketType; },
  isPacketValid: isPacketValid,
  protocol: protocol
}, Symbol.toStringTag, { value: 'Module' }));

var __importDefault$3 = (client && client.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(client, "__esModule", { value: true });
client.Client = void 0;
const socket_io_parser_1$2 = parser;
const debug_1$4 = __importDefault$3(require$$13$2);
const debug$5 = (0, debug_1$4.default)("socket.io:client");
class Client {
    /**
     * Client constructor.
     *
     * @param server instance
     * @param conn
     * @package
     */
    constructor(server, conn) {
        this.sockets = new Map();
        this.nsps = new Map();
        this.server = server;
        this.conn = conn;
        this.encoder = server.encoder;
        this.decoder = new server._parser.Decoder();
        // @ts-expect-error use of private
        this.id = conn.id;
        this.setup();
    }
    /**
     * @return the reference to the request that originated the Engine.IO connection
     *
     * @public
     */
    get request() {
        return this.conn.request;
    }
    /**
     * Sets up event listeners.
     *
     * @private
     */
    setup() {
        this.onclose = this.onclose.bind(this);
        this.ondata = this.ondata.bind(this);
        this.onerror = this.onerror.bind(this);
        this.ondecoded = this.ondecoded.bind(this);
        // @ts-ignore
        this.decoder.on("decoded", this.ondecoded);
        this.conn.on("data", this.ondata);
        this.conn.on("error", this.onerror);
        this.conn.on("close", this.onclose);
        this.connectTimeout = setTimeout(() => {
            if (this.nsps.size === 0) {
                debug$5("no namespace joined yet, close the client");
                this.close();
            }
            else {
                debug$5("the client has already joined a namespace, nothing to do");
            }
        }, this.server._connectTimeout);
    }
    /**
     * Connects a client to a namespace.
     *
     * @param {String} name - the namespace
     * @param {Object} auth - the auth parameters
     * @private
     */
    connect(name, auth = {}) {
        if (this.server._nsps.has(name)) {
            debug$5("connecting to namespace %s", name);
            return this.doConnect(name, auth);
        }
        this.server._checkNamespace(name, auth, (dynamicNspName) => {
            if (dynamicNspName) {
                this.doConnect(name, auth);
            }
            else {
                debug$5("creation of namespace %s was denied", name);
                this._packet({
                    type: socket_io_parser_1$2.PacketType.CONNECT_ERROR,
                    nsp: name,
                    data: {
                        message: "Invalid namespace",
                    },
                });
            }
        });
    }
    /**
     * Connects a client to a namespace.
     *
     * @param name - the namespace
     * @param {Object} auth - the auth parameters
     *
     * @private
     */
    doConnect(name, auth) {
        const nsp = this.server.of(name);
        nsp._add(this, auth, (socket) => {
            this.sockets.set(socket.id, socket);
            this.nsps.set(nsp.name, socket);
            if (this.connectTimeout) {
                clearTimeout(this.connectTimeout);
                this.connectTimeout = undefined;
            }
        });
    }
    /**
     * Disconnects from all namespaces and closes transport.
     *
     * @private
     */
    _disconnect() {
        for (const socket of this.sockets.values()) {
            socket.disconnect();
        }
        this.sockets.clear();
        this.close();
    }
    /**
     * Removes a socket. Called by each `Socket`.
     *
     * @private
     */
    _remove(socket) {
        if (this.sockets.has(socket.id)) {
            const nsp = this.sockets.get(socket.id).nsp.name;
            this.sockets.delete(socket.id);
            this.nsps.delete(nsp);
        }
        else {
            debug$5("ignoring remove for %s", socket.id);
        }
    }
    /**
     * Closes the underlying connection.
     *
     * @private
     */
    close() {
        if ("open" === this.conn.readyState) {
            debug$5("forcing transport close");
            this.conn.close();
            this.onclose("forced server close");
        }
    }
    /**
     * Writes a packet to the transport.
     *
     * @param {Object} packet object
     * @param {Object} opts
     * @private
     */
    _packet(packet, opts = {}) {
        if (this.conn.readyState !== "open") {
            debug$5("ignoring packet write %j", packet);
            return;
        }
        const encodedPackets = opts.preEncoded
            ? packet // previous versions of the adapter incorrectly used socket.packet() instead of writeToEngine()
            : this.encoder.encode(packet);
        this.writeToEngine(encodedPackets, opts);
    }
    writeToEngine(encodedPackets, opts) {
        if (opts.volatile && !this.conn.transport.writable) {
            debug$5("volatile packet is discarded since the transport is not currently writable");
            return;
        }
        const packets = Array.isArray(encodedPackets)
            ? encodedPackets
            : [encodedPackets];
        for (const encodedPacket of packets) {
            this.conn.write(encodedPacket, opts);
        }
    }
    /**
     * Called with incoming transport data.
     *
     * @private
     */
    ondata(data) {
        // try/catch is needed for protocol violations (GH-1880)
        try {
            this.decoder.add(data);
        }
        catch (e) {
            debug$5("invalid packet format");
            this.onerror(e);
        }
    }
    /**
     * Called when parser fully decodes a packet.
     *
     * @private
     */
    ondecoded(packet) {
        const { namespace, authPayload } = this._parseNamespace(packet);
        const socket = this.nsps.get(namespace);
        if (!socket && packet.type === socket_io_parser_1$2.PacketType.CONNECT) {
            this.connect(namespace, authPayload);
        }
        else if (socket &&
            packet.type !== socket_io_parser_1$2.PacketType.CONNECT &&
            packet.type !== socket_io_parser_1$2.PacketType.CONNECT_ERROR) {
            process.nextTick(function () {
                socket._onpacket(packet);
            });
        }
        else {
            debug$5("invalid state (packet type: %s)", packet.type);
            this.close();
        }
    }
    _parseNamespace(packet) {
        if (this.conn.protocol !== 3) {
            return {
                namespace: packet.nsp,
                authPayload: packet.data,
            };
        }
        const url = new URL(packet.nsp, "https://socket.io");
        return {
            namespace: url.pathname,
            authPayload: Object.fromEntries(url.searchParams.entries()),
        };
    }
    /**
     * Handles an error.
     *
     * @param {Object} err object
     * @private
     */
    onerror(err) {
        for (const socket of this.sockets.values()) {
            socket._onerror(err);
        }
        this.conn.close();
    }
    /**
     * Called upon transport close.
     *
     * @param reason
     * @param description
     * @private
     */
    onclose(reason, description) {
        debug$5("client close with reason %s", reason);
        // ignore a potential subsequent `close` event
        this.destroy();
        // `nsps` and `sockets` are cleaned up seamlessly
        for (const socket of this.sockets.values()) {
            socket._onclose(reason, description);
        }
        this.sockets.clear();
        this.decoder.destroy(); // clean up decoder
    }
    /**
     * Cleans up event listeners.
     * @private
     */
    destroy() {
        this.conn.removeListener("data", this.ondata);
        this.conn.removeListener("error", this.onerror);
        this.conn.removeListener("close", this.onclose);
        // @ts-ignore
        this.decoder.removeListener("decoded", this.ondecoded);
        if (this.connectTimeout) {
            clearTimeout(this.connectTimeout);
            this.connectTimeout = undefined;
        }
    }
}
client.Client = Client;

var namespace = {};

var socket = {};

var typedEvents = {};

Object.defineProperty(typedEvents, "__esModule", { value: true });
typedEvents.StrictEventEmitter = void 0;
const events_1$1 = require$$8$3;
/**
 * Strictly typed version of an `EventEmitter`. A `TypedEventEmitter` takes type
 * parameters for mappings of event names to event data types, and strictly
 * types method calls to the `EventEmitter` according to these event maps.
 *
 * @typeParam ListenEvents - `EventsMap` of user-defined events that can be
 * listened to with `on` or `once`
 * @typeParam EmitEvents - `EventsMap` of user-defined events that can be
 * emitted with `emit`
 * @typeParam ReservedEvents - `EventsMap` of reserved events, that can be
 * emitted by socket.io with `emitReserved`, and can be listened to with
 * `listen`.
 */
class StrictEventEmitter extends events_1$1.EventEmitter {
    /**
     * Adds the `listener` function as an event listener for `ev`.
     *
     * @param ev Name of the event
     * @param listener Callback function
     */
    on(ev, listener) {
        return super.on(ev, listener);
    }
    /**
     * Adds a one-time `listener` function as an event listener for `ev`.
     *
     * @param ev Name of the event
     * @param listener Callback function
     */
    once(ev, listener) {
        return super.once(ev, listener);
    }
    /**
     * Emits an event.
     *
     * @param ev Name of the event
     * @param args Values to send to listeners of this event
     */
    emit(ev, ...args) {
        return super.emit(ev, ...args);
    }
    /**
     * Emits a reserved event.
     *
     * This method is `protected`, so that only a class extending
     * `StrictEventEmitter` can emit its own reserved events.
     *
     * @param ev Reserved event name
     * @param args Arguments to emit along with the event
     */
    emitReserved(ev, ...args) {
        return super.emit(ev, ...args);
    }
    /**
     * Emits an event.
     *
     * This method is `protected`, so that only a class extending
     * `StrictEventEmitter` can get around the strict typing. This is useful for
     * calling `emit.apply`, which can be called as `emitUntyped.apply`.
     *
     * @param ev Event name
     * @param args Arguments to emit along with the event
     */
    emitUntyped(ev, ...args) {
        return super.emit(ev, ...args);
    }
    /**
     * Returns the listeners listening to an event.
     *
     * @param event Event name
     * @returns Array of listeners subscribed to `event`
     */
    listeners(event) {
        return super.listeners(event);
    }
}
typedEvents.StrictEventEmitter = StrictEventEmitter;

const require$$3 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(base64id);

var broadcastOperator = {};

var socketTypes = {};

Object.defineProperty(socketTypes, "__esModule", { value: true });
socketTypes.RESERVED_EVENTS = void 0;
socketTypes.RESERVED_EVENTS = new Set([
    "connect",
    "connect_error",
    "disconnect",
    "disconnecting",
    "newListener",
    "removeListener",
]);

Object.defineProperty(broadcastOperator, "__esModule", { value: true });
broadcastOperator.RemoteSocket = broadcastOperator.BroadcastOperator = void 0;
const socket_types_1$1 = socketTypes;
const socket_io_parser_1$1 = parser;
class BroadcastOperator {
    constructor(adapter, rooms = new Set(), exceptRooms = new Set(), flags = {}) {
        this.adapter = adapter;
        this.rooms = rooms;
        this.exceptRooms = exceptRooms;
        this.flags = flags;
    }
    /**
     * Targets a room when emitting.
     *
     * @example
     * // the “foo” event will be broadcast to all connected clients in the “room-101” room
     * io.to("room-101").emit("foo", "bar");
     *
     * // with an array of rooms (a client will be notified at most once)
     * io.to(["room-101", "room-102"]).emit("foo", "bar");
     *
     * // with multiple chained calls
     * io.to("room-101").to("room-102").emit("foo", "bar");
     *
     * @param room - a room, or an array of rooms
     * @return a new {@link BroadcastOperator} instance for chaining
     */
    to(room) {
        const rooms = new Set(this.rooms);
        if (Array.isArray(room)) {
            room.forEach((r) => rooms.add(r));
        }
        else {
            rooms.add(room);
        }
        return new BroadcastOperator(this.adapter, rooms, this.exceptRooms, this.flags);
    }
    /**
     * Targets a room when emitting. Similar to `to()`, but might feel clearer in some cases:
     *
     * @example
     * // disconnect all clients in the "room-101" room
     * io.in("room-101").disconnectSockets();
     *
     * @param room - a room, or an array of rooms
     * @return a new {@link BroadcastOperator} instance for chaining
     */
    in(room) {
        return this.to(room);
    }
    /**
     * Excludes a room when emitting.
     *
     * @example
     * // the "foo" event will be broadcast to all connected clients, except the ones that are in the "room-101" room
     * io.except("room-101").emit("foo", "bar");
     *
     * // with an array of rooms
     * io.except(["room-101", "room-102"]).emit("foo", "bar");
     *
     * // with multiple chained calls
     * io.except("room-101").except("room-102").emit("foo", "bar");
     *
     * @param room - a room, or an array of rooms
     * @return a new {@link BroadcastOperator} instance for chaining
     */
    except(room) {
        const exceptRooms = new Set(this.exceptRooms);
        if (Array.isArray(room)) {
            room.forEach((r) => exceptRooms.add(r));
        }
        else {
            exceptRooms.add(room);
        }
        return new BroadcastOperator(this.adapter, this.rooms, exceptRooms, this.flags);
    }
    /**
     * Sets the compress flag.
     *
     * @example
     * io.compress(false).emit("hello");
     *
     * @param compress - if `true`, compresses the sending data
     * @return a new BroadcastOperator instance
     */
    compress(compress) {
        const flags = Object.assign({}, this.flags, { compress });
        return new BroadcastOperator(this.adapter, this.rooms, this.exceptRooms, flags);
    }
    /**
     * Sets a modifier for a subsequent event emission that the event data may be lost if the client is not ready to
     * receive messages (because of network slowness or other issues, or because they’re connected through long polling
     * and is in the middle of a request-response cycle).
     *
     * @example
     * io.volatile.emit("hello"); // the clients may or may not receive it
     *
     * @return a new BroadcastOperator instance
     */
    get volatile() {
        const flags = Object.assign({}, this.flags, { volatile: true });
        return new BroadcastOperator(this.adapter, this.rooms, this.exceptRooms, flags);
    }
    /**
     * Sets a modifier for a subsequent event emission that the event data will only be broadcast to the current node.
     *
     * @example
     * // the “foo” event will be broadcast to all connected clients on this node
     * io.local.emit("foo", "bar");
     *
     * @return a new {@link BroadcastOperator} instance for chaining
     */
    get local() {
        const flags = Object.assign({}, this.flags, { local: true });
        return new BroadcastOperator(this.adapter, this.rooms, this.exceptRooms, flags);
    }
    /**
     * Adds a timeout in milliseconds for the next operation
     *
     * @example
     * io.timeout(1000).emit("some-event", (err, responses) => {
     *   if (err) {
     *     // some clients did not acknowledge the event in the given delay
     *   } else {
     *     console.log(responses); // one response per client
     *   }
     * });
     *
     * @param timeout
     */
    timeout(timeout) {
        const flags = Object.assign({}, this.flags, { timeout });
        return new BroadcastOperator(this.adapter, this.rooms, this.exceptRooms, flags);
    }
    /**
     * Emits to all clients.
     *
     * @example
     * // the “foo” event will be broadcast to all connected clients
     * io.emit("foo", "bar");
     *
     * // the “foo” event will be broadcast to all connected clients in the “room-101” room
     * io.to("room-101").emit("foo", "bar");
     *
     * // with an acknowledgement expected from all connected clients
     * io.timeout(1000).emit("some-event", (err, responses) => {
     *   if (err) {
     *     // some clients did not acknowledge the event in the given delay
     *   } else {
     *     console.log(responses); // one response per client
     *   }
     * });
     *
     * @return Always true
     */
    emit(ev, ...args) {
        if (socket_types_1$1.RESERVED_EVENTS.has(ev)) {
            throw new Error(`"${String(ev)}" is a reserved event name`);
        }
        // set up packet object
        const data = [ev, ...args];
        const packet = {
            type: socket_io_parser_1$1.PacketType.EVENT,
            data: data,
        };
        const withAck = typeof data[data.length - 1] === "function";
        if (!withAck) {
            this.adapter.broadcast(packet, {
                rooms: this.rooms,
                except: this.exceptRooms,
                flags: this.flags,
            });
            return true;
        }
        const ack = data.pop();
        let timedOut = false;
        let responses = [];
        const timer = setTimeout(() => {
            timedOut = true;
            ack.apply(this, [
                new Error("operation has timed out"),
                this.flags.expectSingleResponse ? null : responses,
            ]);
        }, this.flags.timeout);
        let expectedServerCount = -1;
        let actualServerCount = 0;
        let expectedClientCount = 0;
        const checkCompleteness = () => {
            if (!timedOut &&
                expectedServerCount === actualServerCount &&
                responses.length === expectedClientCount) {
                clearTimeout(timer);
                ack.apply(this, [
                    null,
                    this.flags.expectSingleResponse ? responses[0] : responses,
                ]);
            }
        };
        this.adapter.broadcastWithAck(packet, {
            rooms: this.rooms,
            except: this.exceptRooms,
            flags: this.flags,
        }, (clientCount) => {
            // each Socket.IO server in the cluster sends the number of clients that were notified
            expectedClientCount += clientCount;
            actualServerCount++;
            checkCompleteness();
        }, (clientResponse) => {
            // each client sends an acknowledgement
            responses.push(clientResponse);
            checkCompleteness();
        });
        this.adapter.serverCount().then((serverCount) => {
            expectedServerCount = serverCount;
            checkCompleteness();
        });
        return true;
    }
    /**
     * Emits an event and waits for an acknowledgement from all clients.
     *
     * @example
     * try {
     *   const responses = await io.timeout(1000).emitWithAck("some-event");
     *   console.log(responses); // one response per client
     * } catch (e) {
     *   // some clients did not acknowledge the event in the given delay
     * }
     *
     * @return a Promise that will be fulfilled when all clients have acknowledged the event
     */
    emitWithAck(ev, ...args) {
        return new Promise((resolve, reject) => {
            args.push((err, responses) => {
                if (err) {
                    err.responses = responses;
                    return reject(err);
                }
                else {
                    return resolve(responses);
                }
            });
            this.emit(ev, ...args);
        });
    }
    /**
     * Gets a list of clients.
     *
     * @deprecated this method will be removed in the next major release, please use {@link Server#serverSideEmit} or
     * {@link fetchSockets} instead.
     */
    allSockets() {
        if (!this.adapter) {
            throw new Error("No adapter for this namespace, are you trying to get the list of clients of a dynamic namespace?");
        }
        return this.adapter.sockets(this.rooms);
    }
    /**
     * Returns the matching socket instances. This method works across a cluster of several Socket.IO servers.
     *
     * Note: this method also works within a cluster of multiple Socket.IO servers, with a compatible {@link Adapter}.
     *
     * @example
     * // return all Socket instances
     * const sockets = await io.fetchSockets();
     *
     * // return all Socket instances in the "room1" room
     * const sockets = await io.in("room1").fetchSockets();
     *
     * for (const socket of sockets) {
     *   console.log(socket.id);
     *   console.log(socket.handshake);
     *   console.log(socket.rooms);
     *   console.log(socket.data);
     *
     *   socket.emit("hello");
     *   socket.join("room1");
     *   socket.leave("room2");
     *   socket.disconnect();
     * }
     */
    fetchSockets() {
        return this.adapter
            .fetchSockets({
            rooms: this.rooms,
            except: this.exceptRooms,
            flags: this.flags,
        })
            .then((sockets) => {
            return sockets.map((socket) => {
                if (socket.server) {
                    return socket; // local instance
                }
                else {
                    return new RemoteSocket(this.adapter, socket);
                }
            });
        });
    }
    /**
     * Makes the matching socket instances join the specified rooms.
     *
     * Note: this method also works within a cluster of multiple Socket.IO servers, with a compatible {@link Adapter}.
     *
     * @example
     *
     * // make all socket instances join the "room1" room
     * io.socketsJoin("room1");
     *
     * // make all socket instances in the "room1" room join the "room2" and "room3" rooms
     * io.in("room1").socketsJoin(["room2", "room3"]);
     *
     * @param room - a room, or an array of rooms
     */
    socketsJoin(room) {
        this.adapter.addSockets({
            rooms: this.rooms,
            except: this.exceptRooms,
            flags: this.flags,
        }, Array.isArray(room) ? room : [room]);
    }
    /**
     * Makes the matching socket instances leave the specified rooms.
     *
     * Note: this method also works within a cluster of multiple Socket.IO servers, with a compatible {@link Adapter}.
     *
     * @example
     * // make all socket instances leave the "room1" room
     * io.socketsLeave("room1");
     *
     * // make all socket instances in the "room1" room leave the "room2" and "room3" rooms
     * io.in("room1").socketsLeave(["room2", "room3"]);
     *
     * @param room - a room, or an array of rooms
     */
    socketsLeave(room) {
        this.adapter.delSockets({
            rooms: this.rooms,
            except: this.exceptRooms,
            flags: this.flags,
        }, Array.isArray(room) ? room : [room]);
    }
    /**
     * Makes the matching socket instances disconnect.
     *
     * Note: this method also works within a cluster of multiple Socket.IO servers, with a compatible {@link Adapter}.
     *
     * @example
     * // make all socket instances disconnect (the connections might be kept alive for other namespaces)
     * io.disconnectSockets();
     *
     * // make all socket instances in the "room1" room disconnect and close the underlying connections
     * io.in("room1").disconnectSockets(true);
     *
     * @param close - whether to close the underlying connection
     */
    disconnectSockets(close = false) {
        this.adapter.disconnectSockets({
            rooms: this.rooms,
            except: this.exceptRooms,
            flags: this.flags,
        }, close);
    }
}
broadcastOperator.BroadcastOperator = BroadcastOperator;
/**
 * Expose of subset of the attributes and methods of the Socket class
 */
class RemoteSocket {
    constructor(adapter, details) {
        this.id = details.id;
        this.handshake = details.handshake;
        this.rooms = new Set(details.rooms);
        this.data = details.data;
        this.operator = new BroadcastOperator(adapter, new Set([this.id]), new Set(), {
            expectSingleResponse: true, // so that remoteSocket.emit() with acknowledgement behaves like socket.emit()
        });
    }
    /**
     * Adds a timeout in milliseconds for the next operation.
     *
     * @example
     * const sockets = await io.fetchSockets();
     *
     * for (const socket of sockets) {
     *   if (someCondition) {
     *     socket.timeout(1000).emit("some-event", (err) => {
     *       if (err) {
     *         // the client did not acknowledge the event in the given delay
     *       }
     *     });
     *   }
     * }
     *
     * // note: if possible, using a room instead of looping over all sockets is preferable
     * io.timeout(1000).to(someConditionRoom).emit("some-event", (err, responses) => {
     *   // ...
     * });
     *
     * @param timeout
     */
    timeout(timeout) {
        return this.operator.timeout(timeout);
    }
    emit(ev, ...args) {
        return this.operator.emit(ev, ...args);
    }
    /**
     * Joins a room.
     *
     * @param {String|Array} room - room or array of rooms
     */
    join(room) {
        return this.operator.socketsJoin(room);
    }
    /**
     * Leaves a room.
     *
     * @param {String} room
     */
    leave(room) {
        return this.operator.socketsLeave(room);
    }
    /**
     * Disconnects this client.
     *
     * @param {Boolean} close - if `true`, closes the underlying connection
     * @return {Socket} self
     */
    disconnect(close = false) {
        this.operator.disconnectSockets(close);
        return this;
    }
}
broadcastOperator.RemoteSocket = RemoteSocket;

var __importDefault$2 = (socket && socket.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(socket, "__esModule", { value: true });
socket.Socket = void 0;
const socket_io_parser_1 = parser;
const debug_1$3 = __importDefault$2(require$$13$2);
const typed_events_1 = typedEvents;
const base64id_1 = __importDefault$2(require$$3);
const broadcast_operator_1 = broadcastOperator;
const socket_types_1 = socketTypes;
const debug$4 = (0, debug_1$3.default)("socket.io:socket");
const RECOVERABLE_DISCONNECT_REASONS = new Set([
    "transport error",
    "transport close",
    "forced close",
    "ping timeout",
    "server shutting down",
    "forced server close",
]);
function noop() { }
/**
 * This is the main object for interacting with a client.
 *
 * A Socket belongs to a given {@link Namespace} and uses an underlying {@link Client} to communicate.
 *
 * Within each {@link Namespace}, you can also define arbitrary channels (called "rooms") that the {@link Socket} can
 * join and leave. That provides a convenient way to broadcast to a group of socket instances.
 *
 * @example
 * io.on("connection", (socket) => {
 *   console.log(`socket ${socket.id} connected`);
 *
 *   // send an event to the client
 *   socket.emit("foo", "bar");
 *
 *   socket.on("foobar", () => {
 *     // an event was received from the client
 *   });
 *
 *   // join the room named "room1"
 *   socket.join("room1");
 *
 *   // broadcast to everyone in the room named "room1"
 *   io.to("room1").emit("hello");
 *
 *   // upon disconnection
 *   socket.on("disconnect", (reason) => {
 *     console.log(`socket ${socket.id} disconnected due to ${reason}`);
 *   });
 * });
 */
let Socket$1 = class Socket extends typed_events_1.StrictEventEmitter {
    /**
     * Interface to a `Client` for a given `Namespace`.
     *
     * @param {Namespace} nsp
     * @param {Client} client
     * @param {Object} auth
     * @package
     */
    constructor(nsp, client, auth, previousSession) {
        super();
        this.nsp = nsp;
        this.client = client;
        /**
         * Whether the connection state was recovered after a temporary disconnection. In that case, any missed packets will
         * be transmitted to the client, the data attribute and the rooms will be restored.
         */
        this.recovered = false;
        /**
         * Additional information that can be attached to the Socket instance and which will be used in the
         * {@link Server.fetchSockets()} method.
         */
        this.data = {};
        /**
         * Whether the socket is currently connected or not.
         *
         * @example
         * io.use((socket, next) => {
         *   console.log(socket.connected); // false
         *   next();
         * });
         *
         * io.on("connection", (socket) => {
         *   console.log(socket.connected); // true
         * });
         */
        this.connected = false;
        this.acks = new Map();
        this.fns = [];
        this.flags = {};
        this.server = nsp.server;
        this.adapter = nsp.adapter;
        if (previousSession) {
            this.id = previousSession.sid;
            this.pid = previousSession.pid;
            previousSession.rooms.forEach((room) => this.join(room));
            this.data = previousSession.data;
            previousSession.missedPackets.forEach((packet) => {
                this.packet({
                    type: socket_io_parser_1.PacketType.EVENT,
                    data: packet,
                });
            });
            this.recovered = true;
        }
        else {
            if (client.conn.protocol === 3) {
                // @ts-ignore
                this.id = nsp.name !== "/" ? nsp.name + "#" + client.id : client.id;
            }
            else {
                this.id = base64id_1.default.generateId(); // don't reuse the Engine.IO id because it's sensitive information
            }
            if (this.server._opts.connectionStateRecovery) {
                this.pid = base64id_1.default.generateId();
            }
        }
        this.handshake = this.buildHandshake(auth);
        // prevents crash when the socket receives an "error" event without listener
        this.on("error", noop);
    }
    /**
     * Builds the `handshake` BC object
     *
     * @private
     */
    buildHandshake(auth) {
        var _a, _b, _c, _d;
        return {
            headers: ((_a = this.request) === null || _a === void 0 ? void 0 : _a.headers) || {},
            time: new Date() + "",
            address: this.conn.remoteAddress,
            xdomain: !!((_b = this.request) === null || _b === void 0 ? void 0 : _b.headers.origin),
            // @ts-ignore
            secure: !this.request || !!this.request.connection.encrypted,
            issued: +new Date(),
            url: (_c = this.request) === null || _c === void 0 ? void 0 : _c.url,
            // @ts-ignore
            query: ((_d = this.request) === null || _d === void 0 ? void 0 : _d._query) || {},
            auth,
        };
    }
    /**
     * Emits to this client.
     *
     * @example
     * io.on("connection", (socket) => {
     *   socket.emit("hello", "world");
     *
     *   // all serializable datastructures are supported (no need to call JSON.stringify)
     *   socket.emit("hello", 1, "2", { 3: ["4"], 5: Buffer.from([6]) });
     *
     *   // with an acknowledgement from the client
     *   socket.emit("hello", "world", (val) => {
     *     // ...
     *   });
     * });
     *
     * @return Always returns `true`.
     */
    emit(ev, ...args) {
        if (socket_types_1.RESERVED_EVENTS.has(ev)) {
            throw new Error(`"${String(ev)}" is a reserved event name`);
        }
        const data = [ev, ...args];
        const packet = {
            type: socket_io_parser_1.PacketType.EVENT,
            data: data,
        };
        // access last argument to see if it's an ACK callback
        if (typeof data[data.length - 1] === "function") {
            const id = this.nsp._ids++;
            debug$4("emitting packet with ack id %d", id);
            this.registerAckCallback(id, data.pop());
            packet.id = id;
        }
        const flags = Object.assign({}, this.flags);
        this.flags = {};
        // @ts-ignore
        if (this.nsp.server.opts.connectionStateRecovery) {
            // this ensures the packet is stored and can be transmitted upon reconnection
            this.adapter.broadcast(packet, {
                rooms: new Set([this.id]),
                except: new Set(),
                flags,
            });
        }
        else {
            this.notifyOutgoingListeners(packet);
            this.packet(packet, flags);
        }
        return true;
    }
    /**
     * Emits an event and waits for an acknowledgement
     *
     * @example
     * io.on("connection", async (socket) => {
     *   // without timeout
     *   const response = await socket.emitWithAck("hello", "world");
     *
     *   // with a specific timeout
     *   try {
     *     const response = await socket.timeout(1000).emitWithAck("hello", "world");
     *   } catch (err) {
     *     // the client did not acknowledge the event in the given delay
     *   }
     * });
     *
     * @return a Promise that will be fulfilled when the client acknowledges the event
     */
    emitWithAck(ev, ...args) {
        // the timeout flag is optional
        const withErr = this.flags.timeout !== undefined;
        return new Promise((resolve, reject) => {
            args.push((arg1, arg2) => {
                if (withErr) {
                    return arg1 ? reject(arg1) : resolve(arg2);
                }
                else {
                    return resolve(arg1);
                }
            });
            this.emit(ev, ...args);
        });
    }
    /**
     * @private
     */
    registerAckCallback(id, ack) {
        const timeout = this.flags.timeout;
        if (timeout === undefined) {
            this.acks.set(id, ack);
            return;
        }
        const timer = setTimeout(() => {
            debug$4("event with ack id %d has timed out after %d ms", id, timeout);
            this.acks.delete(id);
            ack.call(this, new Error("operation has timed out"));
        }, timeout);
        this.acks.set(id, (...args) => {
            clearTimeout(timer);
            ack.apply(this, [null, ...args]);
        });
    }
    /**
     * Targets a room when broadcasting.
     *
     * @example
     * io.on("connection", (socket) => {
     *   // the “foo” event will be broadcast to all connected clients in the “room-101” room, except this socket
     *   socket.to("room-101").emit("foo", "bar");
     *
     *   // the code above is equivalent to:
     *   io.to("room-101").except(socket.id).emit("foo", "bar");
     *
     *   // with an array of rooms (a client will be notified at most once)
     *   socket.to(["room-101", "room-102"]).emit("foo", "bar");
     *
     *   // with multiple chained calls
     *   socket.to("room-101").to("room-102").emit("foo", "bar");
     * });
     *
     * @param room - a room, or an array of rooms
     * @return a new {@link BroadcastOperator} instance for chaining
     */
    to(room) {
        return this.newBroadcastOperator().to(room);
    }
    /**
     * Targets a room when broadcasting. Similar to `to()`, but might feel clearer in some cases:
     *
     * @example
     * io.on("connection", (socket) => {
     *   // disconnect all clients in the "room-101" room, except this socket
     *   socket.in("room-101").disconnectSockets();
     * });
     *
     * @param room - a room, or an array of rooms
     * @return a new {@link BroadcastOperator} instance for chaining
     */
    in(room) {
        return this.newBroadcastOperator().in(room);
    }
    /**
     * Excludes a room when broadcasting.
     *
     * @example
     * io.on("connection", (socket) => {
     *   // the "foo" event will be broadcast to all connected clients, except the ones that are in the "room-101" room
     *   // and this socket
     *   socket.except("room-101").emit("foo", "bar");
     *
     *   // with an array of rooms
     *   socket.except(["room-101", "room-102"]).emit("foo", "bar");
     *
     *   // with multiple chained calls
     *   socket.except("room-101").except("room-102").emit("foo", "bar");
     * });
     *
     * @param room - a room, or an array of rooms
     * @return a new {@link BroadcastOperator} instance for chaining
     */
    except(room) {
        return this.newBroadcastOperator().except(room);
    }
    /**
     * Sends a `message` event.
     *
     * This method mimics the WebSocket.send() method.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
     *
     * @example
     * io.on("connection", (socket) => {
     *   socket.send("hello");
     *
     *   // this is equivalent to
     *   socket.emit("message", "hello");
     * });
     *
     * @return self
     */
    send(...args) {
        this.emit("message", ...args);
        return this;
    }
    /**
     * Sends a `message` event. Alias of {@link send}.
     *
     * @return self
     */
    write(...args) {
        this.emit("message", ...args);
        return this;
    }
    /**
     * Writes a packet.
     *
     * @param {Object} packet - packet object
     * @param {Object} opts - options
     * @private
     */
    packet(packet, opts = {}) {
        packet.nsp = this.nsp.name;
        opts.compress = false !== opts.compress;
        this.client._packet(packet, opts);
    }
    /**
     * Joins a room.
     *
     * @example
     * io.on("connection", (socket) => {
     *   // join a single room
     *   socket.join("room1");
     *
     *   // join multiple rooms
     *   socket.join(["room1", "room2"]);
     * });
     *
     * @param {String|Array} rooms - room or array of rooms
     * @return a Promise or nothing, depending on the adapter
     */
    join(rooms) {
        debug$4("join room %s", rooms);
        return this.adapter.addAll(this.id, new Set(Array.isArray(rooms) ? rooms : [rooms]));
    }
    /**
     * Leaves a room.
     *
     * @example
     * io.on("connection", (socket) => {
     *   // leave a single room
     *   socket.leave("room1");
     *
     *   // leave multiple rooms
     *   socket.leave("room1").leave("room2");
     * });
     *
     * @param {String} room
     * @return a Promise or nothing, depending on the adapter
     */
    leave(room) {
        debug$4("leave room %s", room);
        return this.adapter.del(this.id, room);
    }
    /**
     * Leave all rooms.
     *
     * @private
     */
    leaveAll() {
        this.adapter.delAll(this.id);
    }
    /**
     * Called by `Namespace` upon successful
     * middleware execution (ie: authorization).
     * Socket is added to namespace array before
     * call to join, so adapters can access it.
     *
     * @private
     */
    _onconnect() {
        debug$4("socket connected - writing packet");
        this.connected = true;
        this.join(this.id);
        if (this.conn.protocol === 3) {
            this.packet({ type: socket_io_parser_1.PacketType.CONNECT });
        }
        else {
            this.packet({
                type: socket_io_parser_1.PacketType.CONNECT,
                data: { sid: this.id, pid: this.pid },
            });
        }
    }
    /**
     * Called with each packet. Called by `Client`.
     *
     * @param {Object} packet
     * @private
     */
    _onpacket(packet) {
        debug$4("got packet %j", packet);
        switch (packet.type) {
            case socket_io_parser_1.PacketType.EVENT:
                this.onevent(packet);
                break;
            case socket_io_parser_1.PacketType.BINARY_EVENT:
                this.onevent(packet);
                break;
            case socket_io_parser_1.PacketType.ACK:
                this.onack(packet);
                break;
            case socket_io_parser_1.PacketType.BINARY_ACK:
                this.onack(packet);
                break;
            case socket_io_parser_1.PacketType.DISCONNECT:
                this.ondisconnect();
                break;
        }
    }
    /**
     * Called upon event packet.
     *
     * @param {Packet} packet - packet object
     * @private
     */
    onevent(packet) {
        const args = packet.data || [];
        debug$4("emitting event %j", args);
        if (null != packet.id) {
            debug$4("attaching ack callback to event");
            args.push(this.ack(packet.id));
        }
        if (this._anyListeners && this._anyListeners.length) {
            const listeners = this._anyListeners.slice();
            for (const listener of listeners) {
                listener.apply(this, args);
            }
        }
        this.dispatch(args);
    }
    /**
     * Produces an ack callback to emit with an event.
     *
     * @param {Number} id - packet id
     * @private
     */
    ack(id) {
        const self = this;
        let sent = false;
        return function () {
            // prevent double callbacks
            if (sent)
                return;
            const args = Array.prototype.slice.call(arguments);
            debug$4("sending ack %j", args);
            self.packet({
                id: id,
                type: socket_io_parser_1.PacketType.ACK,
                data: args,
            });
            sent = true;
        };
    }
    /**
     * Called upon ack packet.
     *
     * @private
     */
    onack(packet) {
        const ack = this.acks.get(packet.id);
        if ("function" == typeof ack) {
            debug$4("calling ack %s with %j", packet.id, packet.data);
            ack.apply(this, packet.data);
            this.acks.delete(packet.id);
        }
        else {
            debug$4("bad ack %s", packet.id);
        }
    }
    /**
     * Called upon client disconnect packet.
     *
     * @private
     */
    ondisconnect() {
        debug$4("got disconnect packet");
        this._onclose("client namespace disconnect");
    }
    /**
     * Handles a client error.
     *
     * @private
     */
    _onerror(err) {
        // FIXME the meaning of the "error" event is overloaded:
        //  - it can be sent by the client (`socket.emit("error")`)
        //  - it can be emitted when the connection encounters an error (an invalid packet for example)
        //  - it can be emitted when a packet is rejected in a middleware (`socket.use()`)
        this.emitReserved("error", err);
    }
    /**
     * Called upon closing. Called by `Client`.
     *
     * @param {String} reason
     * @param description
     * @throw {Error} optional error object
     *
     * @private
     */
    _onclose(reason, description) {
        if (!this.connected)
            return this;
        debug$4("closing socket - reason %s", reason);
        this.emitReserved("disconnecting", reason, description);
        if (this.server._opts.connectionStateRecovery &&
            RECOVERABLE_DISCONNECT_REASONS.has(reason)) {
            debug$4("connection state recovery is enabled for sid %s", this.id);
            this.adapter.persistSession({
                sid: this.id,
                pid: this.pid,
                rooms: [...this.rooms],
                data: this.data,
            });
        }
        this._cleanup();
        this.client._remove(this);
        this.connected = false;
        this.emitReserved("disconnect", reason, description);
        return;
    }
    /**
     * Makes the socket leave all the rooms it was part of and prevents it from joining any other room
     *
     * @private
     */
    _cleanup() {
        this.leaveAll();
        this.nsp._remove(this);
        this.join = noop;
    }
    /**
     * Produces an `error` packet.
     *
     * @param {Object} err - error object
     *
     * @private
     */
    _error(err) {
        this.packet({ type: socket_io_parser_1.PacketType.CONNECT_ERROR, data: err });
    }
    /**
     * Disconnects this client.
     *
     * @example
     * io.on("connection", (socket) => {
     *   // disconnect this socket (the connection might be kept alive for other namespaces)
     *   socket.disconnect();
     *
     *   // disconnect this socket and close the underlying connection
     *   socket.disconnect(true);
     * })
     *
     * @param {Boolean} close - if `true`, closes the underlying connection
     * @return self
     */
    disconnect(close = false) {
        if (!this.connected)
            return this;
        if (close) {
            this.client._disconnect();
        }
        else {
            this.packet({ type: socket_io_parser_1.PacketType.DISCONNECT });
            this._onclose("server namespace disconnect");
        }
        return this;
    }
    /**
     * Sets the compress flag.
     *
     * @example
     * io.on("connection", (socket) => {
     *   socket.compress(false).emit("hello");
     * });
     *
     * @param {Boolean} compress - if `true`, compresses the sending data
     * @return {Socket} self
     */
    compress(compress) {
        this.flags.compress = compress;
        return this;
    }
    /**
     * Sets a modifier for a subsequent event emission that the event data may be lost if the client is not ready to
     * receive messages (because of network slowness or other issues, or because they’re connected through long polling
     * and is in the middle of a request-response cycle).
     *
     * @example
     * io.on("connection", (socket) => {
     *   socket.volatile.emit("hello"); // the client may or may not receive it
     * });
     *
     * @return {Socket} self
     */
    get volatile() {
        this.flags.volatile = true;
        return this;
    }
    /**
     * Sets a modifier for a subsequent event emission that the event data will only be broadcast to every sockets but the
     * sender.
     *
     * @example
     * io.on("connection", (socket) => {
     *   // the “foo” event will be broadcast to all connected clients, except this socket
     *   socket.broadcast.emit("foo", "bar");
     * });
     *
     * @return a new {@link BroadcastOperator} instance for chaining
     */
    get broadcast() {
        return this.newBroadcastOperator();
    }
    /**
     * Sets a modifier for a subsequent event emission that the event data will only be broadcast to the current node.
     *
     * @example
     * io.on("connection", (socket) => {
     *   // the “foo” event will be broadcast to all connected clients on this node, except this socket
     *   socket.local.emit("foo", "bar");
     * });
     *
     * @return a new {@link BroadcastOperator} instance for chaining
     */
    get local() {
        return this.newBroadcastOperator().local;
    }
    /**
     * Sets a modifier for a subsequent event emission that the callback will be called with an error when the
     * given number of milliseconds have elapsed without an acknowledgement from the client:
     *
     * @example
     * io.on("connection", (socket) => {
     *   socket.timeout(5000).emit("my-event", (err) => {
     *     if (err) {
     *       // the client did not acknowledge the event in the given delay
     *     }
     *   });
     * });
     *
     * @returns self
     */
    timeout(timeout) {
        this.flags.timeout = timeout;
        return this;
    }
    /**
     * Dispatch incoming event to socket listeners.
     *
     * @param {Array} event - event that will get emitted
     * @private
     */
    dispatch(event) {
        debug$4("dispatching an event %j", event);
        this.run(event, (err) => {
            process.nextTick(() => {
                if (err) {
                    return this._onerror(err);
                }
                if (this.connected) {
                    super.emitUntyped.apply(this, event);
                }
                else {
                    debug$4("ignore packet received after disconnection");
                }
            });
        });
    }
    /**
     * Sets up socket middleware.
     *
     * @example
     * io.on("connection", (socket) => {
     *   socket.use(([event, ...args], next) => {
     *     if (isUnauthorized(event)) {
     *       return next(new Error("unauthorized event"));
     *     }
     *     // do not forget to call next
     *     next();
     *   });
     *
     *   socket.on("error", (err) => {
     *     if (err && err.message === "unauthorized event") {
     *       socket.disconnect();
     *     }
     *   });
     * });
     *
     * @param {Function} fn - middleware function (event, next)
     * @return {Socket} self
     */
    use(fn) {
        this.fns.push(fn);
        return this;
    }
    /**
     * Executes the middleware for an incoming event.
     *
     * @param {Array} event - event that will get emitted
     * @param {Function} fn - last fn call in the middleware
     * @private
     */
    run(event, fn) {
        if (!this.fns.length)
            return fn();
        const fns = this.fns.slice(0);
        function run(i) {
            fns[i](event, (err) => {
                // upon error, short-circuit
                if (err)
                    return fn(err);
                // if no middleware left, summon callback
                if (!fns[i + 1])
                    return fn();
                // go on to next
                run(i + 1);
            });
        }
        run(0);
    }
    /**
     * Whether the socket is currently disconnected
     */
    get disconnected() {
        return !this.connected;
    }
    /**
     * A reference to the request that originated the underlying Engine.IO Socket.
     */
    get request() {
        return this.client.request;
    }
    /**
     * A reference to the underlying Client transport connection (Engine.IO Socket object).
     *
     * @example
     * io.on("connection", (socket) => {
     *   console.log(socket.conn.transport.name); // prints "polling" or "websocket"
     *
     *   socket.conn.once("upgrade", () => {
     *     console.log(socket.conn.transport.name); // prints "websocket"
     *   });
     * });
     */
    get conn() {
        return this.client.conn;
    }
    /**
     * Returns the rooms the socket is currently in.
     *
     * @example
     * io.on("connection", (socket) => {
     *   console.log(socket.rooms); // Set { <socket.id> }
     *
     *   socket.join("room1");
     *
     *   console.log(socket.rooms); // Set { <socket.id>, "room1" }
     * });
     */
    get rooms() {
        return this.adapter.socketRooms(this.id) || new Set();
    }
    /**
     * Adds a listener that will be fired when any event is received. The event name is passed as the first argument to
     * the callback.
     *
     * @example
     * io.on("connection", (socket) => {
     *   socket.onAny((event, ...args) => {
     *     console.log(`got event ${event}`);
     *   });
     * });
     *
     * @param listener
     */
    onAny(listener) {
        this._anyListeners = this._anyListeners || [];
        this._anyListeners.push(listener);
        return this;
    }
    /**
     * Adds a listener that will be fired when any event is received. The event name is passed as the first argument to
     * the callback. The listener is added to the beginning of the listeners array.
     *
     * @param listener
     */
    prependAny(listener) {
        this._anyListeners = this._anyListeners || [];
        this._anyListeners.unshift(listener);
        return this;
    }
    /**
     * Removes the listener that will be fired when any event is received.
     *
     * @example
     * io.on("connection", (socket) => {
     *   const catchAllListener = (event, ...args) => {
     *     console.log(`got event ${event}`);
     *   }
     *
     *   socket.onAny(catchAllListener);
     *
     *   // remove a specific listener
     *   socket.offAny(catchAllListener);
     *
     *   // or remove all listeners
     *   socket.offAny();
     * });
     *
     * @param listener
     */
    offAny(listener) {
        if (!this._anyListeners) {
            return this;
        }
        if (listener) {
            const listeners = this._anyListeners;
            for (let i = 0; i < listeners.length; i++) {
                if (listener === listeners[i]) {
                    listeners.splice(i, 1);
                    return this;
                }
            }
        }
        else {
            this._anyListeners = [];
        }
        return this;
    }
    /**
     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
     * e.g. to remove listeners.
     */
    listenersAny() {
        return this._anyListeners || [];
    }
    /**
     * Adds a listener that will be fired when any event is sent. The event name is passed as the first argument to
     * the callback.
     *
     * Note: acknowledgements sent to the client are not included.
     *
     * @example
     * io.on("connection", (socket) => {
     *   socket.onAnyOutgoing((event, ...args) => {
     *     console.log(`sent event ${event}`);
     *   });
     * });
     *
     * @param listener
     */
    onAnyOutgoing(listener) {
        this._anyOutgoingListeners = this._anyOutgoingListeners || [];
        this._anyOutgoingListeners.push(listener);
        return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback. The listener is added to the beginning of the listeners array.
     *
     * @example
     * io.on("connection", (socket) => {
     *   socket.prependAnyOutgoing((event, ...args) => {
     *     console.log(`sent event ${event}`);
     *   });
     * });
     *
     * @param listener
     */
    prependAnyOutgoing(listener) {
        this._anyOutgoingListeners = this._anyOutgoingListeners || [];
        this._anyOutgoingListeners.unshift(listener);
        return this;
    }
    /**
     * Removes the listener that will be fired when any event is sent.
     *
     * @example
     * io.on("connection", (socket) => {
     *   const catchAllListener = (event, ...args) => {
     *     console.log(`sent event ${event}`);
     *   }
     *
     *   socket.onAnyOutgoing(catchAllListener);
     *
     *   // remove a specific listener
     *   socket.offAnyOutgoing(catchAllListener);
     *
     *   // or remove all listeners
     *   socket.offAnyOutgoing();
     * });
     *
     * @param listener - the catch-all listener
     */
    offAnyOutgoing(listener) {
        if (!this._anyOutgoingListeners) {
            return this;
        }
        if (listener) {
            const listeners = this._anyOutgoingListeners;
            for (let i = 0; i < listeners.length; i++) {
                if (listener === listeners[i]) {
                    listeners.splice(i, 1);
                    return this;
                }
            }
        }
        else {
            this._anyOutgoingListeners = [];
        }
        return this;
    }
    /**
     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
     * e.g. to remove listeners.
     */
    listenersAnyOutgoing() {
        return this._anyOutgoingListeners || [];
    }
    /**
     * Notify the listeners for each packet sent (emit or broadcast)
     *
     * @param packet
     *
     * @private
     */
    notifyOutgoingListeners(packet) {
        if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
            const listeners = this._anyOutgoingListeners.slice();
            for (const listener of listeners) {
                listener.apply(this, packet.data);
            }
        }
    }
    newBroadcastOperator() {
        const flags = Object.assign({}, this.flags);
        this.flags = {};
        return new broadcast_operator_1.BroadcastOperator(this.adapter, new Set(), new Set([this.id]), flags);
    }
};
socket.Socket = Socket$1;

(function (exports) {
	var __importDefault = (namespace && namespace.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Namespace = exports.RESERVED_EVENTS = void 0;
	const socket_1 = socket;
	const typed_events_1 = typedEvents;
	const debug_1 = __importDefault(require$$13$2);
	const broadcast_operator_1 = broadcastOperator;
	const debug = (0, debug_1.default)("socket.io:namespace");
	exports.RESERVED_EVENTS = new Set(["connect", "connection", "new_namespace"]);
	/**
	 * A Namespace is a communication channel that allows you to split the logic of your application over a single shared
	 * connection.
	 *
	 * Each namespace has its own:
	 *
	 * - event handlers
	 *
	 * ```
	 * io.of("/orders").on("connection", (socket) => {
	 *   socket.on("order:list", () => {});
	 *   socket.on("order:create", () => {});
	 * });
	 *
	 * io.of("/users").on("connection", (socket) => {
	 *   socket.on("user:list", () => {});
	 * });
	 * ```
	 *
	 * - rooms
	 *
	 * ```
	 * const orderNamespace = io.of("/orders");
	 *
	 * orderNamespace.on("connection", (socket) => {
	 *   socket.join("room1");
	 *   orderNamespace.to("room1").emit("hello");
	 * });
	 *
	 * const userNamespace = io.of("/users");
	 *
	 * userNamespace.on("connection", (socket) => {
	 *   socket.join("room1"); // distinct from the room in the "orders" namespace
	 *   userNamespace.to("room1").emit("holà");
	 * });
	 * ```
	 *
	 * - middlewares
	 *
	 * ```
	 * const orderNamespace = io.of("/orders");
	 *
	 * orderNamespace.use((socket, next) => {
	 *   // ensure the socket has access to the "orders" namespace
	 * });
	 *
	 * const userNamespace = io.of("/users");
	 *
	 * userNamespace.use((socket, next) => {
	 *   // ensure the socket has access to the "users" namespace
	 * });
	 * ```
	 */
	class Namespace extends typed_events_1.StrictEventEmitter {
	    /**
	     * Namespace constructor.
	     *
	     * @param server instance
	     * @param name
	     */
	    constructor(server, name) {
	        super();
	        /**
	         * A map of currently connected sockets.
	         */
	        this.sockets = new Map();
	        /**
	         * A map of currently connecting sockets.
	         */
	        this._preConnectSockets = new Map();
	        this._fns = [];
	        /** @private */
	        this._ids = 0;
	        this.server = server;
	        this.name = name;
	        this._initAdapter();
	    }
	    /**
	     * Initializes the `Adapter` for this nsp.
	     * Run upon changing adapter by `Server#adapter`
	     * in addition to the constructor.
	     *
	     * @private
	     */
	    _initAdapter() {
	        // @ts-ignore
	        this.adapter = new (this.server.adapter())(this);
	        Promise.resolve(this.adapter.init()).catch((err) => {
	            debug("error while initializing adapter: %s", err);
	        });
	    }
	    /**
	     * Registers a middleware, which is a function that gets executed for every incoming {@link Socket}.
	     *
	     * @example
	     * const myNamespace = io.of("/my-namespace");
	     *
	     * myNamespace.use((socket, next) => {
	     *   // ...
	     *   next();
	     * });
	     *
	     * @param fn - the middleware function
	     */
	    use(fn) {
	        this._fns.push(fn);
	        return this;
	    }
	    /**
	     * Executes the middleware for an incoming client.
	     *
	     * @param socket - the socket that will get added
	     * @param fn - last fn call in the middleware
	     * @private
	     */
	    run(socket, fn) {
	        if (!this._fns.length)
	            return fn();
	        const fns = this._fns.slice(0);
	        function run(i) {
	            fns[i](socket, (err) => {
	                // upon error, short-circuit
	                if (err)
	                    return fn(err);
	                // if no middleware left, summon callback
	                if (!fns[i + 1])
	                    return fn();
	                // go on to next
	                run(i + 1);
	            });
	        }
	        run(0);
	    }
	    /**
	     * Targets a room when emitting.
	     *
	     * @example
	     * const myNamespace = io.of("/my-namespace");
	     *
	     * // the “foo” event will be broadcast to all connected clients in the “room-101” room
	     * myNamespace.to("room-101").emit("foo", "bar");
	     *
	     * // with an array of rooms (a client will be notified at most once)
	     * myNamespace.to(["room-101", "room-102"]).emit("foo", "bar");
	     *
	     * // with multiple chained calls
	     * myNamespace.to("room-101").to("room-102").emit("foo", "bar");
	     *
	     * @param room - a room, or an array of rooms
	     * @return a new {@link BroadcastOperator} instance for chaining
	     */
	    to(room) {
	        return new broadcast_operator_1.BroadcastOperator(this.adapter).to(room);
	    }
	    /**
	     * Targets a room when emitting. Similar to `to()`, but might feel clearer in some cases:
	     *
	     * @example
	     * const myNamespace = io.of("/my-namespace");
	     *
	     * // disconnect all clients in the "room-101" room
	     * myNamespace.in("room-101").disconnectSockets();
	     *
	     * @param room - a room, or an array of rooms
	     * @return a new {@link BroadcastOperator} instance for chaining
	     */
	    in(room) {
	        return new broadcast_operator_1.BroadcastOperator(this.adapter).in(room);
	    }
	    /**
	     * Excludes a room when emitting.
	     *
	     * @example
	     * const myNamespace = io.of("/my-namespace");
	     *
	     * // the "foo" event will be broadcast to all connected clients, except the ones that are in the "room-101" room
	     * myNamespace.except("room-101").emit("foo", "bar");
	     *
	     * // with an array of rooms
	     * myNamespace.except(["room-101", "room-102"]).emit("foo", "bar");
	     *
	     * // with multiple chained calls
	     * myNamespace.except("room-101").except("room-102").emit("foo", "bar");
	     *
	     * @param room - a room, or an array of rooms
	     * @return a new {@link BroadcastOperator} instance for chaining
	     */
	    except(room) {
	        return new broadcast_operator_1.BroadcastOperator(this.adapter).except(room);
	    }
	    /**
	     * Adds a new client.
	     *
	     * @return {Socket}
	     * @private
	     */
	    async _add(client, auth, fn) {
	        var _a;
	        debug("adding socket to nsp %s", this.name);
	        const socket = await this._createSocket(client, auth);
	        this._preConnectSockets.set(socket.id, socket);
	        if (
	        // @ts-ignore
	        ((_a = this.server.opts.connectionStateRecovery) === null || _a === void 0 ? void 0 : _a.skipMiddlewares) &&
	            socket.recovered &&
	            client.conn.readyState === "open") {
	            return this._doConnect(socket, fn);
	        }
	        this.run(socket, (err) => {
	            process.nextTick(() => {
	                if ("open" !== client.conn.readyState) {
	                    debug("next called after client was closed - ignoring socket");
	                    socket._cleanup();
	                    return;
	                }
	                if (err) {
	                    debug("middleware error, sending CONNECT_ERROR packet to the client");
	                    socket._cleanup();
	                    if (client.conn.protocol === 3) {
	                        return socket._error(err.data || err.message);
	                    }
	                    else {
	                        return socket._error({
	                            message: err.message,
	                            data: err.data,
	                        });
	                    }
	                }
	                this._doConnect(socket, fn);
	            });
	        });
	    }
	    async _createSocket(client, auth) {
	        const sessionId = auth.pid;
	        const offset = auth.offset;
	        if (
	        // @ts-ignore
	        this.server.opts.connectionStateRecovery &&
	            typeof sessionId === "string" &&
	            typeof offset === "string") {
	            let session;
	            try {
	                session = await this.adapter.restoreSession(sessionId, offset);
	            }
	            catch (e) {
	                debug("error while restoring session: %s", e);
	            }
	            if (session) {
	                debug("connection state recovered for sid %s", session.sid);
	                return new socket_1.Socket(this, client, auth, session);
	            }
	        }
	        return new socket_1.Socket(this, client, auth);
	    }
	    _doConnect(socket, fn) {
	        this._preConnectSockets.delete(socket.id);
	        this.sockets.set(socket.id, socket);
	        // it's paramount that the internal `onconnect` logic
	        // fires before user-set events to prevent state order
	        // violations (such as a disconnection before the connection
	        // logic is complete)
	        socket._onconnect();
	        if (fn)
	            fn(socket);
	        // fire user-set events
	        this.emitReserved("connect", socket);
	        this.emitReserved("connection", socket);
	    }
	    /**
	     * Removes a client. Called by each `Socket`.
	     *
	     * @private
	     */
	    _remove(socket) {
	        this.sockets.delete(socket.id) || this._preConnectSockets.delete(socket.id);
	    }
	    /**
	     * Emits to all connected clients.
	     *
	     * @example
	     * const myNamespace = io.of("/my-namespace");
	     *
	     * myNamespace.emit("hello", "world");
	     *
	     * // all serializable datastructures are supported (no need to call JSON.stringify)
	     * myNamespace.emit("hello", 1, "2", { 3: ["4"], 5: Uint8Array.from([6]) });
	     *
	     * // with an acknowledgement from the clients
	     * myNamespace.timeout(1000).emit("some-event", (err, responses) => {
	     *   if (err) {
	     *     // some clients did not acknowledge the event in the given delay
	     *   } else {
	     *     console.log(responses); // one response per client
	     *   }
	     * });
	     *
	     * @return Always true
	     */
	    emit(ev, ...args) {
	        return new broadcast_operator_1.BroadcastOperator(this.adapter).emit(ev, ...args);
	    }
	    /**
	     * Sends a `message` event to all clients.
	     *
	     * This method mimics the WebSocket.send() method.
	     *
	     * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
	     *
	     * @example
	     * const myNamespace = io.of("/my-namespace");
	     *
	     * myNamespace.send("hello");
	     *
	     * // this is equivalent to
	     * myNamespace.emit("message", "hello");
	     *
	     * @return self
	     */
	    send(...args) {
	        // This type-cast is needed because EmitEvents likely doesn't have `message` as a key.
	        // if you specify the EmitEvents, the type of args will be never.
	        this.emit("message", ...args);
	        return this;
	    }
	    /**
	     * Sends a `message` event to all clients. Sends a `message` event. Alias of {@link send}.
	     *
	     * @return self
	     */
	    write(...args) {
	        // This type-cast is needed because EmitEvents likely doesn't have `message` as a key.
	        // if you specify the EmitEvents, the type of args will be never.
	        this.emit("message", ...args);
	        return this;
	    }
	    /**
	     * Sends a message to the other Socket.IO servers of the cluster.
	     *
	     * @example
	     * const myNamespace = io.of("/my-namespace");
	     *
	     * myNamespace.serverSideEmit("hello", "world");
	     *
	     * myNamespace.on("hello", (arg1) => {
	     *   console.log(arg1); // prints "world"
	     * });
	     *
	     * // acknowledgements (without binary content) are supported too:
	     * myNamespace.serverSideEmit("ping", (err, responses) => {
	     *  if (err) {
	     *     // some servers did not acknowledge the event in the given delay
	     *   } else {
	     *     console.log(responses); // one response per server (except the current one)
	     *   }
	     * });
	     *
	     * myNamespace.on("ping", (cb) => {
	     *   cb("pong");
	     * });
	     *
	     * @param ev - the event name
	     * @param args - an array of arguments, which may include an acknowledgement callback at the end
	     */
	    serverSideEmit(ev, ...args) {
	        if (exports.RESERVED_EVENTS.has(ev)) {
	            throw new Error(`"${String(ev)}" is a reserved event name`);
	        }
	        args.unshift(ev);
	        this.adapter.serverSideEmit(args);
	        return true;
	    }
	    /**
	     * Sends a message and expect an acknowledgement from the other Socket.IO servers of the cluster.
	     *
	     * @example
	     * const myNamespace = io.of("/my-namespace");
	     *
	     * try {
	     *   const responses = await myNamespace.serverSideEmitWithAck("ping");
	     *   console.log(responses); // one response per server (except the current one)
	     * } catch (e) {
	     *   // some servers did not acknowledge the event in the given delay
	     * }
	     *
	     * @param ev - the event name
	     * @param args - an array of arguments
	     *
	     * @return a Promise that will be fulfilled when all servers have acknowledged the event
	     */
	    serverSideEmitWithAck(ev, ...args) {
	        return new Promise((resolve, reject) => {
	            args.push((err, responses) => {
	                if (err) {
	                    err.responses = responses;
	                    return reject(err);
	                }
	                else {
	                    return resolve(responses);
	                }
	            });
	            this.serverSideEmit(ev, ...args);
	        });
	    }
	    /**
	     * Called when a packet is received from another Socket.IO server
	     *
	     * @param args - an array of arguments, which may include an acknowledgement callback at the end
	     *
	     * @private
	     */
	    _onServerSideEmit(args) {
	        super.emitUntyped.apply(this, args);
	    }
	    /**
	     * Gets a list of clients.
	     *
	     * @deprecated this method will be removed in the next major release, please use {@link Namespace#serverSideEmit} or
	     * {@link Namespace#fetchSockets} instead.
	     */
	    allSockets() {
	        return new broadcast_operator_1.BroadcastOperator(this.adapter).allSockets();
	    }
	    /**
	     * Sets the compress flag.
	     *
	     * @example
	     * const myNamespace = io.of("/my-namespace");
	     *
	     * myNamespace.compress(false).emit("hello");
	     *
	     * @param compress - if `true`, compresses the sending data
	     * @return self
	     */
	    compress(compress) {
	        return new broadcast_operator_1.BroadcastOperator(this.adapter).compress(compress);
	    }
	    /**
	     * Sets a modifier for a subsequent event emission that the event data may be lost if the client is not ready to
	     * receive messages (because of network slowness or other issues, or because they’re connected through long polling
	     * and is in the middle of a request-response cycle).
	     *
	     * @example
	     * const myNamespace = io.of("/my-namespace");
	     *
	     * myNamespace.volatile.emit("hello"); // the clients may or may not receive it
	     *
	     * @return self
	     */
	    get volatile() {
	        return new broadcast_operator_1.BroadcastOperator(this.adapter).volatile;
	    }
	    /**
	     * Sets a modifier for a subsequent event emission that the event data will only be broadcast to the current node.
	     *
	     * @example
	     * const myNamespace = io.of("/my-namespace");
	     *
	     * // the “foo” event will be broadcast to all connected clients on this node
	     * myNamespace.local.emit("foo", "bar");
	     *
	     * @return a new {@link BroadcastOperator} instance for chaining
	     */
	    get local() {
	        return new broadcast_operator_1.BroadcastOperator(this.adapter).local;
	    }
	    /**
	     * Adds a timeout in milliseconds for the next operation.
	     *
	     * @example
	     * const myNamespace = io.of("/my-namespace");
	     *
	     * myNamespace.timeout(1000).emit("some-event", (err, responses) => {
	     *   if (err) {
	     *     // some clients did not acknowledge the event in the given delay
	     *   } else {
	     *     console.log(responses); // one response per client
	     *   }
	     * });
	     *
	     * @param timeout
	     */
	    timeout(timeout) {
	        return new broadcast_operator_1.BroadcastOperator(this.adapter).timeout(timeout);
	    }
	    /**
	     * Returns the matching socket instances.
	     *
	     * Note: this method also works within a cluster of multiple Socket.IO servers, with a compatible {@link Adapter}.
	     *
	     * @example
	     * const myNamespace = io.of("/my-namespace");
	     *
	     * // return all Socket instances
	     * const sockets = await myNamespace.fetchSockets();
	     *
	     * // return all Socket instances in the "room1" room
	     * const sockets = await myNamespace.in("room1").fetchSockets();
	     *
	     * for (const socket of sockets) {
	     *   console.log(socket.id);
	     *   console.log(socket.handshake);
	     *   console.log(socket.rooms);
	     *   console.log(socket.data);
	     *
	     *   socket.emit("hello");
	     *   socket.join("room1");
	     *   socket.leave("room2");
	     *   socket.disconnect();
	     * }
	     */
	    fetchSockets() {
	        return new broadcast_operator_1.BroadcastOperator(this.adapter).fetchSockets();
	    }
	    /**
	     * Makes the matching socket instances join the specified rooms.
	     *
	     * Note: this method also works within a cluster of multiple Socket.IO servers, with a compatible {@link Adapter}.
	     *
	     * @example
	     * const myNamespace = io.of("/my-namespace");
	     *
	     * // make all socket instances join the "room1" room
	     * myNamespace.socketsJoin("room1");
	     *
	     * // make all socket instances in the "room1" room join the "room2" and "room3" rooms
	     * myNamespace.in("room1").socketsJoin(["room2", "room3"]);
	     *
	     * @param room - a room, or an array of rooms
	     */
	    socketsJoin(room) {
	        return new broadcast_operator_1.BroadcastOperator(this.adapter).socketsJoin(room);
	    }
	    /**
	     * Makes the matching socket instances leave the specified rooms.
	     *
	     * Note: this method also works within a cluster of multiple Socket.IO servers, with a compatible {@link Adapter}.
	     *
	     * @example
	     * const myNamespace = io.of("/my-namespace");
	     *
	     * // make all socket instances leave the "room1" room
	     * myNamespace.socketsLeave("room1");
	     *
	     * // make all socket instances in the "room1" room leave the "room2" and "room3" rooms
	     * myNamespace.in("room1").socketsLeave(["room2", "room3"]);
	     *
	     * @param room - a room, or an array of rooms
	     */
	    socketsLeave(room) {
	        return new broadcast_operator_1.BroadcastOperator(this.adapter).socketsLeave(room);
	    }
	    /**
	     * Makes the matching socket instances disconnect.
	     *
	     * Note: this method also works within a cluster of multiple Socket.IO servers, with a compatible {@link Adapter}.
	     *
	     * @example
	     * const myNamespace = io.of("/my-namespace");
	     *
	     * // make all socket instances disconnect (the connections might be kept alive for other namespaces)
	     * myNamespace.disconnectSockets();
	     *
	     * // make all socket instances in the "room1" room disconnect and close the underlying connections
	     * myNamespace.in("room1").disconnectSockets(true);
	     *
	     * @param close - whether to close the underlying connection
	     */
	    disconnectSockets(close = false) {
	        return new broadcast_operator_1.BroadcastOperator(this.adapter).disconnectSockets(close);
	    }
	}
	exports.Namespace = Namespace; 
} (namespace));

var parentNamespace = {};

var dist$1 = {};

var inMemoryAdapter = {};

var yeast$1 = {};

Object.defineProperty(yeast$1, "__esModule", { value: true });
yeast$1.encode = encode;
yeast$1.decode = decode;
yeast$1.yeast = yeast;
const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), length = 64, map = {};
let seed = 0, i = 0, prev;
/**
 * Return a string representing the specified number.
 *
 * @param {Number} num The number to convert.
 * @returns {String} The string representation of the number.
 * @api public
 */
function encode(num) {
    let encoded = "";
    do {
        encoded = alphabet[num % length] + encoded;
        num = Math.floor(num / length);
    } while (num > 0);
    return encoded;
}
/**
 * Return the integer value specified by the given string.
 *
 * @param {String} str The string to convert.
 * @returns {Number} The integer value represented by the string.
 * @api public
 */
function decode(str) {
    let decoded = 0;
    for (i = 0; i < str.length; i++) {
        decoded = decoded * length + map[str.charAt(i)];
    }
    return decoded;
}
/**
 * Yeast: A tiny growing id generator.
 *
 * @returns {String} A unique id.
 * @api public
 */
function yeast() {
    const now = encode(+new Date());
    if (now !== prev)
        return (seed = 0), (prev = now);
    return now + "." + encode(seed++);
}
//
// Map each character to its index.
//
for (; i < length; i++)
    map[alphabet[i]] = i;

const require$$2$1 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(ws);

var _a;
Object.defineProperty(inMemoryAdapter, "__esModule", { value: true });
inMemoryAdapter.SessionAwareAdapter = inMemoryAdapter.Adapter = void 0;
const events_1 = require$$8$3;
const yeast_1 = yeast$1;
const WebSocket = require$$2$1;
// @ts-expect-error
const canPreComputeFrame = typeof ((_a = WebSocket === null || WebSocket === void 0 ? void 0 : WebSocket.Sender) === null || _a === void 0 ? void 0 : _a.frame) === "function";
class Adapter extends events_1.EventEmitter {
    /**
     * In-memory adapter constructor.
     *
     * @param nsp
     */
    constructor(nsp) {
        super();
        this.nsp = nsp;
        this.rooms = new Map();
        this.sids = new Map();
        this.encoder = nsp.server.encoder; // nsp is a Namespace object
    }
    /**
     * To be overridden
     */
    init() { }
    /**
     * To be overridden
     */
    close() { }
    /**
     * Returns the number of Socket.IO servers in the cluster
     *
     * @public
     */
    serverCount() {
        return Promise.resolve(1);
    }
    /**
     * Adds a socket to a list of room.
     *
     * @param {SocketId}  id      the socket id
     * @param {Set<Room>} rooms   a set of rooms
     * @public
     */
    addAll(id, rooms) {
        if (!this.sids.has(id)) {
            this.sids.set(id, new Set());
        }
        for (const room of rooms) {
            this.sids.get(id).add(room);
            if (!this.rooms.has(room)) {
                this.rooms.set(room, new Set());
                this.emit("create-room", room);
            }
            if (!this.rooms.get(room).has(id)) {
                this.rooms.get(room).add(id);
                this.emit("join-room", room, id);
            }
        }
    }
    /**
     * Removes a socket from a room.
     *
     * @param {SocketId} id     the socket id
     * @param {Room}     room   the room name
     */
    del(id, room) {
        if (this.sids.has(id)) {
            this.sids.get(id).delete(room);
        }
        this._del(room, id);
    }
    _del(room, id) {
        const _room = this.rooms.get(room);
        if (_room != null) {
            const deleted = _room.delete(id);
            if (deleted) {
                this.emit("leave-room", room, id);
            }
            if (_room.size === 0 && this.rooms.delete(room)) {
                this.emit("delete-room", room);
            }
        }
    }
    /**
     * Removes a socket from all rooms it's joined.
     *
     * @param {SocketId} id   the socket id
     */
    delAll(id) {
        if (!this.sids.has(id)) {
            return;
        }
        for (const room of this.sids.get(id)) {
            this._del(room, id);
        }
        this.sids.delete(id);
    }
    /**
     * Broadcasts a packet.
     *
     * Options:
     *  - `flags` {Object} flags for this packet
     *  - `except` {Array} sids that should be excluded
     *  - `rooms` {Array} list of rooms to broadcast to
     *
     * @param {Object} packet   the packet object
     * @param {Object} opts     the options
     * @public
     */
    broadcast(packet, opts) {
        const flags = opts.flags || {};
        const packetOpts = {
            preEncoded: true,
            volatile: flags.volatile,
            compress: flags.compress,
        };
        packet.nsp = this.nsp.name;
        const encodedPackets = this._encode(packet, packetOpts);
        this.apply(opts, (socket) => {
            if (typeof socket.notifyOutgoingListeners === "function") {
                socket.notifyOutgoingListeners(packet);
            }
            socket.client.writeToEngine(encodedPackets, packetOpts);
        });
    }
    /**
     * Broadcasts a packet and expects multiple acknowledgements.
     *
     * Options:
     *  - `flags` {Object} flags for this packet
     *  - `except` {Array} sids that should be excluded
     *  - `rooms` {Array} list of rooms to broadcast to
     *
     * @param {Object} packet   the packet object
     * @param {Object} opts     the options
     * @param clientCountCallback - the number of clients that received the packet
     * @param ack                 - the callback that will be called for each client response
     *
     * @public
     */
    broadcastWithAck(packet, opts, clientCountCallback, ack) {
        const flags = opts.flags || {};
        const packetOpts = {
            preEncoded: true,
            volatile: flags.volatile,
            compress: flags.compress,
        };
        packet.nsp = this.nsp.name;
        // we can use the same id for each packet, since the _ids counter is common (no duplicate)
        packet.id = this.nsp._ids++;
        const encodedPackets = this._encode(packet, packetOpts);
        let clientCount = 0;
        this.apply(opts, (socket) => {
            // track the total number of acknowledgements that are expected
            clientCount++;
            // call the ack callback for each client response
            socket.acks.set(packet.id, ack);
            if (typeof socket.notifyOutgoingListeners === "function") {
                socket.notifyOutgoingListeners(packet);
            }
            socket.client.writeToEngine(encodedPackets, packetOpts);
        });
        clientCountCallback(clientCount);
    }
    _encode(packet, packetOpts) {
        const encodedPackets = this.encoder.encode(packet);
        if (canPreComputeFrame &&
            encodedPackets.length === 1 &&
            typeof encodedPackets[0] === "string") {
            // "4" being the "message" packet type in the Engine.IO protocol
            const data = Buffer.from("4" + encodedPackets[0]);
            // see https://github.com/websockets/ws/issues/617#issuecomment-283002469
            // @ts-expect-error
            packetOpts.wsPreEncodedFrame = WebSocket.Sender.frame(data, {
                readOnly: false,
                mask: false,
                rsv1: false,
                opcode: 1,
                fin: true,
            });
        }
        return encodedPackets;
    }
    /**
     * Gets a list of sockets by sid.
     *
     * @param {Set<Room>} rooms   the explicit set of rooms to check.
     */
    sockets(rooms) {
        const sids = new Set();
        this.apply({ rooms }, (socket) => {
            sids.add(socket.id);
        });
        return Promise.resolve(sids);
    }
    /**
     * Gets the list of rooms a given socket has joined.
     *
     * @param {SocketId} id   the socket id
     */
    socketRooms(id) {
        return this.sids.get(id);
    }
    /**
     * Returns the matching socket instances
     *
     * @param opts - the filters to apply
     */
    fetchSockets(opts) {
        const sockets = [];
        this.apply(opts, (socket) => {
            sockets.push(socket);
        });
        return Promise.resolve(sockets);
    }
    /**
     * Makes the matching socket instances join the specified rooms
     *
     * @param opts - the filters to apply
     * @param rooms - the rooms to join
     */
    addSockets(opts, rooms) {
        this.apply(opts, (socket) => {
            socket.join(rooms);
        });
    }
    /**
     * Makes the matching socket instances leave the specified rooms
     *
     * @param opts - the filters to apply
     * @param rooms - the rooms to leave
     */
    delSockets(opts, rooms) {
        this.apply(opts, (socket) => {
            rooms.forEach((room) => socket.leave(room));
        });
    }
    /**
     * Makes the matching socket instances disconnect
     *
     * @param opts - the filters to apply
     * @param close - whether to close the underlying connection
     */
    disconnectSockets(opts, close) {
        this.apply(opts, (socket) => {
            socket.disconnect(close);
        });
    }
    apply(opts, callback) {
        const rooms = opts.rooms;
        const except = this.computeExceptSids(opts.except);
        if (rooms.size) {
            const ids = new Set();
            for (const room of rooms) {
                if (!this.rooms.has(room))
                    continue;
                for (const id of this.rooms.get(room)) {
                    if (ids.has(id) || except.has(id))
                        continue;
                    const socket = this.nsp.sockets.get(id);
                    if (socket) {
                        callback(socket);
                        ids.add(id);
                    }
                }
            }
        }
        else {
            for (const [id] of this.sids) {
                if (except.has(id))
                    continue;
                const socket = this.nsp.sockets.get(id);
                if (socket)
                    callback(socket);
            }
        }
    }
    computeExceptSids(exceptRooms) {
        const exceptSids = new Set();
        if (exceptRooms && exceptRooms.size > 0) {
            for (const room of exceptRooms) {
                if (this.rooms.has(room)) {
                    this.rooms.get(room).forEach((sid) => exceptSids.add(sid));
                }
            }
        }
        return exceptSids;
    }
    /**
     * Send a packet to the other Socket.IO servers in the cluster
     * @param packet - an array of arguments, which may include an acknowledgement callback at the end
     */
    serverSideEmit(packet) {
        console.warn("this adapter does not support the serverSideEmit() functionality");
    }
    /**
     * Save the client session in order to restore it upon reconnection.
     */
    persistSession(session) { }
    /**
     * Restore the session and find the packets that were missed by the client.
     * @param pid
     * @param offset
     */
    restoreSession(pid, offset) {
        return null;
    }
}
inMemoryAdapter.Adapter = Adapter;
class SessionAwareAdapter extends Adapter {
    constructor(nsp) {
        super(nsp);
        this.nsp = nsp;
        this.sessions = new Map();
        this.packets = [];
        this.maxDisconnectionDuration =
            nsp.server.opts.connectionStateRecovery.maxDisconnectionDuration;
        const timer = setInterval(() => {
            const threshold = Date.now() - this.maxDisconnectionDuration;
            this.sessions.forEach((session, sessionId) => {
                const hasExpired = session.disconnectedAt < threshold;
                if (hasExpired) {
                    this.sessions.delete(sessionId);
                }
            });
            for (let i = this.packets.length - 1; i >= 0; i--) {
                const hasExpired = this.packets[i].emittedAt < threshold;
                if (hasExpired) {
                    this.packets.splice(0, i + 1);
                    break;
                }
            }
        }, 60 * 1000);
        // prevents the timer from keeping the process alive
        timer.unref();
    }
    persistSession(session) {
        session.disconnectedAt = Date.now();
        this.sessions.set(session.pid, session);
    }
    restoreSession(pid, offset) {
        const session = this.sessions.get(pid);
        if (!session) {
            // the session may have expired
            return null;
        }
        const hasExpired = session.disconnectedAt + this.maxDisconnectionDuration < Date.now();
        if (hasExpired) {
            // the session has expired
            this.sessions.delete(pid);
            return null;
        }
        const index = this.packets.findIndex((packet) => packet.id === offset);
        if (index === -1) {
            // the offset may be too old
            return null;
        }
        const missedPackets = [];
        for (let i = index + 1; i < this.packets.length; i++) {
            const packet = this.packets[i];
            if (shouldIncludePacket(session.rooms, packet.opts)) {
                missedPackets.push(packet.data);
            }
        }
        return Promise.resolve(Object.assign(Object.assign({}, session), { missedPackets }));
    }
    broadcast(packet, opts) {
        var _a;
        const isEventPacket = packet.type === 2;
        // packets with acknowledgement are not stored because the acknowledgement function cannot be serialized and
        // restored on another server upon reconnection
        const withoutAcknowledgement = packet.id === undefined;
        const notVolatile = ((_a = opts.flags) === null || _a === void 0 ? void 0 : _a.volatile) === undefined;
        if (isEventPacket && withoutAcknowledgement && notVolatile) {
            const id = (0, yeast_1.yeast)();
            // the offset is stored at the end of the data array, so the client knows the ID of the last packet it has
            // processed (and the format is backward-compatible)
            packet.data.push(id);
            this.packets.push({
                id,
                opts,
                data: packet.data,
                emittedAt: Date.now(),
            });
        }
        super.broadcast(packet, opts);
    }
}
inMemoryAdapter.SessionAwareAdapter = SessionAwareAdapter;
function shouldIncludePacket(sessionRooms, opts) {
    const included = opts.rooms.size === 0 || sessionRooms.some((room) => opts.rooms.has(room));
    const notExcluded = sessionRooms.every((room) => !opts.except.has(room));
    return included && notExcluded;
}

var clusterAdapter = {};

const require$$2 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(crypto);

var __rest = (clusterAdapter && clusterAdapter.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(clusterAdapter, "__esModule", { value: true });
clusterAdapter.ClusterAdapterWithHeartbeat = clusterAdapter.ClusterAdapter = clusterAdapter.MessageType = void 0;
const in_memory_adapter_1 = inMemoryAdapter;
const debug_1$2 = require$$13$2;
const crypto_1 = require$$2;
const debug$3 = (0, debug_1$2.debug)("socket.io-adapter");
const EMITTER_UID = "emitter";
const DEFAULT_TIMEOUT = 5000;
function randomId() {
    return (0, crypto_1.randomBytes)(8).toString("hex");
}
var MessageType;
(function (MessageType) {
    MessageType[MessageType["INITIAL_HEARTBEAT"] = 1] = "INITIAL_HEARTBEAT";
    MessageType[MessageType["HEARTBEAT"] = 2] = "HEARTBEAT";
    MessageType[MessageType["BROADCAST"] = 3] = "BROADCAST";
    MessageType[MessageType["SOCKETS_JOIN"] = 4] = "SOCKETS_JOIN";
    MessageType[MessageType["SOCKETS_LEAVE"] = 5] = "SOCKETS_LEAVE";
    MessageType[MessageType["DISCONNECT_SOCKETS"] = 6] = "DISCONNECT_SOCKETS";
    MessageType[MessageType["FETCH_SOCKETS"] = 7] = "FETCH_SOCKETS";
    MessageType[MessageType["FETCH_SOCKETS_RESPONSE"] = 8] = "FETCH_SOCKETS_RESPONSE";
    MessageType[MessageType["SERVER_SIDE_EMIT"] = 9] = "SERVER_SIDE_EMIT";
    MessageType[MessageType["SERVER_SIDE_EMIT_RESPONSE"] = 10] = "SERVER_SIDE_EMIT_RESPONSE";
    MessageType[MessageType["BROADCAST_CLIENT_COUNT"] = 11] = "BROADCAST_CLIENT_COUNT";
    MessageType[MessageType["BROADCAST_ACK"] = 12] = "BROADCAST_ACK";
    MessageType[MessageType["ADAPTER_CLOSE"] = 13] = "ADAPTER_CLOSE";
})(MessageType || (clusterAdapter.MessageType = MessageType = {}));
function encodeOptions(opts) {
    return {
        rooms: [...opts.rooms],
        except: [...opts.except],
        flags: opts.flags,
    };
}
function decodeOptions(opts) {
    return {
        rooms: new Set(opts.rooms),
        except: new Set(opts.except),
        flags: opts.flags,
    };
}
/**
 * A cluster-ready adapter. Any extending class must:
 *
 * - implement {@link ClusterAdapter#doPublish} and {@link ClusterAdapter#doPublishResponse}
 * - call {@link ClusterAdapter#onMessage} and {@link ClusterAdapter#onResponse}
 */
class ClusterAdapter extends in_memory_adapter_1.Adapter {
    constructor(nsp) {
        super(nsp);
        this.requests = new Map();
        this.ackRequests = new Map();
        this.uid = randomId();
    }
    /**
     * Called when receiving a message from another member of the cluster.
     *
     * @param message
     * @param offset
     * @protected
     */
    onMessage(message, offset) {
        if (message.uid === this.uid) {
            return debug$3("[%s] ignore message from self", this.uid);
        }
        if (message.nsp !== this.nsp.name) {
            return debug$3("[%s] ignore message from another namespace (%s)", this.uid, message.nsp);
        }
        debug$3("[%s] new event of type %d from %s", this.uid, message.type, message.uid);
        switch (message.type) {
            case MessageType.BROADCAST: {
                const withAck = message.data.requestId !== undefined;
                if (withAck) {
                    super.broadcastWithAck(message.data.packet, decodeOptions(message.data.opts), (clientCount) => {
                        debug$3("[%s] waiting for %d client acknowledgements", this.uid, clientCount);
                        this.publishResponse(message.uid, {
                            type: MessageType.BROADCAST_CLIENT_COUNT,
                            data: {
                                requestId: message.data.requestId,
                                clientCount,
                            },
                        });
                    }, (arg) => {
                        debug$3("[%s] received acknowledgement with value %j", this.uid, arg);
                        this.publishResponse(message.uid, {
                            type: MessageType.BROADCAST_ACK,
                            data: {
                                requestId: message.data.requestId,
                                packet: arg,
                            },
                        });
                    });
                }
                else {
                    const packet = message.data.packet;
                    const opts = decodeOptions(message.data.opts);
                    this.addOffsetIfNecessary(packet, opts, offset);
                    super.broadcast(packet, opts);
                }
                break;
            }
            case MessageType.SOCKETS_JOIN:
                super.addSockets(decodeOptions(message.data.opts), message.data.rooms);
                break;
            case MessageType.SOCKETS_LEAVE:
                super.delSockets(decodeOptions(message.data.opts), message.data.rooms);
                break;
            case MessageType.DISCONNECT_SOCKETS:
                super.disconnectSockets(decodeOptions(message.data.opts), message.data.close);
                break;
            case MessageType.FETCH_SOCKETS: {
                debug$3("[%s] calling fetchSockets with opts %j", this.uid, message.data.opts);
                super
                    .fetchSockets(decodeOptions(message.data.opts))
                    .then((localSockets) => {
                    this.publishResponse(message.uid, {
                        type: MessageType.FETCH_SOCKETS_RESPONSE,
                        data: {
                            requestId: message.data.requestId,
                            sockets: localSockets.map((socket) => {
                                // remove sessionStore from handshake, as it may contain circular references
                                const _a = socket.handshake, { sessionStore } = _a, handshake = __rest(_a, ["sessionStore"]);
                                return {
                                    id: socket.id,
                                    handshake,
                                    rooms: [...socket.rooms],
                                    data: socket.data,
                                };
                            }),
                        },
                    });
                });
                break;
            }
            case MessageType.SERVER_SIDE_EMIT: {
                const packet = message.data.packet;
                const withAck = message.data.requestId !== undefined;
                if (!withAck) {
                    this.nsp._onServerSideEmit(packet);
                    return;
                }
                let called = false;
                const callback = (arg) => {
                    // only one argument is expected
                    if (called) {
                        return;
                    }
                    called = true;
                    debug$3("[%s] calling acknowledgement with %j", this.uid, arg);
                    this.publishResponse(message.uid, {
                        type: MessageType.SERVER_SIDE_EMIT_RESPONSE,
                        data: {
                            requestId: message.data.requestId,
                            packet: arg,
                        },
                    });
                };
                this.nsp._onServerSideEmit([...packet, callback]);
                break;
            }
            // @ts-ignore
            case MessageType.BROADCAST_CLIENT_COUNT:
            // @ts-ignore
            case MessageType.BROADCAST_ACK:
            // @ts-ignore
            case MessageType.FETCH_SOCKETS_RESPONSE:
            // @ts-ignore
            case MessageType.SERVER_SIDE_EMIT_RESPONSE:
                // extending classes may not make a distinction between a ClusterMessage and a ClusterResponse payload and may
                // always call the onMessage() method
                this.onResponse(message);
                break;
            default:
                debug$3("[%s] unknown message type: %s", this.uid, message.type);
        }
    }
    /**
     * Called when receiving a response from another member of the cluster.
     *
     * @param response
     * @protected
     */
    onResponse(response) {
        var _a, _b;
        const requestId = response.data.requestId;
        debug$3("[%s] received response %s to request %s", this.uid, response.type, requestId);
        switch (response.type) {
            case MessageType.BROADCAST_CLIENT_COUNT: {
                (_a = this.ackRequests
                    .get(requestId)) === null || _a === void 0 ? void 0 : _a.clientCountCallback(response.data.clientCount);
                break;
            }
            case MessageType.BROADCAST_ACK: {
                (_b = this.ackRequests.get(requestId)) === null || _b === void 0 ? void 0 : _b.ack(response.data.packet);
                break;
            }
            case MessageType.FETCH_SOCKETS_RESPONSE: {
                const request = this.requests.get(requestId);
                if (!request) {
                    return;
                }
                request.current++;
                response.data.sockets.forEach((socket) => request.responses.push(socket));
                if (request.current === request.expected) {
                    clearTimeout(request.timeout);
                    request.resolve(request.responses);
                    this.requests.delete(requestId);
                }
                break;
            }
            case MessageType.SERVER_SIDE_EMIT_RESPONSE: {
                const request = this.requests.get(requestId);
                if (!request) {
                    return;
                }
                request.current++;
                request.responses.push(response.data.packet);
                if (request.current === request.expected) {
                    clearTimeout(request.timeout);
                    request.resolve(null, request.responses);
                    this.requests.delete(requestId);
                }
                break;
            }
            default:
                // @ts-ignore
                debug$3("[%s] unknown response type: %s", this.uid, response.type);
        }
    }
    async broadcast(packet, opts) {
        var _a;
        const onlyLocal = (_a = opts.flags) === null || _a === void 0 ? void 0 : _a.local;
        if (!onlyLocal) {
            try {
                const offset = await this.publishAndReturnOffset({
                    type: MessageType.BROADCAST,
                    data: {
                        packet,
                        opts: encodeOptions(opts),
                    },
                });
                this.addOffsetIfNecessary(packet, opts, offset);
            }
            catch (e) {
                return debug$3("[%s] error while broadcasting message: %s", this.uid, e.message);
            }
        }
        super.broadcast(packet, opts);
    }
    /**
     * Adds an offset at the end of the data array in order to allow the client to receive any missed packets when it
     * reconnects after a temporary disconnection.
     *
     * @param packet
     * @param opts
     * @param offset
     * @private
     */
    addOffsetIfNecessary(packet, opts, offset) {
        var _a;
        if (!this.nsp.server.opts.connectionStateRecovery) {
            return;
        }
        const isEventPacket = packet.type === 2;
        // packets with acknowledgement are not stored because the acknowledgement function cannot be serialized and
        // restored on another server upon reconnection
        const withoutAcknowledgement = packet.id === undefined;
        const notVolatile = ((_a = opts.flags) === null || _a === void 0 ? void 0 : _a.volatile) === undefined;
        if (isEventPacket && withoutAcknowledgement && notVolatile) {
            packet.data.push(offset);
        }
    }
    broadcastWithAck(packet, opts, clientCountCallback, ack) {
        var _a;
        const onlyLocal = (_a = opts === null || opts === void 0 ? void 0 : opts.flags) === null || _a === void 0 ? void 0 : _a.local;
        if (!onlyLocal) {
            const requestId = randomId();
            this.ackRequests.set(requestId, {
                clientCountCallback,
                ack,
            });
            this.publish({
                type: MessageType.BROADCAST,
                data: {
                    packet,
                    requestId,
                    opts: encodeOptions(opts),
                },
            });
            // we have no way to know at this level whether the server has received an acknowledgement from each client, so we
            // will simply clean up the ackRequests map after the given delay
            setTimeout(() => {
                this.ackRequests.delete(requestId);
            }, opts.flags.timeout);
        }
        super.broadcastWithAck(packet, opts, clientCountCallback, ack);
    }
    async addSockets(opts, rooms) {
        var _a;
        const onlyLocal = (_a = opts.flags) === null || _a === void 0 ? void 0 : _a.local;
        if (!onlyLocal) {
            try {
                await this.publishAndReturnOffset({
                    type: MessageType.SOCKETS_JOIN,
                    data: {
                        opts: encodeOptions(opts),
                        rooms,
                    },
                });
            }
            catch (e) {
                debug$3("[%s] error while publishing message: %s", this.uid, e.message);
            }
        }
        super.addSockets(opts, rooms);
    }
    async delSockets(opts, rooms) {
        var _a;
        const onlyLocal = (_a = opts.flags) === null || _a === void 0 ? void 0 : _a.local;
        if (!onlyLocal) {
            try {
                await this.publishAndReturnOffset({
                    type: MessageType.SOCKETS_LEAVE,
                    data: {
                        opts: encodeOptions(opts),
                        rooms,
                    },
                });
            }
            catch (e) {
                debug$3("[%s] error while publishing message: %s", this.uid, e.message);
            }
        }
        super.delSockets(opts, rooms);
    }
    async disconnectSockets(opts, close) {
        var _a;
        const onlyLocal = (_a = opts.flags) === null || _a === void 0 ? void 0 : _a.local;
        if (!onlyLocal) {
            try {
                await this.publishAndReturnOffset({
                    type: MessageType.DISCONNECT_SOCKETS,
                    data: {
                        opts: encodeOptions(opts),
                        close,
                    },
                });
            }
            catch (e) {
                debug$3("[%s] error while publishing message: %s", this.uid, e.message);
            }
        }
        super.disconnectSockets(opts, close);
    }
    async fetchSockets(opts) {
        var _a;
        const [localSockets, serverCount] = await Promise.all([
            super.fetchSockets(opts),
            this.serverCount(),
        ]);
        const expectedResponseCount = serverCount - 1;
        if (((_a = opts.flags) === null || _a === void 0 ? void 0 : _a.local) || expectedResponseCount <= 0) {
            return localSockets;
        }
        const requestId = randomId();
        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                const storedRequest = this.requests.get(requestId);
                if (storedRequest) {
                    reject(new Error(`timeout reached: only ${storedRequest.current} responses received out of ${storedRequest.expected}`));
                    this.requests.delete(requestId);
                }
            }, opts.flags.timeout || DEFAULT_TIMEOUT);
            const storedRequest = {
                type: MessageType.FETCH_SOCKETS,
                resolve,
                timeout,
                current: 0,
                expected: expectedResponseCount,
                responses: localSockets,
            };
            this.requests.set(requestId, storedRequest);
            this.publish({
                type: MessageType.FETCH_SOCKETS,
                data: {
                    opts: encodeOptions(opts),
                    requestId,
                },
            });
        });
    }
    async serverSideEmit(packet) {
        const withAck = typeof packet[packet.length - 1] === "function";
        if (!withAck) {
            return this.publish({
                type: MessageType.SERVER_SIDE_EMIT,
                data: {
                    packet,
                },
            });
        }
        const ack = packet.pop();
        const expectedResponseCount = (await this.serverCount()) - 1;
        debug$3('[%s] waiting for %d responses to "serverSideEmit" request', this.uid, expectedResponseCount);
        if (expectedResponseCount <= 0) {
            return ack(null, []);
        }
        const requestId = randomId();
        const timeout = setTimeout(() => {
            const storedRequest = this.requests.get(requestId);
            if (storedRequest) {
                ack(new Error(`timeout reached: only ${storedRequest.current} responses received out of ${storedRequest.expected}`), storedRequest.responses);
                this.requests.delete(requestId);
            }
        }, DEFAULT_TIMEOUT);
        const storedRequest = {
            type: MessageType.SERVER_SIDE_EMIT,
            resolve: ack,
            timeout,
            current: 0,
            expected: expectedResponseCount,
            responses: [],
        };
        this.requests.set(requestId, storedRequest);
        this.publish({
            type: MessageType.SERVER_SIDE_EMIT,
            data: {
                requestId, // the presence of this attribute defines whether an acknowledgement is needed
                packet,
            },
        });
    }
    publish(message) {
        debug$3("[%s] sending message %s", this.uid, message.type);
        this.publishAndReturnOffset(message).catch((err) => {
            debug$3("[%s] error while publishing message: %s", this.uid, err);
        });
    }
    publishAndReturnOffset(message) {
        message.uid = this.uid;
        message.nsp = this.nsp.name;
        return this.doPublish(message);
    }
    publishResponse(requesterUid, response) {
        response.uid = this.uid;
        response.nsp = this.nsp.name;
        debug$3("[%s] sending response %s to %s", this.uid, response.type, requesterUid);
        this.doPublishResponse(requesterUid, response).catch((err) => {
            debug$3("[%s] error while publishing response: %s", this.uid, err);
        });
    }
}
clusterAdapter.ClusterAdapter = ClusterAdapter;
class ClusterAdapterWithHeartbeat extends ClusterAdapter {
    constructor(nsp, opts) {
        super(nsp);
        this.nodesMap = new Map(); // uid => timestamp of last message
        this.customRequests = new Map();
        this._opts = Object.assign({
            heartbeatInterval: 5000,
            heartbeatTimeout: 10000,
        }, opts);
        this.cleanupTimer = setInterval(() => {
            const now = Date.now();
            this.nodesMap.forEach((lastSeen, uid) => {
                const nodeSeemsDown = now - lastSeen > this._opts.heartbeatTimeout;
                if (nodeSeemsDown) {
                    debug$3("[%s] node %s seems down", this.uid, uid);
                    this.removeNode(uid);
                }
            });
        }, 1000);
    }
    init() {
        this.publish({
            type: MessageType.INITIAL_HEARTBEAT,
        });
    }
    scheduleHeartbeat() {
        if (this.heartbeatTimer) {
            this.heartbeatTimer.refresh();
        }
        else {
            this.heartbeatTimer = setTimeout(() => {
                this.publish({
                    type: MessageType.HEARTBEAT,
                });
            }, this._opts.heartbeatInterval);
        }
    }
    close() {
        this.publish({
            type: MessageType.ADAPTER_CLOSE,
        });
        clearTimeout(this.heartbeatTimer);
        if (this.cleanupTimer) {
            clearInterval(this.cleanupTimer);
        }
    }
    onMessage(message, offset) {
        if (message.uid === this.uid) {
            return debug$3("[%s] ignore message from self", this.uid);
        }
        if (message.uid && message.uid !== EMITTER_UID) {
            // we track the UID of each sender to know how many servers there are in the cluster
            this.nodesMap.set(message.uid, Date.now());
        }
        switch (message.type) {
            case MessageType.INITIAL_HEARTBEAT:
                this.publish({
                    type: MessageType.HEARTBEAT,
                });
                break;
            case MessageType.HEARTBEAT:
                // nothing to do
                break;
            case MessageType.ADAPTER_CLOSE:
                this.removeNode(message.uid);
                break;
            default:
                super.onMessage(message, offset);
        }
    }
    serverCount() {
        return Promise.resolve(1 + this.nodesMap.size);
    }
    publish(message) {
        this.scheduleHeartbeat();
        return super.publish(message);
    }
    async serverSideEmit(packet) {
        const withAck = typeof packet[packet.length - 1] === "function";
        if (!withAck) {
            return this.publish({
                type: MessageType.SERVER_SIDE_EMIT,
                data: {
                    packet,
                },
            });
        }
        const ack = packet.pop();
        const expectedResponseCount = this.nodesMap.size;
        debug$3('[%s] waiting for %d responses to "serverSideEmit" request', this.uid, expectedResponseCount);
        if (expectedResponseCount <= 0) {
            return ack(null, []);
        }
        const requestId = randomId();
        const timeout = setTimeout(() => {
            const storedRequest = this.customRequests.get(requestId);
            if (storedRequest) {
                ack(new Error(`timeout reached: missing ${storedRequest.missingUids.size} responses`), storedRequest.responses);
                this.customRequests.delete(requestId);
            }
        }, DEFAULT_TIMEOUT);
        const storedRequest = {
            type: MessageType.SERVER_SIDE_EMIT,
            resolve: ack,
            timeout,
            missingUids: new Set([...this.nodesMap.keys()]),
            responses: [],
        };
        this.customRequests.set(requestId, storedRequest);
        this.publish({
            type: MessageType.SERVER_SIDE_EMIT,
            data: {
                requestId, // the presence of this attribute defines whether an acknowledgement is needed
                packet,
            },
        });
    }
    async fetchSockets(opts) {
        var _a;
        const [localSockets, serverCount] = await Promise.all([
            super.fetchSockets({
                rooms: opts.rooms,
                except: opts.except,
                flags: {
                    local: true,
                },
            }),
            this.serverCount(),
        ]);
        const expectedResponseCount = serverCount - 1;
        if (((_a = opts.flags) === null || _a === void 0 ? void 0 : _a.local) || expectedResponseCount <= 0) {
            return localSockets;
        }
        const requestId = randomId();
        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                const storedRequest = this.customRequests.get(requestId);
                if (storedRequest) {
                    reject(new Error(`timeout reached: missing ${storedRequest.missingUids.size} responses`));
                    this.customRequests.delete(requestId);
                }
            }, opts.flags.timeout || DEFAULT_TIMEOUT);
            const storedRequest = {
                type: MessageType.FETCH_SOCKETS,
                resolve,
                timeout,
                missingUids: new Set([...this.nodesMap.keys()]),
                responses: localSockets,
            };
            this.customRequests.set(requestId, storedRequest);
            this.publish({
                type: MessageType.FETCH_SOCKETS,
                data: {
                    opts: encodeOptions(opts),
                    requestId,
                },
            });
        });
    }
    onResponse(response) {
        const requestId = response.data.requestId;
        debug$3("[%s] received response %s to request %s", this.uid, response.type, requestId);
        switch (response.type) {
            case MessageType.FETCH_SOCKETS_RESPONSE: {
                const request = this.customRequests.get(requestId);
                if (!request) {
                    return;
                }
                response.data.sockets.forEach((socket) => request.responses.push(socket));
                request.missingUids.delete(response.uid);
                if (request.missingUids.size === 0) {
                    clearTimeout(request.timeout);
                    request.resolve(request.responses);
                    this.customRequests.delete(requestId);
                }
                break;
            }
            case MessageType.SERVER_SIDE_EMIT_RESPONSE: {
                const request = this.customRequests.get(requestId);
                if (!request) {
                    return;
                }
                request.responses.push(response.data.packet);
                request.missingUids.delete(response.uid);
                if (request.missingUids.size === 0) {
                    clearTimeout(request.timeout);
                    request.resolve(null, request.responses);
                    this.customRequests.delete(requestId);
                }
                break;
            }
            default:
                super.onResponse(response);
        }
    }
    removeNode(uid) {
        this.customRequests.forEach((request, requestId) => {
            request.missingUids.delete(uid);
            if (request.missingUids.size === 0) {
                clearTimeout(request.timeout);
                if (request.type === MessageType.FETCH_SOCKETS) {
                    request.resolve(request.responses);
                }
                else if (request.type === MessageType.SERVER_SIDE_EMIT) {
                    request.resolve(null, request.responses);
                }
                this.customRequests.delete(requestId);
            }
        });
        this.nodesMap.delete(uid);
    }
}
clusterAdapter.ClusterAdapterWithHeartbeat = ClusterAdapterWithHeartbeat;

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.MessageType = exports.ClusterAdapterWithHeartbeat = exports.ClusterAdapter = exports.SessionAwareAdapter = exports.Adapter = void 0;
	var in_memory_adapter_1 = inMemoryAdapter;
	Object.defineProperty(exports, "Adapter", { enumerable: true, get: function () { return in_memory_adapter_1.Adapter; } });
	Object.defineProperty(exports, "SessionAwareAdapter", { enumerable: true, get: function () { return in_memory_adapter_1.SessionAwareAdapter; } });
	var cluster_adapter_1 = clusterAdapter;
	Object.defineProperty(exports, "ClusterAdapter", { enumerable: true, get: function () { return cluster_adapter_1.ClusterAdapter; } });
	Object.defineProperty(exports, "ClusterAdapterWithHeartbeat", { enumerable: true, get: function () { return cluster_adapter_1.ClusterAdapterWithHeartbeat; } });
	Object.defineProperty(exports, "MessageType", { enumerable: true, get: function () { return cluster_adapter_1.MessageType; } }); 
} (dist$1));

var __importDefault$1 = (parentNamespace && parentNamespace.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(parentNamespace, "__esModule", { value: true });
parentNamespace.ParentNamespace = void 0;
const namespace_1 = namespace;
const socket_io_adapter_1$1 = dist$1;
const debug_1$1 = __importDefault$1(require$$13$2);
const debug$2 = (0, debug_1$1.default)("socket.io:parent-namespace");
/**
 * A parent namespace is a special {@link Namespace} that holds a list of child namespaces which were created either
 * with a regular expression or with a function.
 *
 * @example
 * const parentNamespace = io.of(/\/dynamic-\d+/);
 *
 * parentNamespace.on("connection", (socket) => {
 *   const childNamespace = socket.nsp;
 * }
 *
 * // will reach all the clients that are in one of the child namespaces, like "/dynamic-101"
 * parentNamespace.emit("hello", "world");
 *
 */
class ParentNamespace extends namespace_1.Namespace {
    constructor(server) {
        super(server, "/_" + ParentNamespace.count++);
        this.children = new Set();
    }
    /**
     * @private
     */
    _initAdapter() {
        this.adapter = new ParentBroadcastAdapter(this);
    }
    emit(ev, ...args) {
        this.children.forEach((nsp) => {
            nsp.emit(ev, ...args);
        });
        return true;
    }
    createChild(name) {
        debug$2("creating child namespace %s", name);
        const namespace = new namespace_1.Namespace(this.server, name);
        this["_fns"].forEach((fn) => namespace.use(fn));
        this.listeners("connect").forEach((listener) => namespace.on("connect", listener));
        this.listeners("connection").forEach((listener) => namespace.on("connection", listener));
        this.children.add(namespace);
        if (this.server._opts.cleanupEmptyChildNamespaces) {
            const remove = namespace._remove;
            namespace._remove = (socket) => {
                remove.call(namespace, socket);
                if (namespace.sockets.size === 0) {
                    debug$2("closing child namespace %s", name);
                    namespace.adapter.close();
                    this.server._nsps.delete(namespace.name);
                    this.children.delete(namespace);
                }
            };
        }
        this.server._nsps.set(name, namespace);
        // @ts-ignore
        this.server.sockets.emitReserved("new_namespace", namespace);
        return namespace;
    }
    fetchSockets() {
        // note: we could make the fetchSockets() method work for dynamic namespaces created with a regex (by sending the
        // regex to the other Socket.IO servers, and returning the sockets of each matching namespace for example), but
        // the behavior for namespaces created with a function is less clear
        // note²: we cannot loop over each children namespace, because with multiple Socket.IO servers, a given namespace
        // may exist on one node but not exist on another (since it is created upon client connection)
        throw new Error("fetchSockets() is not supported on parent namespaces");
    }
}
parentNamespace.ParentNamespace = ParentNamespace;
ParentNamespace.count = 0;
/**
 * A dummy adapter that only supports broadcasting to child (concrete) namespaces.
 * @private file
 */
class ParentBroadcastAdapter extends socket_io_adapter_1$1.Adapter {
    broadcast(packet, opts) {
        this.nsp.children.forEach((nsp) => {
            nsp.adapter.broadcast(packet, opts);
        });
    }
}

var uws = {};

var __importDefault = (uws && uws.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(uws, "__esModule", { value: true });
uws.patchAdapter = patchAdapter;
uws.restoreAdapter = restoreAdapter;
uws.serveFile = serveFile;
const socket_io_adapter_1 = dist$1;
const fs_1 = require$$1$1;
const debug_1 = __importDefault(require$$13$2);
const debug$1 = (0, debug_1.default)("socket.io:adapter-uws");
const SEPARATOR = "\x1f"; // see https://en.wikipedia.org/wiki/Delimiter#ASCII_delimited_text
const { addAll, del, broadcast } = socket_io_adapter_1.Adapter.prototype;
function patchAdapter(app /* : TemplatedApp */) {
    socket_io_adapter_1.Adapter.prototype.addAll = function (id, rooms) {
        const isNew = !this.sids.has(id);
        addAll.call(this, id, rooms);
        const socket = this.nsp.sockets.get(id) || this.nsp._preConnectSockets.get(id);
        if (!socket) {
            return;
        }
        if (socket.conn.transport.name === "websocket") {
            subscribe(this.nsp.name, socket, isNew, rooms);
            return;
        }
        if (isNew) {
            socket.conn.on("upgrade", () => {
                const rooms = this.sids.get(id);
                if (rooms) {
                    subscribe(this.nsp.name, socket, isNew, rooms);
                }
            });
        }
    };
    socket_io_adapter_1.Adapter.prototype.del = function (id, room) {
        del.call(this, id, room);
        const socket = this.nsp.sockets.get(id) || this.nsp._preConnectSockets.get(id);
        if (socket && socket.conn.transport.name === "websocket") {
            // @ts-ignore
            const sessionId = socket.conn.id;
            // @ts-ignore
            const websocket = socket.conn.transport.socket;
            const topic = `${this.nsp.name}${SEPARATOR}${room}`;
            debug$1("unsubscribe connection %s from topic %s", sessionId, topic);
            websocket.unsubscribe(topic);
        }
    };
    socket_io_adapter_1.Adapter.prototype.broadcast = function (packet, opts) {
        const useFastPublish = opts.rooms.size <= 1 && opts.except.size === 0;
        if (!useFastPublish) {
            broadcast.call(this, packet, opts);
            return;
        }
        const flags = opts.flags || {};
        const basePacketOpts = {
            preEncoded: true,
            volatile: flags.volatile,
            compress: flags.compress,
        };
        packet.nsp = this.nsp.name;
        const encodedPackets = this.encoder.encode(packet);
        const topic = opts.rooms.size === 0
            ? this.nsp.name
            : `${this.nsp.name}${SEPARATOR}${opts.rooms.keys().next().value}`;
        debug$1("fast publish to %s", topic);
        // fast publish for clients connected with WebSocket
        encodedPackets.forEach((encodedPacket) => {
            const isBinary = typeof encodedPacket !== "string";
            // "4" being the message type in the Engine.IO protocol, see https://github.com/socketio/engine.io-protocol
            app.publish(topic, isBinary ? encodedPacket : "4" + encodedPacket, isBinary);
        });
        this.apply(opts, (socket) => {
            if (socket.conn.transport.name !== "websocket") {
                // classic publish for clients connected with HTTP long-polling
                socket.client.writeToEngine(encodedPackets, basePacketOpts);
            }
        });
    };
}
function subscribe(namespaceName, socket, isNew, rooms) {
    // @ts-ignore
    const sessionId = socket.conn.id;
    // @ts-ignore
    const websocket = socket.conn.transport.socket;
    if (isNew) {
        debug$1("subscribe connection %s to topic %s", sessionId, namespaceName);
        websocket.subscribe(namespaceName);
    }
    rooms.forEach((room) => {
        const topic = `${namespaceName}${SEPARATOR}${room}`; // '#' can be used as wildcard
        debug$1("subscribe connection %s to topic %s", sessionId, topic);
        websocket.subscribe(topic);
    });
}
function restoreAdapter() {
    socket_io_adapter_1.Adapter.prototype.addAll = addAll;
    socket_io_adapter_1.Adapter.prototype.del = del;
    socket_io_adapter_1.Adapter.prototype.broadcast = broadcast;
}
const toArrayBuffer = (buffer) => {
    const { buffer: arrayBuffer, byteOffset, byteLength } = buffer;
    return arrayBuffer.slice(byteOffset, byteOffset + byteLength);
};
// imported from https://github.com/kolodziejczak-sz/uwebsocket-serve
function serveFile(res /* : HttpResponse */, filepath) {
    const { size } = (0, fs_1.statSync)(filepath);
    const readStream = (0, fs_1.createReadStream)(filepath);
    const destroyReadStream = () => !readStream.destroyed && readStream.destroy();
    const onError = (error) => {
        destroyReadStream();
        throw error;
    };
    const onDataChunk = (chunk) => {
        const arrayBufferChunk = toArrayBuffer(chunk);
        res.cork(() => {
            const lastOffset = res.getWriteOffset();
            const [ok, done] = res.tryEnd(arrayBufferChunk, size);
            if (!done && !ok) {
                readStream.pause();
                res.onWritable((offset) => {
                    const [ok, done] = res.tryEnd(arrayBufferChunk.slice(offset - lastOffset), size);
                    if (!done && ok) {
                        readStream.resume();
                    }
                    return ok;
                });
            }
        });
    };
    res.onAborted(destroyReadStream);
    readStream
        .on("data", onDataChunk)
        .on("error", onError)
        .on("end", destroyReadStream);
}

const require$$17 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(cors);

var version = "4.8.3";
const require$$18 = {
	version: version};

var dist = dist$2.exports;

(function (module, exports) {
	var __createBinding = (dist && dist.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __setModuleDefault = (dist && dist.__setModuleDefault) || (Object.create ? (function(o, v) {
	    Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
	    o["default"] = v;
	});
	var __importStar = (dist && dist.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    __setModuleDefault(result, mod);
	    return result;
	};
	var __importDefault = (dist && dist.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Namespace = exports.Socket = exports.Server = void 0;
	const http_1 = __importDefault(require$$0$1);
	const fs_1 = require$$1$1;
	const zlib_1 = require$$2$2;
	const accepts = require$$3$2;
	const stream_1 = require$$4;
	const path = require$$5$2;
	const engine_io_1 = require$$6;
	const client_1 = client;
	const events_1 = require$$8$3;
	const namespace_1 = namespace;
	Object.defineProperty(exports, "Namespace", { enumerable: true, get: function () { return namespace_1.Namespace; } });
	const parent_namespace_1 = parentNamespace;
	const socket_io_adapter_1 = dist$1;
	const parser$1 = __importStar(parser);
	const debug_1 = __importDefault(require$$13$2);
	const socket_1 = socket;
	Object.defineProperty(exports, "Socket", { enumerable: true, get: function () { return socket_1.Socket; } });
	const typed_events_1 = typedEvents;
	const uws_1 = uws;
	const cors_1 = __importDefault(require$$17);
	const debug = (0, debug_1.default)("socket.io:server");
	const clientVersion = require$$18.version;
	const dotMapRegex = /\.map/;
	/**
	 * Represents a Socket.IO server.
	 *
	 * @example
	 * import { Server } from "socket.io";
	 *
	 * const io = new Server();
	 *
	 * io.on("connection", (socket) => {
	 *   console.log(`socket ${socket.id} connected`);
	 *
	 *   // send an event to the client
	 *   socket.emit("foo", "bar");
	 *
	 *   socket.on("foobar", () => {
	 *     // an event was received from the client
	 *   });
	 *
	 *   // upon disconnection
	 *   socket.on("disconnect", (reason) => {
	 *     console.log(`socket ${socket.id} disconnected due to ${reason}`);
	 *   });
	 * });
	 *
	 * io.listen(3000);
	 */
	class Server extends typed_events_1.StrictEventEmitter {
	    constructor(srv, opts = {}) {
	        super();
	        /**
	         * @private
	         */
	        this._nsps = new Map();
	        this.parentNsps = new Map();
	        /**
	         * A subset of the {@link parentNsps} map, only containing {@link ParentNamespace} which are based on a regular
	         * expression.
	         *
	         * @private
	         */
	        this.parentNamespacesFromRegExp = new Map();
	        if ("object" === typeof srv &&
	            srv instanceof Object &&
	            !srv.listen) {
	            opts = srv;
	            srv = undefined;
	        }
	        this.path(opts.path || "/socket.io");
	        this.connectTimeout(opts.connectTimeout || 45000);
	        this.serveClient(false !== opts.serveClient);
	        this._parser = opts.parser || parser$1;
	        this.encoder = new this._parser.Encoder();
	        this.opts = opts;
	        if (opts.connectionStateRecovery) {
	            opts.connectionStateRecovery = Object.assign({
	                maxDisconnectionDuration: 2 * 60 * 1000,
	                skipMiddlewares: true,
	            }, opts.connectionStateRecovery);
	            this.adapter(opts.adapter || socket_io_adapter_1.SessionAwareAdapter);
	        }
	        else {
	            this.adapter(opts.adapter || socket_io_adapter_1.Adapter);
	        }
	        opts.cleanupEmptyChildNamespaces = !!opts.cleanupEmptyChildNamespaces;
	        this.sockets = this.of("/");
	        if (srv || typeof srv == "number")
	            this.attach(srv);
	        if (this.opts.cors) {
	            this._corsMiddleware = (0, cors_1.default)(this.opts.cors);
	        }
	    }
	    get _opts() {
	        return this.opts;
	    }
	    serveClient(v) {
	        if (!arguments.length)
	            return this._serveClient;
	        this._serveClient = v;
	        return this;
	    }
	    /**
	     * Executes the middleware for an incoming namespace not already created on the server.
	     *
	     * @param name - name of incoming namespace
	     * @param auth - the auth parameters
	     * @param fn - callback
	     *
	     * @private
	     */
	    _checkNamespace(name, auth, fn) {
	        if (this.parentNsps.size === 0)
	            return fn(false);
	        const keysIterator = this.parentNsps.keys();
	        const run = () => {
	            const nextFn = keysIterator.next();
	            if (nextFn.done) {
	                return fn(false);
	            }
	            nextFn.value(name, auth, (err, allow) => {
	                if (err || !allow) {
	                    return run();
	                }
	                if (this._nsps.has(name)) {
	                    // the namespace was created in the meantime
	                    debug("dynamic namespace %s already exists", name);
	                    return fn(this._nsps.get(name));
	                }
	                const namespace = this.parentNsps.get(nextFn.value).createChild(name);
	                debug("dynamic namespace %s was created", name);
	                fn(namespace);
	            });
	        };
	        run();
	    }
	    path(v) {
	        if (!arguments.length)
	            return this._path;
	        this._path = v.replace(/\/$/, "");
	        const escapedPath = this._path.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
	        this.clientPathRegex = new RegExp("^" +
	            escapedPath +
	            "/socket\\.io(\\.msgpack|\\.esm)?(\\.min)?\\.js(\\.map)?(?:\\?|$)");
	        return this;
	    }
	    connectTimeout(v) {
	        if (v === undefined)
	            return this._connectTimeout;
	        this._connectTimeout = v;
	        return this;
	    }
	    adapter(v) {
	        if (!arguments.length)
	            return this._adapter;
	        this._adapter = v;
	        for (const nsp of this._nsps.values()) {
	            nsp._initAdapter();
	        }
	        return this;
	    }
	    /**
	     * Attaches socket.io to a server or port.
	     *
	     * @param srv - server or port
	     * @param opts - options passed to engine.io
	     * @return self
	     */
	    listen(srv, opts = {}) {
	        return this.attach(srv, opts);
	    }
	    /**
	     * Attaches socket.io to a server or port.
	     *
	     * @param srv - server or port
	     * @param opts - options passed to engine.io
	     * @return self
	     */
	    attach(srv, opts = {}) {
	        if ("function" == typeof srv) {
	            const msg = "You are trying to attach socket.io to an express " +
	                "request handler function. Please pass a http.Server instance.";
	            throw new Error(msg);
	        }
	        // handle a port as a string
	        if (Number(srv) == srv) {
	            srv = Number(srv);
	        }
	        if ("number" == typeof srv) {
	            debug("creating http server and binding to %d", srv);
	            const port = srv;
	            srv = http_1.default.createServer((req, res) => {
	                res.writeHead(404);
	                res.end();
	            });
	            srv.listen(port);
	        }
	        // merge the options passed to the Socket.IO server
	        Object.assign(opts, this.opts);
	        // set engine.io path to `/socket.io`
	        opts.path = opts.path || this._path;
	        this.initEngine(srv, opts);
	        return this;
	    }
	    /**
	     * Attaches socket.io to a uWebSockets.js app.
	     * @param app
	     * @param opts
	     */
	    attachApp(app /*: TemplatedApp */, opts = {}) {
	        // merge the options passed to the Socket.IO server
	        Object.assign(opts, this.opts);
	        // set engine.io path to `/socket.io`
	        opts.path = opts.path || this._path;
	        // initialize engine
	        debug("creating uWebSockets.js-based engine with opts %j", opts);
	        const engine = new engine_io_1.uServer(opts);
	        engine.attach(app, opts);
	        // bind to engine events
	        this.bind(engine);
	        if (this._serveClient) {
	            // attach static file serving
	            app.get(`${this._path}/*`, (res, req) => {
	                if (!this.clientPathRegex.test(req.getUrl())) {
	                    req.setYield(true);
	                    return;
	                }
	                const filename = req
	                    .getUrl()
	                    .replace(this._path, "")
	                    .replace(/\?.*$/, "")
	                    .replace(/^\//, "");
	                const isMap = dotMapRegex.test(filename);
	                const type = isMap ? "map" : "source";
	                // Per the standard, ETags must be quoted:
	                // https://tools.ietf.org/html/rfc7232#section-2.3
	                const expectedEtag = '"' + clientVersion + '"';
	                const weakEtag = "W/" + expectedEtag;
	                const etag = req.getHeader("if-none-match");
	                if (etag) {
	                    if (expectedEtag === etag || weakEtag === etag) {
	                        debug("serve client %s 304", type);
	                        res.writeStatus("304 Not Modified");
	                        res.end();
	                        return;
	                    }
	                }
	                debug("serve client %s", type);
	                res.writeHeader("cache-control", "public, max-age=0");
	                res.writeHeader("content-type", "application/" + (isMap ? "json" : "javascript") + "; charset=utf-8");
	                res.writeHeader("etag", expectedEtag);
	                const filepath = path.join(__dirname, "../client-dist/", filename);
	                (0, uws_1.serveFile)(res, filepath);
	            });
	        }
	        (0, uws_1.patchAdapter)(app);
	    }
	    /**
	     * Initialize engine
	     *
	     * @param srv - the server to attach to
	     * @param opts - options passed to engine.io
	     * @private
	     */
	    initEngine(srv, opts) {
	        // initialize engine
	        debug("creating engine.io instance with opts %j", opts);
	        this.eio = (0, engine_io_1.attach)(srv, opts);
	        // attach static file serving
	        if (this._serveClient)
	            this.attachServe(srv);
	        // Export http server
	        this.httpServer = srv;
	        // bind to engine events
	        this.bind(this.eio);
	    }
	    /**
	     * Attaches the static file serving.
	     *
	     * @param srv http server
	     * @private
	     */
	    attachServe(srv) {
	        debug("attaching client serving req handler");
	        const evs = srv.listeners("request").slice(0);
	        srv.removeAllListeners("request");
	        srv.on("request", (req, res) => {
	            if (this.clientPathRegex.test(req.url)) {
	                if (this._corsMiddleware) {
	                    this._corsMiddleware(req, res, () => {
	                        this.serve(req, res);
	                    });
	                }
	                else {
	                    this.serve(req, res);
	                }
	            }
	            else {
	                for (let i = 0; i < evs.length; i++) {
	                    evs[i].call(srv, req, res);
	                }
	            }
	        });
	    }
	    /**
	     * Handles a request serving of client source and map
	     *
	     * @param req
	     * @param res
	     * @private
	     */
	    serve(req, res) {
	        const filename = req.url.replace(this._path, "").replace(/\?.*$/, "");
	        const isMap = dotMapRegex.test(filename);
	        const type = isMap ? "map" : "source";
	        // Per the standard, ETags must be quoted:
	        // https://tools.ietf.org/html/rfc7232#section-2.3
	        const expectedEtag = '"' + clientVersion + '"';
	        const weakEtag = "W/" + expectedEtag;
	        const etag = req.headers["if-none-match"];
	        if (etag) {
	            if (expectedEtag === etag || weakEtag === etag) {
	                debug("serve client %s 304", type);
	                res.writeHead(304);
	                res.end();
	                return;
	            }
	        }
	        debug("serve client %s", type);
	        res.setHeader("Cache-Control", "public, max-age=0");
	        res.setHeader("Content-Type", "application/" + (isMap ? "json" : "javascript") + "; charset=utf-8");
	        res.setHeader("ETag", expectedEtag);
	        Server.sendFile(filename, req, res);
	    }
	    /**
	     * @param filename
	     * @param req
	     * @param res
	     * @private
	     */
	    static sendFile(filename, req, res) {
	        const readStream = (0, fs_1.createReadStream)(path.join(__dirname, "../client-dist/", filename));
	        const encoding = accepts(req).encodings(["br", "gzip", "deflate"]);
	        const onError = (err) => {
	            if (err) {
	                res.end();
	            }
	        };
	        switch (encoding) {
	            case "br":
	                res.writeHead(200, { "content-encoding": "br" });
	                (0, stream_1.pipeline)(readStream, (0, zlib_1.createBrotliCompress)(), res, onError);
	                break;
	            case "gzip":
	                res.writeHead(200, { "content-encoding": "gzip" });
	                (0, stream_1.pipeline)(readStream, (0, zlib_1.createGzip)(), res, onError);
	                break;
	            case "deflate":
	                res.writeHead(200, { "content-encoding": "deflate" });
	                (0, stream_1.pipeline)(readStream, (0, zlib_1.createDeflate)(), res, onError);
	                break;
	            default:
	                res.writeHead(200);
	                (0, stream_1.pipeline)(readStream, res, onError);
	        }
	    }
	    /**
	     * Binds socket.io to an engine.io instance.
	     *
	     * @param engine engine.io (or compatible) server
	     * @return self
	     */
	    bind(engine) {
	        // TODO apply strict types to the engine: "connection" event, `close()` and a method to serve static content
	        //  this would allow to provide any custom engine, like one based on Deno or Bun built-in HTTP server
	        this.engine = engine;
	        this.engine.on("connection", this.onconnection.bind(this));
	        return this;
	    }
	    /**
	     * Called with each incoming transport connection.
	     *
	     * @param {engine.Socket} conn
	     * @return self
	     * @private
	     */
	    onconnection(conn) {
	        // @ts-expect-error use of private
	        debug("incoming connection with id %s", conn.id);
	        const client = new client_1.Client(this, conn);
	        if (conn.protocol === 3) {
	            // @ts-expect-error use of private
	            client.connect("/");
	        }
	        return this;
	    }
	    /**
	     * Looks up a namespace.
	     *
	     * @example
	     * // with a simple string
	     * const myNamespace = io.of("/my-namespace");
	     *
	     * // with a regex
	     * const dynamicNsp = io.of(/^\/dynamic-\d+$/).on("connection", (socket) => {
	     *   const namespace = socket.nsp; // newNamespace.name === "/dynamic-101"
	     *
	     *   // broadcast to all clients in the given sub-namespace
	     *   namespace.emit("hello");
	     * });
	     *
	     * @param name - nsp name
	     * @param fn optional, nsp `connection` ev handler
	     */
	    of(name, fn) {
	        if (typeof name === "function" || name instanceof RegExp) {
	            const parentNsp = new parent_namespace_1.ParentNamespace(this);
	            debug("initializing parent namespace %s", parentNsp.name);
	            if (typeof name === "function") {
	                this.parentNsps.set(name, parentNsp);
	            }
	            else {
	                this.parentNsps.set((nsp, conn, next) => next(null, name.test(nsp)), parentNsp);
	                this.parentNamespacesFromRegExp.set(name, parentNsp);
	            }
	            if (fn) {
	                // @ts-ignore
	                parentNsp.on("connect", fn);
	            }
	            return parentNsp;
	        }
	        if (String(name)[0] !== "/")
	            name = "/" + name;
	        let nsp = this._nsps.get(name);
	        if (!nsp) {
	            for (const [regex, parentNamespace] of this.parentNamespacesFromRegExp) {
	                if (regex.test(name)) {
	                    debug("attaching namespace %s to parent namespace %s", name, regex);
	                    return parentNamespace.createChild(name);
	                }
	            }
	            debug("initializing namespace %s", name);
	            nsp = new namespace_1.Namespace(this, name);
	            this._nsps.set(name, nsp);
	            if (name !== "/") {
	                // @ts-ignore
	                this.sockets.emitReserved("new_namespace", nsp);
	            }
	        }
	        if (fn)
	            nsp.on("connect", fn);
	        return nsp;
	    }
	    /**
	     * Closes server connection
	     *
	     * @param [fn] optional, called as `fn([err])` on error OR all conns closed
	     */
	    async close(fn) {
	        await Promise.allSettled([...this._nsps.values()].map(async (nsp) => {
	            nsp.sockets.forEach((socket) => {
	                socket._onclose("server shutting down");
	            });
	            await nsp.adapter.close();
	        }));
	        this.engine.close();
	        // restore the Adapter prototype, when the Socket.IO server was attached to a uWebSockets.js server
	        (0, uws_1.restoreAdapter)();
	        if (this.httpServer) {
	            return new Promise((resolve) => {
	                this.httpServer.close((err) => {
	                    fn && fn(err);
	                    if (err) {
	                        debug("server was not running");
	                    }
	                    resolve();
	                });
	            });
	        }
	        else {
	            fn && fn();
	        }
	    }
	    /**
	     * Registers a middleware, which is a function that gets executed for every incoming {@link Socket}.
	     *
	     * @example
	     * io.use((socket, next) => {
	     *   // ...
	     *   next();
	     * });
	     *
	     * @param fn - the middleware function
	     */
	    use(fn) {
	        this.sockets.use(fn);
	        return this;
	    }
	    /**
	     * Targets a room when emitting.
	     *
	     * @example
	     * // the “foo” event will be broadcast to all connected clients in the “room-101” room
	     * io.to("room-101").emit("foo", "bar");
	     *
	     * // with an array of rooms (a client will be notified at most once)
	     * io.to(["room-101", "room-102"]).emit("foo", "bar");
	     *
	     * // with multiple chained calls
	     * io.to("room-101").to("room-102").emit("foo", "bar");
	     *
	     * @param room - a room, or an array of rooms
	     * @return a new {@link BroadcastOperator} instance for chaining
	     */
	    to(room) {
	        return this.sockets.to(room);
	    }
	    /**
	     * Targets a room when emitting. Similar to `to()`, but might feel clearer in some cases:
	     *
	     * @example
	     * // disconnect all clients in the "room-101" room
	     * io.in("room-101").disconnectSockets();
	     *
	     * @param room - a room, or an array of rooms
	     * @return a new {@link BroadcastOperator} instance for chaining
	     */
	    in(room) {
	        return this.sockets.in(room);
	    }
	    /**
	     * Excludes a room when emitting.
	     *
	     * @example
	     * // the "foo" event will be broadcast to all connected clients, except the ones that are in the "room-101" room
	     * io.except("room-101").emit("foo", "bar");
	     *
	     * // with an array of rooms
	     * io.except(["room-101", "room-102"]).emit("foo", "bar");
	     *
	     * // with multiple chained calls
	     * io.except("room-101").except("room-102").emit("foo", "bar");
	     *
	     * @param room - a room, or an array of rooms
	     * @return a new {@link BroadcastOperator} instance for chaining
	     */
	    except(room) {
	        return this.sockets.except(room);
	    }
	    /**
	     * Sends a `message` event to all clients.
	     *
	     * This method mimics the WebSocket.send() method.
	     *
	     * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
	     *
	     * @example
	     * io.send("hello");
	     *
	     * // this is equivalent to
	     * io.emit("message", "hello");
	     *
	     * @return self
	     */
	    send(...args) {
	        // This type-cast is needed because EmitEvents likely doesn't have `message` as a key.
	        // if you specify the EmitEvents, the type of args will be never.
	        this.sockets.emit("message", ...args);
	        return this;
	    }
	    /**
	     * Sends a `message` event to all clients. Alias of {@link send}.
	     *
	     * @return self
	     */
	    write(...args) {
	        // This type-cast is needed because EmitEvents likely doesn't have `message` as a key.
	        // if you specify the EmitEvents, the type of args will be never.
	        this.sockets.emit("message", ...args);
	        return this;
	    }
	    /**
	     * Sends a message to the other Socket.IO servers of the cluster.
	     *
	     * @example
	     * io.serverSideEmit("hello", "world");
	     *
	     * io.on("hello", (arg1) => {
	     *   console.log(arg1); // prints "world"
	     * });
	     *
	     * // acknowledgements (without binary content) are supported too:
	     * io.serverSideEmit("ping", (err, responses) => {
	     *  if (err) {
	     *     // some servers did not acknowledge the event in the given delay
	     *   } else {
	     *     console.log(responses); // one response per server (except the current one)
	     *   }
	     * });
	     *
	     * io.on("ping", (cb) => {
	     *   cb("pong");
	     * });
	     *
	     * @param ev - the event name
	     * @param args - an array of arguments, which may include an acknowledgement callback at the end
	     */
	    serverSideEmit(ev, ...args) {
	        return this.sockets.serverSideEmit(ev, ...args);
	    }
	    /**
	     * Sends a message and expect an acknowledgement from the other Socket.IO servers of the cluster.
	     *
	     * @example
	     * try {
	     *   const responses = await io.serverSideEmitWithAck("ping");
	     *   console.log(responses); // one response per server (except the current one)
	     * } catch (e) {
	     *   // some servers did not acknowledge the event in the given delay
	     * }
	     *
	     * @param ev - the event name
	     * @param args - an array of arguments
	     *
	     * @return a Promise that will be fulfilled when all servers have acknowledged the event
	     */
	    serverSideEmitWithAck(ev, ...args) {
	        return this.sockets.serverSideEmitWithAck(ev, ...args);
	    }
	    /**
	     * Gets a list of socket ids.
	     *
	     * @deprecated this method will be removed in the next major release, please use {@link Server#serverSideEmit} or
	     * {@link Server#fetchSockets} instead.
	     */
	    allSockets() {
	        return this.sockets.allSockets();
	    }
	    /**
	     * Sets the compress flag.
	     *
	     * @example
	     * io.compress(false).emit("hello");
	     *
	     * @param compress - if `true`, compresses the sending data
	     * @return a new {@link BroadcastOperator} instance for chaining
	     */
	    compress(compress) {
	        return this.sockets.compress(compress);
	    }
	    /**
	     * Sets a modifier for a subsequent event emission that the event data may be lost if the client is not ready to
	     * receive messages (because of network slowness or other issues, or because they’re connected through long polling
	     * and is in the middle of a request-response cycle).
	     *
	     * @example
	     * io.volatile.emit("hello"); // the clients may or may not receive it
	     *
	     * @return a new {@link BroadcastOperator} instance for chaining
	     */
	    get volatile() {
	        return this.sockets.volatile;
	    }
	    /**
	     * Sets a modifier for a subsequent event emission that the event data will only be broadcast to the current node.
	     *
	     * @example
	     * // the “foo” event will be broadcast to all connected clients on this node
	     * io.local.emit("foo", "bar");
	     *
	     * @return a new {@link BroadcastOperator} instance for chaining
	     */
	    get local() {
	        return this.sockets.local;
	    }
	    /**
	     * Adds a timeout in milliseconds for the next operation.
	     *
	     * @example
	     * io.timeout(1000).emit("some-event", (err, responses) => {
	     *   if (err) {
	     *     // some clients did not acknowledge the event in the given delay
	     *   } else {
	     *     console.log(responses); // one response per client
	     *   }
	     * });
	     *
	     * @param timeout
	     */
	    timeout(timeout) {
	        return this.sockets.timeout(timeout);
	    }
	    /**
	     * Returns the matching socket instances.
	     *
	     * Note: this method also works within a cluster of multiple Socket.IO servers, with a compatible {@link Adapter}.
	     *
	     * @example
	     * // return all Socket instances
	     * const sockets = await io.fetchSockets();
	     *
	     * // return all Socket instances in the "room1" room
	     * const sockets = await io.in("room1").fetchSockets();
	     *
	     * for (const socket of sockets) {
	     *   console.log(socket.id);
	     *   console.log(socket.handshake);
	     *   console.log(socket.rooms);
	     *   console.log(socket.data);
	     *
	     *   socket.emit("hello");
	     *   socket.join("room1");
	     *   socket.leave("room2");
	     *   socket.disconnect();
	     * }
	     */
	    fetchSockets() {
	        return this.sockets.fetchSockets();
	    }
	    /**
	     * Makes the matching socket instances join the specified rooms.
	     *
	     * Note: this method also works within a cluster of multiple Socket.IO servers, with a compatible {@link Adapter}.
	     *
	     * @example
	     *
	     * // make all socket instances join the "room1" room
	     * io.socketsJoin("room1");
	     *
	     * // make all socket instances in the "room1" room join the "room2" and "room3" rooms
	     * io.in("room1").socketsJoin(["room2", "room3"]);
	     *
	     * @param room - a room, or an array of rooms
	     */
	    socketsJoin(room) {
	        return this.sockets.socketsJoin(room);
	    }
	    /**
	     * Makes the matching socket instances leave the specified rooms.
	     *
	     * Note: this method also works within a cluster of multiple Socket.IO servers, with a compatible {@link Adapter}.
	     *
	     * @example
	     * // make all socket instances leave the "room1" room
	     * io.socketsLeave("room1");
	     *
	     * // make all socket instances in the "room1" room leave the "room2" and "room3" rooms
	     * io.in("room1").socketsLeave(["room2", "room3"]);
	     *
	     * @param room - a room, or an array of rooms
	     */
	    socketsLeave(room) {
	        return this.sockets.socketsLeave(room);
	    }
	    /**
	     * Makes the matching socket instances disconnect.
	     *
	     * Note: this method also works within a cluster of multiple Socket.IO servers, with a compatible {@link Adapter}.
	     *
	     * @example
	     * // make all socket instances disconnect (the connections might be kept alive for other namespaces)
	     * io.disconnectSockets();
	     *
	     * // make all socket instances in the "room1" room disconnect and close the underlying connections
	     * io.in("room1").disconnectSockets(true);
	     *
	     * @param close - whether to close the underlying connection
	     */
	    disconnectSockets(close = false) {
	        return this.sockets.disconnectSockets(close);
	    }
	}
	exports.Server = Server;
	/**
	 * Expose main namespace (/).
	 */
	const emitterMethods = Object.keys(events_1.EventEmitter.prototype).filter(function (key) {
	    return typeof events_1.EventEmitter.prototype[key] === "function";
	});
	emitterMethods.forEach(function (fn) {
	    Server.prototype[fn] = function () {
	        return this.sockets[fn].apply(this.sockets, arguments);
	    };
	});
	module.exports = (srv, opts) => new Server(srv, opts);
	module.exports.Server = Server;
	module.exports.Namespace = namespace_1.Namespace;
	module.exports.Socket = socket_1.Socket; 
} (dist$2, dist$2.exports));

var distExports = dist$2.exports;
const io = /*@__PURE__*/getDefaultExportFromCjs(distExports);

const {Server, Namespace, Socket} = io;

const userPool = new AmazonCognitoIdentity.CognitoUserPool({
  // UserPoolId: cognitoConfig.cognito.USER_POOL_ID,  // Pool Id
  // ClientId: cognitoConfig.cognito.APP_CLIENT_ID, // App client id
  UserPoolId: process.env.UserPoolId,
  ClientId: process.env.ClientId
});
const register = (req, res, next) => {
  const attributeList = [
    new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "given_name", Value: req.body.firstName }),
    new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "family_name", Value: req.body.lastName })
    //   new AmazonCognitoIdentity.CognitoUserAttribute({Name: "custom:role", Value: "dealer"})
  ];
  userPool.signUp(req.body.email, req.body.password, attributeList, null, function(err, result) {
    if (err) {
      try {
        err.message = err.message;
        return res.status(400).json({ error: err });
      } catch (err2) {
        console.log(err2);
        return res.status(500);
      }
    }
    cognitoUser = result.user;
    res.json({ user: cognitoUser.getUsername() });
  });
};
const login = (req, res, next) => {
  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
    Username: req.body.data.email,
    Password: req.body.data.password
  });
  const cognitoUser2 = new AmazonCognitoIdentity.CognitoUser({
    Username: req.body.data.email,
    Pool: userPool
  });
  cognitoUser2.authenticateUser(authenticationDetails, {
    onSuccess: function(result) {
      const userName = `${result.getIdToken().payload.given_name}`;
      const expirationTime = new Date(result.getAccessToken().payload.exp * 1e3);
      const auth = {
        jwt: result.getAccessToken().getJwtToken(),
        jwt_expired: expirationTime,
        email: req.body.data.email,
        given_name: userName
      };
      res.cookie("token", result.getRefreshToken().getToken(), {
        expires: new Date(result.getAccessToken().payload.auth_time * 1e3 + 1e3 * 60 * 60 * 24 * 30),
        httpOnly: true
      }).json(auth);
    },
    onFailure: function(err) {
      if (err) {
        try {
          err.message = err.message;
          return res.status(400).json({
            error: err,
            message: err.message
          });
        } catch (err2) {
          console.log(err2);
          console.log(err2.message);
          return res.status(500);
        }
      }
    }
  });
};
const createboard = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  res.json({
    token,
    email: req.body.data.email,
    userName: req.body.data.given_name,
    boardName: req.body.data.boardName
  });
};
const refreshToken = (req, res, next) => {
  if (req.headers.cookie) {
    const parsed = cookie__default.parse(req.headers.cookie);
    const refreshToken2 = new AmazonCognitoIdentity.CognitoRefreshToken({ RefreshToken: parsed.token });
    const cognitoUser2 = new AmazonCognitoIdentity.CognitoUser({
      Username: "",
      Pool: userPool
    });
    cognitoUser2.refreshSession(refreshToken2, (err, result) => {
      if (err) {
        res.status(401).json({ message: "The Access Token expired" });
      } else {
        const userName = `${result.getIdToken().payload.given_name}`;
        const expirationTime = new Date(result.getAccessToken().payload.exp * 1e3);
        const auth = {
          jwt: result.getIdToken().getJwtToken(),
          jwt_expired: expirationTime,
          email: result.getIdToken().payload.email,
          refresh_token: result.getRefreshToken().getToken(),
          refresh_token_expired: new Date(result.getIdToken().payload.auth_time * 1e3 + 1e3 * 60 * 60 * 24 * 30),
          given_name: userName
        };
        res.cookie("token", result.getRefreshToken().getToken(), {
          expires: new Date(result.getAccessToken().payload.auth_time * 1e3 + 1e3 * 60 * 60 * 24 * 30),
          httpOnly: true
        }).json(auth);
      }
    });
  } else {
    res.status(401).json({ message: "Missing auth cookie" });
  }
};
const confirm = (req, res, next) => {
  const cognitoUser2 = new AmazonCognitoIdentity.CognitoUser({
    Username: req.body.email,
    Pool: userPool
  });
  cognitoUser2.confirmRegistration(req.body.code, true, function(err, result) {
    if (err) {
      console.log(err);
      err.message = err.message;
      return res.status(400).json({ error: err.message });
    }
    res.json({ success: true });
  });
};
const confirmPasswordChange = (req, res, next) => {
  console.log(req.body);
  ({
    verificationCode: req.body.verificationCode,
    newPassword: req.body.newPassword
  });
  const cognitoUser2 = new AmazonCognitoIdentity.CognitoUser({
    Username: req.body.email,
    Pool: userPool
  });
  return new Promise((resolve, reject) => {
    cognitoUser2.confirmPassword(req.body.verificationCode, req.body.newPassword, {
      onFailure(err) {
        console.log(err.message);
        res.json({
          message: err.message
        });
        reject(err);
      },
      onSuccess() {
        console.log("Password has been changed/updated successfully.");
        res.json({
          message: "Password has been changed/updated successfully."
        });
        resolve();
      }
    });
  });
};
const forgotPassword = (req, res, next) => {
  const cognitoUser2 = new AmazonCognitoIdentity.CognitoUser({
    Username: req.body.email,
    Pool: userPool
  });
  cognitoUser2.forgotPassword({
    onSuccess: function(result) {
      res.json({ message: "Sucess" });
    },
    onFailure: function(err) {
      res.json({
        message: err
      });
    }
  });
};
const logout = (req, res, next) => {
  res.cookie("token", "", {
    expires: new Date(Date.now()),
    httpOnly: true
  }).json({ ok: true });
};

const router = express$1.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/createboard", createboard);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);
router.post("/confirmPasswordChange", confirmPasswordChange);
router.post("/confirm", confirm);
router.post("/forgotpassword", forgotPassword);

const auth = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  authRoutes: router
}, Symbol.toStringTag, { value: 'Module' }));

const s_whiteboard = {
  };

const _twpTg9YfeXKzPv7A7MJrCf2NLn0NTZc6Knqd_2KwmGw = defineNitroPlugin((nitroApp) => {
  const app = express$1();
  app.use(compression());
  app.use(cors__default());
  app.use(bodyParser__default.json({ limit: "50mb" }));
  app.use(bodyParser__default.urlencoded({ extended: true, limit: "50mb" }));
  app.use(cookieParser());
  app.use("/auth", router);
  nitroApp.router.use("/auth", (req, res, next) => app(req, res, next));
  nitroApp.router.use("/api", (req, res, next) => app(req, res, next));
  nitroApp.router.use("/uploads", (req, res, next) => app(req, res, next));
  nitroApp.hooks.hook("listen", (server) => {
    const io = new Server(server, { cors: { origin: "*" } });
    s_whiteboard(io);
  });
});

const plugins = [
  _twpTg9YfeXKzPv7A7MJrCf2NLn0NTZc6Knqd_2KwmGw
];

const assets = {
  "/_nuxt/5l7KyTk1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"cea-G2AKIgjogAKgHoGLUMzv9aVXd/8\"",
    "mtime": "2026-05-08T07:06:38.254Z",
    "size": 3306,
    "path": "../public/_nuxt/5l7KyTk1.js"
  },
  "/_nuxt/B3mhMNH2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a5-DV3ipv6t/hVANoOBT6FJIqPYD1o\"",
    "mtime": "2026-05-08T07:06:38.255Z",
    "size": 165,
    "path": "../public/_nuxt/B3mhMNH2.js"
  },
  "/_nuxt/B46zlmRF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4c3-SnqrjwYZIwKo3KMZr+Hu9dM2bXw\"",
    "mtime": "2026-05-08T07:06:38.255Z",
    "size": 1219,
    "path": "../public/_nuxt/B46zlmRF.js"
  },
  "/_nuxt/BbsVOuIU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4f4-+Do0jTUzOg9randwmQhIdYF3Zzs\"",
    "mtime": "2026-05-08T07:06:38.255Z",
    "size": 1268,
    "path": "../public/_nuxt/BbsVOuIU.js"
  },
  "/_nuxt/B4Lmil9d.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"fe5-Sb5k0SBFccVhjJIRO4NkIgkjlVc\"",
    "mtime": "2026-05-08T07:06:38.255Z",
    "size": 4069,
    "path": "../public/_nuxt/B4Lmil9d.js"
  },
  "/_nuxt/BQQj3Uhg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"54e-Xg5zxidCysIS4xqlU6YzR6v2KDE\"",
    "mtime": "2026-05-08T07:06:38.254Z",
    "size": 1358,
    "path": "../public/_nuxt/BQQj3Uhg.js"
  },
  "/_nuxt/BnqbZA27.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"805-qwLtl2BxkyroG5+TRax9b3FTdN8\"",
    "mtime": "2026-05-08T07:06:38.254Z",
    "size": 2053,
    "path": "../public/_nuxt/BnqbZA27.js"
  },
  "/_nuxt/BqxV0iaS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4409-hOSfqyXQJB3QBAXYtHqWmILAXgg\"",
    "mtime": "2026-05-08T07:06:38.254Z",
    "size": 17417,
    "path": "../public/_nuxt/BqxV0iaS.js"
  },
  "/_nuxt/BRVW2YGj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"14f5-4MuboadAUFn8y0UY/EdplGS06PE\"",
    "mtime": "2026-05-08T07:06:38.255Z",
    "size": 5365,
    "path": "../public/_nuxt/BRVW2YGj.js"
  },
  "/_nuxt/BiunAFw5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"cfb4-IbWxxpQrvYdx3jg1Y7d6qW2l7gk\"",
    "mtime": "2026-05-08T07:06:38.255Z",
    "size": 53172,
    "path": "../public/_nuxt/BiunAFw5.js"
  },
  "/_nuxt/BZmAFuwC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d2a-k9g+P3LCla8AagSHavbuuWTBVgs\"",
    "mtime": "2026-05-08T07:06:38.254Z",
    "size": 3370,
    "path": "../public/_nuxt/BZmAFuwC.js"
  },
  "/_nuxt/CD-J9fhc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3889-Ezzo9FTKWH8dyfD+mcvoi/jQOws\"",
    "mtime": "2026-05-08T07:06:38.255Z",
    "size": 14473,
    "path": "../public/_nuxt/CD-J9fhc.js"
  },
  "/_nuxt/CgbAHJxJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a2-LOdy8NF3LCrqS/fB8QuWzpxw1xI\"",
    "mtime": "2026-05-08T07:06:38.255Z",
    "size": 162,
    "path": "../public/_nuxt/CgbAHJxJ.js"
  },
  "/_nuxt/Ce5DWZRZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"141-mdHjUF7XGtTy5M2JbjS8lIalOf4\"",
    "mtime": "2026-05-08T07:06:38.255Z",
    "size": 321,
    "path": "../public/_nuxt/Ce5DWZRZ.js"
  },
  "/_nuxt/CFMusXa7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2bd-fgu/e+/PwMt4qVXOGaOXyPQAagw\"",
    "mtime": "2026-05-08T07:06:38.256Z",
    "size": 701,
    "path": "../public/_nuxt/CFMusXa7.js"
  },
  "/_nuxt/Ci77YoYw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"45a-lFvf9GevcPvavmkRxvw3oIFNPJQ\"",
    "mtime": "2026-05-08T07:06:38.255Z",
    "size": 1114,
    "path": "../public/_nuxt/Ci77YoYw.js"
  },
  "/_nuxt/Cjw3uLn2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"291-gjak+z8QZS+7xxCeNfoQn7nTA6A\"",
    "mtime": "2026-05-08T07:06:38.255Z",
    "size": 657,
    "path": "../public/_nuxt/Cjw3uLn2.js"
  },
  "/_nuxt/ClWGXLLu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1ce-izs8VUlbyqncFS2zr9bpO2eiMLU\"",
    "mtime": "2026-05-08T07:06:38.255Z",
    "size": 462,
    "path": "../public/_nuxt/ClWGXLLu.js"
  },
  "/_nuxt/BgHQLvPx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3b944-+NoYfQaM8NFSE2/vYdit82hOe+4\"",
    "mtime": "2026-05-08T07:06:38.255Z",
    "size": 244036,
    "path": "../public/_nuxt/BgHQLvPx.js"
  },
  "/_nuxt/CnY1rP98.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"341-itxZSGnXBxF7+Q5Jnp/ov6cX+Ts\"",
    "mtime": "2026-05-08T07:06:38.255Z",
    "size": 833,
    "path": "../public/_nuxt/CnY1rP98.js"
  },
  "/_nuxt/CRSLWMR3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"22a-UlX1LL9/p+7+L8EgNTzMpRSTBI8\"",
    "mtime": "2026-05-08T07:06:38.255Z",
    "size": 554,
    "path": "../public/_nuxt/CRSLWMR3.js"
  },
  "/_nuxt/CUeX66Ky.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2a0-7taym3dgDmP04JxBZXiYczj3xas\"",
    "mtime": "2026-05-08T07:06:38.255Z",
    "size": 672,
    "path": "../public/_nuxt/CUeX66Ky.js"
  },
  "/_nuxt/CZAPH8Hj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"63-n6pcYecUZBD/T/Ooqhd1XXwT3No\"",
    "mtime": "2026-05-08T07:06:38.254Z",
    "size": 99,
    "path": "../public/_nuxt/CZAPH8Hj.js"
  },
  "/_nuxt/cCXipDNt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4ea8e-h9KnPqqkSN8Uii28mD/WlH+9VaE\"",
    "mtime": "2026-05-08T07:06:38.255Z",
    "size": 322190,
    "path": "../public/_nuxt/cCXipDNt.js"
  },
  "/_nuxt/49drGGZq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c13e6-KLlKN7Vc/pkdPxUBOB4qv/Y/F8o\"",
    "mtime": "2026-05-08T07:06:38.256Z",
    "size": 791526,
    "path": "../public/_nuxt/49drGGZq.js"
  },
  "/_nuxt/DdvpIS7W.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7f-W4Gj9JtIn/Sg3RRHyFUvsw47g84\"",
    "mtime": "2026-05-08T07:06:38.255Z",
    "size": 127,
    "path": "../public/_nuxt/DdvpIS7W.js"
  },
  "/_nuxt/DaD5g17-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8ea-6o7gi1FzKVYM5Hq+siQLMQT6btQ\"",
    "mtime": "2026-05-08T07:06:38.254Z",
    "size": 2282,
    "path": "../public/_nuxt/DaD5g17-.js"
  },
  "/_nuxt/DhPcu6LG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f8-FvXi4sw4bq8c093EHEI+Ns3zKuk\"",
    "mtime": "2026-05-08T07:06:38.255Z",
    "size": 248,
    "path": "../public/_nuxt/DhPcu6LG.js"
  },
  "/_nuxt/default.Cu7dcT4X.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"61-tD0Y595P9pkz15tA9I5naaFAXA8\"",
    "mtime": "2026-05-08T07:06:38.254Z",
    "size": 97,
    "path": "../public/_nuxt/default.Cu7dcT4X.css"
  },
  "/_nuxt/DKn8sqQm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5e-wMOCDF4m82mMswFpKyswOytj5gU\"",
    "mtime": "2026-05-08T07:06:38.255Z",
    "size": 94,
    "path": "../public/_nuxt/DKn8sqQm.js"
  },
  "/_nuxt/DhsR9Tix.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"306-VllGSM27Ii0DWRBeowAab/vXQu8\"",
    "mtime": "2026-05-08T07:06:38.255Z",
    "size": 774,
    "path": "../public/_nuxt/DhsR9Tix.js"
  },
  "/_nuxt/DLnQAg2b.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"551-WvJLfp1OZ0A47+OKi8/dyirmGG0\"",
    "mtime": "2026-05-08T07:06:38.254Z",
    "size": 1361,
    "path": "../public/_nuxt/DLnQAg2b.js"
  },
  "/_nuxt/DU1b_vPr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2687-A8K0mtaKhbZaSB7tPCayVWOw6zA\"",
    "mtime": "2026-05-08T07:06:38.255Z",
    "size": 9863,
    "path": "../public/_nuxt/DU1b_vPr.js"
  },
  "/_nuxt/DTFkZQjM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"47d-vYgcM6z0hKGzeIYcHbTOTDV6imU\"",
    "mtime": "2026-05-08T07:06:38.255Z",
    "size": 1149,
    "path": "../public/_nuxt/DTFkZQjM.js"
  },
  "/_nuxt/DUtST-Fu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"66-C+A2h5uBMTL0Uy9ZRYiFJ/3jrDI\"",
    "mtime": "2026-05-08T07:06:38.255Z",
    "size": 102,
    "path": "../public/_nuxt/DUtST-Fu.js"
  },
  "/_nuxt/DXafPOEz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"126d-YG5nOwcmV3Eb8xqNI0asId5io5I\"",
    "mtime": "2026-05-08T07:06:38.255Z",
    "size": 4717,
    "path": "../public/_nuxt/DXafPOEz.js"
  },
  "/_nuxt/DXiQkfqz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5e8-2MxZ8Iw9Qhedx9amSX+gFK6UUl8\"",
    "mtime": "2026-05-08T07:06:38.254Z",
    "size": 1512,
    "path": "../public/_nuxt/DXiQkfqz.js"
  },
  "/_nuxt/EmJTQNbM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"75c-n1/eEzHXw5TvUem9osz9SDjS3jI\"",
    "mtime": "2026-05-08T07:06:38.255Z",
    "size": 1884,
    "path": "../public/_nuxt/EmJTQNbM.js"
  },
  "/_nuxt/EQOrd8ds.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"67b-zgfRPHZvxMrQHwuwvM2x8qOjsXA\"",
    "mtime": "2026-05-08T07:06:38.255Z",
    "size": 1659,
    "path": "../public/_nuxt/EQOrd8ds.js"
  },
  "/_nuxt/error-500.I1Dtv2V5.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"75a-vEGyJqldBVJrnMfcLsrGaHcxYl0\"",
    "mtime": "2026-05-08T07:06:38.254Z",
    "size": 1882,
    "path": "../public/_nuxt/error-500.I1Dtv2V5.css"
  },
  "/_nuxt/error-404.DL_4WIao.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"dca-KnjyV0UbpsrliiJzZx69defY74k\"",
    "mtime": "2026-05-08T07:06:38.253Z",
    "size": 3530,
    "path": "../public/_nuxt/error-404.DL_4WIao.css"
  },
  "/_nuxt/error.BsH8Yx34.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"64-o3c4ZPQmLqDVyy/5Wpq+pI5Ujyc\"",
    "mtime": "2026-05-08T07:06:38.254Z",
    "size": 100,
    "path": "../public/_nuxt/error.BsH8Yx34.css"
  },
  "/_nuxt/error-test.51Y-DJV8.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"24-V+cLlzMb8F2Qf0mWK/8LT3jxcoo\"",
    "mtime": "2026-05-08T07:06:38.254Z",
    "size": 36,
    "path": "../public/_nuxt/error-test.51Y-DJV8.css"
  },
  "/_nuxt/gLMT-Mjw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"215-HgrVKsFdBZReCvtdOW5+B9NLsEo\"",
    "mtime": "2026-05-08T07:06:38.255Z",
    "size": 533,
    "path": "../public/_nuxt/gLMT-Mjw.js"
  },
  "/_nuxt/GrIywTgi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f6f-NO/woWChem60hiW+9dmeuRsetTM\"",
    "mtime": "2026-05-08T07:06:38.255Z",
    "size": 3951,
    "path": "../public/_nuxt/GrIywTgi.js"
  },
  "/_nuxt/HIPKN7fZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e03-4T8H/xwOklXR8lO66v4fbb3liFY\"",
    "mtime": "2026-05-08T07:06:38.255Z",
    "size": 3587,
    "path": "../public/_nuxt/HIPKN7fZ.js"
  },
  "/_nuxt/entry.Bt4VWMit.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"436bc-CTz5dsK9vpjgs35mr4ax5G3Re0s\"",
    "mtime": "2026-05-08T07:06:38.253Z",
    "size": 276156,
    "path": "../public/_nuxt/entry.Bt4VWMit.css"
  },
  "/_nuxt/index.Br0KYIOY.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"328-vdljJ9XU1F8OjboO1Hcbf9VEy5w\"",
    "mtime": "2026-05-08T07:06:38.254Z",
    "size": 808,
    "path": "../public/_nuxt/index.Br0KYIOY.css"
  },
  "/_nuxt/hero.DjjfbV91.png": {
    "type": "image/png",
    "etag": "\"51af8-p6MyZ5BIMY7VKMPRQEtv4WMpis8\"",
    "mtime": "2026-05-08T07:06:38.253Z",
    "size": 334584,
    "path": "../public/_nuxt/hero.DjjfbV91.png"
  },
  "/_nuxt/index.CSK_4SrW.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"144a-89qI4KJc7kbD6eTHM/bDhzonmG8\"",
    "mtime": "2026-05-08T07:06:38.254Z",
    "size": 5194,
    "path": "../public/_nuxt/index.CSK_4SrW.css"
  },
  "/_nuxt/sb-logo.9l9WWEtG.svg": {
    "type": "image/svg+xml",
    "etag": "\"3497-R4sXMmLp2lx3bLZ7Njzex3tuSDo\"",
    "mtime": "2026-05-08T07:06:38.253Z",
    "size": 13463,
    "path": "../public/_nuxt/sb-logo.9l9WWEtG.svg"
  },
  "/_nuxt/signin.Dqd4o7ls.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"43-LirF+6qxgm+PnHSs1nIIYtsPNe8\"",
    "mtime": "2026-05-08T07:06:38.253Z",
    "size": 67,
    "path": "../public/_nuxt/signin.Dqd4o7ls.css"
  },
  "/_nuxt/spTanGlp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2be-KaL+wS4HT+yX0MMM+KInAMfhgGQ\"",
    "mtime": "2026-05-08T07:06:38.255Z",
    "size": 702,
    "path": "../public/_nuxt/spTanGlp.js"
  },
  "/_nuxt/signup.ChOk2E2s.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"43-xsupZo8jUkf6M3jO+WM0whwuABo\"",
    "mtime": "2026-05-08T07:06:38.254Z",
    "size": 67,
    "path": "../public/_nuxt/signup.ChOk2E2s.css"
  },
  "/_nuxt/materialdesignicons-webfont.Dp5v-WZN.woff2": {
    "type": "font/woff2",
    "etag": "\"62710-TiD2zPQxmd6lyFsjoODwuoH/7iY\"",
    "mtime": "2026-05-08T07:06:38.249Z",
    "size": 403216,
    "path": "../public/_nuxt/materialdesignicons-webfont.Dp5v-WZN.woff2"
  },
  "/_nuxt/TRwfES2C.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e97-0n9aW75vcW5kNOSfeuQH6MJpFqo\"",
    "mtime": "2026-05-08T07:06:38.254Z",
    "size": 3735,
    "path": "../public/_nuxt/TRwfES2C.js"
  },
  "/_nuxt/V5F80PEw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"294-8c5KX6b1e6bTDURzury6F5PTkHE\"",
    "mtime": "2026-05-08T07:06:38.255Z",
    "size": 660,
    "path": "../public/_nuxt/V5F80PEw.js"
  },
  "/_nuxt/VpMsiDZN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f40-2YxCnRhpXcIYvVG+pk/DpHjyU1w\"",
    "mtime": "2026-05-08T07:06:38.254Z",
    "size": 3904,
    "path": "../public/_nuxt/VpMsiDZN.js"
  },
  "/_nuxt/builds/latest.json": {
    "type": "application/json",
    "etag": "\"47-xTACVzgwF+H3te6wwVQiWvCFqvE\"",
    "mtime": "2026-05-08T07:06:45.331Z",
    "size": 71,
    "path": "../public/_nuxt/builds/latest.json"
  },
  "/_nuxt/builds/meta/60395eb0-c22b-439c-a4af-a5ea1cd93e71.json": {
    "type": "application/json",
    "etag": "\"58-xEG1LbLeGjLkuU08RPdqagxwOVE\"",
    "mtime": "2026-05-08T07:06:45.332Z",
    "size": 88,
    "path": "../public/_nuxt/builds/meta/60395eb0-c22b-439c-a4af-a5ea1cd93e71.json"
  },
  "/_nuxt/Rt27N_wz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"618-zUm9rDJTSW3b6lDduBen6GymqOk\"",
    "mtime": "2026-05-08T07:06:38.254Z",
    "size": 1560,
    "path": "../public/_nuxt/Rt27N_wz.js"
  },
  "/_nuxt/materialdesignicons-webfont.PXm3-2wK.woff": {
    "type": "font/woff",
    "etag": "\"8f8d0-zD3UavWtb7zNpwtFPVWUs57NasQ\"",
    "mtime": "2026-05-08T07:06:38.255Z",
    "size": 587984,
    "path": "../public/_nuxt/materialdesignicons-webfont.PXm3-2wK.woff"
  },
  "/_nuxt/materialdesignicons-webfont.B7mPwVP_.ttf": {
    "type": "font/ttf",
    "etag": "\"13f40c-T1Gk3HWmjT5XMhxEjv3eojyKnbA\"",
    "mtime": "2026-05-08T07:06:38.256Z",
    "size": 1307660,
    "path": "../public/_nuxt/materialdesignicons-webfont.B7mPwVP_.ttf"
  },
  "/_nuxt/materialdesignicons-webfont.CSr8KVlo.eot": {
    "type": "application/vnd.ms-fontobject",
    "etag": "\"13f4e8-ApygSKV9BTQg/POr5dCUzjU5OZw\"",
    "mtime": "2026-05-08T07:06:38.256Z",
    "size": 1307880,
    "path": "../public/_nuxt/materialdesignicons-webfont.CSr8KVlo.eot"
  }
};

const _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
  if (!input) {
    return input;
  }
  return input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}
const _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
const _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
function cwd() {
  if (typeof process !== "undefined" && typeof process.cwd === "function") {
    return process.cwd().replace(/\\/g, "/");
  }
  return "/";
}
const resolve = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
    const path = index >= 0 ? arguments_[index] : cwd();
    if (!path || path.length === 0) {
      continue;
    }
    resolvedPath = `${path}/${resolvedPath}`;
    resolvedAbsolute = isAbsolute(path);
  }
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
  if (resolvedAbsolute && !isAbsolute(resolvedPath)) {
    return `/${resolvedPath}`;
  }
  return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index = 0; index <= path.length; ++index) {
    if (index < path.length) {
      char = path[index];
    } else if (char === "/") {
      break;
    } else {
      char = "/";
    }
    if (char === "/") {
      if (lastSlash === index - 1 || dots === 1) ; else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = index;
            dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = index;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path.slice(lastSlash + 1, index)}`;
        } else {
          res = path.slice(lastSlash + 1, index);
        }
        lastSegmentLength = index - lastSlash - 1;
      }
      lastSlash = index;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
const isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
};
const dirname = function(p) {
  const segments = normalizeWindowsPath(p).replace(/\/$/, "").split("/").slice(0, -1);
  if (segments.length === 1 && _DRIVE_LETTER_RE.test(segments[0])) {
    segments[0] += "/";
  }
  return segments.join("/") || (isAbsolute(p) ? "/" : ".");
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta/":{"maxAge":31536000},"/_nuxt/builds/":{"maxAge":1},"/_nuxt/":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const __vyz73 = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError$2({ statusCode: 404 });
    }
    return;
  }
  if (asset.encoding !== void 0) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

const _SxA8c9 = defineEventHandler(() => {});

const _lazy_xOsV94 = () => Promise.resolve().then(function () { return auth; });
const _lazy_R5W2pK = () => import('../routes/index.mjs');
const _lazy_bZgpwO = () => import('../routes/test.mjs');
const _lazy_l5Y_Zd = () => import('../routes/whiteboard.mjs');
const _lazy_1RxnQ_ = () => import('../routes/renderer.mjs').then(function (n) { return n.r; });

const handlers = [
  { route: '', handler: __vyz73, lazy: false, middleware: true, method: undefined },
  { route: '/auth', handler: _lazy_xOsV94, lazy: true, middleware: false, method: undefined },
  { route: '/', handler: _lazy_R5W2pK, lazy: true, middleware: false, method: undefined },
  { route: '/test', handler: _lazy_bZgpwO, lazy: true, middleware: false, method: undefined },
  { route: '/whiteboard', handler: _lazy_l5Y_Zd, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_1RxnQ_, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_island/**', handler: _SxA8c9, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_1RxnQ_, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(false),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => b(
    nodeHandler,
    aRequest
  );
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return C(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp = createNitroApp();
function useNitroApp() {
  return nitroApp;
}
runNitroPlugins(nitroApp);

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: void 0 };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader(event, "Content-Type", "image/x-icon");
        return send$1(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send$1(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

const debug = (...args) => {
};
function GracefulShutdown(server, opts) {
  opts = opts || {};
  const options = Object.assign(
    {
      signals: "SIGINT SIGTERM",
      timeout: 3e4,
      development: false,
      forceExit: true,
      onShutdown: (signal) => Promise.resolve(signal),
      preShutdown: (signal) => Promise.resolve(signal)
    },
    opts
  );
  let isShuttingDown = false;
  const connections = {};
  let connectionCounter = 0;
  const secureConnections = {};
  let secureConnectionCounter = 0;
  let failed = false;
  let finalRun = false;
  function onceFactory() {
    let called = false;
    return (emitter, events, callback) => {
      function call() {
        if (!called) {
          called = true;
          return Reflect.apply(callback, this, arguments);
        }
      }
      for (const e of events) {
        emitter.on(e, call);
      }
    };
  }
  const signals = options.signals.split(" ").map((s) => s.trim()).filter((s) => s.length > 0);
  const once = onceFactory();
  once(process, signals, (signal) => {
    debug("received shut down signal", signal);
    shutdown(signal).then(() => {
      if (options.forceExit) {
        process.exit(failed ? 1 : 0);
      }
    }).catch((error) => {
      debug("server shut down error occurred", error);
      process.exit(1);
    });
  });
  function isFunction(functionToCheck) {
    const getType = Object.prototype.toString.call(functionToCheck);
    return /^\[object\s([A-Za-z]+)?Function]$/.test(getType);
  }
  function destroy(socket, force = false) {
    if (socket._isIdle && isShuttingDown || force) {
      socket.destroy();
      if (socket.server instanceof http$2.Server) {
        delete connections[socket._connectionId];
      } else {
        delete secureConnections[socket._connectionId];
      }
    }
  }
  function destroyAllConnections(force = false) {
    debug("Destroy Connections : " + (force ? "forced close" : "close"));
    let counter = 0;
    let secureCounter = 0;
    for (const key of Object.keys(connections)) {
      const socket = connections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        counter++;
        destroy(socket);
      }
    }
    debug("Connections destroyed : " + counter);
    debug("Connection Counter    : " + connectionCounter);
    for (const key of Object.keys(secureConnections)) {
      const socket = secureConnections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        secureCounter++;
        destroy(socket);
      }
    }
    debug("Secure Connections destroyed : " + secureCounter);
    debug("Secure Connection Counter    : " + secureConnectionCounter);
  }
  server.on("request", (req, res) => {
    req.socket._isIdle = false;
    if (isShuttingDown && !res.headersSent) {
      res.setHeader("connection", "close");
    }
    res.on("finish", () => {
      req.socket._isIdle = true;
      destroy(req.socket);
    });
  });
  server.on("connection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = connectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      connections[id] = socket;
      socket.once("close", () => {
        delete connections[socket._connectionId];
      });
    }
  });
  server.on("secureConnection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = secureConnectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      secureConnections[id] = socket;
      socket.once("close", () => {
        delete secureConnections[socket._connectionId];
      });
    }
  });
  process.on("close", () => {
    debug("closed");
  });
  function shutdown(sig) {
    function cleanupHttp() {
      destroyAllConnections();
      debug("Close http server");
      return new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) {
            return reject(err);
          }
          return resolve(true);
        });
      });
    }
    debug("shutdown signal - " + sig);
    if (options.development) {
      debug("DEV-Mode - immediate forceful shutdown");
      return process.exit(0);
    }
    function finalHandler() {
      if (!finalRun) {
        finalRun = true;
        if (options.finally && isFunction(options.finally)) {
          debug("executing finally()");
          options.finally();
        }
      }
      return Promise.resolve();
    }
    function waitForReadyToShutDown(totalNumInterval) {
      debug(`waitForReadyToShutDown... ${totalNumInterval}`);
      if (totalNumInterval === 0) {
        debug(
          `Could not close connections in time (${options.timeout}ms), will forcefully shut down`
        );
        return Promise.resolve(true);
      }
      const allConnectionsClosed = Object.keys(connections).length === 0 && Object.keys(secureConnections).length === 0;
      if (allConnectionsClosed) {
        debug("All connections closed. Continue to shutting down");
        return Promise.resolve(false);
      }
      debug("Schedule the next waitForReadyToShutdown");
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(waitForReadyToShutDown(totalNumInterval - 1));
        }, 250);
      });
    }
    if (isShuttingDown) {
      return Promise.resolve();
    }
    debug("shutting down");
    return options.preShutdown(sig).then(() => {
      isShuttingDown = true;
      cleanupHttp();
    }).then(() => {
      const pollIterations = options.timeout ? Math.round(options.timeout / 250) : 0;
      return waitForReadyToShutDown(pollIterations);
    }).then((force) => {
      debug("Do onShutdown now");
      if (force) {
        destroyAllConnections(force);
      }
      return options.onShutdown(sig);
    }).then(finalHandler).catch((error) => {
      const errString = typeof error === "string" ? error : JSON.stringify(error);
      debug(errString);
      failed = true;
      throw errString;
    });
  }
  function shutdownManual() {
    return shutdown("manual");
  }
  return shutdownManual;
}

function getGracefulShutdownConfig() {
  return {
    disabled: !!process.env.NITRO_SHUTDOWN_DISABLED,
    signals: (process.env.NITRO_SHUTDOWN_SIGNALS || "SIGTERM SIGINT").split(" ").map((s) => s.trim()),
    timeout: Number.parseInt(process.env.NITRO_SHUTDOWN_TIMEOUT || "", 10) || 3e4,
    forceExit: !process.env.NITRO_SHUTDOWN_NO_FORCE_EXIT
  };
}
function setupGracefulShutdown(listener, nitroApp) {
  const shutdownConfig = getGracefulShutdownConfig();
  if (shutdownConfig.disabled) {
    return;
  }
  GracefulShutdown(listener, {
    signals: shutdownConfig.signals.join(" "),
    timeout: shutdownConfig.timeout,
    forceExit: shutdownConfig.forceExit,
    onShutdown: async () => {
      await new Promise((resolve) => {
        const timeout = setTimeout(() => {
          console.warn("Graceful shutdown timeout, force exiting...");
          resolve();
        }, shutdownConfig.timeout);
        nitroApp.hooks.callHook("close").catch((error) => {
          console.error(error);
        }).finally(() => {
          clearTimeout(timeout);
          resolve();
        });
      });
    }
  });
}

export { $fetch as $, decodePath as A, hasProtocol as B, isScriptProtocol as C, withQuery as D, sanitizeStatusCode as E, getContext as F, defu as G, executeAsync as H, debug$b as I, parser as J, parseQuery as K, withTrailingSlash as L, withoutTrailingSlash as M, PacketType as P, trapUnhandledNodeErrors as a, useNitroApp as b, register as c, destr as d, express$1 as e, createboard as f, logout as g, refreshToken as h, confirmPasswordChange as i, confirm as j, forgotPassword as k, login as l, joinRelativeURL as m, getResponseStatusText as n, getResponseStatus as o, encodePath as p, defineRenderHandler as q, router as r, setupGracefulShutdown as s, toNodeListener as t, useRuntimeConfig as u, getQuery as v, createError$2 as w, getRouteRules as x, joinURL as y, parseURL as z };
//# sourceMappingURL=nitro.mjs.map
