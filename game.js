var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(document).keydown(function (){
  if (level === 0) {
      level++;
      nextSequence(buttonColors);
  }
});

$(".btn").click(function (){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence(buttonColors) {
  userClickedPattern = [];
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);

  gamePattern.push(randomChosenColor);

  level++;
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

  // switch (name) {
  //   case "red":
  //     var red = new Audio("sounds/red.mp3");
  //     red.play();
  //     break;
  //   case "blue":
  //     var blue = new Audio("sounds/blue.mp3");
  //     blue.play();
  //     break;
  //   case "green":
  //     var green = new Audio("sounds/green.mp3");
  //     green.play();
  //     break;
  //   case "yellow":
  //     var yellow = new Audio("sounds/yellow.mp3");
  //     yellow.play();
  //     break;
  //   default: console.log("no audio");
  // }
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout (function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

}

function checkAnswer (currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence(buttonColors);
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function (){
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
}
