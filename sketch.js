let dino;
let obstacles = [];
let score = 0;
let gameover = false;
let gravity = 0.6;
let jumpForce = -15;
let obstacleSpeed = 6;

function setup() {
  createCanvas(800, 400);
  dino = new Dino();
}

function draw() {
  background(240);

  if (!gameover) {
    // Dino updates
    dino.update();
    dino.show();

    // Generate and move obstacles
    if (frameCount % 90 == 0) {
      obstacles.push(new Obstacle());
    }

    for (let i = obstacles.length - 1; i >= 0; i--) {
      obstacles[i].update();
      obstacles[i].show();

      // Check for collision
      if (obstacles[i].hits(dino)) {
        gameover = true;
      }

      // Remove obstacles that have gone off-screen
      if (obstacles[i].offscreen()) {
        obstacles.splice(i, 1);
        score++;
      }
    }

    // Display score
    fill(0);
    textSize(24);
    text("Score: " + score, 20, 40);
  } else {
    // Display Game Over
    textSize(36);
    fill(255, 0, 0);
    textAlign(CENTER, CENTER);
    text("GAME OVER", width / 2, height / 2);
    textSize(24);
    text("Press any key to restart", width / 2, height / 2 + 50);
    noLoop(); // Stop the game
  }
}

// Restart game when key is pressed after game over
function keyPressed() {
  if (gameover) {
    resetGame();
  } else if (key === ' ' || key === 'ArrowUp') {
    dino.jump();
  }
}

// Dino class
class Dino {
  constructor() {
    this.r = 50; // Size of dino
    this.x = 50; // Dino's x position
    this.y = height - this.r - 20; // Initial Y position (ground level)
    this.yspeed = 0;
    this.grounded = false;
  }

  jump() {
    if (this.grounded) {
      this.yspeed = jumpForce;
      this.grounded = false;
    }
  }

  update() {
    this.yspeed += gravity;
    this.y += this.yspeed;

    // Stop the dino at the ground level
    if (this.y >= height - this.r - 20) {
      this.y = height - this.r - 20;
      this.yspeed = 0;
      this.grounded = true;
    }
  }

  show() {
    fill(50, 200, 50);
    rect(this.x, this.y, this.r, this.r); // Draw dino as a rectangle
  }
}

// Obstacle class
class Obstacle {
  constructor() {
    this.r = 40; // Size of the obstacle
    this.x = width; // Initial X position (starts offscreen)
    this.y = height - this.r - 20; // Y position (ground level)
  }

  update() {
    this.x -= obstacleSpeed; // Move obstacle to the left
  }

  show() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.r, this.r); // Draw obstacle as a rectangle
  }

  offscreen() {
    return this.x < -this.r; // Check if obstacle is off-screen
  }

  hits(dino) {
    return (
      dino.x < this.x + this.r &&
      dino.x + dino.r > this.x &&
      dino.y < this.y + this.r &&
      dino.y + dino.r > this.y
    );
  }
}

function resetGame() {
  score = 0;
  obstacles = [];
  gameover = false;
  loop(); // Restart the game
}




