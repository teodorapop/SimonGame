var a = 0;
var level = 0;
var gamePattern = [];
var userClickedPattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).toggleClass("pressed");

    playSound(randomChosenColor);

    // Scoate clasa după 100ms pentru efect vizual
    setTimeout(function() {
        $("#" + randomChosenColor).toggleClass("pressed");
    }, 100);

    $("h1").text("Level " + level);
    level++;
}

$(document).keypress(function() {
    if (a === 0) {
        nextSequence();
        a++;
    }
});

$(".btn").click(function() {
    var button = this;

    $("#" + button.id).toggleClass("pressed");

    setTimeout(function() {
        $("#" + button.id).toggleClass("pressed");
    }, 100);

    playSound(button.id);
    handleClick(button.id);
    checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function handleClick(idColor) {
    var userChosenColor = idColor;
    userClickedPattern.push(userChosenColor);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
                userClickedPattern = [];
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    a = 0;
}
