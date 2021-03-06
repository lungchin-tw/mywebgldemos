'use strict';

import * as CoreEnv from './core/env.js'
import * as CoreMath from './core/math.js'
import * as ImageLoader from './core/imageloader.js'
import * as Renderer from './core/renderer.js'
import * as Shaders from './shaders.js'
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

function loadImage(path, oncomplete) {
    console.log(CoreEnv.getCurrentFuncName() + " Begin...")
    console.log(`WindowOrign: ${window.location.origin}`);

    let image = new Image();
    image.src = path;
    image.addEventListener('load', function(){
        console.log(`${CoreEnv.getCurrentFuncName()}: Load ${this.src} Success.`);
        if (oncomplete) {
            oncomplete( this );
        }
    });

    console.log(CoreEnv.getCurrentFuncName() + " End...")
}


function main() {
    console.log(CoreEnv.getCurrentFuncName())
    
    let gl = init("#maincanvas")
    console.assert( (gl != null), "WebGLContext not Found." )

    /**
     * Create a Texture
     */
    let texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, ImageLoader.NON_IMAGE); // Set Default Image

    loadImage( "../image/earthmap.jpeg", function(image){
        console.log(`${CoreEnv.getCurrentFuncName()}: Load ${image.src} Success.`);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.generateMipmap(gl.TEXTURE_2D);
    });

    /**
     * Create Shaders
     */
    const program = Renderer.createProgramFromSource(gl, Shaders.vs, Shaders.fs);
    console.assert( (program != null), "Create Shader Failed." )

    /**
     * Get This Shader Program's Attributes and Uniforms
     */
    const attr_pos = gl.getAttribLocation(program, "a_position");
    const attr_texcoord = gl.getAttribLocation(program, "a_texcoord");
    const u_scale = gl.getUniformLocation(program, "u_scale");
    const u_location = gl.getUniformLocation(program, "u_location");
    const u_resolution = gl.getUniformLocation(program, "u_resolution");
    const u_color = gl.getUniformLocation(program, "u_color");
    const u_texture = gl.getUniformLocation(program, "u_texture");

    console.log(`AttrPos: ${attr_pos}`);
    console.log(`AttrTexcoord: ${attr_texcoord}`);
    console.log(`UniformScale: ${u_scale}`);
    console.log(`UniformLocation: ${u_location}`);
    console.log(`UniformResolution: ${u_resolution}`);
    console.log(`UniformColor: ${u_color}`);
    console.log(`UniformTexture: ${u_texture}`);

    const NUM_INSTANCES = 3;
    let scale_array = [];
    let loc_array = [];
    let color_array = [];

    for (let i = 0; i < NUM_INSTANCES; i++) {
        scale_array.push( 30 + CoreMath.randomInt(100));
        loc_array.push([CoreMath.randomInt(gl.canvas.width * 0.6 ), CoreMath.randomInt(gl.canvas.height * 0.6)]);
        color_array.push([Math.random(), Math.random(), Math.random(), 1]);
    }
    
    /**
     * Setup Geometry Data
     */
    console.log("Setup Geometry Data");
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    /**
     * Setup Geometry Position Buffer
     */
    console.log("Setup Geometry Position Buffer");
    const attr_pos_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, attr_pos_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, Geometry.PARALLELOGRAM_POS, gl.STATIC_DRAW)
    gl.enableVertexAttribArray(attr_pos);
    gl.vertexAttribPointer(
        attr_pos,
        2, // size
        gl.FLOAT, // type
        false, // normalize
        0, // stride
        0 // offset
    );

    /**
     * Setup Texture Coords Buffer
     */
    console.log("Setup Texture Coords Buffer");
    const attr_tex_coord_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, attr_tex_coord_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, Geometry.PARALLELOGRAM_TEXCOORD, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(attr_texcoord);
    gl.vertexAttribPointer(
        attr_texcoord,
        2, // size
        gl.FLOAT, // type
        false, // normalize
        0, // stride
        0 // offset
    );

    /**
     * Setup Vertex Indices Buffer
     */
    console.log("Setup Vertex Indices Buffer");
    const index_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, Geometry.PARALLELOGRAM_INDICES, gl.STATIC_DRAW);

    let start = null;
    const FRAME_INTERVAL = 1000 / 5;
    requestAnimationFrame(render);
    
    function render(now) {
        if ((start != null) && ((now - start) < FRAME_INTERVAL)) {
            requestAnimationFrame(render);
            return;
        }

        // console.log(`${CoreEnv.getCurrentFuncName()}, Delta:${now - start}`);

        if ( start == null ) {
            start = now;
        }

        start = now;

        /**
         * Clear the Viewport
         */
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clearColor(0.9,0.9,0.8,1);
        gl.clear(gl.COLOR_BUFFER_BIT);

        /**
         * Use this shader Program
         */
        gl.useProgram(program);
        gl.bindVertexArray(vao);

        // Setup the Resolution Uniform
        gl.uniform2f(u_resolution, gl.canvas.width, gl.canvas.height)

        /**
         * Bind Texture Sampler
         */
        let tex_unit = 0;
        gl.activeTexture(gl.TEXTURE0 + tex_unit);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1i(u_texture, tex_unit);

        // Draw Geometry
        for (let i = 0; i < NUM_INSTANCES; i++) {
            gl.uniform1f(u_scale, scale_array[i]);
            gl.uniform2fv(u_location, loc_array[i]);
            gl.uniform4fv(u_color, color_array[i]);
            gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
        }

        requestAnimationFrame(render);
    }
    
    console.log("FINISHED...");
}

main();

