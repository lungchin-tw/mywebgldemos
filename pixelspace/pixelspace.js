'use strict';

import * as CoreEnv from './core/env.js'
import * as Shaders from './shaders.js'
import * as Renderer from './core/renderer.js'
import * as Geometry from './geometry.js'

const CANVASID = "#pixelspace"

function main() {
    console.log(CoreEnv.getCurrentFuncName())

    console.log("Before Adjust Drawing Buffer:");
    CoreEnv.printEnvProperties(CANVASID)
    
    /**
     * Approach: All In One
     */
    let gl = CoreEnv.getWebGL2Context(CANVASID);
    if (!gl) {
        console.log("WebGL2 was NOT found.");
        return
    } else {
        console.log("WebGL2 was found.");
    }
    
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
     * Setup Geometry Data
     */
    let attr_pos = gl.getAttribLocation(program, "a_position");
    let attr_pos_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, attr_pos_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(Geometry.pixelspace), gl.STATIC_DRAW)

    let vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    gl.enableVertexAttribArray(attr_pos);

    let size = 2;
    let type = gl.FLOAT;
    let normalize = false;
    let stride = 0;
    let offset = 0;
    gl.vertexAttribPointer(attr_pos, size, type, normalize, stride, offset)

    /**
     * Get the Resolution Uniform
     */
    let u_scale = gl.getUniformLocation(program, "u_scale");
    let u_location = gl.getUniformLocation(program, "u_location");
    let u_resolution = gl.getUniformLocation(program, "u_resolution");
    
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0.9,0.9,0.8,1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);

    gl.bindVertexArray(vao);

    // Setup the Resolution Uniform
    gl.uniform1f(u_scale, 3)
    gl.uniform2f(u_location, 250, 250)
    gl.uniform2f(u_resolution, gl.canvas.width, gl.canvas.height)

    gl.drawArrays(gl.TRIANGLES, 0, 6)
}

main();

