// Select elements
const dino = document.getElementById("dino");
const obstacle = document.getElementById("obstacle");
const scoreDisplay = document.getElementById("score");
const gameOverScreen = document.getElementById("gameOver");
const finalScore = document.getElementById("finalScore");

let isJumping = false;
let score = 0;
let gameRunning = true;

// Make dino jump (higher and smoother)
function jump() {
  if (isJumping) return; // prevent double jump
  isJumping = true;

  let position = 0;
  const upInterval = setInterval(() => {
    if (position >= 150) { // max height (increase for bigger jump)
      clearInterval(upInterval);

      // Go down
      const downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        }
        position -= 10; // smoother fall
        dino.style.bottom = 50 + position + "px";
      }, 20);
    }
    position += 10; // smoother rise
    dino.style.bottom = 50 + position + "px";
  }, 20);
}


// Move obstacle
function moveObstacle() {
  let obstacleLeft = 800;
  const timer = setInterval(() => {
    if (!gameRunning) {
      clearInterval(timer);
      return;
    }

    obstacleLeft -= 10;
    obstacle.style.left = obstacleLeft + "px";

    if (obstacleLeft < -30) {
      obstacleLeft = 800; // reset
      score++;
      scoreDisplay.textContent = "Score: " + score;
    }

    // Collision detection
    const dinoBottom = parseInt(window.getComputedStyle(dino).bottom);
    if (
      obstacleLeft < 80 &&
      obstacleLeft > 20 &&
      dinoBottom <= 70
    ) {
      gameOver();
      clearInterval(timer);
    }
  }, 30);
}

// Game Over
function gameOver() {
  gameRunning = false;
  finalScore.textContent = "Final Score: " + score;
  gameOverScreen.style.display = "block";
}

// Restart game
function restartGame() {
  score = 0;
  scoreDisplay.textContent = "Score: 0";
  gameOverScreen.style.display = "none";
  gameRunning = true;
  moveObstacle();
}

// Keyboard input
document.addEventListener("keydown", (e) => {
  if (e.code === "Space" || e.code === "ArrowUp") {
    jump();
  }
});

// Start game
moveObstacle();
