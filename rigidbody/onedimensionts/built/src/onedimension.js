"use strict";
function main() {
    console.log(env.getCurrentFuncName());
    let gl = env.initWebGL2Context("#maincanvas");
    console.assert((gl != null), "WebGLContext not Found.");
    let btnrun = document.querySelector("#run");
    btnrun.addEventListener('click', () => { console.log(env.getCurrentFuncName()); });
    const program = renderer.createProgramFromSource(gl, shaders.vs, shaders.fs);
    console.assert((program != null), "Create Shader Failed.");
    /**
     * Get This Shader Program's Attributes and Uniforms
     */
    const u_local2clipspace = gl.getUniformLocation(program, "u_local2clipspace");
    const u_color = gl.getUniformLocation(program, "u_color");
    const u_texture = gl.getUniformLocation(program, "u_texture");
    console.log(`UniformLocal2ClipSpace: ${u_local2clipspace}`);
    console.log(`UniformColor: ${u_color}`);
    console.log(`UniformTexture: ${u_texture}`);
    const texture = textureUtils.makeDefaultCheckerTexture(gl);
    let instances = [];
    let actor = new Actor2D();
    actor.scale = 200;
    actor.angle = 0;
    actor.location = [500, 500];
    actor.color = [Math.random(), Math.random(), Math.random(), 1];
    instances.push(actor);
    console.log(actor);
    console.log(typeof actor);
    console.log(instances);
    console.log(typeof instances);
    const geometry = geometry2D.makeRectangle(gl, program);
    requestAnimationFrame(drawScene);
    let start = null;
    function drawScene(now) {
        if (!start) {
            start = now;
            requestAnimationFrame(drawScene);
            return;
        }
        let dt = now - start;
        if (dt < 20) { // 20ms
            requestAnimationFrame(drawScene);
            return;
        }
        start = now;
        env.adjustDrawingBufferForHDDPI(gl);
        const mat_projection = matrix33.projection(gl.canvas.width, gl.canvas.height);
        /**
         * Clear the Viewport
         */
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clearColor(0.9, 0.9, 0.8, 1);
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
        instances.forEach((actor) => {
            actor.update(dt);
            gl.uniformMatrix3fv(u_local2clipspace, false, matrix33.multiply(actor.worldMatrix, mat_projection));
            gl.uniform4fv(u_color, actor.color);
            gl.drawElements(gl.TRIANGLES, geometry.numElements, gl.UNSIGNED_SHORT, 0);
        });
        // Draw Geometry
        // instances.forEach((item) => {
        //     gl.uniformMatrix3fv(u_local2clipspace, false, item.matrix);
        //     gl.uniform4fv(u_color, item.color);
        //     gl.drawElements(gl.TRIANGLES, geometry.numElements, gl.UNSIGNED_SHORT, 0);
        // });
        requestAnimationFrame(drawScene);
    }
}
main();
//# sourceMappingURL=onedimension.js.map