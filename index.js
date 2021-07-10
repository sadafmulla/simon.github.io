
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

//to keep track of whether if the game has started or not, so you only call nextSequence() on the first click.
var started = false;
var level = 0;

//to detect when click happens for the first time, call nextSequence().
$(".start").click(function() 
{
  if (!started) 
  {

    //The h1 title starts out saying "Click anywhere to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function() 
{

  // store the id of the button that got clicked.
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel) 
{
    //to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) 
    {

      console.log("success");

      //If the user got the most recent answer right , then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length)
      {
        setTimeout(function () 
        {
          nextSequence();
        }, 1000);
      }

    } 
    else 
    {

      console.log("wrong");

      playSound("wrong");

      $("body").addClass("game-over");
      setTimeout(function () 
      {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Click here to Restart");

      //call startOver() if the user gets the sequence wrong.
      startOver();
    }

}

function nextSequence() 
{

  userClickedPattern = [];
  level++;

  //update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) 
{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) 
{
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () 
  {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() 
{

  //reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
}
