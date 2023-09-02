const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "green";
let mousePos = { x: 0, y: 0 }
let x = 0
let start

canvas.addEventListener("click", async () => {
    if (!document.pointerLockElement) {
        await canvas.requestPointerLock({
            unadjustedMovement: true,
        });
    }
});

document.addEventListener("pointerlockchange", lockChangeAlert, false);

window.requestAnimationFrame(run);

function updatePosition(e) {
    mousePos.x += e.movementX;
    mousePos.y += e.movementY;
}

function lockChangeAlert() {
    if (document.pointerLockElement === canvas) {
        console.log("The pointer lock status is now locked");
        document.addEventListener("mousemove", updatePosition, false);
    } else {
        console.log("The pointer lock status is now unlocked");
        document.removeEventListener("mousemove", updatePosition, false);
    }
}

function run(time) {
    if (start === undefined) {
        start = time;
    }
    const deltaTime = (time - start) / 1000;
    update(deltaTime)
    draw()
    window.requestAnimationFrame(run);
}

function update(deltaTime) {
    x = mousePos.x
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillRect(x, 10, 100, 100);
}