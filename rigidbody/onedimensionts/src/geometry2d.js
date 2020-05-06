'use strict';

// Traditional Coordinate: Left-Top is (0,0)

// Local Coord, Center=(0,0)

(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], function() {
            return factory.call(root);
        });
    } else {
        root.geometry2D = factory.call(root);
    }
}(this, function(){
    'use strict';

    /**
     * @param {WebGL2RenderingContext} gl 
     * @param {int} size Cube Size
     * @description Apply Right-Hand Rule -> Right: X-Axis, Up: Y-Axis, OutScreen: Z-Axis
     */
    function makeParallelogram(gl, program) {
        console.log(env.getCurrentFuncName());

        const a_position = gl.getAttribLocation(program, "a_position");
        const a_texcoord = gl.getAttribLocation(program, "a_texcoord");

        console.log(`AttrPos: ${a_position}`);
        console.log(`AttrTexcoord: ${a_texcoord}`);

        const vertices = new Float32Array([
            -5,  2, // 0
            2,  2, // 1
            -2, -2, // 2
            5, -2, // 3
        ]);

        const texcoords = new Float32Array([
            0, 1,
            1, 1,
            0, 0,
            1, 0,
        ]);

        const vertindices = new Uint16Array([
            0, 1, 2,
            2, 1, 3,
        ]);

        let geometry = {};
        geometry.vertexArray = gl.createVertexArray();
        gl.bindVertexArray(geometry.vertexArray);

        geometry.vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, geometry.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
        gl.enableVertexAttribArray(a_position);
        gl.vertexAttribPointer(
            a_position,
            2, // size
            gl.FLOAT, // type
            false, // normalize
            0, // stride
            0 // offset
        );

        geometry.texCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, geometry.texCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, texcoords, gl.STATIC_DRAW);
        gl.enableVertexAttribArray(a_texcoord);
        gl.vertexAttribPointer(
            a_texcoord,
            2, // size
            gl.FLOAT, // type
            false, // normalize
            0, // stride
            0 // offset
        );

        geometry.indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, geometry.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, vertindices, gl.STATIC_DRAW);

        geometry.numElements = vertindices.length;

        return geometry;
    }


    /**
     * @param {WebGL2RenderingContext} gl 
     * @param {int} size Cube Size
     * @description Apply Right-Hand Rule -> Right: X-Axis, Up: Y-Axis, OutScreen: Z-Axis
     */
    function makeRectangle(gl, program) {
        console.log(env.getCurrentFuncName());

        const a_position = gl.getAttribLocation(program, "a_position");
        const a_texcoord = gl.getAttribLocation(program, "a_texcoord");

        console.log(`AttrPos: ${a_position}`);
        console.log(`AttrTexcoord: ${a_texcoord}`);

        const vertices = new Float32Array([
            -0.5, -0.5, // 0
            -0.5,  0.5, // 1
            0.5,  0.5, // 2
            0.5, -0.5, // 3
        ]);

        const texcoords = new Float32Array([
            0, 0,
            0, 1,
            1, 1,
            1, 0,
        ]);

        const vertindices = new Uint16Array([
            0, 1, 2,
            2, 3, 0,
        ]);

        let geometry = {};
        geometry.vertexArray = gl.createVertexArray();
        gl.bindVertexArray(geometry.vertexArray);

        geometry.vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, geometry.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
        gl.enableVertexAttribArray(a_position);
        gl.vertexAttribPointer(
            a_position,
            2, // size
            gl.FLOAT, // type
            false, // normalize
            0, // stride
            0 // offset
        );

        if (a_texcoord >= 0 ) {
            geometry.texCoordBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, geometry.texCoordBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, texcoords, gl.STATIC_DRAW);
            gl.enableVertexAttribArray(a_texcoord);
            gl.vertexAttribPointer(
                a_texcoord,
                2, // size
                gl.FLOAT, // type
                false, // normalize
                0, // stride
                0 // offset
            );
        }
        
        geometry.indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, geometry.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, vertindices, gl.STATIC_DRAW);

        geometry.numElements = vertindices.length;

        return geometry;
    }

    return {
        makeRectangle: makeRectangle,
        makeParallelogram: makeParallelogram,
    };

}));