"use strict";
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return factory.call(root);
        });
    }
    else {
        root.matrix33 = factory.call(root);
    }
}(this, function () {
    'use strict';
    function identity() {
        return [
            1, 0, 0,
            0, 1, 0,
            0, 0, 1,
        ];
    }
    function scaling(sx, sy) {
        return [
            sx, 0, 0,
            0, sy, 0,
            0, 0, 1,
        ];
    }
    function rotation(rad) {
        let c = Math.cos(rad);
        let s = Math.sin(rad);
        return [
            c, s, 0,
            -s, c, 0,
            0, 0, 1,
        ];
    }
    function translation(tx, ty) {
        return [
            1, 0, 0,
            0, 1, 0,
            tx, ty, 1,
        ];
    }
    function projection(width, height) {
        return [
            (2.0 / width), 0, 0,
            0, -(2.0 / height), 0,
            -1, 1, 1,
        ];
    }
    /**
     * 00 01 02
     * 10 11 12
     * 20 21 22
     */
    function multiply(a, b) {
        return [
            (a[0] * b[0]) + (a[1] * b[3]) + (a[2] * b[6]),
            (a[0] * b[1]) + (a[1] * b[4]) + (a[2] * b[7]),
            (a[0] * b[2]) + (a[1] * b[5]) + (a[2] * b[8]),
            (a[3] * b[0]) + (a[4] * b[3]) + (a[5] * b[6]),
            (a[3] * b[1]) + (a[4] * b[4]) + (a[5] * b[7]),
            (a[3] * b[2]) + (a[4] * b[5]) + (a[5] * b[8]),
            (a[6] * b[0]) + (a[7] * b[3]) + (a[8] * b[6]),
            (a[6] * b[1]) + (a[7] * b[4]) + (a[8] * b[7]),
            (a[6] * b[2]) + (a[7] * b[5]) + (a[8] * b[8]),
        ];
    }
    function local2ClipSpace(scale, angle, location, sw, sh) {
        let s = matrix33.scaling(scale, scale);
        let r = matrix33.rotation(angle);
        let t = matrix33.translation(location[0], location[1]);
        let p = matrix33.projection(sw, sh);
        let matrix = matrix33.multiply(s, r);
        matrix = matrix33.multiply(matrix, t);
        matrix = matrix33.multiply(matrix, p);
        return matrix;
    }
    return {
        identity: identity,
        scaling: scaling,
        rotation: rotation,
        translation: translation,
        projection: projection,
        multiply: multiply,
        local2ClipSpace: local2ClipSpace,
    };
}));
//# sourceMappingURL=matrix33.js.map