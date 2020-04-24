'use strict';

import * as CoreEnv from './core/env.js'
import * as CoreRand from './core/rand.js'
import * as CoreMatrix from './core/matrix.js'
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

    console.log(`OES_element_index_uint: ${gl.getExtension("OES_element_index_uint")}`);
    
    CoreEnv.adjustDrawingBufferForHDDPI(gl)

    console.log("After Adjust Drawing Buffer:");
    CoreEnv.printEnvProperties(canvasid)

    return gl
}

function loadImage(path, oncomplete) {
    console.log(CoreEnv.getCurrentFuncName() + " Begin...")

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
    const u_local2clipspace = gl.getUniformLocation(program, "u_local2clipspace");
    const u_color = gl.getUniformLocation(program, "u_color");
    const u_texture = gl.getUniformLocation(program, "u_texture");

    console.log(`AttrPos: ${attr_pos}`);
    console.log(`AttrTexcoord: ${attr_texcoord}`);
    console.log(`UniformLocal2ClipSpace: ${u_local2clipspace}`);
    console.log(`UniformColor: ${u_color}`);
    console.log(`UniformTexture: ${u_texture}`);

    const NUM_INSTANCES = 3;
    let scale_array = [];
    let loc_array = [];
    let color_array = [];
    let widthrange = [(gl.canvas.width * 0.1), (gl.canvas.width * 0.9)];
    let heightrange = [(gl.canvas.height * 0.1), (gl.canvas.height * 0.9)];

    for (let i = 0; i < NUM_INSTANCES; i++) {
        scale_array.push( 30 + CoreRand.randomInt(0, 100));
        loc_array.push([CoreRand.randomInt(widthrange[0], widthrange[1]), CoreRand.randomInt(heightrange[0], heightrange[1])]);
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

    let worldAngleRad = 0;
    let isDirty = true;

    requestAnimationFrame(drawScene);

    
    webglLessonsUI.setupSlider("#angle", {value: 0 * 180 / Math.PI | 0, slide: updateAngle, max: 360});
    function updateAngle(event, ui) {
        let degree = ui.value;
        worldAngleRad = degree * Math.PI / 180;
        isDirty = true;
    }
    
    function drawScene(now) {
        if ( isDirty == false ) {
            requestAnimationFrame(drawScene);
            return;
        }

        isDirty = true;

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
        
        /**
         * Bind Texture Sampler
         */
        let tex_unit = 0;
        gl.activeTexture(gl.TEXTURE0 + tex_unit);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1i(u_texture, tex_unit);

        // Draw Geometry
        for (let i = 0; i < NUM_INSTANCES; i++) {
            let s = CoreMatrix.matrix33.scaling(scale_array[i], scale_array[i]);
            let r = CoreMatrix.matrix33.rotation(worldAngleRad);
            let t = CoreMatrix.matrix33.translation(loc_array[i][0], loc_array[i][1]);
            let p = CoreMatrix.matrix33.projection(gl.canvas.width, gl.canvas.height);
            let matrix = CoreMatrix.matrix33.multiply(s, r);
            matrix = CoreMatrix.matrix33.multiply(matrix, t);
            matrix = CoreMatrix.matrix33.multiply(matrix, p);
            
            gl.uniformMatrix3fv(u_local2clipspace, false, matrix);
            gl.uniform4fv(u_color, color_array[i]);
            gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
        }

        let id = requestAnimationFrame(drawScene);
        // console.log(`requestAnimationFrame(drawScene):${id}`);
    }
    
    console.log("FINISHED...");
}

main();

