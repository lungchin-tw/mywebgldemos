'use strict';

import * as CoreEnv from './core/env.js'

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

/**
 * 
 * @param {WebGL2RenderingContext} gl 
 * @param {int} size Cube Size
 * @description Apply Right-Hand Rule -> Right: X-Axis, Up: Y-Axis, OutScreen: Z-Axis
 */
export function makeParallelogram(gl, program) {
    console.log(CoreEnv.getCurrentFuncName());

    const a_position = gl.getAttribLocation(program, "a_position");
    const a_texcoord = gl.getAttribLocation(program, "a_texcoord");

    console.log(`AttrPos: ${a_position}`);
    console.log(`AttrTexcoord: ${a_texcoord}`);

    const vertices = new Float32Array([
        -5,  2, // 0
         2,  2, // 1
        -2, -2, // 2
         5, -2, // 3
    ]);

    const texcoords = new Float32Array([
        0, 1,
        1, 1,
        0, 0,
        1, 0,
    ]);

    const vertindices = new Uint16Array([
        0, 1, 2,
        2, 1, 3,
    ]);

    let geometry = {};
    geometry.vertexArray = gl.createVertexArray();
    gl.bindVertexArray(geometry.vertexArray);

    geometry.vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, geometry.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(a_position);
    gl.vertexAttribPointer(
        a_position,
        2, // size
        gl.FLOAT, // type
        false, // normalize
        0, // stride
        0 // offset
    );

    geometry.texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, geometry.texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, texcoords, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(a_texcoord);
    gl.vertexAttribPointer(
        a_texcoord,
        2, // size
        gl.FLOAT, // type
        false, // normalize
        0, // stride
        0 // offset
    );

    geometry.indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, geometry.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, vertindices, gl.STATIC_DRAW);   

    return geometry;
}

/**
 * 
 * @param {WebGL2RenderingContext} gl 
 * @param {int} size Cube Size
 * @description Apply Right-Hand Rule -> Right: X-Axis, Up: Y-Axis, OutScreen: Z-Axis
 */
export function makeCube(gl, size) {
    const vertices = new Float32Array([
        0.5,  0.5,  0.5, // #0 Face +X-Axis
        0.5, -0.5,  0.5, // #1 Face +X-Axis
        0.5, -0.5, -0.5, // #2 Face +X-Axis
        0.5,  0.5, -0.5, // #3 Face +X-Axis

        -0.5,  0.5, 0.5, // #4 Face +Z-Axis
        -0.5, -0.5, 0.5, // #5 Face +Z-Axis
         0.5, -0.5, 0.5, // #6 Face +Z-Axis
         0.5,  0.5, 0.5, // #7 Face +Z-Axis

        -0.5, 0.5, -0.5, // #8  Face +Y-Axis
        -0.5, 0.5,  0.5, // #9  Face +Y-Axis
         0.5, 0.5,  0.5, // #10 Face +Y-Axis
         0.5, 0.5, -0.5, // #11 Face +Y-Axis

        -0.5,  0.5, -0.5, // #12 Face -X-Axis
        -0.5, -0.5, -0.5, // #13 Face -X-Axis
        -0.5, -0.5,  0.5, // #14 Face -X-Axis
        -0.5,  0.5,  0.5, // #15 Face -X-Axis

         0.5,  0.5, -0.5, // #16 Face -Z-Axis
         0.5, -0.5, -0.5, // #17 Face -Z-Axis
        -0.5, -0.5, -0.5, // #18 Face -Z-Axis
        -0.5,  0.5, -0.5, // #19 Face -Z-Axis

         0.5, -0.5, -0.5, // #20 Face -Y-Axis
         0.5, -0.5,  0.5, // #21 Face -Y-Axis
        -0.5, -0.5,  0.5, // #22 Face -Y-Axis
        -0.5, -0.5, -0.5, // #23 Face -Y-Axis
    ]);

    let vert_indices = new Uint16Array([
        0, 1, 2, // Face +X-Axis
        2, 3, 0, // Face +X-Axis

        4, 5, 6, // Face +Z-Axis
        6, 7, 4, // Face +Z-Axis

        8, 9, 10, // Face +Y-Axis
        10, 11, 8, // Face +Y-Axis

        12, 13, 14, // Face -X-Axis
        14, 15, 12, // Face -X-Axis

        16, 17, 18, // Face -Z-Axis
        18, 19, 16, // Face -Z-Axis

        20, 21, 22, // Face -Y-Axis
        22, 23, 20, // Face -Y-Axis
    ]);

    let vertclrs = new Uint8Array([
        255, 0, 0, // Face +X-Axis
        255, 0, 0, // Face +X-Axis
        255, 0, 0, // Face +X-Axis
        255, 0, 0, // Face +X-Axis

        0, 0, 255, // Face +Z-Axis
        0, 0, 255, // Face +Z-Axis
        0, 0, 255, // Face +Z-Axis
        0, 0, 255, // Face +Z-Axis

        0, 255, 0, // Face +Y-Axis
        0, 255, 0, // Face +Y-Axis
        0, 255, 0, // Face +Y-Axis
        0, 255, 0, // Face +Y-Axis

        255, 0, 0, // Face -X-Axis
        255, 0, 0, // Face -X-Axis
        255, 0, 0, // Face -X-Axis
        255, 0, 0, // Face -X-Axis

        0, 0, 255, // Face -Z-Axis
        0, 0, 255, // Face -Z-Axis
        0, 0, 255, // Face -Z-Axis
        0, 0, 255, // Face -Z-Axis

        0, 255, 0, // Face -Y-Axis
        0, 255, 0, // Face -Y-Axis
        0, 255, 0, // Face -Y-Axis
        0, 255, 0, // Face -Y-Axis
    ]);

    // let tex_coords = [];

    let geometry = {};
    geometry.verticesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, geometry.verticesBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    geometry.vertClrBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, geometry.vertClrBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertclrs, gl.STATIC_DRAW);

    geometry.vertIndices = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, geometry.vertIndices);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, vert_indices, gl.STATIC_DRAW);   
    
    return geometry;
}