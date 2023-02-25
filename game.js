// Get the start button and canvas elements from the HTML file
const startButton = document.getElementById("start-button");

// Start the game when the start button is clicked
startButton.addEventListener("click", startGame);

var canvas = document.getElementById("myCanvas");

// Set the canvas context to 2D
var ctx = canvas.getContext("2d");

// Load the sound effect
//var hitSound = new Audio("hit.wav");


// Set the initial position, size, and speed of the balls
var ballRadius = 10;
var ballX = canvas.width / 2;
var ballY = canvas.height - ballRadius - 30;
var ballDX = 4;
var ballDY = -4;
var secondBallRadius = 10;
var secondBallX = canvas.width / 2 + 50;
var secondBallY = canvas.height - secondBallRadius - 30;
var secondBallDX = -4;
var secondBallDY = -4;
let gameRunning = true;

// Set the initial position, size, and speed of the bat
var batHeight = 10;
var batWidth = 80;
var batX = (canvas.width - batWidth) / 2;

// Set the initial score and game type
var score = 0;
var gameType = "single";


// Define a function to draw the ball on the canvas
function drawBall(x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = "#0066ff";
  ctx.fill();
  ctx.closePath();
}


// Define the function to start the game
function startGame() {
  
  // Hide the start button
  startButton.style.display = "none";

  // Define the draw function that will be called repeatedly to update the canvas
  function draw() {
    if (gameRunning) {

      // Clear the canvas before drawing the next frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the balls and bat on the canvas
      drawBall(ballX, ballY, ballRadius);
      if (gameType == "double") {
        drawBall(secondBallX, secondBallY, secondBallRadius);
      }
      ctx.beginPath();
      ctx.rect(batX, canvas.height - batHeight, batWidth, batHeight);
      ctx.fillStyle = "#339933";
      ctx.fill();
      ctx.closePath();

      // Draw the score on the canvas
      ctx.font = "20px Arial";
      ctx.fillStyle = "#000000";
      ctx.fillText("Score: " + score, 8, 20);

      // Update the position of the balls based on their speed and direction
      if (gameType == "double") {
        if (
          ballX + ballDX > canvas.width - ballRadius ||
          ballX + ballDX < ballRadius
        ) {
          ballDX = -ballDX;
        }
        if (ballY + ballDY < ballRadius) {
          ballDY = -ballDY;
        } else if (ballY + ballDY > canvas.height - ballRadius - batHeight) {
          if (ballX > batX && ballX < batX + batWidth) {
            ballDY = -ballDY;
            score++;
            //hitSound.play(); // Play the sound effect
          } else {
            
            // End the game if the ball hits the bottom of the canvas
            gameRunning = false;
            alert(
              "Game over! Your score is " + score + ". Click OK to play again."
            );
            document.location.reload();
          }
        }
        ballX += ballDX;
        ballY += ballDY;

        if (
          secondBallX + secondBallDX > canvas.width - secondBallRadius ||
          secondBallX + secondBallDX < secondBallRadius
        ) {
          secondBallDX = -secondBallDX;
        }
        if (secondBallY + secondBallDY < secondBallRadius) {
          secondBallDY = -secondBallDY;
        } else if (
          secondBallY + secondBallDY >
          canvas.height - secondBallRadius - batHeight
        ) {
          if (secondBallX > batX && secondBallX < batX + batWidth) {
            secondBallDY = -secondBallDY;
            score++;
          } else {
            gameRunning = false;
            alert(
              "Game over! Your score is " + score + ". Click OK to play again."
            );
            document.location.reload();
          }
        }
        secondBallX += secondBallDX;
        secondBallY += secondBallDY;
      } else {
        if (
          ballX + ballDX > canvas.width - ballRadius ||
          ballX + ballDX < ballRadius
        ) {
          ballDX = -ballDX;
        }
        if (ballY + ballDY < ballRadius) {
          ballDY = -ballDY;
        } else if (ballY + ballDY > canvas.height - ballRadius - batHeight) {
          if (ballX > batX && ballX < batX + batWidth) {
            ballDY = -ballDY;
            score++;
          } else {
            gameRunning = false;
            alert(
              "Game over! Your score is " + score + ". Click OK to play again."
            );
            document.location.reload();
          }
        }
        ballX += ballDX;
        ballY += ballDY;
      }

      if (rightPressed && batX < canvas.width - batWidth) {
        batX += 7;
      } else if (leftPressed && batX > 0) {
        batX -= 7;
      }

      requestAnimationFrame(draw);
    }
  }

  document.addEventListener("mousemove", mouseMoveHandler, false);

  var rightPressed = false;
  var leftPressed = false;

  function keyDownHandler(e) {
    if (e.keyCode == 39) {
      rightPressed = true;
    } else if (e.keyCode == 37) {
      leftPressed = true;
    }
  }

  function keyUpHandler(e) {
    if (e.keyCode == 39) {
      rightPressed = false;
    } else if (e.keyCode == 37) {
      leftPressed = false;
    }
  }

  function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
      batX = relativeX - batWidth / 2;
    }
  }

  // Listen for key presses to move the bat
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);

  var radioButtons = document.getElementsByName("game-type");
 

  for (var i = 0; i < radioButtons.length; i++) {
    radioButtons[i].addEventListener("click", function () {
        //gameType = e.target.value;

      if (this.value == "single") {
        gameType = "single";
        secondBallX = -100;
        secondBallY = -100;
      } else if (this.value == "double") {
        gameType = "double";
        secondBallX = canvas.width / 2 + 50;
        secondBallY = canvas.height - secondBallRadius - 30;
      }
    });
  }

  draw();
}


function showDiv() {
    document.getElementById('myDiv').style.display = "block";
 }
