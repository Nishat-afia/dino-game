const dino = document.getElementById("dino");
const obstacle = document.getElementById("obstacle");
let isJumping = false;
let gravity = 0.9;

// Make the dino jump
function jump() {
    if (isJumping) return;
    let position = 0;
    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);

            // Falling down
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 5;
                    dino.style.bottom = position + "px";
                }
            }, 20);
        } else {
            // Jumping up
            position += 20;
            dino.style.bottom = position + "px";
        }
    }, 20);
}

// Collision detection
function checkCollision() {
    const dinoRect = dino.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
        dinoRect.right > obstacleRect.left &&
        dinoRect.left < obstacleRect.right &&
        dinoRect.bottom > obstacleRect.top
    ) {
        alert("Game Over!");
        location.reload();
    }
}

// Event listener for jumping
document.addEventListener("keydown", (e) => {
    if (e.key === " ") {
        jump();
    }
});

// Check for collisions every 10ms
setInterval(checkCollision, 10);
