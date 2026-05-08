import { getThrottling } from './ConfigService.utils-DxoHktcq.mjs';

var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), member.set(obj, value), value);
var _configFromServer, _correspondingReadOnlyWid, _isReadOnly, _onWhiteboardLoad, _showSmallestScreenIndicator, _imageDownloadFormat, _drawBackgroundGrid, _backgroundGridImage, _pointerEventsThrottling, _refreshInfoInterval;
class ConfigService {
  constructor() {
    /**
     * @type {object}
     */
    __privateAdd(this, _configFromServer, {});
    /**
     * Associated read-only id for this whiteboad
     * @type {string}
     */
    __privateAdd(this, _correspondingReadOnlyWid, "");
    /**
     * @type {boolean}
     */
    __privateAdd(this, _isReadOnly, true);
    /**
     * @type {{displayInfo: boolean, setReadOnly: boolean}}
     * @readonly
     */
    __privateAdd(this, _onWhiteboardLoad, { setReadOnly: false, displayInfo: false });
    /**
     * @type {boolean}
     */
    __privateAdd(this, _showSmallestScreenIndicator, true);
    /**
     * @type {string}
     */
    __privateAdd(this, _imageDownloadFormat, "png");
    /**
     * @type {boolean}
     */
    __privateAdd(this, _drawBackgroundGrid, false);
    /**
     * @type {string}
     */
    __privateAdd(this, _backgroundGridImage, "~assets/images/bg_grid.png");
    /**
     * @type {{minDistDelta: number, minTimeDelta: number}}
     */
    __privateAdd(this, _pointerEventsThrottling, { minDistDelta: 0, minTimeDelta: 0 });
    /**
     * @type {number}
     */
    __privateAdd(this, _refreshInfoInterval, 1e3);
  }
  get configFromServer() {
    return __privateGet(this, _configFromServer);
  }
  get correspondingReadOnlyWid() {
    return __privateGet(this, _correspondingReadOnlyWid);
  }
  get isReadOnly() {
    return __privateGet(this, _isReadOnly);
  }
  get readOnlyOnWhiteboardLoad() {
    return __privateGet(this, _onWhiteboardLoad).setReadOnly;
  }
  get displayInfoOnWhiteboardLoad() {
    return __privateGet(this, _onWhiteboardLoad).displayInfo;
  }
  get showSmallestScreenIndicator() {
    return __privateGet(this, _showSmallestScreenIndicator);
  }
  get imageDownloadFormat() {
    return __privateGet(this, _imageDownloadFormat);
  }
  get drawBackgroundGrid() {
    return __privateGet(this, _drawBackgroundGrid);
  }
  get backgroundGridImage() {
    return __privateGet(this, _backgroundGridImage);
  }
  get pointerEventsThrottling() {
    return __privateGet(this, _pointerEventsThrottling);
  }
  get refreshInfoInterval() {
    return __privateGet(this, _refreshInfoInterval);
  }
  /**
   * Init the service from the config sent by the server
   *
   * @param {object} configFromServer
   */
  initFromServer(configFromServer) {
    __privateSet(this, _configFromServer, configFromServer);
    const { common } = configFromServer;
    const {
      onWhiteboardLoad,
      showSmallestScreenIndicator,
      imageDownloadFormat,
      drawBackgroundGrid,
      backgroundGridImage,
      performance
    } = common;
    __privateSet(this, _onWhiteboardLoad, onWhiteboardLoad);
    __privateSet(this, _showSmallestScreenIndicator, showSmallestScreenIndicator);
    __privateSet(this, _imageDownloadFormat, imageDownloadFormat);
    __privateSet(this, _drawBackgroundGrid, drawBackgroundGrid);
    __privateSet(this, _backgroundGridImage, backgroundGridImage);
    __privateSet(this, _refreshInfoInterval, 1e3 / performance.refreshInfoFreq);
    const { whiteboardSpecific } = configFromServer;
    const { correspondingReadOnlyWid, isReadOnly } = whiteboardSpecific;
    __privateSet(this, _correspondingReadOnlyWid, correspondingReadOnlyWid);
    __privateSet(this, _isReadOnly, isReadOnly);
  }
  /**
   * Refresh config that depends on the number of user connected to whiteboard
   *
   * @param {number} userCount
   */
  refreshUserCountDependant(userCount) {
    const { configFromServer } = this;
    const { common } = configFromServer;
    const { performance } = common;
    const { pointerEventsThrottling } = performance;
    __privateSet(this, _pointerEventsThrottling, getThrottling(pointerEventsThrottling, userCount));
  }
}
_configFromServer = new WeakMap();
_correspondingReadOnlyWid = new WeakMap();
_isReadOnly = new WeakMap();
_onWhiteboardLoad = new WeakMap();
_showSmallestScreenIndicator = new WeakMap();
_imageDownloadFormat = new WeakMap();
_drawBackgroundGrid = new WeakMap();
_backgroundGridImage = new WeakMap();
_pointerEventsThrottling = new WeakMap();
_refreshInfoInterval = new WeakMap();
const ConfigService$1 = new ConfigService();

export { ConfigService$1 as default };
//# sourceMappingURL=ConfigService-DEOCz6AH.mjs.map
