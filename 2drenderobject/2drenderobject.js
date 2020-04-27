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
    const u_local2clipspace = gl.getUniformLocation(program, "u_local2clipspace");
    const u_color = gl.getUniformLocation(program, "u_color");
    const u_texture = gl.getUniformLocation(program, "u_texture");

    console.log(`UniformLocal2ClipSpace: ${u_local2clipspace}`);
    console.log(`UniformColor: ${u_color}`);
    console.log(`UniformTexture: ${u_texture}`);

    const NUM_INSTANCES = 3;
    let instances = [];
    let widthrange = [(gl.canvas.width * 0.1), (gl.canvas.width * 0.9)];
    let heightrange = [(gl.canvas.height * 0.1), (gl.canvas.height * 0.9)];
    for (let i = 0; i < NUM_INSTANCES; i++) {
        let obj = {
            scale: (30 + CoreRand.randomInt(0, 100)),
            angle: 0,
            location: [CoreRand.randomInt(widthrange[0], widthrange[1]), CoreRand.randomInt(heightrange[0], heightrange[1])],
            color: [Math.random(), Math.random(), Math.random(), 1]
        };

        obj.matrix = CoreMatrix.matrix33.local2ClipSpace(obj.scale, obj.angle, obj.location, gl.canvas.width, gl.canvas.height);
        instances.push(obj);
    }

    
    /**
     * Make a parallelogram
     */
    console.log("Make a parallelogram");
    const geometry = Geometry.makeParallelogram(gl, program);
    
    let worldAngleRad = 0;
    let isDirty = true;

    requestAnimationFrame(drawScene);

    
    webglLessonsUI.setupSlider("#angle", {value: 0 * 180 / Math.PI | 0, slide: updateAngle, max: 360});
    function updateAngle(event, ui) {
        let degree = ui.value;
        let angle = degree * Math.PI / 180;
        instances.forEach((item) => {
            item.angle = angle;
            item.matrix = CoreMatrix.matrix33.local2ClipSpace(item.scale, item.angle, item.location, gl.canvas.width, gl.canvas.height);
        });

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
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        /**
         * Use this shader Program
         */
        gl.useProgram(program);
        gl.bindVertexArray(geometry.vertexArray);
        
        /**
         * Bind Texture Sampler
         */
        let tex_unit = 0;
        gl.activeTexture(gl.TEXTURE0 + tex_unit);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1i(u_texture, tex_unit);

        // Draw Geometry
        instances.forEach((item) => {
            gl.uniformMatrix3fv(u_local2clipspace, false, item.matrix);
            gl.uniform4fv(u_color, item.color);
            gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
        });
        
        let id = requestAnimationFrame(drawScene);
        // console.log(`requestAnimationFrame(drawScene):${id}`);
    }
    
    console.log("FINISHED...");
}

main();

