class Vector {
    x;
    y;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalise() {
        const magnitude = this.magnitude();
        this.x = this.x / magnitude;
        this.y = this.y / magnitude;
    }

    multiply(scalar) {
        this.x = this.x * scalar;
        this.y = this.y * scalar;
    }

    divide(scalar) {
        this.x = this.x / scalar;
        this.y = this.y / scalar;
    }

    setAngle(angle) {
        const magnitude = this.magnitude();
        this.y = Math.sin(angle);
        this.x = Math.cos(angle);
        this.multiply(magnitude)
    }

    getAngle(){
        return Math.atan2(this.y, this.x);
    }
}