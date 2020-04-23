'use strict';

// Traditional Coordinate: Left-Top is (0,0)

// Local Coord, Center=(0,0)
export const PARALLELOGRAM_POS = new Float32Array([
    -5, 2, // 0
    2, 2, // 1
    -2, -2, // 2
    5, -2, // 3
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
