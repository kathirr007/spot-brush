import { computeDist } from './utils-Dg8BbwNB.mjs';

var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), member.set(obj, value), value);
var _x, _y, _lastKnownPos;
const _Point = class _Point {
  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    /**
     * @type {number}
     */
    __privateAdd(this, _x);
    /**
     * @type {number}
     */
    __privateAdd(this, _y);
    __privateSet(this, _x, x);
    __privateSet(this, _y, y);
  }
  get x() {
    return __privateGet(this, _x);
  }
  get y() {
    return __privateGet(this, _y);
  }
  static get lastKnownPos() {
    return __privateGet(_Point, _lastKnownPos);
  }
  get isZeroZero() {
    return __privateGet(this, _x) === 0 && __privateGet(this, _y) === 0;
  }
  /**
   * Get a Point object from an event
   * @param {event} e
   * @returns {Point}
   */
  static fromEvent(e) {
    const epsilon = 1e-4;
    let x = (e.offsetX || e.pageX - $(e.target).offset().left) + epsilon;
    let y = (e.offsetY || e.pageY - $(e.target).offset().top) + epsilon;
    if (Number.isNaN(x) || Number.isNaN(y) || x === epsilon && y === epsilon) {
      if (e.touches && e.touches.length && e.touches.length > 0) {
        const touch = e.touches[0];
        x = touch.clientX - $("#mouseOverlay").offset().left;
        y = touch.clientY - $("#mouseOverlay").offset().top;
      } else {
        return __privateGet(_Point, _lastKnownPos);
      }
    }
    __privateSet(_Point, _lastKnownPos, new _Point(x - epsilon, y - epsilon));
    return __privateGet(_Point, _lastKnownPos);
  }
  /**
   * Compute euclidean distance between points
   *
   * @param {Point} otherPoint
   * @returns {number}
   */
  distTo(otherPoint) {
    return computeDist(this, otherPoint);
  }
};
_x = new WeakMap();
_y = new WeakMap();
_lastKnownPos = new WeakMap();
/**
 * @type {Point}
 */
__privateAdd(_Point, _lastKnownPos, new _Point(0, 0));
let Point = _Point;

export { Point as default };
//# sourceMappingURL=Point-DM7E_x-Y.mjs.map
