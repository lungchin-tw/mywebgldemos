"use strict";
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return factory.call(root);
        });
    }
    else {
        root.textureUtils = factory.call(root);
    }
}(this, function () {
    'use strict';
    function makeDefaultCheckerTexture(gl) {
        /**
         * Create a Texture
         */
        const image = new Uint8Array([128, 128, 128, 255, 255, 255, 255, 255, 255, 255, 255, 255, 128, 128, 128, 255]);
        let texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 2, 2, 0, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        return texture;
    }
    return {
        makeDefaultCheckerTexture: makeDefaultCheckerTexture,
    };
}));
//# sourceMappingURL=textureutils copy.js.map