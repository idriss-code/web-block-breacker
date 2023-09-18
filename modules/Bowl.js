import Vector from './Vector.js'

export default class Bowl {
    x;
    y;
    velocity;
    radius = 10;

    constructor(x, y, vX, vY) {
        this.x = x;
        this.y = y;
        this.velocity = new Vector(vX, vY);
    }

    getRightBound() {
        return this.x + this.radius;
    }

    getLeftBound() {
        return this.x - this.radius;
    }

    getUpBound() {
        return this.y - this.radius;
    }

    getDownBound() {
        return this.y + this.radius
    }

    getBox() {
        return {
            x: this.x - this.radius,
            y: this.y - this.radius,
            w: this.radius * 2,
            h: this.radius * 2,
        }
    }
}