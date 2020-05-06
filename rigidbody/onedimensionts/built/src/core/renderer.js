"use strict";
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return factory.call(root);
        });
    }
    else {
        root.renderer = factory.call(root);
    }
}(this, function () {
    'use strict';
    function createShader(gl, type, source) {
        let shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (gl.getShaderParameter(shader, gl.COMPILE_STATUS) == true) {
            return shader;
        }
        console.warn(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    function createProgram(gl, vs, fs) {
        let program = gl.createProgram();
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
            return program;
        }
        console.warn(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
    }
    function createProgramFromSource(gl, vs_src, fs_src) {
        let vs = createShader(gl, gl.VERTEX_SHADER, vs_src);
        if (vs == null) {
            return null;
        }
        let fs = createShader(gl, gl.FRAGMENT_SHADER, fs_src);
        if (fs == null) {
            return null;
        }
        return createProgram(gl, vs, fs);
    }
    return {
        createProgramFromSource: createProgramFromSource,
    };
}));
//# sourceMappingURL=renderer.js.map