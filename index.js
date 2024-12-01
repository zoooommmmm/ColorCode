
var buttonColours = ["red", "blue", "green", "yellow"];

var  gamePattern = [];
var userClickedPattern = [];

var highScore = 0;
var started = false;
var level = 0;


$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});




$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    score();
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        
        if (userClickedPattern.length === gamePattern.length) { 
            setTimeout(function () {
                nextSequence();
            }, 1000);   
        }
    } else {
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
        score();
    }

}


function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}



function score() {
    if (level > 0) {
        $("#score-title").text("Score: " + level*10);
        if (level*10 > highScore) {
            highScore = level*10;
            $("#hiscore-title").text("High Score:" +highScore);
        }
    } else {
        $("#score-title").text("High Score:" +highScore);

    }
}


// record high score    



function nextSequence() {  
    userClickedPattern = [];

    level++;   

    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}



function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}  



function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);   
}




