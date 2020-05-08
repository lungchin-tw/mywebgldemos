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
var _scale, _angle, _location, _worldMatrix, _color, _isDirty, _velocity, _acceleration, _elapsed, _collider;
class Actor2D {
    constructor() {
        _scale.set(this, void 0);
        _angle.set(this, void 0);
        _location.set(this, void 0);
        _worldMatrix.set(this, void 0);
        _color.set(this, void 0);
        _isDirty.set(this, void 0);
        _velocity.set(this, void 0);
        _acceleration.set(this, void 0);
        _elapsed.set(this, void 0);
        _collider.set(this, void 0);
        __classPrivateFieldSet(this, _scale, 1);
        __classPrivateFieldSet(this, _angle, 0);
        __classPrivateFieldSet(this, _location, new Vector2());
        __classPrivateFieldSet(this, _worldMatrix, matrix33.identity());
        __classPrivateFieldSet(this, _color, [1, 1, 1, 1]);
        __classPrivateFieldSet(this, _velocity, new Vector2());
        __classPrivateFieldSet(this, _acceleration, new Vector2());
        __classPrivateFieldSet(this, _elapsed, 0);
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
    set location(value) {
        __classPrivateFieldSet(this, _location, value);
        __classPrivateFieldSet(this, _isDirty, true);
    }
    get location() {
        return __classPrivateFieldGet(this, _location);
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
    }
    get velocity() {
        return __classPrivateFieldGet(this, _velocity);
    }
    set acceleration(value) {
        __classPrivateFieldSet(this, _acceleration, value);
    }
    set collider(value) {
        __classPrivateFieldSet(this, _collider, value);
    }
    update(dt) {
        if (__classPrivateFieldGet(this, _isDirty) == true) {
            __classPrivateFieldSet(this, _isDirty, false);
            __classPrivateFieldSet(this, _worldMatrix, matrix33.local2World(__classPrivateFieldGet(this, _scale), __classPrivateFieldGet(this, _angle), __classPrivateFieldGet(this, _location).xy));
        }
        __classPrivateFieldSet(this, _elapsed, dt / 1000);
        if ((__classPrivateFieldGet(this, _velocity).length > 0) || (__classPrivateFieldGet(this, _acceleration).length > 0)) {
            const result = Kinematics2D.MotionByAcceleration(this.velocity, __classPrivateFieldGet(this, _acceleration), __classPrivateFieldGet(this, _elapsed));
            this.location = Vector2.Add(this.location, result.location);
            this.velocity = result.velocity;
            // console.log(this.velocity.getY());
        }
    }
}
_scale = new WeakMap(), _angle = new WeakMap(), _location = new WeakMap(), _worldMatrix = new WeakMap(), _color = new WeakMap(), _isDirty = new WeakMap(), _velocity = new WeakMap(), _acceleration = new WeakMap(), _elapsed = new WeakMap(), _collider = new WeakMap();
//# sourceMappingURL=actor2D.js.map