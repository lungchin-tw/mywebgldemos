
class KinematicsAccResult {
    constructor(v:Vector2, loc:Vector2) {
        this.#velocity = v;
        this.#location = loc;
    }
    
    #velocity: Vector2;
    #location: Vector2;

    get velocity(): Vector2 {
        return this.#velocity;
    }

    get location(): Vector2 {
        return this.#location;
    }
}

class Kinematics2D {
    static MotionByAcceleration(v1:Vector2, acc:Vector2, dt:number): KinematicsAccResult {
        // v2 = v1 + at
        let v2 = Vector2.Add(v1, Vector2.Scale(acc, dt));

        // s2 = s1(= 0 here) + v1t + (at^2)/2
        let v1t = Vector2.Scale(v1, dt);
        let at2 = Vector2.Scale(acc, Math.pow(dt, 2));
        let s2 = Vector2.Add(v1t, Vector2.Scale(at2, 0.5));

        return new KinematicsAccResult(v2, s2);
    }
}
