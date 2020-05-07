
class Actor2D {
    #scale:number;
    #angle:number;
    #location:[number,number];
    #worldMatrix:number[];
    #color:[number,number,number,number];
    #isDirty:boolean;

    constructor() {
        this.#scale = 1;
        this.#angle = 0;
        this.#location = [0,0];
        this.#worldMatrix = matrix33.identity();
        this.#color = [1, 1, 1, 1];
        this.#isDirty = true;
    }

    set scale(value:number) {
        this.#scale = value;
    }

    get scale():number {
        return this.#scale;
    }

    set angle(value:number) {
        this.#angle = value;
    }

    get angle():number {
        return this.#angle;
    }

    set location(xy:[number, number]) {
        this.#location = xy;
    }

    get worldMatrix():number[] {
        return this.#worldMatrix;
    }

    set color(rgba:[number, number, number, number]) {
        this.#color = rgba;
    }

    get color():[number, number, number, number] {
        return this.#color;
    }
    
    update(dt:number) {
        if (this.#isDirty == true) {
            this.#isDirty = false;
            this.#worldMatrix = matrix33.local2World(this.#scale, this.#angle, this.#location);
        }
    }
}