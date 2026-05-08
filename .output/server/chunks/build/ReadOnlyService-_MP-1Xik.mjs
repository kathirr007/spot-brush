import ConfigService$1 from './ConfigService-DEOCz6AH.mjs';
import './ConfigService.utils-DxoHktcq.mjs';

var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), member.set(obj, value), value);
var _readOnlyActive, _previousToolHtmlElem;
class ReadOnlyService {
  constructor() {
    /**
     * @type {boolean}
     */
    __privateAdd(this, _readOnlyActive, true);
    /**
     * @type {object}
     */
    __privateAdd(this, _previousToolHtmlElem, null);
  }
  get readOnlyActive() {
    return __privateGet(this, _readOnlyActive);
  }
  get previousToolHtmlElem() {
    return __privateGet(this, _previousToolHtmlElem);
  }
  /**
   * Activate read-only mode
   */
  activateReadOnlyMode($self) {
    __privateSet(this, _readOnlyActive, true);
    $self.readOnlyActive = true;
    $self.previousToolHtmlElem = (void 0).querySelector(".whiteboard-tool.active");
    (void 0).querySelector(".whiteboard-tool[tool=mouse]").click();
    $self.disableTool = true;
  }
  /**
   * Deactivate read-only mode
   */
  deactivateReadOnlyMode($self) {
    if (ConfigService$1.isReadOnly) return;
    __privateSet(this, _readOnlyActive, false);
    if (ConfigService$1.isReadOnly) return;
    $self.readOnlyActive = false;
    $self.disableTool = false;
    const { previousToolHtmlElem } = $self;
    if (previousToolHtmlElem) previousToolHtmlElem.click();
  }
}
_readOnlyActive = new WeakMap();
_previousToolHtmlElem = new WeakMap();
const ReadOnlyService$1 = new ReadOnlyService();

export { ReadOnlyService$1 as default };
//# sourceMappingURL=ReadOnlyService-_MP-1Xik.mjs.map
