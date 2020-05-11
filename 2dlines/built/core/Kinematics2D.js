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
var _velocity, _location;
class KinematicsAccResult {
    constructor(v, loc) {
        _velocity.set(this, void 0);
        _location.set(this, void 0);
        __classPrivateFieldSet(this, _velocity, v);
        __classPrivateFieldSet(this, _location, loc);
    }
    get velocity() {
        return __classPrivateFieldGet(this, _velocity);
    }
    get location() {
        return __classPrivateFieldGet(this, _location);
    }
}
_velocity = new WeakMap(), _location = new WeakMap();
class Kinematics2D {
    static MotionByAcceleration(v1, acc, dt) {
        // v2 = v1 + at
        let v2 = Vector2.Add(v1, Vector2.Scale(acc, dt));
        // s2 = s1(= 0 here) + v1t + (at^2)/2
        let v1t = Vector2.Scale(v1, dt);
        let at2 = Vector2.Scale(acc, Math.pow(dt, 2));
        let s2 = Vector2.Add(v1t, Vector2.Scale(at2, 0.5));
        return new KinematicsAccResult(v2, s2);
    }
}
//# sourceMappingURL=Kinematics2D.js.map