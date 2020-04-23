'use strict';

let matrix33 = {
    identity: function() {
        return [
            1, 0, 0,
            0, 1, 0,
            0, 0, 1,
        ];
    },

    scaling: function(sx, sy) {
        return [
            sx,  0, 0,
             0, sy, 0,
             0,  0, 1,
        ];
    },

    rotation: function(rad) {
        let c = Math.cos(rad);
        let s = Math.sin(rad);

        return [
             c, s, 0,
            -s, c, 0,
             0, 0, 1,
        ];
    },

    translation: function(tx, ty) {
        return [
             1,  0, 0,
             0,  1, 0,
            tx, ty, 1,
        ];
    },

    projection: function(width, height) {
        return [
            (2 / width),             0, 0,
            0,           -(2 / height), 0,
           -1,                       1, 1,
       ];
    },

    /**
     * 00 01 02
     * 10 11 12
     * 20 21 22
     */
    multiply: function(a, b) {
        return [
            (a[0] * b[0]) + (a[1] * b[3]) + (a[2] * b[6]), // 00
            (a[0] * b[1]) + (a[1] * b[4]) + (a[2] * b[7]), // 01
            (a[0] * b[2]) + (a[1] * b[5]) + (a[2] * b[8]), // 02
            (a[3] * b[0]) + (a[4] * b[3]) + (a[5] * b[6]), // 10
            (a[3] * b[1]) + (a[4] * b[4]) + (a[5] * b[7]), // 11
            (a[3] * b[2]) + (a[4] * b[5]) + (a[5] * b[8]), // 12
            (a[6] * b[0]) + (a[7] * b[3]) + (a[8] * b[6]), // 20
            (a[6] * b[1]) + (a[7] * b[4]) + (a[8] * b[7]), // 21
            (a[6] * b[2]) + (a[7] * b[5]) + (a[8] * b[8]), // 21
        ];
    }
};