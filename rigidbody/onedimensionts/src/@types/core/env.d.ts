/**
 * 
 */

export as namespace env;

export function getCurrentFuncName():string;

export function initWebGL2Context(canvasid:string):WebGL2RenderingContext;

export function printWebGLEnvProperties(gl:WebGL2RenderingContext):void;

export function printEnvProperties(canvasid:string):void;

export function getWebGL2Context(canvasid:string):WebGL2RenderingContext;

export function adjustDrawingBuffer(gl:WebGL2RenderingContext):void;

export function adjustDrawingBufferForHDDPI(gl:WebGL2RenderingContext):void;