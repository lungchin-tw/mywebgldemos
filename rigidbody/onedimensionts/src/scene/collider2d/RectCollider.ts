
class SolidRectCollider {
    #bound: Vector4;
    #corners:[Vector4, Vector4, Vector4, Vector4];

    constructor(bound?:Vector4) {
        this.#bound = (bound != undefined) ? bound : new Vector4();
    }

    Detect(other: SolidRectCollider): boolean {
        return false;
    }
}