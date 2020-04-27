'use strict';

export let matrix33 = {
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
            (2.0 / width),               0, 0,
                        0, -(2.0 / height), 0,
                       -1,               1, 1,
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
    },

    local2ClipSpace: function( scale, angle, location, sw, sh ) {
        let s = matrix33.scaling(scale, scale);
        let r = matrix33.rotation(angle);
        let t = matrix33.translation(location[0], location[1]);
        let p = matrix33.projection(sw, sh);
        let matrix = matrix33.multiply(s, r);
        matrix = matrix33.multiply(matrix, t);
        matrix = matrix33.multiply(matrix, p);
        return matrix;
    }
};


export let matrix44 = {
    identity: function() {
        return [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ];
    },

    scaling: function(sx, sy, sz) {
        return [
            sx,  0,  0, 0,
             0, sy,  0, 0,
             0,  0, sz, 0,
             0,  0,  0, 1,
        ];
    },

    xRotation: function(rad) {
        let c = Math.cos(rad);
        let s = Math.sin(rad);

        return [
            1,  0, 0, 0,
            0,  c, s, 0,
            0, -s, c, 0,
            0,  0, 0, 1,
        ];
    },

    yRotation: function(rad) {
        let c = Math.cos(rad);
        let s = Math.sin(rad);

        return [
            c, 0, -s, 0,
            0, 1,  0, 0,
            s, 0,  c, 0,
            0, 0,  0, 1,
        ];
    },

    zRotation: function(rad) {
        let c = Math.cos(rad);
        let s = Math.sin(rad);

        return [
             c, s, 0, 0,
            -s, c, 0, 0,
             0, 0, 1, 0,
             0, 0, 0, 1,
        ];
    },

    translation: function(tx, ty, tz) {
        return [
             1,  0,  0, 0,
             0,  1,  0, 0,
             0,  0,  1, 0,
            tx, ty, tz, 1,
        ];
    },

    orthographic: function(left, right, bottom, top, near, far) {
        return [
                     (2.0 / (right - left)),                               0,                           0, 0,
                                          0,          (2.0 / (top - bottom)),                           0, 0,
                                          0,                               0,        (2.0 / (near - far)), 0,
            (left + right) / (left - right), (bottom + top) / (bottom - top), (near + far) / (near - far), 1,
       ];
    },

    /**
     * 00 01 02 03
     * 10 11 12 13
     * 20 21 22 23
     * 30 31 32 33
     */
    multiply: function(a, b) {
        return [
            (a[0] * b[0]) + (a[1] * b[4]) + (a[2] * b[8]) + (a[3] * b[12]),    // 00
            (a[0] * b[1]) + (a[1] * b[5]) + (a[2] * b[9]) + (a[3] * b[13]),    // 01
            (a[0] * b[2]) + (a[1] * b[6]) + (a[2] * b[10]) + (a[3] * b[14]),   // 02
            (a[0] * b[3]) + (a[1] * b[7]) + (a[2] * b[11]) + (a[3] * b[15]),   // 03
            (a[4] * b[0]) + (a[5] * b[4]) + (a[6] * b[8]) + (a[7] * b[12]),    // 10
            (a[4] * b[1]) + (a[5] * b[5]) + (a[6] * b[9]) + (a[7] * b[13]),    // 11
            (a[4] * b[2]) + (a[5] * b[6]) + (a[6] * b[10]) + (a[7] * b[14]),   // 12
            (a[4] * b[3]) + (a[5] * b[7]) + (a[6] * b[11]) + (a[7] * b[15]),   // 13
            (a[8] * b[0]) + (a[9] * b[4]) + (a[10] * b[8]) + (a[11] * b[12]),  // 20
            (a[8] * b[1]) + (a[9] * b[5]) + (a[10] * b[9]) + (a[11] * b[13]),  // 21
            (a[8] * b[2]) + (a[9] * b[6]) + (a[10] * b[10]) + (a[11] * b[14]), // 22
            (a[8] * b[3]) + (a[9] * b[7]) + (a[10] * b[11]) + (a[11] * b[15]), // 23
            (a[12] * b[0]) + (a[13] * b[4]) + (a[14] * b[8]) + (a[15] * b[12]), // 30
            (a[12] * b[1]) + (a[13] * b[5]) + (a[14] * b[9]) + (a[15] * b[13]), // 31
            (a[12] * b[2]) + (a[13] * b[6]) + (a[14] * b[10]) + (a[15] * b[14]), // 32
            (a[12] * b[3]) + (a[13] * b[7]) + (a[14] * b[11]) + (a[15] * b[15]), // 33
        ];
    },
    
    local2World: function( scale, angle, location) {
        let s = matrix44.scaling(scale, scale, scale);
        let rx = matrix44.xRotation(angle[0]);
        let ry = matrix44.yRotation(angle[1]);
        let rz = matrix44.zRotation(angle[2]);
        let t = matrix44.translation(location[0], location[1], location[2]);
        let matrix = matrix44.multiply(s, rx);
        matrix = matrix44.multiply(matrix, ry);
        matrix = matrix44.multiply(matrix, rz);
        matrix = matrix44.multiply(matrix, t);
        return matrix;
    }
};