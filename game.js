var buttonColor = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickPattern = [];
var level = 0;
var start = false;

// Start the Game
$(document).keypress(function(event) {
    if (!start) {
        nextSequence();
        $('h1').text('Level ' + level);
        start = true;
    }
})


$('.btn').click(function(event) {


    var userChosenColor = event.currentTarget.id;
    userClickPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickPattern.length - 1);

})



function nextSequence() {
    // Using to gengerate the next random answer pattern.
    level++
    $('h1').text('Level ' + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColor[randomNumber]
    gamePattern.push(randomChosenColor);
    $('.btn.' + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    console.log(gamePattern);

}

function playSound(color) {
    // sound to every buttons.
    new Audio('sounds/' + color + '.mp3').play();
}

function animatePress(color) {
    // The animation be used for clicking the butttons.
    $('.btn#' + color).addClass('pressed');
    setTimeout(() => {
        $('.btn#' + color).removeClass('pressed');
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickPattern[currentLevel] == gamePattern[currentLevel]) {
        if (userClickPattern.length == gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
            userClickPattern = [];
        }
    } else {
        $('h1').text('Game Over, Press Any Key to Restart')
        playSound('wrong');
        $('body').addClass('game-over');
        setTimeout(() => {
            $('body').removeClass('game-over');
        }, 200);
        startOver();
    }
}

function startOver() {
    level = 0;
    start = false;
    gamePattern = [];
}