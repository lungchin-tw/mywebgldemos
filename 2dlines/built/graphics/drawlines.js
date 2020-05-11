"use strict";
class Line2DRenderer {
    static drawArrays(gl, data, mat_projection, clr) {
        const program = Line2DRenderer.getProgram(gl);
        gl.useProgram(program);
        const buffer = Line2DRenderer.getBuffer(gl);
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
        gl.enableVertexAttribArray(Line2DRenderer.A_POSISTION);
        gl.vertexAttribPointer(Line2DRenderer.A_POSISTION, 2, gl.FLOAT, false, 0, 0);
        gl.uniformMatrix3fv(Line2DRenderer.U_PROJECTION, false, mat_projection);
        gl.uniform4fv(Line2DRenderer.U_COLOR, clr.xyzw);
        gl.drawArrays(gl.LINE_LOOP, 0, 4);
    }
    static getProgram(gl) {
        if (Line2DRenderer.PROGRAM != null) {
            return Line2DRenderer.PROGRAM;
        }
        const vs = `#version 300 es
 
        in vec2 a_position;
        
        uniform mat3 u_projection;
        uniform vec4 u_color;
      
        out vec4 v_color;

        void main() {
          gl_Position = vec4((u_projection * vec3(a_position, 1)).xy, 0, 1);
          v_color = u_color;
        }
        `;
        const fs = `#version 300 es
  
        precision mediump float;

        in vec4 v_color;
        
        out vec4 outColor;
        
        void main() {
            outColor = v_color;
        }
        `;
        Line2DRenderer.PROGRAM = renderer.createProgramFromSource(gl, vs, fs);
        Line2DRenderer.A_POSISTION = gl.getAttribLocation(Line2DRenderer.PROGRAM, "a_position");
        Line2DRenderer.U_PROJECTION = gl.getUniformLocation(Line2DRenderer.PROGRAM, "u_projection");
        Line2DRenderer.U_COLOR = gl.getUniformLocation(Line2DRenderer.PROGRAM, "u_color");
        return Line2DRenderer.PROGRAM;
    }
    static getBuffer(gl) {
        if (Line2DRenderer.BUFFER != null) {
            return Line2DRenderer.BUFFER;
        }
        Line2DRenderer.BUFFER = gl.createBuffer();
        return Line2DRenderer.BUFFER;
    }
}
//# sourceMappingURL=drawlines.js.map