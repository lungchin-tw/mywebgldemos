

function main() {
    console.log(env.getCurrentFuncName());
    let gl:WebGL2RenderingContext = env.initWebGL2Context("#maincanvas");
    console.assert( (gl != null), "WebGLContext not Found." );

    let btnrun:Element = document.querySelector("#run");
    btnrun.addEventListener('click', ()=>{console.log(env.getCurrentFuncName());});

    const program = renderer.createProgramFromSource(gl, shaders.vs, shaders.fs);
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

    const texture = textureUtils.makeDefaultCheckerTexture(gl);

    // let instances = [];

    let obj = {
        scale: 200,
        angle: 0,
        location: [500, 500],
        color: [Math.random(), Math.random(), Math.random(), 1],
        matrix:matrix33.identity(),
    };

    obj.matrix = matrix33.local2ClipSpace(obj.scale, obj.angle, obj.location, gl.canvas.width, gl.canvas.height);

    // instances.push(obj);
    console.log(obj);
    console.log(typeof obj);
    // console.log(instances);
    // console.log(typeof instances);

    const geometry = geometry2D.makeRectangle(gl,program);
    
    requestAnimationFrame(drawScene);

    let start: number = null;
    function drawScene(now:number) {
        if (!start) {
            start = now;
            requestAnimationFrame(drawScene);
            return;
        } else if ((now - start) > 20) { // 20ms
            start = now;
        } else {
            requestAnimationFrame(drawScene);
            return;
        }

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

        gl.uniformMatrix3fv(u_local2clipspace, false, obj.matrix);
        gl.uniform4fv(u_color, obj.color);
        gl.drawElements(gl.TRIANGLES, geometry.numElements, gl.UNSIGNED_SHORT, 0);

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