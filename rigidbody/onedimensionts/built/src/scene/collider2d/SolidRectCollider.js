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
var _localBound, _localCorners, _scale, _angle, _location, _worldMatrix, _isDirty;
class SolidRectCollider {
    constructor() {
        _localBound.set(this, void 0);
        _localCorners.set(this, void 0); // [left-top, left-bottom, right-bottom, right-top]
        _scale.set(this, 1);
        _angle.set(this, 0);
        _location.set(this, new Vector2());
        _worldMatrix.set(this, matrix33.identity());
        _isDirty.set(this, true);
    }
    // constructor(localbound?:Vector4) {
    //     this.localBound = (localbound != undefined) ? localbound : new Vector4();
    // }
    // set localBound(value:Vector4) {
    //     this.#localBound = value;
    //     this.UpdateLocalCorners();
    // }
    set scale(value) {
        __classPrivateFieldSet(this, _scale, value);
        __classPrivateFieldSet(this, _isDirty, true);
    }
    set location(value) {
        __classPrivateFieldSet(this, _location, value);
        __classPrivateFieldSet(this, _isDirty, true);
    }
    Detect(other) {
        return false;
    }
    Update() {
        if (__classPrivateFieldGet(this, _isDirty) == false) {
            return;
        }
        this.UpdateWorldMatrix();
        this.UpdateWorldBound();
    }
    UpdateWorldMatrix() {
        __classPrivateFieldSet(this, _worldMatrix, matrix33.local2World(__classPrivateFieldGet(this, _scale), __classPrivateFieldGet(this, _angle), __classPrivateFieldGet(this, _location).xy));
    }
    UpdateWorldBound() {
    }
    UpdateLocalCorners() {
        __classPrivateFieldGet(this, _localCorners)[0] = new Vector2([__classPrivateFieldGet(this, _localBound).getX(), __classPrivateFieldGet(this, _localBound).getY()]);
    }
}
_localBound = new WeakMap(), _localCorners = new WeakMap(), _scale = new WeakMap(), _angle = new WeakMap(), _location = new WeakMap(), _worldMatrix = new WeakMap(), _isDirty = new WeakMap();
//# sourceMappingURL=SolidRectCollider.js.map