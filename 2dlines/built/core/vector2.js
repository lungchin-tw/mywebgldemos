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
var _xy, _length;
class Vector2 {
    constructor(value) {
        _xy.set(this, void 0);
        _length.set(this, void 0);
        this.xy = (value != undefined) ? value : [0, 0];
    }
    static Add(a, b) {
        return new Vector2([(a.getX() + b.getX()), (a.getY() + b.getY())]);
    }
    static Scale(other, scale) {
        return new Vector2([(other.getX() * scale), (other.getY() * scale)]);
    }
    static Normalize(other) {
        return Vector2.Scale(other, (1 / other.length));
    }
    static Vector2ArrayToFloat32Array(data) {
        let result = new Float32Array(data.length * 2);
        for (let index = 0; index < data.length; index++) {
            let pt = data[index];
            let pos = index * 2;
            result[pos] = pt.getX();
            result[pos + 1] = pt.getY();
        }
        return result;
    }
    set xy(value) {
        __classPrivateFieldSet(this, _xy, value);
        __classPrivateFieldSet(this, _length, Math.sqrt(Math.pow(this.getX(), 2) + Math.pow(this.getY(), 2)));
    }
    get xy() {
        return __classPrivateFieldGet(this, _xy);
    }
    getX() {
        return __classPrivateFieldGet(this, _xy)[0];
    }
    getY() {
        return __classPrivateFieldGet(this, _xy)[1];
    }
    setY(value) {
        __classPrivateFieldGet(this, _xy)[1] = value;
    }
    get length() {
        return __classPrivateFieldGet(this, _length);
    }
}
_xy = new WeakMap(), _length = new WeakMap();
Vector2.ZeroVector = new Vector2();
//# sourceMappingURL=vector2.js.map