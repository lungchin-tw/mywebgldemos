'use strict';

// Traditional Coordinate: Left-Top is (0,0)
export const PARALLELOGRAM_POS = new Float32Array([
    0, 4, // 0
    7, 4, // 1
    3, 0, // 2
    10, 0, // 3
]);

export const PARALLELOGRAM_TEXCOORD = new Float32Array([
    0, 1,
    1, 1,
    0, 0,
    1, 0,
]);

export const PARALLELOGRAM_INDICES = new Uint16Array([
    0, 1, 2,
    2, 1, 3,
]);
