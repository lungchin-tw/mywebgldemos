'use strict';

import * as CoreEnv from './core/env.js'
import * as CoreMath from './core/math.js'
import * as CoreMatrix from './core/matrix.js'
import * as Renderer from './core/renderer.js'
import * as Shaders from './shaders.js'
import * as Geometry from './geometry.js'



function main() {
    console.log(CoreEnv.getCurrentFuncName())
    
    let gl = CoreEnv.initWebGL2Context("#maincanvas")
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

    // const matWorld2screen = CoreMatrix.matrix44.orthographic(0, gl.canvas.width, gl.canvas.height, 0, 1000, -10000 );
    let fieldOfView = 90;
    let apectRatio = (gl.canvas.clientWidth / gl.canvas.clientHeight);
    let zNear = 1;
    let zFar = 10000;
    let matWorld2screen = CoreMatrix.matrix44.perspective(CoreMath.degree2Radian(fieldOfView), apectRatio, zNear, zFar );
    
    const NUM_INSTANCES = 3;
    let instances = [];
    let yAngle = 45;
    for (let i = 1; i <= NUM_INSTANCES; i++) {
        let obj = {
            scale: 30,
            angle: [0, yAngle, 0],
            location: [-100, 0, -(i * 200)],
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

    
    webglLessonsUI.setupSlider("#fov", {value: fieldOfView, slide: updateFov, min: 60, max: 120});
    webglLessonsUI.setupSlider("#xangle", {value: 0, slide: (event, ui) => {updateAngel(0, ui.value);}, max: 360});
    webglLessonsUI.setupSlider("#yangle", {value: yAngle, slide: (event, ui) => {updateAngel(1, ui.value);}, max: 360});
    webglLessonsUI.setupSlider("#zangle", {value: 0, slide: (event, ui) => {updateAngel(2, ui.value);}, max: 360});
    
    function updateFov(event, ui) {
        fieldOfView = ui.value;
        matWorld2screen = CoreMatrix.matrix44.perspective(CoreMath.degree2Radian(fieldOfView), apectRatio, zNear, zFar );
        isDirty = true;
    }

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

