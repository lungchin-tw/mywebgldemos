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
var _scale, _angle, _location, _worldMatrix, _color, _isDirty, _velocity, _speed;
class Actor2D {
    constructor() {
        _scale.set(this, void 0);
        _angle.set(this, void 0);
        _location.set(this, void 0);
        _worldMatrix.set(this, void 0);
        _color.set(this, void 0);
        _isDirty.set(this, void 0);
        _velocity.set(this, void 0);
        _speed.set(this, void 0);
        __classPrivateFieldSet(this, _scale, 1);
        __classPrivateFieldSet(this, _angle, 0);
        __classPrivateFieldSet(this, _location, [0, 0]);
        __classPrivateFieldSet(this, _worldMatrix, matrix33.identity());
        __classPrivateFieldSet(this, _color, [1, 1, 1, 1]);
        __classPrivateFieldSet(this, _velocity, new Vector2());
        __classPrivateFieldSet(this, _speed, 0);
        __classPrivateFieldSet(this, _isDirty, true);
    }
    set scale(value) {
        __classPrivateFieldSet(this, _scale, value);
        __classPrivateFieldSet(this, _isDirty, true);
    }
    get scale() {
        return __classPrivateFieldGet(this, _scale);
    }
    set angle(value) {
        __classPrivateFieldSet(this, _angle, value);
        __classPrivateFieldSet(this, _isDirty, true);
    }
    get angle() {
        return __classPrivateFieldGet(this, _angle);
    }
    set location(xy) {
        __classPrivateFieldSet(this, _location, xy);
        __classPrivateFieldSet(this, _isDirty, true);
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
    set velocity(value) {
        __classPrivateFieldSet(this, _velocity, value);
        // this.#speed = Math.sqrt(Math.pow(value[0], 2) + Math.pow(value[1], 2));
    }
    get velocity() {
        return __classPrivateFieldGet(this, _velocity);
    }
    update(dt) {
        if (__classPrivateFieldGet(this, _isDirty) == true) {
            __classPrivateFieldSet(this, _isDirty, false);
            __classPrivateFieldSet(this, _worldMatrix, matrix33.local2World(__classPrivateFieldGet(this, _scale), __classPrivateFieldGet(this, _angle), __classPrivateFieldGet(this, _location)));
        }
    }
}
_scale = new WeakMap(), _angle = new WeakMap(), _location = new WeakMap(), _worldMatrix = new WeakMap(), _color = new WeakMap(), _isDirty = new WeakMap(), _velocity = new WeakMap(), _speed = new WeakMap();
//# sourceMappingURL=actor2D.js.map