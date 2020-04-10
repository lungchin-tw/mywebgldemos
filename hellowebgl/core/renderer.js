'use strict';

export function createShader( gl, type, source ) {
    let shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS) == true) {
        return shader;
    }

    console.warn(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

export function createProgram( gl, vs, fs ) {
    let program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if ( gl.getProgramParameter(program, gl.LINK_STATUS) ) {
        return program
    }

    console.warn(gl.getProgramInfoLog(program));
    gl.deleteProgram(program)
    
}