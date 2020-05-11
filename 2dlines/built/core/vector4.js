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
var _xyzw, _length;
class Vector4 {
    constructor(value) {
        _xyzw.set(this, void 0);
        _length.set(this, void 0);
        this.xyzw = (value != undefined) ? value : [0, 0, 0, 0];
    }
    static Add(a, b) {
        return new Vector4([
            (a.getX() + b.getX()),
            (a.getY() + b.getY()),
            (a.getZ() + b.getZ()),
            (a.getW() + b.getW()),
        ]);
    }
    static Scale(other, scale) {
        return new Vector4([
            (other.getX() * scale),
            (other.getY() * scale),
            (other.getZ() * scale),
            (other.getW() * scale),
        ]);
    }
    static Normalize(other) {
        return Vector4.Scale(other, (1 / other.length));
    }
    set xyzw(value) {
        __classPrivateFieldSet(this, _xyzw, value);
        __classPrivateFieldSet(this, _length, Math.sqrt(Math.pow(this.getX(), 2) +
            Math.pow(this.getY(), 2) +
            Math.pow(this.getZ(), 2) +
            Math.pow(this.getW(), 2)));
    }
    get xyzw() {
        return __classPrivateFieldGet(this, _xyzw);
    }
    getX() {
        return __classPrivateFieldGet(this, _xyzw)[0];
    }
    getY() {
        return this.xyzw[1];
    }
    getZ() {
        return __classPrivateFieldGet(this, _xyzw)[2];
    }
    getW() {
        return this.xyzw[3];
    }
    setY(value) {
        this.xyzw[1] = value;
    }
    get length() {
        return __classPrivateFieldGet(this, _length);
    }
}
_xyzw = new WeakMap(), _length = new WeakMap();
Vector4.ZeroVector = new Vector4();
//# sourceMappingURL=vector4.js.map