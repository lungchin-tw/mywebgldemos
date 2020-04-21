'use strict';

// Traditional Coordinate: Left-Top is (0,0)
export const PARALLELOGRAM_POS = new Float32Array([
    0, 4,
    7, 4,
    3, 0,
    3, 0,
    7, 4,
    10, 0,
]);

export const PARALLELOGRAM_TEXCOORD = new Float32Array([
    0, 1,
    1, 1,
    0, 0,
    0, 0,
    1, 1,
    1, 0,
]);

export const clipspace = [
    0, 0,
    0, 0.5,
    0.7, 0,
];