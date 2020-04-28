'use strict';

import * as CoreEnv from './core/env.js'
import * as CoreMath from './core/math.js'
import * as CoreRand from './core/rand.js'
import * as CoreMatrix from './core/matrix.js'
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

function main() {
    console.log(CoreEnv.getCurrentFuncName())
    
    let gl = init("#maincanvas")
    console.assert( (gl != null), "WebGLContext not Found." )
    
    /**
     * Create Shaders
     */
    const program = Renderer.createProgramFromSource(gl, Shaders.vs, Shaders.fs);
    console.assert( (program != null), "Create Shader Failed." )

    /**
     * Get This Shader Program's Attributes and Uniforms
     */
    const u_local2clipspace = gl.getUniformLocation(program, "u_local2clipspace");
    console.log(`UniformLocal2ClipSpace: ${u_local2clipspace}`);

    const matWorld2screen = CoreMatrix.matrix44.orthographic(0, gl.canvas.width, gl.canvas.height, 0, 1000, -10000 );
    
    const NUM_INSTANCES = 3;
    let instances = [];
    // let widthrange = [(gl.canvas.width * 0.1), (gl.canvas.width * 0.9)];
    // let heightrange = [(gl.canvas.height * 0.1), (gl.canvas.height * 0.9)];
    for (let i = 0; i < NUM_INSTANCES; i++) {
        let obj = {
            scale: 200,
            angle: [0, 60, 180],
            location: [500 + (i * 200), 1100, (i * 200)],
            // scale: (100 + CoreRand.randomInt(0, 400)),
            // angle: [CoreRand.randomInt(0, 360), CoreRand.randomInt(0, 360), CoreRand.randomInt(0, 360)],
            // location: [CoreRand.randomInt(widthrange[0], widthrange[1]), CoreRand.randomInt(heightrange[0], heightrange[1]), 0],
        };

        instances.push(obj);
    }

    
    /**
     * Make a Geometry
     */
    // const geometry = Geometry.makeCube(gl, program);
    const geometry = Geometry.makeTree(gl, program);
    
    let isDirty = true;

    requestAnimationFrame(drawScene);

    
    webglLessonsUI.setupSlider("#xangle", {value: 0 * 180 / Math.PI | 0, slide: (event, ui) => {updateAngel(0, ui.value);}, max: 360});
    webglLessonsUI.setupSlider("#yangle", {value: 0 * 180 / Math.PI | 0, slide: (event, ui) => {updateAngel(1, ui.value);}, max: 360});
    webglLessonsUI.setupSlider("#zangle", {value: 0 * 180 / Math.PI | 0, slide: (event, ui) => {updateAngel(2, ui.value);}, max: 360});
    
    function updateAngel(index, angle) {
        instances.forEach((item) => {
            item.angle[index] = angle;
        });

        isDirty = true;
    }

    function drawScene(now) {
        if ( isDirty == false ) {
            requestAnimationFrame(drawScene);
            return;
        } else {
            instances.forEach((item) => {
                let radians = [CoreMath.degree2Radian(item.angle[0]), CoreMath.degree2Radian(item.angle[1]), CoreMath.degree2Radian(item.angle[2])];
                let matrix = CoreMatrix.matrix44.local2World(item.scale, radians, item.location);
                item.matrix = CoreMatrix.matrix44.multiply(matrix, matWorld2screen);
            });
        }

        isDirty = true;

        /**
         * Clear the Viewport
         */
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clearColor(0.9,0.9,0.8,1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.enable(gl.DEPTH_TEST);
        // gl.enable(gl.CULL_FACE);

        /**
         * Use this shader Program
         */
        gl.useProgram(program);
        gl.bindVertexArray(geometry.vertexArray);
        
        // Draw Geometry
        instances.forEach((item) => {
            gl.uniformMatrix4fv(u_local2clipspace, false, item.matrix);
            gl.drawElements(gl.TRIANGLES, geometry.numElements, gl.UNSIGNED_SHORT, 0);
        });
        
        let id = requestAnimationFrame(drawScene);
        // console.log(`requestAnimationFrame(drawScene):${id}`);
    }
    
    console.log("FINISHED...");
}

main();

