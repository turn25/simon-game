//Color Order List
var gamePattern = [];

//Store User Clicked Data
var userClickedPattern = [];

//List of colors
var buttonColors = ["red", "blue", "green", "yellow"];

var level = 0;

//By default, value of started set to false
var started = false;

//Start Game
$(document).keypress(function() {
  if (!started) {

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//Handle User Click using jQuery
$(".btn").click(handleClick);

//Empty Array -> User Push New Item -> Pass current Length of Array To checkAnswer function (count from 0)
function handleClick() {
    //Get the value of id name since the id name is similar to buttonColors (use attr to get rid of "#")
    var userChosenColor = $(this).attr("id");
    
    //Add the value to the end of userClickedPattern array
    userClickedPattern.push(userChosenColor);

    // console.log(userClickedPattern);
    playSound(userChosenColor);

    animatePress(userChosenColor);

    //Check user answer, have to -1 length because length count from 1 and array count from 0
    checkAnswer(userClickedPattern.length - 1);

    //Display user click count
    if(level !== 0 && userClickedPattern.length <= level) {
        var leftCount = gamePattern.length - userClickedPattern.length;
        $("#click-count").text("You have clicked " + userClickedPattern.length + " times (" + leftCount + " remaining)");
    }
}

//Check Answer
function checkAnswer(currentLevel) {
    //Check if most recent answer = most recent value store inside game pattern

    // console.log(userClickedPattern);
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        // console.log("success");

        //If they got the right answer, check if they have finished the sequence
        if(userClickedPattern.length === gamePattern.length){
            //Delay 1000ms and then call next level
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }

    } else {
        //When the answer is incorrect, play wrong sound and reset the game
        // console.log("failed");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 200);

        //If level != 0, then change the title and start new game 
        if(level !== 0) {
            $("#level-title").text("Game Over! Press Any Key to Restart");
            //Start New Game
            startOver();
        }
    }
}

//Next Level
function nextSequence() {
    //Reset all stored items in userClickedPattern array, Prepare for next level
    userClickedPattern = [];

    //Increase level
    level++;

    //Change Level Title
    $("#level-title").text("Level " + level);

    //Generate randomNumber between 0 - 3
    var randomNumber = Math.floor(Math.random() * 4); 

    //Choose colour from generated number
    var randomChosenColour = buttonColors[randomNumber];

    //Add new colour to the end of gamePattern array
    gamePattern.push(randomChosenColour);

    //Use jQuery to Choose and Add animation when click on the element that has same id name with randomChosenColor
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    //Play audio
    playSound(randomChosenColour);
}

//Playing The Corresponding Sound 
function playSound(colour) {
    var audio = new Audio("sounds/" + colour + ".mp3");
    audio.play();
}

//Add Animation When User Pressed On Button
function animatePress(currentColour) {
    //Using jQuery to select the right color with id name
    //And then add "pressed" class to it
    $("#" + currentColour).addClass("pressed");
    
    //Remove class from element after 100ms
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

//Start Over When Play Lose
function startOver() {
    //Reset gamePattern, level, started value
    gamePattern = [];
    level = 0;
    started = false;
}