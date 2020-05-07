"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _scale, _angle, _location, _worldMatrix, _color, _isDirty;
class Actor2D {
    constructor() {
        _scale.set(this, void 0);
        _angle.set(this, void 0);
        _location.set(this, void 0);
        _worldMatrix.set(this, void 0);
        _color.set(this, void 0);
        _isDirty.set(this, void 0);
        __classPrivateFieldSet(this, _scale, 1);
        __classPrivateFieldSet(this, _angle, 0);
        __classPrivateFieldSet(this, _location, [0, 0]);
        __classPrivateFieldSet(this, _worldMatrix, matrix33.identity());
        __classPrivateFieldSet(this, _color, [1, 1, 1, 1]);
        __classPrivateFieldSet(this, _isDirty, true);
    }
    set scale(value) {
        __classPrivateFieldSet(this, _scale, value);
    }
    get scale() {
        return __classPrivateFieldGet(this, _scale);
    }
    set angle(value) {
        __classPrivateFieldSet(this, _angle, value);
    }
    get angle() {
        return __classPrivateFieldGet(this, _angle);
    }
    set location(xy) {
        __classPrivateFieldSet(this, _location, xy);
    }
    get worldMatrix() {
        return __classPrivateFieldGet(this, _worldMatrix);
    }
    set color(rgba) {
        __classPrivateFieldSet(this, _color, rgba);
    }
    get color() {
        return __classPrivateFieldGet(this, _color);
    }
    update(dt) {
        if (__classPrivateFieldGet(this, _isDirty) == true) {
            __classPrivateFieldSet(this, _isDirty, false);
            __classPrivateFieldSet(this, _worldMatrix, matrix33.local2World(__classPrivateFieldGet(this, _scale), __classPrivateFieldGet(this, _angle), __classPrivateFieldGet(this, _location)));
        }
    }
}
_scale = new WeakMap(), _angle = new WeakMap(), _location = new WeakMap(), _worldMatrix = new WeakMap(), _color = new WeakMap(), _isDirty = new WeakMap();
//# sourceMappingURL=actor.js.map