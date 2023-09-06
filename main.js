const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let mousePos = { x: 0, y: 0 }
let start
let pause = true

const game = new Game();

canvas.addEventListener("click", async () => {
    if (!document.pointerLockElement) {
        await canvas.requestPointerLock({
            unadjustedMovement: true,
        });
    }
});

document.addEventListener("pointerlockchange", lockChangeAlert, false);

game.load();

window.requestAnimationFrame(run);

function updatePosition(e) {
    mousePos.x += e.movementX;
    mousePos.y += e.movementY;
}

function lockChangeAlert() {
    if (document.pointerLockElement === canvas) {
        console.log("The pointer lock status is now locked");
        document.addEventListener("mousemove", updatePosition, false);
        pause = false;
    } else {
        console.log("The pointer lock status is now unlocked");
        document.removeEventListener("mousemove", updatePosition, false);
        pause = true;
    }
}

function run(time) {
    if (start === undefined) {
        start = time;
    }
    const deltaTime = (time - start) / 1000;
    start = time;
    if(!pause){
        game.update(deltaTime)
    }
    game.draw()
    window.requestAnimationFrame(run);
}
