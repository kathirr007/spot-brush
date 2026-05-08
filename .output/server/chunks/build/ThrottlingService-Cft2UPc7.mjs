import Point from './Point-DM7E_x-Y.mjs';
import { getCurrentTimeMs } from './utils-Dg8BbwNB.mjs';
import ConfigService$1 from './ConfigService-DEOCz6AH.mjs';
import './ConfigService.utils-DxoHktcq.mjs';

var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), member.set(obj, value), value);
var _lastSuccessTime, _lastPointPosition;
class ThrottlingService {
  constructor() {
    /**
     * @type {number}
     */
    __privateAdd(this, _lastSuccessTime, 0);
    /**
     * @type {Point}
     */
    __privateAdd(this, _lastPointPosition, new Point(0, 0));
  }
  get lastSuccessTime() {
    return __privateGet(this, _lastSuccessTime);
  }
  get lastPointPosition() {
    return __privateGet(this, _lastPointPosition);
  }
  /**
   * Helper to throttle events based on the configuration.
   * Only if checks are ok, the onSuccess callback will be called.
   *
   * @param {Point} newPosition New point position to base the throttling on
   * @param {function()} onSuccess Callback called when the throttling is successful
   */
  throttle(newPosition, onSuccess) {
    const newTime = getCurrentTimeMs();
    const { lastPointPosition, lastSuccessTime } = this;
    if (newTime - lastSuccessTime > ConfigService$1.pointerEventsThrottling.minTimeDelta) {
      if (lastPointPosition.distTo(newPosition) > ConfigService$1.pointerEventsThrottling.minDistDelta) {
        onSuccess();
        __privateSet(this, _lastPointPosition, newPosition);
        __privateSet(this, _lastSuccessTime, newTime);
      }
    }
  }
}
_lastSuccessTime = new WeakMap();
_lastPointPosition = new WeakMap();
const ThrottlingService$1 = new ThrottlingService();

export { ThrottlingService$1 as default };
//# sourceMappingURL=ThrottlingService-Cft2UPc7.mjs.map
