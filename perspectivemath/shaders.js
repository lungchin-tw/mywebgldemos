'use strict';

export let vs = `#version 300 es
 
// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
in vec2 a_position;
in vec2 a_texcoord;

uniform float u_scale;
uniform vec2 u_location;
uniform vec2 u_resolution;
uniform vec4 u_color;

out vec4 v_color;
out vec2 v_texcoord;

 
// all shaders have a main function
void main() {
  vec2 worldpos = (a_position * u_scale) + u_location;
  vec2 zero2one = worldpos / u_resolution;
  vec2 zero2two = zero2one * 2.0;
  vec2 clipspace = zero2two - 1.0;
  vec2 revclipspace = clipspace * vec2(1, -1); // reverse y axis to become traditional 2D coodinator System
  
 
  // gl_Position is a special variable a vertex shader
  // is responsible for setting
  gl_Position = vec4(revclipspace, 0, 1);
  v_color = (gl_Position * 0.5) + u_color;
  v_texcoord = a_texcoord;
}
`;

export let fs = `#version 300 es
 
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