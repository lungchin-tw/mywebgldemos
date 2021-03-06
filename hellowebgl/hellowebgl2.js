'use strict';

import * as CoreEnv from './core/env.js'
import * as Shaders from './shaders.js'
import * as Renderer from './core/renderer.js'

const CANVASID = "#hellowebgl2"

function main() {
    console.log(CoreEnv.getCurrentFuncName())

    console.log("Before Adjust Drawing Buffer:");
    CoreEnv.printEnvProperties(CANVASID)
    
    /**
     * Approach: All In One
     */
    // var canvas = document.querySelector(CANVASID); // OR: document.getElementById("hellowebgl2"); 
    // var context = canvas.getContext('webgl2');

    let gl = CoreEnv.getWebGL2Context(CANVASID);
    if (!gl) {
        console.log("WebGL2 was NOT found.");
        return
    } else {
        console.log("WebGL2 was found.");
    }

    // CoreEnv.adjustDrawingBuffer(gl)
    CoreEnv.adjustDrawingBufferForHDDPI(gl)

    console.log("After Adjust Drawing Buffer:");
    CoreEnv.printEnvProperties(CANVASID)

    /**
     * Create Shaders
     */
    let vs = Renderer.createShader(gl, gl.VERTEX_SHADER, Shaders.vs);
    let fs = Renderer.createShader(gl, gl.FRAGMENT_SHADER, Shaders.fs);
    let program = Renderer.createProgram(gl, vs, fs);

    /**
     * Setup a triangle data in clip space
     */
    let attr_pos = gl.getAttribLocation(program, "a_position");
    let attr_pos_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, attr_pos_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 0, 0.5, 0.7, 0]), gl.STATIC_DRAW)

    let vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    gl.enableVertexAttribArray(attr_pos);

    let size = 2;
    let type = gl.FLOAT;
    let normalize = false;
    let stride = 0;
    let offset = 0;
    gl.vertexAttribPointer(attr_pos, size, type, normalize, stride, offset)
    
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0.9,0.9,0.8,1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.bindVertexArray(vao);

    gl.drawArrays(gl.TRIANGLES, 0, 3)
}

main();

