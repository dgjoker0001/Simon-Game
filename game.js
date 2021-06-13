//List of colours
var buttonColours = ["red", "blue", "green", "yellow"];

// pattern set by game
var gamePattern = [];

//pattern entered by user
var userClickedPattern = [];

var level = 0, started = false;

$(document).on("keydown",start);
function start(){
  if (started == false){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
}

// to record user clicked pattern
$(".btn").click(handler);
function handler(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  var lastAnswerIndex = userClickedPattern.length-1;
  checkAnswer(lastAnswerIndex);
}

// Check user entered answer
function checkAnswer(currentLevel){
  // check if user got most recent answer correct
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){

    if(userClickedPattern.length === gamePattern.length){

      setTimeout(nextLevel,1000);
      function nextLevel(){
        nextSequence();
      }
    }
  }
  else{

    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(remove,200);
    function remove(){
      $("body").removeClass("game-over");
    }

    $("#level-title").text("Game Over, Press Any Key to Restart ");

    startOver();
  }
}

// to record game pattern
function nextSequence(){
  // empty user entered response for new level
  userClickedPattern = [];
  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.random()*4;
  randomNumber = Math.floor(randomNumber);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(30);
  playSound(randomChosenColour);


}

// to play sound on button clicked
function playSound(name){
  var colour = new Audio("sounds/"+ name + ".mp3");
  colour.play();
}

// for animation on button clicked
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(remove,100);
  function remove(){
    $("#"+currentColour).removeClass("pressed");
  }
}

// start new game
function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
