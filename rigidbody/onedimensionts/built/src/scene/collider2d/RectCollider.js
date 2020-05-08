"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var _bound, _corners;
class SolidRectCollider {
    constructor(bound) {
        _bound.set(this, void 0);
        _corners.set(this, void 0);
        __classPrivateFieldSet(this, _bound, (bound != undefined) ? bound : new Vector4());
    }
    Detect(other) {
        return false;
    }
}
_bound = new WeakMap(), _corners = new WeakMap();
//# sourceMappingURL=RectCollider.js.map