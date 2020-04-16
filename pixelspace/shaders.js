'use strict';

export let vs = `#version 300 es
 
// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
in vec2 a_position;

uniform float u_scale;
uniform vec2 u_location;
uniform vec2 u_resolution;
 
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
}
`;

export let fs = `#version 300 es
 
// fragment shaders don't have a default precision so we need
// to pick one. mediump is a good default. It means "medium precision"
precision mediump float;

uniform vec4 u_color;
 
// we need to declare an output for the fragment shader
out vec4 outColor;
 
void main() {
  // Just set the output to a constant reddish-purple
  outColor = u_color;
}
`;