export default class Pad {
    w = 80;
    h = 20;
    x;
    y;

    constructor(cx, cy) {
        this.x = cx - this.w / 2;
        this.y = cy - this.h;

    }

    getBox() {
        return {
            x: this.x,
            y: this.y,
            w: this.w,
            h: this.h,
        }
    }
}