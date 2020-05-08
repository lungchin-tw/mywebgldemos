
class Actor2D {
    #scale:number;
    #angle:number;
    #location:Vector2;
    #worldMatrix:number[];
    #color:[number,number,number,number];
    #isDirty:boolean;

    #velocity:Vector2;
    #acceleration:Vector2;
    #elapsed:number;

    #collider: SolidRectCollider;

    constructor() {
        this.#scale = 1;
        this.#angle = 0;
        this.#location = new Vector2();
        this.#worldMatrix = matrix33.identity();
        this.#color = [1, 1, 1, 1];
        this.#velocity = new Vector2();
        this.#acceleration = new Vector2();
        this.#elapsed = 0;

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

    set location(value:Vector2) {
        this.#location = value;
        this.#isDirty = true;
    }

    get location():Vector2 {
        return this.#location;
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
    }

    get velocity(): Vector2 {
        return this.#velocity;
    }

    set acceleration(value:Vector2) {
        this.#acceleration = value;
    }

    set collider(value:SolidRectCollider) {
        this.#collider = value;
    }

    update(dt:number) {
        if (this.#isDirty == true) {
            this.#isDirty = false;
            this.#worldMatrix = matrix33.local2World(this.#scale, this.#angle, this.#location.xy);
        }

        this.#elapsed = dt / 1000;
        if ((this.#velocity.length > 0) || (this.#acceleration.length > 0)) {
            const result = Kinematics2D.MotionByAcceleration(this.velocity, this.#acceleration, this.#elapsed);
            this.location = Vector2.Add(this.location, result.location);
            this.velocity = result.velocity;
            // console.log(this.velocity.getY());
        }
    }
}