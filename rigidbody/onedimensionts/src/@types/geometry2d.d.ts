/**
 * 
 */

export as namespace geometry2D;

export interface IGeometry2D {
    vertexArray:WebGLVertexArrayObject;
    vertexBuffer:WebGLBuffer;
    texCoordBuffer:WebGLBuffer;
    indexBuffer:WebGLBuffer;
    numElements:number;
}

export function makeRectangle(gl:WebGL2RenderingContext, program:WebGLProgram):IGeometry2D;
