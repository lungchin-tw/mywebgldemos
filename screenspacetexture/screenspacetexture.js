'use strict';

import * as CoreEnv from './core/env.js'
import * as CoreMath from './core/math.js'
import * as Shaders from './shaders.js'
import * as Renderer from './core/renderer.js'
import * as Geometry from './geometry.js'


function init( canvasid ) {
    console.log("Before Adjust Drawing Buffer:");
    CoreEnv.printEnvProperties(canvasid)

    /**
     * Approach: All In One
     */
    let gl = CoreEnv.getWebGL2Context(canvasid);
    if (!gl) {
        console.log("WebGL2 was NOT found.");
        return
    } else {
        console.log("WebGL2 was found.");
    }
    
    CoreEnv.adjustDrawingBufferForHDDPI(gl)

    console.log("After Adjust Drawing Buffer:");
    CoreEnv.printEnvProperties(canvasid)

    return gl
}

function loadImage() {
    let image = new Image();
    image.src = "../img/earthmap.jpeg";
    image.addEventListener('load', function(){
        console.log("Load Earthmap Success.");
    });

}

function main() {
    console.log(CoreEnv.getCurrentFuncName())
    
    let gl = init("#maincanvas")

    /**
     * Create Shaders
     */
    let program = Renderer.createProgramFromSource(gl, Shaders.vs, Shaders.fs);
    console.assert( (program != null), "Create Shader Failed." )

    loadImage();

    /**
     * Setup Geometry Data
     */
    let attr_pos = gl.getAttribLocation(program, "a_position");
    let attr_pos_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, attr_pos_buffer);

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
    let u_color = gl.getUniformLocation(program, "u_color");
    
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0.9,0.9,0.8,1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);

    gl.bindVertexArray(vao);

    // Setup the Resolution Uniform
    gl.uniform2f(u_resolution, gl.canvas.width, gl.canvas.height)

    for (let i = 0; i < 50; ++i ) {
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(Geometry.parallelogram), gl.STATIC_DRAW)
        gl.uniform1f(u_scale, (30 + CoreMath.randomInt(100)))
        gl.uniform2f(u_location, CoreMath.randomInt(gl.canvas.width * 0.7 ), CoreMath.randomInt(gl.canvas.height * 0.7) )
        gl.uniform4f(u_color, Math.random(), Math.random(), Math.random(), 1 )
        gl.drawArrays(gl.TRIANGLES, 0, 6)
    }
}

main();

