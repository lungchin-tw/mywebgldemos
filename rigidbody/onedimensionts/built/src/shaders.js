"use strict";
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return factory.call(root);
        });
    }
    else {
        root.shaders = factory.call(root);
    }
}(this, function () {
    'use strict';
    const vs = `#version 300 es
 
  // an attribute is an input (in) to a vertex shader.
  // It will receive data from a buffer
  in vec2 a_position;
  in vec2 a_texcoord;

  uniform mat3 u_local2clipspace;
  uniform vec4 u_color;

  out vec4 v_color;
  out vec2 v_texcoord;

  
  // all shaders have a main function
  void main() {
    // gl_Position is a special variable a vertex shader
    // is responsible for setting
    gl_Position = vec4((u_local2clipspace * vec3(a_position, 1)).xy, 0, 1);
    v_color = u_color;
    v_texcoord = a_texcoord;
  }
  `;
    const fs = `#version 300 es
  
  // fragment shaders don't have a default precision so we need
  // to pick one. mediump is a good default. It means "medium precision"
  precision mediump float;

  in vec4 v_color;
  in vec2 v_texcoord;

  uniform sampler2D u_texture;

  
  // we need to declare an output for the fragment shader
  out vec4 outColor;
  
  void main() {
    // Just set the output to a constant reddish-purple
    vec4 texel = texture(u_texture, v_texcoord);
    // outColor = v_color;
    // outColor = texel + v_color;
    outColor = (texel * 0.5) + (v_color * 0.5);
  }
  `;
    return {
        vs: vs,
        fs: fs,
    };
}));
//# sourceMappingURL=shaders.js.map