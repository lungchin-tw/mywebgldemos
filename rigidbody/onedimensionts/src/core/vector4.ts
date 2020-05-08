
class Vector4 {
    static ZeroVector: Vector4 = new Vector4();

    static Add(a:Vector4, b:Vector4):Vector4 {
        return new Vector4([
            (a.getX() + b.getX()),
            (a.getY() + b.getY()),
            (a.getZ() + b.getZ()),
            (a.getW() + b.getW()),
        ]);
    }

    static Scale(other:Vector4, scale:number):Vector4 {
        return new Vector4([
            (other.getX() * scale),
            (other.getY() * scale),
            (other.getZ() * scale),
            (other.getW() * scale),
        ]);
    }

    static Normalize(other:Vector4):Vector4 {
        return Vector4.Scale(other, (1 / other.length));
    }

    #xyzw: [number, number, number, number];
    #length: number;

    constructor(value?:[number,number, number, number]) {
        this.xyzw = (value != undefined) ? value : [0,0,0,0];
    }

    set xyzw(value:[number, number, number, number]) {
        this.#xyzw = value;
        this.#length = Math.sqrt(
            Math.pow(this.getX(), 2) +
            Math.pow(this.getY(), 2) +
            Math.pow(this.getZ(), 2) +
            Math.pow(this.getW(), 2));
    }

    get xyzw():[number, number, number, number] {
        return this.#xyzw;
    }

    getX(): number {
        return this.#xyzw[0];
    }

    getY(): number {
        return this.xyzw[1];
    }

    getZ(): number {
        return this.#xyzw[2];
    }

    getW(): number {
        return this.xyzw[3];
    }

    setY(value: number) {
        this.xyzw[1] = value;
    }

    get length(): number {
        return this.#length;
    }
}