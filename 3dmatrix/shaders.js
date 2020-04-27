'use strict';

export let vs = `#version 300 es
 
// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
in vec4 a_position;
in vec4 a_color;

uniform mat4 u_local2clipspace;

out vec4 v_color;

 
// all shaders have a main function
void main() {
  // gl_Position is a special variable a vertex shader
  // is responsible for setting
  gl_Position = u_local2clipspace * a_position;
  v_color = a_color;
}
`;

export let fs = `#version 300 es
 
// fragment shaders don't have a default precision so we need
// to pick one. mediump is a good default. It means "medium precision"
precision mediump float;

in vec4 v_color;

 
// we need to declare an output for the fragment shader
out vec4 outColor;
 
void main() {
  // Just set the output to a constant reddish-purple
  outColor = v_color;
}
`;