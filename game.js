// list of the colors
let buttonColors = ["red", "blue", "green", "yellow"];

// a place holder for the patterns
let gamePattern = [];

// User Pattern
let userClickedPattern = [];

// Levels
let level = 0;

// Game started?
let started = false;

// Starting the Game
$(document).keypress(function() {
  if (!started) {
    $("#level-title").html("level " + level);
    nextSequence();
    started = true;
  }
});

//Check Which Btn was Pressed
$(".btn").click(function() {
  //User Chosen Color
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSounds(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

// Game Prograss
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSounds("wrong");
    $("#level-title").html("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 500);
    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4); // Random Num From 0 - 3
  let randomChosenColor = buttonColors[randomNumber]; // Selecting the Random Color
  gamePattern.push(randomChosenColor);

  //Displying the Sequence to the User with Animations and Sounds
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSounds(randomChosenColor);
}

//Add Sounds to Button Clicks
function playSounds(name) {
  // Playing Sounds for The Right Color
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Animations to User Clicks
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Game over / Start Over
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
