'use strict';

export function printEnvProperties(canvasid) {
    console.log(getCurrentFuncName() + ":\n");

    var canvas = document.querySelector(canvasid);
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
    var canvas = document.querySelector(canvasid); // OR: document.getElementById("hellowebgl2"); 
    return canvas.getContext('webgl2');
}

export function adjustDrawingBuffer(canvas) {
    if (canvas.width != canvas.clientWidth) {
        canvas.width = canvas.clientWidth;
    }
    
    if (canvas.height != canvas.clientHeight) {
        canvas.height = canvas.clientHeight;
    }
}

