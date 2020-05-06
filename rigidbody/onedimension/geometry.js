'use strict';

// Traditional Coordinate: Left-Top is (0,0)

// Local Coord, Center=(0,0)

/**
 * 
 * @param {WebGL2RenderingContext} gl 
 * @param {WebGLProgram} program
 * @description Apply Right-Hand Rule -> Right: X-Axis, Up: Y-Axis, OutScreen: Z-Axis
 */
export function makeCube(gl, program) {
    console.log(env.getCurrentFuncName());

    const a_position = gl.getAttribLocation(program, "a_position");
    const a_color = gl.getAttribLocation(program, "a_color");

    console.log(`AttrPos: ${a_position}`);
    console.log(`AttrColor: ${a_color}`);

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

    

    // let tex_coords = [];

    let geometry = {};
    geometry.vertexArray = gl.createVertexArray();
    gl.bindVertexArray(geometry.vertexArray);

    geometry.verticesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, geometry.verticesBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(a_position);
    gl.vertexAttribPointer(
        a_position,
        3, // size
        gl.FLOAT, // type
        false, // normalize
        0, // stride
        0 // offset
    );

    geometry.vertClrBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, geometry.vertClrBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertclrs, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(a_color);
    gl.vertexAttribPointer(
        a_color,
        3, // size
        gl.UNSIGNED_BYTE, // type
        false, // normalize
        0, // stride
        0 // offset
    );

    geometry.vertIndices = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, geometry.vertIndices);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, vert_indices, gl.STATIC_DRAW);
    
    return geometry;
}


/**
 * 
 * @param {WebGL2RenderingContext} gl 
 * @param {WebGLProgram} program
 * @description Apply Right-Hand Rule -> Right: X-Axis, Up: Y-Axis, OutScreen: Z-Axis
 */
export function makeTree(gl, program) {
    console.log(env.getCurrentFuncName());

    const a_position = gl.getAttribLocation(program, "a_position");
    const a_color = gl.getAttribLocation(program, "a_color");

    console.log(`AttrPos: ${a_position}`);
    console.log(`AttrColor: ${a_color}`);

    const vertices = new Float32Array([
        -1.0,   0, 0, // #0 Leaf Face +Z-Axis
         1.0,   0, 0, // #1 Leaf Face +Z-Axis
           0, 2.0, 0, // #2 Leaf Face +Z-Axis

        -0.3,    0, 0, // #3 Trunk Face +Z-Axis
        -0.3, -1.0, 0, // #4 Trunk Face +Z-Axis
         0.3, -1.0, 0, // #5 Trunk Face +Z-Axis
         0.3,    0, 0, // #6 Trunk Face +Z-Axis

         0, 0,  1.0, // #7 Leaf Face +X-Axis
         0, 0, -1.0, // #8 Leaf Face +X-Axis
         0, 2.0,  0, // #9 Leaf Face +X-Axis

         0,    0,  0.3, // #10 Trunk Face +X-Axis
         0, -1.0,  0.3, // #11 Trunk Face +X-Axis
         0, -1.0, -0.3, // #12 Trunk Face +X-Axis
         0,    0, -0.3, // #13 Trunk Face +X-Axis

    ]);

    let vertclrs = new Uint8Array([
        255, 0, 0, // Leaf Face +Z-Axis
        255, 0, 0, // Leaf Face +Z-Axis
        255, 0, 0, // Leaf Face +Z-Axis

        255, 0, 128, // Trunk Face +Z-Axis
        255, 0, 128, // Trunk Face +Z-Axis
        255, 0, 128, // Trunk Face +Z-Axis
        255, 0, 128, // Trunk Face +Z-Axis

        0, 255, 0, // Leaf Face +X-Axis
        0, 255, 0, // Leaf Face +X-Axis
        0, 255, 0, // Leaf Face +X-Axis

        0, 255, 128, // Trunk Face +X-Axis
        0, 255, 128, // Trunk Face +X-Axis
        0, 255, 128, // Trunk Face +X-Axis
        0, 255, 128, // Trunk Face +X-Axis
    ]);

    let vert_indices = new Uint16Array([
        0, 1, 2, // Leaf Face +Z-Axis

        3, 4, 5, // Trunk Face +Z-Axis
        5, 6, 3, // Trunk Face +Z-Axis

        7, 8, 9, // Leaf Face +X-Axis

        10, 11, 12, // Trunk Face +X-Axis
        12, 13, 10, // Trunk Face +X-Axis
    ]);

    

    // let tex_coords = [];

    let geometry = {};
    geometry.vertexArray = gl.createVertexArray();
    gl.bindVertexArray(geometry.vertexArray);

    geometry.verticesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, geometry.verticesBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(a_position);
    gl.vertexAttribPointer(
        a_position,
        3, // size
        gl.FLOAT, // type
        false, // normalize
        0, // stride
        0 // offset
    );

    geometry.vertClrBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, geometry.vertClrBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertclrs, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(a_color);
    gl.vertexAttribPointer(
        a_color,
        3, // size
        gl.UNSIGNED_BYTE, // type
        false, // normalize
        0, // stride
        0 // offset
    );

    geometry.vertIndices = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, geometry.vertIndices);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, vert_indices, gl.STATIC_DRAW);

    // console.log(${})

    geometry.numElements = vert_indices.length;
    
    return geometry;
}