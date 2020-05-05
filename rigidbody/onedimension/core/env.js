'use strict';


export function initWebGL2Context( canvasid ) {
    console.log("Before Adjust Drawing Buffer:");
    printEnvProperties(canvasid)

    /**
     * Approach: All In One
     */
    let gl = getWebGL2Context(canvasid);
    if (!gl) {
        console.log("WebGL2 was NOT found.");
        return
    } else {
        console.log("WebGL2 was found.");
        printWebGLEnvProperties(gl);
    }

    console.log(`OES_element_index_uint: ${gl.getExtension("OES_element_index_uint")}`);
    
    adjustDrawingBufferForHDDPI(gl)

    console.log("After Adjust Drawing Buffer:");
    printEnvProperties(canvasid)

    return gl
}

export function printWebGLEnvProperties(gl) {
    console.log(getCurrentFuncName() + ":\n");
    console.log(`\MaxTextureUnits: ${gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS)}`);
    console.log(`\MaxVertexShaderUnits: ${gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS)}`);
    console.log(`\MaxFragmentShaderUnits: ${gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS)}`);
    console.log(`\MaxVertexAttribs: ${gl.getParameter(gl.MAX_VERTEX_ATTRIBS)}`);
}

export function printEnvProperties(canvasid) {
    console.log(getCurrentFuncName() + ":\n");

    let canvas = document.querySelector(canvasid);
    console.log(`\tCanvasWidth: ${canvas.width}`);
    console.log(`\tCanvasHeight: ${canvas.height}`);
    console.log(`\tCanvasClientWidth: ${canvas.clientWidth}`);
    console.log(`\tCanvasClientHeight: ${canvas.clientHeight}`);

    console.log(`\twindow.devicePixelRatio: ${window.devicePixelRatio}`);
    console.log(`\tCSSToRealPixels: ${window.devicePixelRatio || 1}`);
}

export function getCurrentFuncName() {
    return new Error().stack.split('\n')[2].trim();
}

export function getWebGL2Context(canvasid) {
    var canvas = document.querySelector(canvasid);
    return canvas.getContext('webgl2');
}

export function adjustDrawingBuffer(gl) {
    let isdirty = false;
    let canvas = gl.canvas
    if (canvas.width != canvas.clientWidth) {
        canvas.width = canvas.clientWidth;
        isdirty = true;
    }
    
    if (canvas.height != canvas.clientHeight) {
        canvas.height = canvas.clientHeight;
        isdirty = true;
    }

    if (isdirty == true) {
        gl.viewport(0, 0, canvas.width, canvas.height)
    }
}

export function adjustDrawingBufferForHDDPI(gl) {
    let isdirty = false;
    let canvas = gl.canvas;
    let cssToRealPixels = window.devicePixelRatio || 1;
    let displayWidth = Math.floor(canvas.clientWidth * cssToRealPixels);
    let displayHeight = Math.floor(canvas.clientHeight * cssToRealPixels);

    if (canvas.width != displayWidth) {
        canvas.width = displayWidth;
        isdirty = true;
    }
    
    if (canvas.height != displayHeight) {
        canvas.height = displayHeight;
        isdirty = true;
    }

    if (isdirty == true) {
        gl.viewport(0, 0, canvas.width, canvas.height)
    }
}

