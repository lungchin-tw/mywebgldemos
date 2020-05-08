

class SolidRectCollider {
    #localBound: Vector4;
    #localCorners: [Vector2, Vector2, Vector2, Vector2]; // [left-top, left-bottom, right-bottom, right-top]

    #scale:number = 1;
    #angle:number = 0;
    #location:Vector2 = new Vector2();
    #worldMatrix:number[] = matrix33.identity();

    #isDirty: boolean = true;

    // constructor(localbound?:Vector4) {
    //     this.localBound = (localbound != undefined) ? localbound : new Vector4();
    // }

    // set localBound(value:Vector4) {
    //     this.#localBound = value;
    //     this.UpdateLocalCorners();
    // }

    set scale(value:number) {
        this.#scale = value;
        this.#isDirty = true;
    }

    set location(value:Vector2) {
        this.#location = value;
        this.#isDirty = true;
    }

    Detect(other: SolidRectCollider): boolean {
        return false;
    }

    Update() {
        if (this.#isDirty == false) {
            return;
        }

        this.UpdateWorldMatrix();
        this.UpdateWorldBound();
    }

    private UpdateWorldMatrix() {
        this.#worldMatrix = matrix33.local2World(this.#scale, this.#angle, this.#location.xy);
    }

    private UpdateWorldBound() {
    }

    private UpdateLocalCorners() {
        this.#localCorners[0] = new Vector2([this.#localBound.getX(), this.#localBound.getY()]);
    }
}