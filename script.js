// Game initialization
let gameStarted = false;
let countdown = 3;  // Start the countdown at 3
let countdownActive = true;  // Flag to check if countdown is active
let score = 0; // Initialize score variable

const backgroundMusic = document.getElementById('backgroundMusic'); // Access the audio element
const hitSound = new Audio('cough.mp3'); // Create an audio object for the hit sound

// Function to display the initial screen with title and click to play message
function showInitialScreen() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.font = '48px monospace';
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.fillText("LUNG PONG", canvas.width / 2, canvas.height / 2 - 50);
  
  ctx.font = '24px monospace';
  ctx.fillText("Klik for at spille", canvas.width / 2, canvas.height / 2 + 50);
  
  ctx.font = '20px monospace';
  ctx.fillText("(tip: zoom skærmen lidt ud)", canvas.width / 2, canvas.height / 2 + 100);
  
  ctx.font = '20px monospace';
  ctx.fillText("Styr med piletasterne", canvas.width / 2, canvas.height / 2 + 150);
  
  ctx.font = '16px monospace';
  ctx.fillText("(Af: thegoodtroll)", canvas.width / 2, canvas.height / 2 + 250);
}

// Function to start the game (initiated after canvas click)
function startGame() {
  gameStarted = true;
  countdownActive = true;
  backgroundMusic.play(); // Play background music
  updateCountdown();
}


// Function to display the countdown
function showCountdown() {
	if(countdownActive) {
	  // Clear the canvas
	  ctx.clearRect(0, 0, canvas.width, canvas.height);

	  // Set the font for the countdown
	  ctx.font = '48px Arial';
	  ctx.fillStyle = 'white';
	  ctx.textAlign = 'center';
	  
	  // Draw the countdown number
	  ctx.fillText(countdown.toString(), canvas.width / 2, canvas.height / 2);
	}
}

// Function to update the countdown
function updateCountdown() {

  showCountdown();
  if (countdownActive) {
    showCountdown();
    if (countdown > 0) {
      // Decrease countdown
      setTimeout(() => {
        countdown--;
        updateCountdown();
      }, 1000);  // Wait a second before decreasing the countdown
    } else {
      // Countdown finished, start the game
      countdownActive = false;
      loop();
    }
  }
}
////////////////////////////////

// Select the canvas element
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Paddle properties
const paddleWidth = 80;
const paddleHeight = 10;
const paddleMarginBottom = 30;
let paddleX = canvas.width / 2 - paddleWidth / 2;
const paddleY = canvas.height - paddleHeight - paddleMarginBottom;
const paddleSpeed = 7;
let leftArrow = false;
let rightArrow = false;

// Ball properties
const ballRadius = 4;
let ballX = canvas.width / 2;
let ballY = paddleY - ballRadius;
let ballSpeedX = 3; //5
let ballSpeedY = -3; //-5

// Lung bricks properties
const brick = {
  row: 20, // Increased for a denser grid
  column: 40, // Increased for a denser grid
  width: canvas.width / 40, // Dynamic width for square bricks
  height: canvas.width / 40, // Dynamic height for square bricks
  offSetLeft: 5, // Smaller offset
  offSetTop: 5, // Smaller offset
  marginTop: 20, // Adjusted top margin
  fillColor: '#FFFFFF', // White color for bricks
  strokeColor: '#FFFFFF' // White color for brick borders
};

let bricks = [];

// Create bricks
function createBricks() {
  for(let r = 0; r < brick.row; r++){
    bricks[r] = [];
    for(let c = 0; c < brick.column; c++){
		let status = true; // Default status is true (brick is visible)

		// Manually turning off bricks to match the lung pattern
		// The following are examples and need to be adjusted based on the lung image analysis
		if (r === 0 && (c <= 14 || c >= 18)) status = false; // Top row, first and last 10 bricks off
		if (r === 1 && (c <= 14 || c >= 18)) status = false;
		if (r === 2 && (c <= 14 || c >= 18)) status = false;
		if (r === 8 && (c >= 16 && c <= 16)) status = false;
		if (r === 9 && (c >= 14 && c <= 18)) status = false;
		if (r === 10 && (c >= 14 && c <= 18)) status = false;
		if (r === 11 && (c >= 14 && c <= 18)) status = false;
		if (r === 12 && (c >= 14 && c <= 18)) status = false;
		if (r === 13 && (c >= 14 && c <= 18)) status = false;
		if (r === 14 && (c >= 14 && c <= 18)) status = false;
		if (r === 15 && (c >= 14 && c <= 18)) status = false;
		if (r === 16 && (c >= 13 && c <= 19)) status = false;
		if (r === 17 && (c >= 13 && c <= 19)) status = false;
		if (r === 16 && (c >= 13 && c <= 19)) status = false;
		if (r === 17 && (c >= 13 && c <= 19)) status = false;
		if (r === 18 && (c >= 12 && c <= 20)) status = false;
		if (r === 19 && (c >= 12 && c <= 20)) status = false;
		
		if (r === 3 && (c <= 7)) status = false;
		if (r === 4 && (c <= 5)) status = false;
		if (r === 5 && (c <= 4)) status = false;
		if (r === 6 && (c <= 3)) status = false;
		if (r === 7 && (c <= 2)) status = false;
		if (r === 8 && (c <= 2)) status = false;
		if (r === 9 && (c <= 2)) status = false;
		if (r === 10 && (c <= 1)) status = false;
		if (r === 11 && (c <= 1)) status = false;
		if (r === 12 && (c <= 1)) status = false;
		if (r === 13 && (c <= 1)) status = false;
		if (r === 14 && (c <= 1)) status = false;
		if (r === 15 && (c <= 0)) status = false;
		if (r === 16 && (c <= 0)) status = false;
		if (r === 17 && (c <= 0)) status = false;
		if (r === 18 && (c <= 0)) status = false;
		if (r === 19 && (c <= 0)) status = false;
		
		if (r === 3 && (c >= 25)) status = false;
		if (r === 4 && (c >= 27)) status = false;
		if (r === 5 && (c >= 28)) status = false;
		if (r === 6 && (c >= 29)) status = false;
		if (r === 7 && (c >= 30)) status = false;
		if (r === 8 && (c >= 30)) status = false;
		if (r === 9 && (c >= 30)) status = false;
		if (r === 10 && (c >= 31)) status = false;
		if (r === 11 && (c >= 31)) status = false;
		if (r === 12 && (c >= 31)) status = false;
		if (r === 13 && (c >= 31)) status = false;
		if (r === 14 && (c >= 31)) status = false;
		if (r === 15 && (c >= 32)) status = false;
		if (r === 16 && (c >= 32)) status = false;
		if (r === 17 && (c >= 32)) status = false;
		if (r === 18 && (c >= 32)) status = false;
		if (r === 19 && (c >= 32)) status = false;
		
		// ... additional conditions for other rows to shape the lungs ...

		bricks[r][c] = {
			x: c * (brick.offSetLeft + brick.width) + brick.offSetLeft,
			y: r * (brick.offSetTop + brick.height) + brick.offSetTop + brick.marginTop,
			status: status // The status will determine if a brick is visible or not
		};
    }
  }

  // Manually adjust the `status` of certain bricks to form the shape of lungs
  bricks[3][14].status = false;
  bricks[3][18].status = false;
  bricks[4][14].status = false;
  bricks[4][18].status = false;
  bricks[5][14].status = false;
  bricks[5][18].status = false;
  bricks[6][14].status = false;
  bricks[6][18].status = false;
  
  bricks[3][13].status = false;
  bricks[4][13].status = false;
  bricks[5][13].status = false;
  bricks[3][12].status = false;
  
  bricks[3][19].status = false;
  bricks[4][19].status = false;
  bricks[5][19].status = false;
  bricks[3][20].status = false;
  
  bricks[19][1].status = false;
  bricks[19][31].status = false;
  bricks[19][3].status = false;
  bricks[19][5].status = false;
  bricks[19][6].status = false;
  bricks[19][7].status = false;
  bricks[19][8].status = false;
  bricks[19][9].status = false;
  bricks[19][10].status = false;
  bricks[19][11].status = false;
  bricks[19][29].status = false;
  bricks[19][27].status = false;
  bricks[19][26].status = false;
  bricks[19][25].status = false;
  bricks[19][24].status = false;
  bricks[19][23].status = false;
  bricks[19][22].status = false;
  bricks[19][21].status = false;
  
  bricks[18][28].status = false;
  bricks[18][27].status = false;
  bricks[18][26].status = false;
  bricks[18][25].status = false;
  bricks[18][23].status = false;
  bricks[17][25].status = false;
  bricks[17][26].status = false;
  bricks[17][22].status = false;
  bricks[16][25].status = false;
  bricks[18][4].status = false;
  bricks[18][6].status = false;
  bricks[18][9].status = false;
  bricks[18][10].status = false;
  bricks[17][8].status = false;
  bricks[17][10].status = false;
  bricks[17][6].status = false;
  bricks[16][6].status = false;
  
    
  // Add similar lines here to manually design the lung shape
}

// Draw the paddle
function drawPaddle() {
  ctx.fillStyle = '#FFFFFF'; // White color for the larger part of the cigarette
  ctx.fillRect(paddleX, paddleY, paddleWidth * 2 / 3, paddleHeight);
  
  ctx.fillStyle = '#FFA500'; // Orange color for the lit end of the cigarette
  ctx.fillRect(paddleX + paddleWidth * 2 / 3, paddleY, paddleWidth / 3, paddleHeight);
}

// Draw the ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFFFF'; // Color of the ball
  ctx.fill();
  ctx.closePath();
}

// Draw the bricks
function drawBricks() {
  for(let r = 0; r < brick.row; r++){
    for(let c = 0; c < brick.column; c++){
      if(bricks[r][c].status){
        ctx.fillStyle = brick.fillColor;
        ctx.fillRect(bricks[r][c].x, bricks[r][c].y, brick.width, brick.height);
        
        ctx.strokeStyle = brick.strokeColor;
        ctx.strokeRect(bricks[r][c].x, bricks[r][c].y, brick.width, brick.height);
      }
    }
  }
}

// Ball and bricks collision detection
function ballBrickCollision() {
  for (let r = 0; r < brick.row; r++) {
    for (let c = 0; c < brick.column; c++) {
      let b = bricks[r][c];
      if (b.status) {
        if (ballX + ballRadius > b.x && ballX - ballRadius < b.x + brick.width && ballY + ballRadius > b.y && ballY - ballRadius < b.y + brick.height) {
          ballSpeedY = -ballSpeedY;
          b.status = false; // Brick is broken by the ball
          hitSound.play();
          score++; // Increment score when hitting a brick
        }
      }
    }
  }
}


// Move the paddle
function movePaddle() {
  if(rightArrow && paddleX + paddleWidth < canvas.width){
    paddleX += paddleSpeed;
  } else if(leftArrow && paddleX > 0){
    paddleX -= paddleSpeed;
  }
}

// Ball and wall collision detection
function ballWallCollision() {
  if(ballX + ballRadius > canvas.width || ballX - ballRadius < 0){
    ballSpeedX = -ballSpeedX;
  }
  if(ballY - ballRadius < 0){
    ballSpeedY = -ballSpeedY;
  }
  if(ballY + ballRadius > canvas.height){
    // Reset the ball if it goes below the paddle
    resetBall();
  }
}

// Reset the ball
function resetBall() {
  ballX = canvas.width / 2;
  ballY = paddleY - ballRadius;
  ballSpeedX = 3 * (Math.random() * 2 - 1); // Randomize the ball's X direction
  ballSpeedY = -3;
}


// Ball and paddle collision
function ballPaddleCollision() {
  if (ballX < paddleX + paddleWidth && ballX > paddleX && ballY < paddleY + paddleHeight && ballY > paddleY) {
    let collidePoint = ballX - (paddleX + paddleWidth / 2);
    collidePoint = collidePoint / (paddleWidth / 2);
    let angle = collidePoint * Math.PI / 3; // Adjusted angle based on collision point

    ballSpeedX = ballSpeedX * Math.sin(angle);
    ballSpeedY = -ballSpeedY * Math.cos(angle);

    // Ensure the ball maintains a minimum speed
    const minSpeed = 3; // Set a minimum speed
    const currentSpeed = Math.sqrt(ballSpeedX * ballSpeedX + ballSpeedY * ballSpeedY);

    if (currentSpeed < minSpeed) {
      ballSpeedX *= minSpeed / currentSpeed;
      ballSpeedY *= minSpeed / currentSpeed;
    }

    // Place the ball right above the paddle to prevent sticking
    ballY = paddleY - ballRadius;

    // Ensure the ball always moves upwards after hitting the paddle
    if (ballSpeedY > 0) {
      ballSpeedY = -ballSpeedY;
    }

    // Adjust ball speed based on paddle's direction (left/right)
    if (rightArrow) {
      ballSpeedX += 1; // Increase speed if the paddle is moving right
    } else if (leftArrow) {
      ballSpeedX -= 1; // Decrease speed if the paddle is moving left
    }

    // Clamp the ball speed to a maximum value
    const maxSpeed = 10;
    if (Math.abs(ballSpeedX) > maxSpeed) {
      ballSpeedX = maxSpeed * Math.sign(ballSpeedX);
    }
  }
}



// Update game function
function update() {
  movePaddle();
  ballWallCollision();
  ballPaddleCollision();
  ballBrickCollision(); // Check for collision between the ball and bricks
  ballX += ballSpeedX;
  ballY += ballSpeedY;
}

// Draw function
function draw() {
  drawPaddle();
  drawBall();
  drawBricks();
  
  // Display the score in the upper right corner
  ctx.font = '24px monospace';
  ctx.fillStyle = 'white';
  ctx.textAlign = 'right';
  ctx.fillText("Score: " + score, canvas.width - 10, 30);
}


function drawQuitMessage() {
  ctx.font = '14px monospace';
  ctx.fillStyle = 'white';
  ctx.textAlign = 'right';
  ctx.fillText("Kvit smøgerne, rygning dræber", canvas.width - 10, canvas.height - 10);
}

// Game loop
function loop() {
  if (!countdownActive && gameStarted) {
	  ctx.clearRect(0, 0, canvas.width, canvas.height);
	  draw();
	  // Draw the quit smoking message
	  drawQuitMessage();
	  update();
	  requestAnimationFrame(loop);
	} else {
		  requestAnimationFrame(loop);
  }
}

createBricks();
loop();

// Event listener to start the game on canvas click
canvas.addEventListener('click', function() {
  if(!gameStarted) {
    startGame();
  }
});

// Start the countdown when the page loads
window.onload = function() {
  showInitialScreen();
}

// Keyboard event listeners
document.addEventListener('keydown', function(event){
  if(event.key === 'ArrowLeft'){
    leftArrow = true;
  } else if(event.key === 'ArrowRight'){
    rightArrow = true;
  }
});

document.addEventListener('keyup', function(event){
  if(event.key === 'ArrowLeft'){
    leftArrow = false;
  } else if(event.key === 'ArrowRight'){
    rightArrow = false;
  }
});
