import { parse, installTimerFunctions, Socket as Socket$1, nextTick } from 'engine.io-client';
import { I as debug$4, P as PacketType, J as parser } from '../_/nitro.mjs';
import { Emitter } from '@socket.io/component-emitter';
import { dom } from '@fortawesome/fontawesome-svg-core';
import pdfjsLib from 'pdfjs-dist';
import keybinds from './keybinds-BtMXLGLA.mjs';
import whiteboard from './whiteboard-DD4_hElL.mjs';
import shortcutFunctions from './shortcutFunctions-q05ioCth.mjs';
import ReadOnlyService$1 from './ReadOnlyService-_MP-1Xik.mjs';
import InfoService$1 from './InfoService-KuEphH0M.mjs';
import { getSubDir } from './utils-Dg8BbwNB.mjs';
import ConfigService$1 from './ConfigService-DEOCz6AH.mjs';
import crypto__default from 'crypto';
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
import 'base64id';
import 'ws';
import 'cors';
import 'cookie-parser';
import 'compression';
import 'amazon-cognito-identity-js';
import 'node:url';
import './Point-DM7E_x-Y.mjs';
import './ThrottlingService-Cft2UPc7.mjs';
import 'html2canvas';
import './ConfigService.utils-DxoHktcq.mjs';

const debug$3 = debug$4("socket.io-client:url"); // debug()
/**
 * URL parser.
 *
 * @param uri - url
 * @param path - the request path of the connection
 * @param loc - An object meant to mimic window.location.
 *        Defaults to window.location.
 * @public
 */
function url(uri, path = "", loc) {
    let obj = uri;
    // default to window.location
    loc = loc || (typeof location !== "undefined" && location);
    if (null == uri)
        uri = loc.protocol + "//" + loc.host;
    // relative path support
    if (typeof uri === "string") {
        if ("/" === uri.charAt(0)) {
            if ("/" === uri.charAt(1)) {
                uri = loc.protocol + uri;
            }
            else {
                uri = loc.host + uri;
            }
        }
        if (!/^(https?|wss?):\/\//.test(uri)) {
            debug$3("protocol-less url %s", uri);
            if ("undefined" !== typeof loc) {
                uri = loc.protocol + "//" + uri;
            }
            else {
                uri = "https://" + uri;
            }
        }
        // parse
        debug$3("parse %s", uri);
        obj = parse(uri);
    }
    // make sure we treat `localhost:80` and `localhost` equally
    if (!obj.port) {
        if (/^(http|ws)$/.test(obj.protocol)) {
            obj.port = "80";
        }
        else if (/^(http|ws)s$/.test(obj.protocol)) {
            obj.port = "443";
        }
    }
    obj.path = obj.path || "/";
    const ipv6 = obj.host.indexOf(":") !== -1;
    const host = ipv6 ? "[" + obj.host + "]" : obj.host;
    // define unique id
    obj.id = obj.protocol + "://" + host + ":" + obj.port + path;
    // define href
    obj.href =
        obj.protocol +
            "://" +
            host +
            (loc && loc.port === obj.port ? "" : ":" + obj.port);
    return obj;
}

function on(obj, ev, fn) {
    obj.on(ev, fn);
    return function subDestroy() {
        obj.off(ev, fn);
    };
}

const debug$2 = debug$4("socket.io-client:socket"); // debug()
/**
 * Internal events.
 * These events can't be emitted by the user.
 */
const RESERVED_EVENTS = Object.freeze({
    connect: 1,
    connect_error: 1,
    disconnect: 1,
    disconnecting: 1,
    // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
    newListener: 1,
    removeListener: 1,
});
/**
 * A Socket is the fundamental class for interacting with the server.
 *
 * A Socket belongs to a certain Namespace (by default /) and uses an underlying {@link Manager} to communicate.
 *
 * @example
 * const socket = io();
 *
 * socket.on("connect", () => {
 *   console.log("connected");
 * });
 *
 * // send an event to the server
 * socket.emit("foo", "bar");
 *
 * socket.on("foobar", () => {
 *   // an event was received from the server
 * });
 *
 * // upon disconnection
 * socket.on("disconnect", (reason) => {
 *   console.log(`disconnected due to ${reason}`);
 * });
 */
class Socket extends Emitter {
    /**
     * `Socket` constructor.
     */
    constructor(io, nsp, opts) {
        super();
        /**
         * Whether the socket is currently connected to the server.
         *
         * @example
         * const socket = io();
         *
         * socket.on("connect", () => {
         *   console.log(socket.connected); // true
         * });
         *
         * socket.on("disconnect", () => {
         *   console.log(socket.connected); // false
         * });
         */
        this.connected = false;
        /**
         * Whether the connection state was recovered after a temporary disconnection. In that case, any missed packets will
         * be transmitted by the server.
         */
        this.recovered = false;
        /**
         * Buffer for packets received before the CONNECT packet
         */
        this.receiveBuffer = [];
        /**
         * Buffer for packets that will be sent once the socket is connected
         */
        this.sendBuffer = [];
        /**
         * The queue of packets to be sent with retry in case of failure.
         *
         * Packets are sent one by one, each waiting for the server acknowledgement, in order to guarantee the delivery order.
         * @private
         */
        this._queue = [];
        /**
         * A sequence to generate the ID of the {@link QueuedPacket}.
         * @private
         */
        this._queueSeq = 0;
        this.ids = 0;
        /**
         * A map containing acknowledgement handlers.
         *
         * The `withError` attribute is used to differentiate handlers that accept an error as first argument:
         *
         * - `socket.emit("test", (err, value) => { ... })` with `ackTimeout` option
         * - `socket.timeout(5000).emit("test", (err, value) => { ... })`
         * - `const value = await socket.emitWithAck("test")`
         *
         * From those that don't:
         *
         * - `socket.emit("test", (value) => { ... });`
         *
         * In the first case, the handlers will be called with an error when:
         *
         * - the timeout is reached
         * - the socket gets disconnected
         *
         * In the second case, the handlers will be simply discarded upon disconnection, since the client will never receive
         * an acknowledgement from the server.
         *
         * @private
         */
        this.acks = {};
        this.flags = {};
        this.io = io;
        this.nsp = nsp;
        if (opts && opts.auth) {
            this.auth = opts.auth;
        }
        this._opts = Object.assign({}, opts);
        if (this.io._autoConnect)
            this.open();
    }
    /**
     * Whether the socket is currently disconnected
     *
     * @example
     * const socket = io();
     *
     * socket.on("connect", () => {
     *   console.log(socket.disconnected); // false
     * });
     *
     * socket.on("disconnect", () => {
     *   console.log(socket.disconnected); // true
     * });
     */
    get disconnected() {
        return !this.connected;
    }
    /**
     * Subscribe to open, close and packet events
     *
     * @private
     */
    subEvents() {
        if (this.subs)
            return;
        const io = this.io;
        this.subs = [
            on(io, "open", this.onopen.bind(this)),
            on(io, "packet", this.onpacket.bind(this)),
            on(io, "error", this.onerror.bind(this)),
            on(io, "close", this.onclose.bind(this)),
        ];
    }
    /**
     * Whether the Socket will try to reconnect when its Manager connects or reconnects.
     *
     * @example
     * const socket = io();
     *
     * console.log(socket.active); // true
     *
     * socket.on("disconnect", (reason) => {
     *   if (reason === "io server disconnect") {
     *     // the disconnection was initiated by the server, you need to manually reconnect
     *     console.log(socket.active); // false
     *   }
     *   // else the socket will automatically try to reconnect
     *   console.log(socket.active); // true
     * });
     */
    get active() {
        return !!this.subs;
    }
    /**
     * "Opens" the socket.
     *
     * @example
     * const socket = io({
     *   autoConnect: false
     * });
     *
     * socket.connect();
     */
    connect() {
        if (this.connected)
            return this;
        this.subEvents();
        if (!this.io["_reconnecting"])
            this.io.open(); // ensure open
        if ("open" === this.io._readyState)
            this.onopen();
        return this;
    }
    /**
     * Alias for {@link connect()}.
     */
    open() {
        return this.connect();
    }
    /**
     * Sends a `message` event.
     *
     * This method mimics the WebSocket.send() method.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
     *
     * @example
     * socket.send("hello");
     *
     * // this is equivalent to
     * socket.emit("message", "hello");
     *
     * @return self
     */
    send(...args) {
        args.unshift("message");
        this.emit.apply(this, args);
        return this;
    }
    /**
     * Override `emit`.
     * If the event is in `events`, it's emitted normally.
     *
     * @example
     * socket.emit("hello", "world");
     *
     * // all serializable datastructures are supported (no need to call JSON.stringify)
     * socket.emit("hello", 1, "2", { 3: ["4"], 5: Uint8Array.from([6]) });
     *
     * // with an acknowledgement from the server
     * socket.emit("hello", "world", (val) => {
     *   // ...
     * });
     *
     * @return self
     */
    emit(ev, ...args) {
        var _a, _b, _c;
        if (RESERVED_EVENTS.hasOwnProperty(ev)) {
            throw new Error('"' + ev.toString() + '" is a reserved event name');
        }
        args.unshift(ev);
        if (this._opts.retries && !this.flags.fromQueue && !this.flags.volatile) {
            this._addToQueue(args);
            return this;
        }
        const packet = {
            type: PacketType.EVENT,
            data: args,
        };
        packet.options = {};
        packet.options.compress = this.flags.compress !== false;
        // event ack callback
        if ("function" === typeof args[args.length - 1]) {
            const id = this.ids++;
            debug$2("emitting packet with ack id %d", id);
            const ack = args.pop();
            this._registerAckCallback(id, ack);
            packet.id = id;
        }
        const isTransportWritable = (_b = (_a = this.io.engine) === null || _a === void 0 ? void 0 : _a.transport) === null || _b === void 0 ? void 0 : _b.writable;
        const isConnected = this.connected && !((_c = this.io.engine) === null || _c === void 0 ? void 0 : _c._hasPingExpired());
        const discardPacket = this.flags.volatile && !isTransportWritable;
        if (discardPacket) {
            debug$2("discard packet as the transport is not currently writable");
        }
        else if (isConnected) {
            this.notifyOutgoingListeners(packet);
            this.packet(packet);
        }
        else {
            this.sendBuffer.push(packet);
        }
        this.flags = {};
        return this;
    }
    /**
     * @private
     */
    _registerAckCallback(id, ack) {
        var _a;
        const timeout = (_a = this.flags.timeout) !== null && _a !== void 0 ? _a : this._opts.ackTimeout;
        if (timeout === undefined) {
            this.acks[id] = ack;
            return;
        }
        // @ts-ignore
        const timer = this.io.setTimeoutFn(() => {
            delete this.acks[id];
            for (let i = 0; i < this.sendBuffer.length; i++) {
                if (this.sendBuffer[i].id === id) {
                    debug$2("removing packet with ack id %d from the buffer", id);
                    this.sendBuffer.splice(i, 1);
                }
            }
            debug$2("event with ack id %d has timed out after %d ms", id, timeout);
            ack.call(this, new Error("operation has timed out"));
        }, timeout);
        const fn = (...args) => {
            // @ts-ignore
            this.io.clearTimeoutFn(timer);
            ack.apply(this, args);
        };
        fn.withError = true;
        this.acks[id] = fn;
    }
    /**
     * Emits an event and waits for an acknowledgement
     *
     * @example
     * // without timeout
     * const response = await socket.emitWithAck("hello", "world");
     *
     * // with a specific timeout
     * try {
     *   const response = await socket.timeout(1000).emitWithAck("hello", "world");
     * } catch (err) {
     *   // the server did not acknowledge the event in the given delay
     * }
     *
     * @return a Promise that will be fulfilled when the server acknowledges the event
     */
    emitWithAck(ev, ...args) {
        return new Promise((resolve, reject) => {
            const fn = (arg1, arg2) => {
                return arg1 ? reject(arg1) : resolve(arg2);
            };
            fn.withError = true;
            args.push(fn);
            this.emit(ev, ...args);
        });
    }
    /**
     * Add the packet to the queue.
     * @param args
     * @private
     */
    _addToQueue(args) {
        let ack;
        if (typeof args[args.length - 1] === "function") {
            ack = args.pop();
        }
        const packet = {
            id: this._queueSeq++,
            tryCount: 0,
            pending: false,
            args,
            flags: Object.assign({ fromQueue: true }, this.flags),
        };
        args.push((err, ...responseArgs) => {
            if (packet !== this._queue[0]) {
                return debug$2("packet [%d] already acknowledged", packet.id);
            }
            const hasError = err !== null;
            if (hasError) {
                if (packet.tryCount > this._opts.retries) {
                    debug$2("packet [%d] is discarded after %d tries", packet.id, packet.tryCount);
                    this._queue.shift();
                    if (ack) {
                        ack(err);
                    }
                }
            }
            else {
                debug$2("packet [%d] was successfully sent", packet.id);
                this._queue.shift();
                if (ack) {
                    ack(null, ...responseArgs);
                }
            }
            packet.pending = false;
            return this._drainQueue();
        });
        this._queue.push(packet);
        this._drainQueue();
    }
    /**
     * Send the first packet of the queue, and wait for an acknowledgement from the server.
     * @param force - whether to resend a packet that has not been acknowledged yet
     *
     * @private
     */
    _drainQueue(force = false) {
        debug$2("draining queue");
        if (!this.connected || this._queue.length === 0) {
            return;
        }
        const packet = this._queue[0];
        if (packet.pending && !force) {
            debug$2("packet [%d] has already been sent and is waiting for an ack", packet.id);
            return;
        }
        packet.pending = true;
        packet.tryCount++;
        debug$2("sending packet [%d] (try n°%d)", packet.id, packet.tryCount);
        this.flags = packet.flags;
        this.emit.apply(this, packet.args);
    }
    /**
     * Sends a packet.
     *
     * @param packet
     * @private
     */
    packet(packet) {
        packet.nsp = this.nsp;
        this.io._packet(packet);
    }
    /**
     * Called upon engine `open`.
     *
     * @private
     */
    onopen() {
        debug$2("transport is open - connecting");
        if (typeof this.auth == "function") {
            this.auth((data) => {
                this._sendConnectPacket(data);
            });
        }
        else {
            this._sendConnectPacket(this.auth);
        }
    }
    /**
     * Sends a CONNECT packet to initiate the Socket.IO session.
     *
     * @param data
     * @private
     */
    _sendConnectPacket(data) {
        this.packet({
            type: PacketType.CONNECT,
            data: this._pid
                ? Object.assign({ pid: this._pid, offset: this._lastOffset }, data)
                : data,
        });
    }
    /**
     * Called upon engine or manager `error`.
     *
     * @param err
     * @private
     */
    onerror(err) {
        if (!this.connected) {
            this.emitReserved("connect_error", err);
        }
    }
    /**
     * Called upon engine `close`.
     *
     * @param reason
     * @param description
     * @private
     */
    onclose(reason, description) {
        debug$2("close (%s)", reason);
        this.connected = false;
        delete this.id;
        this.emitReserved("disconnect", reason, description);
        this._clearAcks();
    }
    /**
     * Clears the acknowledgement handlers upon disconnection, since the client will never receive an acknowledgement from
     * the server.
     *
     * @private
     */
    _clearAcks() {
        Object.keys(this.acks).forEach((id) => {
            const isBuffered = this.sendBuffer.some((packet) => String(packet.id) === id);
            if (!isBuffered) {
                // note: handlers that do not accept an error as first argument are ignored here
                const ack = this.acks[id];
                delete this.acks[id];
                if (ack.withError) {
                    ack.call(this, new Error("socket has been disconnected"));
                }
            }
        });
    }
    /**
     * Called with socket packet.
     *
     * @param packet
     * @private
     */
    onpacket(packet) {
        const sameNamespace = packet.nsp === this.nsp;
        if (!sameNamespace)
            return;
        switch (packet.type) {
            case PacketType.CONNECT:
                if (packet.data && packet.data.sid) {
                    this.onconnect(packet.data.sid, packet.data.pid);
                }
                else {
                    this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
                }
                break;
            case PacketType.EVENT:
            case PacketType.BINARY_EVENT:
                this.onevent(packet);
                break;
            case PacketType.ACK:
            case PacketType.BINARY_ACK:
                this.onack(packet);
                break;
            case PacketType.DISCONNECT:
                this.ondisconnect();
                break;
            case PacketType.CONNECT_ERROR:
                this.destroy();
                const err = new Error(packet.data.message);
                // @ts-ignore
                err.data = packet.data.data;
                this.emitReserved("connect_error", err);
                break;
        }
    }
    /**
     * Called upon a server event.
     *
     * @param packet
     * @private
     */
    onevent(packet) {
        const args = packet.data || [];
        debug$2("emitting event %j", args);
        if (null != packet.id) {
            debug$2("attaching ack callback to event");
            args.push(this.ack(packet.id));
        }
        if (this.connected) {
            this.emitEvent(args);
        }
        else {
            this.receiveBuffer.push(Object.freeze(args));
        }
    }
    emitEvent(args) {
        if (this._anyListeners && this._anyListeners.length) {
            const listeners = this._anyListeners.slice();
            for (const listener of listeners) {
                listener.apply(this, args);
            }
        }
        super.emit.apply(this, args);
        if (this._pid && args.length && typeof args[args.length - 1] === "string") {
            this._lastOffset = args[args.length - 1];
        }
    }
    /**
     * Produces an ack callback to emit with an event.
     *
     * @private
     */
    ack(id) {
        const self = this;
        let sent = false;
        return function (...args) {
            // prevent double callbacks
            if (sent)
                return;
            sent = true;
            debug$2("sending ack %j", args);
            self.packet({
                type: PacketType.ACK,
                id: id,
                data: args,
            });
        };
    }
    /**
     * Called upon a server acknowledgement.
     *
     * @param packet
     * @private
     */
    onack(packet) {
        const ack = this.acks[packet.id];
        if (typeof ack !== "function") {
            debug$2("bad ack %s", packet.id);
            return;
        }
        delete this.acks[packet.id];
        debug$2("calling ack %s with %j", packet.id, packet.data);
        // @ts-ignore FIXME ack is incorrectly inferred as 'never'
        if (ack.withError) {
            packet.data.unshift(null);
        }
        // @ts-ignore
        ack.apply(this, packet.data);
    }
    /**
     * Called upon server connect.
     *
     * @private
     */
    onconnect(id, pid) {
        debug$2("socket connected with id %s", id);
        this.id = id;
        this.recovered = pid && this._pid === pid;
        this._pid = pid; // defined only if connection state recovery is enabled
        this.connected = true;
        this.emitBuffered();
        this._drainQueue(true);
        this.emitReserved("connect");
    }
    /**
     * Emit buffered events (received and emitted).
     *
     * @private
     */
    emitBuffered() {
        this.receiveBuffer.forEach((args) => this.emitEvent(args));
        this.receiveBuffer = [];
        this.sendBuffer.forEach((packet) => {
            this.notifyOutgoingListeners(packet);
            this.packet(packet);
        });
        this.sendBuffer = [];
    }
    /**
     * Called upon server disconnect.
     *
     * @private
     */
    ondisconnect() {
        debug$2("server disconnect (%s)", this.nsp);
        this.destroy();
        this.onclose("io server disconnect");
    }
    /**
     * Called upon forced client/server side disconnections,
     * this method ensures the manager stops tracking us and
     * that reconnections don't get triggered for this.
     *
     * @private
     */
    destroy() {
        if (this.subs) {
            // clean subscriptions to avoid reconnections
            this.subs.forEach((subDestroy) => subDestroy());
            this.subs = undefined;
        }
        this.io["_destroy"](this);
    }
    /**
     * Disconnects the socket manually. In that case, the socket will not try to reconnect.
     *
     * If this is the last active Socket instance of the {@link Manager}, the low-level connection will be closed.
     *
     * @example
     * const socket = io();
     *
     * socket.on("disconnect", (reason) => {
     *   // console.log(reason); prints "io client disconnect"
     * });
     *
     * socket.disconnect();
     *
     * @return self
     */
    disconnect() {
        if (this.connected) {
            debug$2("performing disconnect (%s)", this.nsp);
            this.packet({ type: PacketType.DISCONNECT });
        }
        // remove socket from pool
        this.destroy();
        if (this.connected) {
            // fire events
            this.onclose("io client disconnect");
        }
        return this;
    }
    /**
     * Alias for {@link disconnect()}.
     *
     * @return self
     */
    close() {
        return this.disconnect();
    }
    /**
     * Sets the compress flag.
     *
     * @example
     * socket.compress(false).emit("hello");
     *
     * @param compress - if `true`, compresses the sending data
     * @return self
     */
    compress(compress) {
        this.flags.compress = compress;
        return this;
    }
    /**
     * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
     * ready to send messages.
     *
     * @example
     * socket.volatile.emit("hello"); // the server may or may not receive it
     *
     * @returns self
     */
    get volatile() {
        this.flags.volatile = true;
        return this;
    }
    /**
     * Sets a modifier for a subsequent event emission that the callback will be called with an error when the
     * given number of milliseconds have elapsed without an acknowledgement from the server:
     *
     * @example
     * socket.timeout(5000).emit("my-event", (err) => {
     *   if (err) {
     *     // the server did not acknowledge the event in the given delay
     *   }
     * });
     *
     * @returns self
     */
    timeout(timeout) {
        this.flags.timeout = timeout;
        return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback.
     *
     * @example
     * socket.onAny((event, ...args) => {
     *   console.log(`got ${event}`);
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
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback. The listener is added to the beginning of the listeners array.
     *
     * @example
     * socket.prependAny((event, ...args) => {
     *   console.log(`got event ${event}`);
     * });
     *
     * @param listener
     */
    prependAny(listener) {
        this._anyListeners = this._anyListeners || [];
        this._anyListeners.unshift(listener);
        return this;
    }
    /**
     * Removes the listener that will be fired when any event is emitted.
     *
     * @example
     * const catchAllListener = (event, ...args) => {
     *   console.log(`got event ${event}`);
     * }
     *
     * socket.onAny(catchAllListener);
     *
     * // remove a specific listener
     * socket.offAny(catchAllListener);
     *
     * // or remove all listeners
     * socket.offAny();
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
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback.
     *
     * Note: acknowledgements sent to the server are not included.
     *
     * @example
     * socket.onAnyOutgoing((event, ...args) => {
     *   console.log(`sent event ${event}`);
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
     * Note: acknowledgements sent to the server are not included.
     *
     * @example
     * socket.prependAnyOutgoing((event, ...args) => {
     *   console.log(`sent event ${event}`);
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
     * Removes the listener that will be fired when any event is emitted.
     *
     * @example
     * const catchAllListener = (event, ...args) => {
     *   console.log(`sent event ${event}`);
     * }
     *
     * socket.onAnyOutgoing(catchAllListener);
     *
     * // remove a specific listener
     * socket.offAnyOutgoing(catchAllListener);
     *
     * // or remove all listeners
     * socket.offAnyOutgoing();
     *
     * @param [listener] - the catch-all listener (optional)
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
     * Notify the listeners for each packet sent
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
}

/**
 * Initialize backoff timer with `opts`.
 *
 * - `min` initial timeout in milliseconds [100]
 * - `max` max timeout [10000]
 * - `jitter` [0]
 * - `factor` [2]
 *
 * @param {Object} opts
 * @api public
 */
function Backoff(opts) {
    opts = opts || {};
    this.ms = opts.min || 100;
    this.max = opts.max || 10000;
    this.factor = opts.factor || 2;
    this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
    this.attempts = 0;
}
/**
 * Return the backoff duration.
 *
 * @return {Number}
 * @api public
 */
Backoff.prototype.duration = function () {
    var ms = this.ms * Math.pow(this.factor, this.attempts++);
    if (this.jitter) {
        var rand = Math.random();
        var deviation = Math.floor(rand * this.jitter * ms);
        ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
    }
    return Math.min(ms, this.max) | 0;
};
/**
 * Reset the number of attempts.
 *
 * @api public
 */
Backoff.prototype.reset = function () {
    this.attempts = 0;
};
/**
 * Set the minimum duration
 *
 * @api public
 */
Backoff.prototype.setMin = function (min) {
    this.ms = min;
};
/**
 * Set the maximum duration
 *
 * @api public
 */
Backoff.prototype.setMax = function (max) {
    this.max = max;
};
/**
 * Set the jitter
 *
 * @api public
 */
Backoff.prototype.setJitter = function (jitter) {
    this.jitter = jitter;
};

const debug$1 = debug$4("socket.io-client:manager"); // debug()
class Manager extends Emitter {
    constructor(uri, opts) {
        var _a;
        super();
        this.nsps = {};
        this.subs = [];
        if (uri && "object" === typeof uri) {
            opts = uri;
            uri = undefined;
        }
        opts = opts || {};
        opts.path = opts.path || "/socket.io";
        this.opts = opts;
        installTimerFunctions(this, opts);
        this.reconnection(opts.reconnection !== false);
        this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
        this.reconnectionDelay(opts.reconnectionDelay || 1000);
        this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
        this.randomizationFactor((_a = opts.randomizationFactor) !== null && _a !== void 0 ? _a : 0.5);
        this.backoff = new Backoff({
            min: this.reconnectionDelay(),
            max: this.reconnectionDelayMax(),
            jitter: this.randomizationFactor(),
        });
        this.timeout(null == opts.timeout ? 20000 : opts.timeout);
        this._readyState = "closed";
        this.uri = uri;
        const _parser = opts.parser || parser;
        this.encoder = new _parser.Encoder();
        this.decoder = new _parser.Decoder();
        this._autoConnect = opts.autoConnect !== false;
        if (this._autoConnect)
            this.open();
    }
    reconnection(v) {
        if (!arguments.length)
            return this._reconnection;
        this._reconnection = !!v;
        if (!v) {
            this.skipReconnect = true;
        }
        return this;
    }
    reconnectionAttempts(v) {
        if (v === undefined)
            return this._reconnectionAttempts;
        this._reconnectionAttempts = v;
        return this;
    }
    reconnectionDelay(v) {
        var _a;
        if (v === undefined)
            return this._reconnectionDelay;
        this._reconnectionDelay = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(v);
        return this;
    }
    randomizationFactor(v) {
        var _a;
        if (v === undefined)
            return this._randomizationFactor;
        this._randomizationFactor = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(v);
        return this;
    }
    reconnectionDelayMax(v) {
        var _a;
        if (v === undefined)
            return this._reconnectionDelayMax;
        this._reconnectionDelayMax = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(v);
        return this;
    }
    timeout(v) {
        if (!arguments.length)
            return this._timeout;
        this._timeout = v;
        return this;
    }
    /**
     * Starts trying to reconnect if reconnection is enabled and we have not
     * started reconnecting yet
     *
     * @private
     */
    maybeReconnectOnOpen() {
        // Only try to reconnect if it's the first time we're connecting
        if (!this._reconnecting &&
            this._reconnection &&
            this.backoff.attempts === 0) {
            // keeps reconnection from firing twice for the same reconnection loop
            this.reconnect();
        }
    }
    /**
     * Sets the current transport `socket`.
     *
     * @param {Function} fn - optional, callback
     * @return self
     * @public
     */
    open(fn) {
        debug$1("readyState %s", this._readyState);
        if (~this._readyState.indexOf("open"))
            return this;
        debug$1("opening %s", this.uri);
        this.engine = new Socket$1(this.uri, this.opts);
        const socket = this.engine;
        const self = this;
        this._readyState = "opening";
        this.skipReconnect = false;
        // emit `open`
        const openSubDestroy = on(socket, "open", function () {
            self.onopen();
            fn && fn();
        });
        const onError = (err) => {
            debug$1("error");
            this.cleanup();
            this._readyState = "closed";
            this.emitReserved("error", err);
            if (fn) {
                fn(err);
            }
            else {
                // Only do this if there is no fn to handle the error
                this.maybeReconnectOnOpen();
            }
        };
        // emit `error`
        const errorSub = on(socket, "error", onError);
        if (false !== this._timeout) {
            const timeout = this._timeout;
            debug$1("connect attempt will timeout after %d", timeout);
            // set timer
            const timer = this.setTimeoutFn(() => {
                debug$1("connect attempt timed out after %d", timeout);
                openSubDestroy();
                onError(new Error("timeout"));
                socket.close();
            }, timeout);
            if (this.opts.autoUnref) {
                timer.unref();
            }
            this.subs.push(() => {
                this.clearTimeoutFn(timer);
            });
        }
        this.subs.push(openSubDestroy);
        this.subs.push(errorSub);
        return this;
    }
    /**
     * Alias for open()
     *
     * @return self
     * @public
     */
    connect(fn) {
        return this.open(fn);
    }
    /**
     * Called upon transport open.
     *
     * @private
     */
    onopen() {
        debug$1("open");
        // clear old subs
        this.cleanup();
        // mark as open
        this._readyState = "open";
        this.emitReserved("open");
        // add new subs
        const socket = this.engine;
        this.subs.push(on(socket, "ping", this.onping.bind(this)), on(socket, "data", this.ondata.bind(this)), on(socket, "error", this.onerror.bind(this)), on(socket, "close", this.onclose.bind(this)), 
        // @ts-ignore
        on(this.decoder, "decoded", this.ondecoded.bind(this)));
    }
    /**
     * Called upon a ping.
     *
     * @private
     */
    onping() {
        this.emitReserved("ping");
    }
    /**
     * Called with data.
     *
     * @private
     */
    ondata(data) {
        try {
            this.decoder.add(data);
        }
        catch (e) {
            this.onclose("parse error", e);
        }
    }
    /**
     * Called when parser fully decodes a packet.
     *
     * @private
     */
    ondecoded(packet) {
        // the nextTick call prevents an exception in a user-provided event listener from triggering a disconnection due to a "parse error"
        nextTick(() => {
            this.emitReserved("packet", packet);
        }, this.setTimeoutFn);
    }
    /**
     * Called upon socket error.
     *
     * @private
     */
    onerror(err) {
        debug$1("error", err);
        this.emitReserved("error", err);
    }
    /**
     * Creates a new socket for the given `nsp`.
     *
     * @return {Socket}
     * @public
     */
    socket(nsp, opts) {
        let socket = this.nsps[nsp];
        if (!socket) {
            socket = new Socket(this, nsp, opts);
            this.nsps[nsp] = socket;
        }
        else if (this._autoConnect && !socket.active) {
            socket.connect();
        }
        return socket;
    }
    /**
     * Called upon a socket close.
     *
     * @param socket
     * @private
     */
    _destroy(socket) {
        const nsps = Object.keys(this.nsps);
        for (const nsp of nsps) {
            const socket = this.nsps[nsp];
            if (socket.active) {
                debug$1("socket %s is still active, skipping close", nsp);
                return;
            }
        }
        this._close();
    }
    /**
     * Writes a packet.
     *
     * @param packet
     * @private
     */
    _packet(packet) {
        debug$1("writing packet %j", packet);
        const encodedPackets = this.encoder.encode(packet);
        for (let i = 0; i < encodedPackets.length; i++) {
            this.engine.write(encodedPackets[i], packet.options);
        }
    }
    /**
     * Clean up transport subscriptions and packet buffer.
     *
     * @private
     */
    cleanup() {
        debug$1("cleanup");
        this.subs.forEach((subDestroy) => subDestroy());
        this.subs.length = 0;
        this.decoder.destroy();
    }
    /**
     * Close the current socket.
     *
     * @private
     */
    _close() {
        debug$1("disconnect");
        this.skipReconnect = true;
        this._reconnecting = false;
        this.onclose("forced close");
    }
    /**
     * Alias for close()
     *
     * @private
     */
    disconnect() {
        return this._close();
    }
    /**
     * Called when:
     *
     * - the low-level engine is closed
     * - the parser encountered a badly formatted packet
     * - all sockets are disconnected
     *
     * @private
     */
    onclose(reason, description) {
        var _a;
        debug$1("closed due to %s", reason);
        this.cleanup();
        (_a = this.engine) === null || _a === void 0 ? void 0 : _a.close();
        this.backoff.reset();
        this._readyState = "closed";
        this.emitReserved("close", reason, description);
        if (this._reconnection && !this.skipReconnect) {
            this.reconnect();
        }
    }
    /**
     * Attempt a reconnection.
     *
     * @private
     */
    reconnect() {
        if (this._reconnecting || this.skipReconnect)
            return this;
        const self = this;
        if (this.backoff.attempts >= this._reconnectionAttempts) {
            debug$1("reconnect failed");
            this.backoff.reset();
            this.emitReserved("reconnect_failed");
            this._reconnecting = false;
        }
        else {
            const delay = this.backoff.duration();
            debug$1("will wait %dms before reconnect attempt", delay);
            this._reconnecting = true;
            const timer = this.setTimeoutFn(() => {
                if (self.skipReconnect)
                    return;
                debug$1("attempting reconnect");
                this.emitReserved("reconnect_attempt", self.backoff.attempts);
                // check again for the case socket closed in above events
                if (self.skipReconnect)
                    return;
                self.open((err) => {
                    if (err) {
                        debug$1("reconnect attempt error");
                        self._reconnecting = false;
                        self.reconnect();
                        this.emitReserved("reconnect_error", err);
                    }
                    else {
                        debug$1("reconnect success");
                        self.onreconnect();
                    }
                });
            }, delay);
            if (this.opts.autoUnref) {
                timer.unref();
            }
            this.subs.push(() => {
                this.clearTimeoutFn(timer);
            });
        }
    }
    /**
     * Called upon successful reconnect.
     *
     * @private
     */
    onreconnect() {
        const attempt = this.backoff.attempts;
        this._reconnecting = false;
        this.backoff.reset();
        this.emitReserved("reconnect", attempt);
    }
}

const debug = debug$4("socket.io-client"); // debug()
/**
 * Managers cache.
 */
const cache = {};
function lookup(uri, opts) {
    if (typeof uri === "object") {
        opts = uri;
        uri = undefined;
    }
    opts = opts || {};
    const parsed = url(uri, opts.path || "/socket.io");
    const source = parsed.source;
    const id = parsed.id;
    const path = parsed.path;
    const sameNamespace = cache[id] && path in cache[id]["nsps"];
    const newConnection = opts.forceNew ||
        opts["force new connection"] ||
        false === opts.multiplex ||
        sameNamespace;
    let io;
    if (newConnection) {
        debug("ignoring socket cache for %s", source);
        io = new Manager(source, opts);
    }
    else {
        if (!cache[id]) {
            debug("new io instance for %s", source);
            cache[id] = new Manager(source, opts);
        }
        io = cache[id];
    }
    if (parsed.query && !opts.query) {
        opts.query = parsed.queryKey;
    }
    return io.socket(parsed.path, opts);
}
// so that "lookup" can be used both as a function (e.g. `io(...)`) and as a
// namespace (e.g. `io.connect(...)`), for backward compatibility
Object.assign(lookup, {
    Manager,
    Socket,
    io: lookup,
    connect: lookup,
});

const rnds8Pool = new Uint8Array(256); // # of random values to pre-allocate

let poolPtr = rnds8Pool.length;
function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    crypto__default.randomFillSync(rnds8Pool);
    poolPtr = 0;
  }

  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}

const native = {
  randomUUID: crypto__default.randomUUID
};

function v4(options, buf, offset) {
  if (native.randomUUID && true && !options) {
    return native.randomUUID();
  }

  options = options || {};
  const rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  return unsafeStringify(rnds);
}

const urlParams = new URLSearchParams((void 0).location.search);
let whiteboardId = urlParams.get("whiteboardid");
const randomid = urlParams.get("randomid");
if (randomid) {
  whiteboardId = v4();
  urlParams.delete("randomid");
  (void 0).location.search = urlParams;
}
if (!whiteboardId) {
  whiteboardId = "myNewWhiteboard";
}
whiteboardId = unescape(encodeURIComponent(whiteboardId)).replace(/[^a-zA-Z0-9\-]/g, "");
if (urlParams.get("whiteboardid") !== whiteboardId) {
  urlParams.set("whiteboardid", whiteboardId);
  (void 0).location.search = urlParams;
}
const myUsername = urlParams.get("username") || "unknown" + (Math.random() + "").substring(2, 6);
const accessToken = urlParams.get("accesstoken") || "";
const title = urlParams.get("title");
if (title) {
  (void 0).title = decodeURIComponent(title);
}
const subdir = getSubDir();
let signaling_socket;
function main() {
  signaling_socket = lookup("", { path: subdir + "/ws-api" });
  signaling_socket.on("connect", function() {
    console.log("Websocket connected!");
    signaling_socket.on("whiteboardConfig", (serverResponse) => {
      debugger;
      ConfigService$1.initFromServer(serverResponse);
      initWhiteboard();
    });
    signaling_socket.on("whiteboardInfoUpdate", (info) => {
      debugger;
      InfoService$1.updateInfoFromServer(info);
      whiteboard.updateSmallestScreenResolution();
    });
    signaling_socket.on("drawToWhiteboard", function(content) {
      debugger;
      whiteboard.handleEventsAndData(content, true);
      InfoService$1.incrementNbMessagesReceived();
    });
    signaling_socket.on("refreshUserBadges", function() {
      whiteboard.refreshUserBadges();
    });
    let accessDenied = false;
    signaling_socket.on("wrongAccessToken", function() {
      if (!accessDenied) {
        accessDenied = true;
        showBasicAlert("Access denied! Wrong accessToken!");
      }
    });
    signaling_socket.emit("joinWhiteboard", {
      wid: whiteboardId,
      at: accessToken,
      windowWidthHeight: { w: $(void 0).width(), h: $(void 0).height() }
    });
  });
}
function showBasicAlert(html, newOptions) {
  var options = {
    header: "INFO MESSAGE",
    okBtnText: "Ok",
    headercolor: "#d25d5d",
    hideAfter: false,
    onOkClick: false
  };
  if (newOptions) {
    for (var i in newOptions) {
      options[i] = newOptions[i];
    }
  }
  var alertHtml = $(
    '<div class="basicalert" style="position:absolute; left:0px; width:100%; top:70px; font-family: monospace;"><div style="width: 30%; margin: auto; background: #aaaaaa; border-radius: 5px; font-size: 1.2em; border: 1px solid gray;"><div style="border-bottom: 1px solid #676767; background: ' + options["headercolor"] + '; padding-left: 5px; font-size: 0.8em;">' + options["header"] + '<div style="float: right; margin-right: 4px; color: #373737; cursor: pointer;" class="closeAlert">x</div></div><div style="padding: 10px;" class="htmlcontent"></div><div style="height: 20px; padding: 10px;"><button class="modalBtn okbtn" style="float: right;">' + options["okBtnText"] + "</button></div></div></div>"
  );
  alertHtml.find(".htmlcontent").append(html);
  $("body").append(alertHtml);
  alertHtml.find(".okbtn").off("click").click(function() {
    if (options.onOkClick) {
      options.onOkClick();
    }
    alertHtml.remove();
  });
  alertHtml.find(".closeAlert").off("click").click(function() {
    alertHtml.remove();
  });
  if (options.hideAfter) {
    setTimeout(function() {
      alertHtml.find(".okbtn").click();
    }, 1e3 * options.hideAfter);
  }
}
function initWhiteboard() {
  $(void 0).ready(function() {
    ReadOnlyService$1.activateReadOnlyMode();
    if (urlParams.get("webdav") === "true") {
      $("#uploadWebDavBtn").show();
    }
    whiteboard.loadWhiteboard("#whiteboardContainer", {
      //Load the whiteboard
      whiteboardId,
      username: btoa(myUsername),
      backgroundGridUrl: "./images/" + ConfigService$1.backgroundGridImage,
      sendFunction: function(content) {
        if (ReadOnlyService$1.readOnlyActive) return;
        content["at"] = accessToken;
        signaling_socket.emit("drawToWhiteboard", content);
        InfoService$1.incrementNbMessagesSent();
      }
    });
    $.get(subdir + "/api/loadwhiteboard", { wid: whiteboardId, at: accessToken }).done(
      function(data) {
        whiteboard.loadData(data);
      }
    );
    $(void 0).resize(function() {
      signaling_socket.emit("updateScreenResolution", {
        at: accessToken,
        windowWidthHeight: { w: $(void 0).width(), h: $(void 0).height() }
      });
    });
    var tempLineTool = false;
    var strgPressed = false;
    $(void 0).on("keydown", function(e) {
      if (e.which == 16) {
        if (whiteboard.tool == "pen" && !strgPressed) {
          tempLineTool = true;
          whiteboard.ownCursor.hide();
          if (whiteboard.drawFlag) {
            whiteboard.mouseup({
              offsetX: whiteboard.prevPos.x,
              offsetY: whiteboard.prevPos.y
            });
            shortcutFunctions.setTool_line();
            whiteboard.mousedown({
              offsetX: whiteboard.prevPos.x,
              offsetY: whiteboard.prevPos.y
            });
          } else {
            shortcutFunctions.setTool_line();
          }
        }
        whiteboard.pressedKeys["shift"] = true;
      } else if (e.which == 17) {
        strgPressed = true;
      }
    });
    $(void 0).on("keyup", function(e) {
      if (e.which == 16) {
        if (tempLineTool) {
          tempLineTool = false;
          shortcutFunctions.setTool_pen();
          whiteboard.ownCursor.show();
        }
        whiteboard.pressedKeys["shift"] = false;
      } else if (e.which == 17) {
        strgPressed = false;
      }
    });
    Object.entries(keybinds).forEach(([key, functionName]) => {
      const associatedShortcutFunction = shortcutFunctions[functionName];
      if (associatedShortcutFunction) {
        keymage(key, associatedShortcutFunction, { preventDefault: true });
      } else {
        console.error(
          "Function you want to keybind on key:",
          key,
          "named:",
          functionName,
          "is not available!"
        );
      }
    });
    $("#whiteboardTrashBtn").off("click").click(function() {
      $("#whiteboardTrashBtnConfirm").show().focus();
      $(this).css({ visibility: "hidden" });
    });
    $("#whiteboardTrashBtnConfirm").mouseout(function() {
      $(this).hide();
      $("#whiteboardTrashBtn").css({ visibility: "inherit" });
    });
    $("#whiteboardTrashBtnConfirm").off("click").click(function() {
      $(this).hide();
      $("#whiteboardTrashBtn").css({ visibility: "inherit" });
      whiteboard.clearWhiteboard();
    });
    $("#whiteboardUndoBtn").off("click").click(function() {
      whiteboard.undoWhiteboardClick();
    });
    $("#whiteboardRedoBtn").off("click").click(function() {
      whiteboard.redoWhiteboardClick();
    });
    $("#whiteboardLockBtn").off("click").click(() => {
      ReadOnlyService$1.deactivateReadOnlyMode();
    });
    $("#whiteboardUnlockBtn").off("click").click(() => {
      ReadOnlyService$1.activateReadOnlyMode();
    });
    $("#whiteboardUnlockBtn").hide();
    $("#whiteboardLockBtn").show();
    $(".whiteboard-tool").off("click").click(function() {
      $(".whiteboard-tool").removeClass("active");
      $(this).addClass("active");
      var activeTool = $(this).attr("tool");
      whiteboard.setTool(activeTool);
      if (activeTool == "mouse" || activeTool == "recSelect") {
        $(".activeToolIcon").empty();
      } else {
        $(".activeToolIcon").html($(this).html());
      }
    });
    $("#addImgToCanvasBtn").off("click").click(function() {
      if (ReadOnlyService$1.readOnlyActive) return;
      showBasicAlert("Please drag the image into the browser.");
    });
    $("#saveAsImageBtn").off("click").click(function() {
      whiteboard.getImageDataBase64(
        {
          imageFormat: ConfigService$1.imageDownloadFormat,
          drawBackgroundGrid: ConfigService$1.drawBackgroundGrid
        },
        function(imgData) {
          var w = (void 0).open("about:blank");
          setTimeout(function() {
            var a = (void 0).createElement("a");
            a.href = imgData;
            a.download = "whiteboard." + ConfigService$1.imageDownloadFormat;
            w.document.body.appendChild(a);
            a.click();
            w.document.body.removeChild(a);
            setTimeout(function() {
              w.close();
            }, 100);
          }, 0);
        }
      );
    });
    $("#saveAsJSONBtn").off("click").click(function() {
      var imgData = whiteboard.getImageDataJson();
      var w = (void 0).open("about:blank");
      setTimeout(function() {
        var a = (void 0).createElement("a");
        a.href = (void 0).URL.createObjectURL(new Blob([imgData], { type: "text/json" }));
        a.download = "whiteboard.json";
        w.document.body.appendChild(a);
        a.click();
        w.document.body.removeChild(a);
        setTimeout(function() {
          w.close();
        }, 100);
      }, 0);
    });
    $("#uploadWebDavBtn").off("click").click(function() {
      if ($(".webdavUploadBtn").length > 0) {
        return;
      }
      var webdavserver = localStorage.getItem("webdavserver") || "";
      var webdavpath = localStorage.getItem("webdavpath") || "/";
      var webdavusername = localStorage.getItem("webdavusername") || "";
      var webdavpassword = localStorage.getItem("webdavpassword") || "";
      var webDavHtml = $(
        '<div><table><tr><td>Server URL:</td><td><input class="webdavserver" type="text" value="' + webdavserver + '" placeholder="https://yourserver.com/remote.php/webdav/"></td><td></td></tr><tr><td>Path:</td><td><input class="webdavpath" type="text" placeholder="folder" value="' + webdavpath + '"></td><td style="font-size: 0.7em;"><i>path always have to start & end with "/"</i></td></tr><tr><td>Username:</td><td><input class="webdavusername" type="text" value="' + webdavusername + '" placeholder="username"></td><td style="font-size: 0.7em;"></td></tr><tr><td>Password:</td><td><input class="webdavpassword" type="password" value="' + webdavpassword + '" placeholder="password"></td><td style="font-size: 0.7em;"></td></tr><tr><td style="font-size: 0.7em;" colspan="3">Note: You have to generate and use app credentials if you have 2 Factor Auth activated on your dav/nextcloud server!</td></tr><tr><td></td><td colspan="2"><span class="loadingWebdavText" style="display:none;">Saving to webdav, please wait...</span><button class="modalBtn webdavUploadBtn"><i class="fas fa-upload"></i> Start Upload</button></td></tr></table></div>'
      );
      webDavHtml.find(".webdavUploadBtn").off("click").click(function() {
        var webdavserver2 = webDavHtml.find(".webdavserver").val();
        localStorage.setItem("webdavserver", webdavserver2);
        var webdavpath2 = webDavHtml.find(".webdavpath").val();
        localStorage.setItem("webdavpath", webdavpath2);
        var webdavusername2 = webDavHtml.find(".webdavusername").val();
        localStorage.setItem("webdavusername", webdavusername2);
        var webdavpassword2 = webDavHtml.find(".webdavpassword").val();
        localStorage.setItem("webdavpassword", webdavpassword2);
        whiteboard.getImageDataBase64(
          {
            imageFormat: ConfigService$1.imageDownloadFormat,
            drawBackgroundGrid: ConfigService$1.drawBackgroundGrid
          },
          function(base64data) {
            var webdavaccess = {
              webdavserver: webdavserver2,
              webdavpath: webdavpath2,
              webdavusername: webdavusername2,
              webdavpassword: webdavpassword2
            };
            webDavHtml.find(".loadingWebdavText").show();
            webDavHtml.find(".webdavUploadBtn").hide();
            saveWhiteboardToWebdav(base64data, webdavaccess, function(err) {
              if (err) {
                webDavHtml.find(".loadingWebdavText").hide();
                webDavHtml.find(".webdavUploadBtn").show();
              } else {
                webDavHtml.parents(".basicalert").remove();
              }
            });
          }
        );
      });
      showBasicAlert(webDavHtml, {
        header: "Save to Webdav",
        okBtnText: "cancel",
        headercolor: "#0082c9"
      });
      dom.i2svg();
    });
    $("#uploadJsonBtn").off("click").click(function() {
      $("#myFile").click();
    });
    $("#shareWhiteboardBtn").off("click").click(() => {
      function urlToClipboard(whiteboardId2 = null) {
        const { protocol, host, pathname, search } = (void 0).location;
        const basePath = `${protocol}//${host}${pathname}`;
        const getParams = new URLSearchParams(search);
        getParams.delete("username");
        if (whiteboardId2) {
          getParams.set("whiteboardid", whiteboardId2);
        }
        const url = `${basePath}?${getParams.toString()}`;
        $("<textarea/>").appendTo("body").val(url).select().each(() => {
          (void 0).execCommand("copy");
        }).remove();
      }
      $("#shareWhiteboardDialogMessage").toggleClass("displayNone", true);
      $("#shareWhiteboardDialog").toggleClass("displayNone", false);
      $("#shareWhiteboardDialogGoBack").off("click").click(() => {
        $("#shareWhiteboardDialog").toggleClass("displayNone", true);
      });
      $("#shareWhiteboardDialogCopyReadOnlyLink").off("click").click(() => {
        urlToClipboard(ConfigService$1.correspondingReadOnlyWid);
        $("#shareWhiteboardDialogMessage").toggleClass("displayNone", false).text("Read-only link copied to clipboard \u2713");
      });
      $("#shareWhiteboardDialogCopyReadWriteLink").toggleClass("displayNone", ConfigService$1.isReadOnly).click(() => {
        $("#shareWhiteboardDialogMessage").toggleClass("displayNone", false).text("Read/write link copied to clipboard \u2713");
        urlToClipboard();
      });
    });
    $("#displayWhiteboardInfoBtn").off("click").click(() => {
      InfoService$1.toggleDisplayInfo();
    });
    var btnsMini = false;
    $("#minMaxBtn").off("click").click(function() {
      if (!btnsMini) {
        $("#toolbar").find(".btn-group:not(.minGroup)").hide();
        $(this).find("#minBtn").hide();
        $(this).find("#maxBtn").show();
      } else {
        $("#toolbar").find(".btn-group").show();
        $(this).find("#minBtn").show();
        $(this).find("#maxBtn").hide();
      }
      btnsMini = !btnsMini;
    });
    $("#myFile").on("change", function() {
      var file = (void 0).getElementById("myFile").files[0];
      var reader = new FileReader();
      reader.onload = function(e) {
        try {
          var j = JSON.parse(e.target.result);
          whiteboard.loadJsonData(j);
        } catch (e2) {
          showBasicAlert("File was not a valid JSON!");
        }
      };
      reader.readAsText(file);
      $(this).val("");
    });
    $("#whiteboardThicknessSlider").on("input", function() {
      if (ReadOnlyService$1.readOnlyActive) return;
      whiteboard.setStrokeThickness($(this).val());
    });
    var dragCounter = 0;
    $("#whiteboardContainer").on("dragenter", function(e) {
      if (ReadOnlyService$1.readOnlyActive) return;
      e.preventDefault();
      e.stopPropagation();
      dragCounter++;
      whiteboard.dropIndicator.show();
    });
    $("#whiteboardContainer").on("dragleave", function(e) {
      if (ReadOnlyService$1.readOnlyActive) return;
      e.preventDefault();
      e.stopPropagation();
      dragCounter--;
      if (dragCounter === 0) {
        whiteboard.dropIndicator.hide();
      }
    });
    $("#whiteboardContainer").on("drop", function(e) {
      debugger;
      if (ReadOnlyService$1.readOnlyActive) return;
      if (e.originalEvent.dataTransfer) {
        if (e.originalEvent.dataTransfer.files.length) {
          e.preventDefault();
          e.stopPropagation();
          var filename = e.originalEvent.dataTransfer.files[0]["name"];
          if (isImageFileName(filename)) {
            var blob = e.originalEvent.dataTransfer.files[0];
            var reader = new (void 0).FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = function() {
              const base64data = reader.result;
              uploadImgAndAddToWhiteboard(base64data);
            };
          } else if (isPDFFileName(filename)) {
            var blob = e.originalEvent.dataTransfer.files[0];
            var reader = new (void 0).FileReader();
            reader.onloadend = function() {
              var pdfData = new Uint8Array(this.result);
              var loadingTask = pdfjsLib.getDocument({ data: pdfData });
              loadingTask.promise.then(
                function(pdf) {
                  console.log("PDF loaded");
                  var currentDataUrl = null;
                  var modalDiv = $(
                    '<div>Page: <select></select> <button style="margin-bottom: 3px;" class="modalBtn"><i class="fas fa-upload"></i> Upload to Whiteboard</button><img style="width:100%;" src=""/></div>'
                  );
                  modalDiv.find("select").change(function() {
                    showPDFPageAsImage(parseInt($(this).val()));
                  });
                  modalDiv.find("button").off("click").click(function() {
                    if (currentDataUrl) {
                      $(".basicalert").remove();
                      uploadImgAndAddToWhiteboard(currentDataUrl);
                    }
                  });
                  for (var i = 1; i < pdf.numPages + 1; i++) {
                    modalDiv.find("select").append('<option value="' + i + '">' + i + "</option>");
                  }
                  showBasicAlert(modalDiv, {
                    header: "Pdf to Image",
                    okBtnText: "cancel",
                    headercolor: "#0082c9"
                  });
                  dom.i2svg();
                  showPDFPageAsImage(1);
                  function showPDFPageAsImage(pageNumber) {
                    pdf.getPage(pageNumber).then(function(page) {
                      console.log("Page loaded");
                      var scale = 1.5;
                      var viewport = page.getViewport({ scale });
                      var canvas = $("<canvas></canvas>")[0];
                      var context = canvas.getContext("2d");
                      canvas.height = viewport.height;
                      canvas.width = viewport.width;
                      var renderContext = {
                        canvasContext: context,
                        viewport
                      };
                      var renderTask = page.render(renderContext);
                      renderTask.promise.then(function() {
                        var dataUrl = canvas.toDataURL("image/jpeg", 1);
                        currentDataUrl = dataUrl;
                        modalDiv.find("img").attr("src", dataUrl);
                        console.log("Page rendered");
                      });
                    });
                  }
                },
                function(reason) {
                  showBasicAlert(
                    "Error loading pdf as image! Check that this is a vaild pdf file!"
                  );
                  console.error(reason);
                }
              );
            };
            reader.readAsArrayBuffer(blob);
          } else {
            showBasicAlert("File must be an image!");
          }
        } else {
          var fileUrl = e.originalEvent.dataTransfer.getData("URL");
          var imageUrl = e.originalEvent.dataTransfer.getData("text/html");
          var rex = /src="?([^"\s]+)"?\s*/;
          var url = rex.exec(imageUrl);
          if (url && url.length > 1) {
            url = url[1];
          } else {
            url = "";
          }
          isValidImageUrl(fileUrl, function(isImage) {
            if (isImage && isImageFileName(url)) {
              whiteboard.addImgToCanvasByUrl(fileUrl);
            } else {
              isValidImageUrl(url, function(isImage2) {
                if (isImage2) {
                  if (isImageFileName(url) || url.startsWith("http")) {
                    whiteboard.addImgToCanvasByUrl(url);
                  } else {
                    uploadImgAndAddToWhiteboard(url);
                  }
                } else {
                  showBasicAlert("Can only upload Imagedata!");
                }
              });
            }
          });
        }
      }
      dragCounter = 0;
      whiteboard.dropIndicator.hide();
    });
    new Picker({
      parent: $("#whiteboardColorpicker")[0],
      color: "#000000",
      onChange: function(color) {
        whiteboard.setDrawColor(color.rgbaString);
      }
    });
    shortcutFunctions.setTool_mouse();
    whiteboard.refreshCursorAppearance();
    {
      if (ConfigService$1.readOnlyOnWhiteboardLoad) ReadOnlyService$1.activateReadOnlyMode();
      else ReadOnlyService$1.deactivateReadOnlyMode();
      if (ConfigService$1.displayInfoOnWhiteboardLoad) InfoService$1.displayInfo();
      else InfoService$1.hideInfo();
    }
    if (ConfigService$1.isReadOnly) ReadOnlyService$1.activateReadOnlyMode();
  });
  (void 0).addEventListener(
    "dragover",
    function(e) {
      e = e || event;
      e.preventDefault();
    },
    false
  );
  (void 0).addEventListener(
    "drop",
    function(e) {
      e = e || event;
      e.preventDefault();
    },
    false
  );
  function uploadImgAndAddToWhiteboard(base64data) {
    const date = +/* @__PURE__ */ new Date();
    $.ajax({
      type: "POST",
      url: (void 0).URL.substr(0, (void 0).URL.lastIndexOf("/")) + "/api/upload",
      data: {
        imagedata: base64data,
        whiteboardId,
        date,
        at: accessToken
      },
      success: function(msg) {
        const { correspondingReadOnlyWid } = ConfigService$1;
        const filename = `${correspondingReadOnlyWid}_${date}.png`;
        const rootUrl = (void 0).URL.substr(0, (void 0).URL.lastIndexOf("/"));
        whiteboard.addImgToCanvasByUrl(
          `${rootUrl}/uploads/${correspondingReadOnlyWid}/${filename}`
        );
        console.log("Image uploaded!");
      },
      error: function(err) {
        showBasicAlert("Failed to upload frame: " + JSON.stringify(err));
      }
    });
  }
  function saveWhiteboardToWebdav(base64data, webdavaccess, callback) {
    var date = +/* @__PURE__ */ new Date();
    $.ajax({
      type: "POST",
      url: (void 0).URL.substr(0, (void 0).URL.lastIndexOf("/")) + "api/upload",
      data: {
        imagedata: base64data,
        whiteboardId,
        date,
        at: accessToken,
        webdavaccess: JSON.stringify(webdavaccess)
      },
      success: function(msg) {
        showBasicAlert("Whiteboard was saved to Webdav!", {
          headercolor: "#5c9e5c"
        });
        console.log("Image uploaded for webdav!");
        callback();
      },
      error: function(err) {
        if (err.status == 403) {
          showBasicAlert(
            "Could not connect to Webdav folder! Please check the credentials and paths and try again!"
          );
        } else {
          showBasicAlert("Unknown Webdav error! ", err);
        }
        callback(err);
      }
    });
  }
  function isImageFileName(filename) {
    var extension = filename.split(".")[filename.split(".").length - 1];
    var known_extensions = ["png", "jpg", "jpeg", "gif", "tiff", "bmp", "webp"];
    return known_extensions.includes(extension.toLowerCase());
  }
  function isPDFFileName(filename) {
    var extension = filename.split(".")[filename.split(".").length - 1];
    var known_extensions = ["pdf"];
    return known_extensions.includes(extension.toLowerCase());
  }
  function isValidImageUrl(url, callback) {
    var img = new Image();
    var timer = null;
    img.onerror = img.onabort = function() {
      clearTimeout(timer);
      callback(false);
    };
    img.onload = function() {
      clearTimeout(timer);
      callback(true);
    };
    timer = setTimeout(function() {
      callback(false);
    }, 2e3);
    img.src = url;
  }
  (void 0).addEventListener("paste", function(e) {
    if ($(".basicalert").length > 0) {
      return;
    }
    if (e.clipboardData) {
      var items = e.clipboardData.items;
      var imgItemFound = false;
      if (items) {
        for (var i = 0; i < items.length; i++) {
          if (items[i].type.indexOf("image") !== -1) {
            imgItemFound = true;
            var blob = items[i].getAsFile();
            var reader = new (void 0).FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = function() {
              console.log("Uploading image!");
              let base64data = reader.result;
              uploadImgAndAddToWhiteboard(base64data);
            };
          }
        }
      }
      if (!imgItemFound && whiteboard.tool != "text") {
        showBasicAlert(
          "Please Drag&Drop the image or pdf into the Whiteboard. (Browsers don't allow copy+past from the filesystem directly)"
        );
      }
    }
  });
}

export { main as default };
//# sourceMappingURL=main-6wEZpUfQ.mjs.map
