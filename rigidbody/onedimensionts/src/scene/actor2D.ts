
class Actor2D {
    #scale:number;
    #angle:number;
    #location:[number,number];
    #worldMatrix:number[];
    #color:[number,number,number,number];
    #isDirty:boolean;

    #velocity:Vector2;
    #speed:number;

    constructor() {
        this.#scale = 1;
        this.#angle = 0;
        this.#location = [0,0];
        this.#worldMatrix = matrix33.identity();
        this.#color = [1, 1, 1, 1];
        this.#velocity = new Vector2();
        this.#speed = 0;
        this.#isDirty = true;
    }

    set scale(value:number) {
        this.#scale = value;
        this.#isDirty = true;
    }

    get scale():number {
        return this.#scale;
    }

    set angle(value:number) {
        this.#angle = value;
        this.#isDirty = true;
    }

    get angle():number {
        return this.#angle;
    }

    set location(xy:[number, number]) {
        this.#location = xy;
        this.#isDirty = true;
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

    set velocity(value:Vector2) {
        this.#velocity = value;
        // this.#speed = Math.sqrt(Math.pow(value[0], 2) + Math.pow(value[1], 2));
    }

    get velocity(): Vector2 {
        return this.#velocity;
    }
    
    update(dt:number) {
        if (this.#isDirty == true) {
            this.#isDirty = false;
            this.#worldMatrix = matrix33.local2World(this.#scale, this.#angle, this.#location);
        }
    }
}