class Bowl {
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

class Pad {
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

class Block {
    w;
    h;
    x;
    y;

    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
}

class Game {
    bowl;
    pad;
    blocks = [];
    level = 1;

    load() {
        const speed = 500;
        this.bowl = new Bowl(700, 20, 1, 1);
        this.bowl.velocity.normalise();
        this.bowl.velocity.multiply(speed);
        this.pad = new Pad(canvas.width / 2, canvas.height);
        mousePos.x = this.pad.x;

        for (let i = 0; i < this.level; i++) {
            for (let j = 0; j < 17 - i % 2; j++) {
                let block = new Block(12 + j * 46 + i % 2 * 23, 20 + i * 25,40, 20 );
                this.blocks.push(block);
            }
        }
    }

    update(deltaTime) {
        this.pad.x = mousePos.x;
        this.pad.x = this.pad.x < 0 ? 0 : this.pad.x
        this.pad.x = this.pad.x > canvas.width - this.pad.w ? canvas.width - this.pad.w : this.pad.x

        this.bowl.x += this.bowl.velocity.x * deltaTime;
        this.bowl.y += this.bowl.velocity.y * deltaTime;

        if (this.bowl.getRightBound() > canvas.width) {
            this.bowl.x = canvas.width - this.bowl.radius
            this.bowl.velocity.x = - Math.abs(this.bowl.velocity.x);
        } else if (this.bowl.getLeftBound() < 0) {
            this.bowl.x = 0 + this.bowl.radius
            this.bowl.velocity.x = Math.abs(this.bowl.velocity.x);
        }
        //rebond plafond
        if (this.bowl.getUpBound() < 0) {
            this.bowl.y = 0 + this.bowl.radius
            this.bowl.velocity.y = Math.abs(this.bowl.velocity.y);
        }

        //fin de partie perdu
        if (this.bowl.getDownBound() > canvas.height) {
            console.log('game over')
            this.load()
        }

        if (Collision.boxBox(this.bowl.getBox(), this.pad.getBox())) {
            // on fait la difference entre le centre du pad et le bord qu'on raporte a la largeur
            const diff = (this.bowl.x - (this.pad.x + this.pad.w / 2)) / this.pad.w
            const angle = 3 * Math.PI / 2 + diff
            this.bowl.velocity.setAngle(angle);
            this.bowl.y = this.pad.y - this.bowl.radius
        }

        this.blocks.forEach((block,index,blocks)=>{
            if(Collision.boxBox(this.bowl.getBox(), block)){
                blocks.splice(index, 1);
            }
        })
    }

    draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = "#dae2df";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "green";
        ctx.fillRect(this.pad.x, this.pad.y, this.pad.w, this.pad.h);
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(this.bowl.x, this.bowl.y, 10, 0, 2 * Math.PI);
        ctx.fill();

        this.blocks.forEach(block => {
            ctx.fillRect(block.x, block.y, block.w, block.h);
        })
    }
}

