'use strict';


export function getCurrentFuncName() {
    return new Error().stack.split('\n')[2].trim()
}

export function getWebGL2Context(id) {
    var canvas = document.querySelector(id); // OR: document.getElementById("hellowebgl2"); 
    return canvas.getContext('webgl2');
}

