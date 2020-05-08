"use strict";
function main() {
    console.log(env.getCurrentFuncName());
    let gl = env.initWebGL2Context("#maincanvas");
    console.assert((gl != null), "WebGLContext not Found.");
    let btnrun = document.querySelector("#run");
    btnrun.addEventListener('click', () => { toggleRunning(); });
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
    const location = new Vector2([500, 0]);
    const velocity = new Vector2([0, 100]);
    const acc = new Vector2([0, 9810]);
    let actor = new Actor2D();
    actor.scale = 200;
    actor.angle = 0;
    actor.location = location;
    actor.color = [Math.random(), Math.random(), Math.random(), 1];
    instances.push(actor);
    console.log(actor);
    console.log(typeof actor);
    console.log(instances);
    console.log(typeof instances);
    const geometry = geometry2D.makeRectangle(gl, program);
    requestAnimationFrame(drawScene);
    function toggleRunning() {
        instances.forEach((actor) => {
            actor.location = location;
            actor.velocity = velocity;
            actor.acceleration = acc;
        });
    }
    let start = null;
    function drawScene(now) {
        if (!start) {
            start = now;
            requestAnimationFrame(drawScene);
            return;
        }
        let dt = now - start;
        start = now;
        env.adjustDrawingBufferForHDDPI(gl);
        const bottom = gl.canvas.height;
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
            if (actor.location.getY() > bottom) {
                actor.location.setY(0);
                actor.velocity = Vector2.ZeroVector;
                actor.acceleration = Vector2.ZeroVector;
            }
            actor.update(dt);
            gl.uniformMatrix3fv(u_local2clipspace, false, matrix33.multiply(actor.worldMatrix, mat_projection));
            gl.uniform4fv(u_color, actor.color);
            gl.drawElements(gl.TRIANGLES, geometry.numElements, gl.UNSIGNED_SHORT, 0);
        });
        requestAnimationFrame(drawScene);
    }
}
main();
//# sourceMappingURL=onedimension.js.map