class Bowl {
    x = 700;
    y = 10;
    vX = 1;
    vY = 1;
    radius = 10;

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
}

class Pad {
    w = 50;
    h = 20;
    x = canvas.width / 2;
    y = canvas.height - this.h;
}

class Game {
    bowl = new Bowl();
    pad = new Pad();

    load(){
        mousePos.x = this.pad.x;
    }

    update(deltaTime) {
        this.pad.x = mousePos.x;

        this.bowl.x += this.bowl.vX * deltaTime;
        this.bowl.y += this.bowl.vY * deltaTime;

        if (this.bowl.getRightBound() > canvas.width) {
            this.bowl.vX = - Math.abs(this.bowl.vX);
        } else if (this.bowl.getLeftBound() < 0) {
            this.bowl.vX = Math.abs(this.bowl.vX);
        }
        //rebond plafond
        if (this.bowl.getUpBound() < 0) {
            //this.bowl.vY = Math.abs(this.bowl.vY);
        }

        //fin de partie perdu
        if (this.bowl.getDownBound() > canvas.height) {
            console.log('game over')
        }
    }

    draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = "green";
        ctx.fillRect(this.pad.x, this.pad.y, this.pad.w, this.pad.h);

        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(this.bowl.x, this.bowl.y, 10, 0, 2 * Math.PI);
        ctx.fill();

    }
}

