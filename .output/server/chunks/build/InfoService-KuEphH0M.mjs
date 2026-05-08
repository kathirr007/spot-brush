import ConfigService$1 from './ConfigService-DEOCz6AH.mjs';
import './ConfigService.utils-DxoHktcq.mjs';

var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), member.set(obj, value), value);
var __privateWrapper = (obj, member, setter, getter) => ({
  set _(value) {
    __privateSet(obj, member, value);
  },
  get _() {
    return __privateGet(obj, member, getter);
  }
});
var _infoAreDisplayed, _nbConnectedUsers, _smallestScreenResolution, _nbMessagesSent, _nbMessagesReceived, _refreshInfoIntervalId;
const intervalError = "[nuxt] `setInterval` should not be used on the server. Consider wrapping it with an `onNuxtReady`, `onBeforeMount` or `onMounted` lifecycle hook, or ensure you only call it in the browser by checking `false`.";
const setInterval = (() => {
  console.error(intervalError);
});
class InfoService {
  constructor() {
    /**
     * @type {boolean}
     */
    __privateAdd(this, _infoAreDisplayed, false);
    /**
     * Holds the number of user connected to the server
     *
     * @type {number}
     */
    __privateAdd(this, _nbConnectedUsers, -1);
    /**
     * @type {{w: number, h: number}}
     */
    __privateAdd(this, _smallestScreenResolution);
    /**
     * @type {number}
     */
    __privateAdd(this, _nbMessagesSent, 0);
    /**
     * @type {number}
     */
    __privateAdd(this, _nbMessagesReceived, 0);
    /**
     * Holds the interval Id
     * @type {number}
     */
    __privateAdd(this, _refreshInfoIntervalId);
  }
  get infoAreDisplayed() {
    return __privateGet(this, _infoAreDisplayed);
  }
  get nbConnectedUsers() {
    return __privateGet(this, _nbConnectedUsers);
  }
  get smallestScreenResolution() {
    return __privateGet(this, _smallestScreenResolution);
  }
  get nbMessagesSent() {
    return __privateGet(this, _nbMessagesSent);
  }
  get nbMessagesReceived() {
    return __privateGet(this, _nbMessagesReceived);
  }
  get refreshInfoIntervalId() {
    return __privateGet(this, _refreshInfoIntervalId);
  }
  /**
   * @param {number} nbConnectedUsers
   * @param {{w: number, h: number}} smallestScreenResolution
   */
  updateInfoFromServer({ nbConnectedUsers, smallestScreenResolution = void 0 }) {
    if (__privateGet(this, _nbConnectedUsers) !== nbConnectedUsers) {
      ConfigService$1.refreshUserCountDependant(nbConnectedUsers);
    }
    __privateSet(this, _nbConnectedUsers, nbConnectedUsers);
    if (smallestScreenResolution) {
      __privateSet(this, _smallestScreenResolution, smallestScreenResolution);
    }
  }
  incrementNbMessagesReceived() {
    __privateWrapper(this, _nbMessagesReceived)._++;
  }
  incrementNbMessagesSent() {
    __privateWrapper(this, _nbMessagesSent)._++;
  }
  refreshDisplayedInfo() {
    const {
      nbMessagesReceived,
      nbMessagesSent,
      nbConnectedUsers,
      smallestScreenResolution: ssr
    } = this;
    $("#messageReceivedCount")[0] ? $("#messageReceivedCount")[0].innerText = String(nbMessagesReceived) : "";
    $("#messageSentCount")[0] ? $("#messageSentCount")[0].innerText = String(nbMessagesSent) : "";
    $("#connectedUsersCount")[0] ? $("#connectedUsersCount")[0].innerText = String(nbConnectedUsers) : "";
    $("#smallestScreenResolution")[0] ? $("#smallestScreenResolution")[0].innerText = ssr ? `(${ssr.w}, ${ssr.h})` : "Unknown" : "";
  }
  /**
   * Show the info div
   */
  displayInfo() {
    $("#whiteboardInfoContainer").toggleClass("displayNone", false);
    $("#displayWhiteboardInfoBtn").toggleClass("active", true);
    __privateSet(this, _infoAreDisplayed, true);
    this.refreshDisplayedInfo();
    __privateSet(this, _refreshInfoIntervalId, setInterval(() => {
      this.refreshDisplayedInfo();
    }, ConfigService$1.refreshInfoInterval));
  }
  /**
   * Hide the info div
   */
  hideInfo() {
    $("#whiteboardInfoContainer").toggleClass("displayNone", true);
    $("#displayWhiteboardInfoBtn").toggleClass("active", false);
    __privateSet(this, _infoAreDisplayed, false);
    const { refreshInfoIntervalId } = this;
    if (refreshInfoIntervalId) {
      clearInterval(refreshInfoIntervalId);
      __privateSet(this, _refreshInfoIntervalId, void 0);
    }
  }
  /**
   * Switch between hiding and showing the info div
   */
  toggleDisplayInfo() {
    const { infoAreDisplayed } = this;
    if (infoAreDisplayed) {
      this.hideInfo();
    } else {
      this.displayInfo();
    }
  }
}
_infoAreDisplayed = new WeakMap();
_nbConnectedUsers = new WeakMap();
_smallestScreenResolution = new WeakMap();
_nbMessagesSent = new WeakMap();
_nbMessagesReceived = new WeakMap();
_refreshInfoIntervalId = new WeakMap();
const InfoService$1 = new InfoService();

export { InfoService$1 as default };
//# sourceMappingURL=InfoService-KuEphH0M.mjs.map
