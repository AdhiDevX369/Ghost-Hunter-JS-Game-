
//---------Welcome to GHOST HUNTER---------//

//__________SOUN EFFECT AND OTHER VARIABLES__________//

var deadSound = new Audio("dead.mp3");
var runSound = new Audio("run.mp3");
var jumpSound = new Audio("jump.mp3");
var backgroundSound = new Audio("background.mp3");
var winSound = new Audio("win.wav");
var welcome = document.getElementById("welcome");
var finish = document.getElementById("finish");


//_____KEY___FUNCTIONS_____//


function keyCheck(event) {
    var keyCode = event.which;

    //Enter___Boy___Run___Key_____//    

    if (keyCode == 13) {

        if (boyRunWorkerNumber == 0) {
            boyRunWorkerNumber = setInterval(boyRunAnmation, 100);
        }
        if (backgroundWorkerNumber == 0) {
            backgroundWorkerNumber = setInterval(backgroundMove, 100);
        }
        if (moveBoxesAnimationId == 0) {
            moveBoxesAnimationId = setInterval(moveBoxes, 100);
        }
        runSound.play();
        backgroundSound.play();
        welcome.style.visibility = "hidden";
        if (finishWorkerNumber == 0) {
            finishWorkerNumber = setInterval(finishGame, 100);
        }
    }

    //Space____Boy___Jump__Key_____//

    if (keyCode == 32) {

        if (boyJumpWorkerNumber == 0) {
            clearInterval(boyRunWorkerNumber);
            boyJumpWorkerNumber = setInterval(boyJumpAnimation, 100);
        }
        if (moveBoxesAnimationId == 0) {
            moveBoxesAnimationId = setInterval(moveBoxes, 100);
        }
        runSound.pause();
        jumpSound.play();
        backgroundSound.play();
        welcome.style.visibility = "hidden";
    }
}


//_____BOY___RUN_____//

var boyRunImageNumber = 1;
var boyRunWorkerNumber = 0;
var score = 0;
var s = document.getElementById("score");

function boyRunAnmation() {
    score = score + 1;
    s.innerHTML = score;

    boyRunImageNumber = boyRunImageNumber + 1;

    if (boyRunImageNumber == 9) {
        boyRunImageNumber = 1;
    }
    if (finishWorkerNumber == 0) {
        finishWorkerNumber = setInterval(finishGame, 100);
    }

    document.getElementById("boy").src = "Run (" + boyRunImageNumber + ").png";
}


//_____BOY___JUMP_____//

var boyJumpImageNumber = 1;
var boyJumpWorkerNumber = 0;
var boyMarginTop = 380;

function boyJumpAnimation() {
    score = score + 5;
    s.innerHTML = score;

    boyJumpImageNumber = boyJumpImageNumber + 1;

    if (boyJumpImageNumber <= 7) {
        boyMarginTop = boyMarginTop - 20;
        document.getElementById("boy").style.marginTop = boyMarginTop + "px";
    }
    if (boyJumpImageNumber >= 8) {
        boyMarginTop = boyMarginTop + 20;
        document.getElementById("boy").style.marginTop = boyMarginTop + "px";
    }

    if (boyJumpImageNumber == 13) {
        clearInterval(boyJumpWorkerNumber);
        boyJumpWorkerNumber = 0;
        boyJumpImageNumber = 1;

        boyRunWorkerNumber = setInterval(boyRunAnmation, 100);
        runSound.play();

        if (backgroundWorkerNumber == 0) {
            backgroundWorkerNumber = setInterval(backgroundMove, 100);

        }
        if (finishWorkerNumber == 0) {
            finishWorkerNumber = setInterval(finishGame, 100);
        }

    }
    document.getElementById("boy").src = "Jump (" + boyJumpImageNumber + ").png";
}


//_____BACKGROUND___ANIMATIONS_____//


var backgroundMarginLeft = 0;
var backgroundWorkerNumber = 0;

function backgroundMove() {
    backgroundMarginLeft = backgroundMarginLeft - 20;

    document.getElementById("background").style.backgroundPositionX = backgroundMarginLeft + "px";
}


//_____BOX___ANIMATIONS_____//



var moveBoxesAnimationId = 0;
var boxMarginLeft = 1000;

function createBoxes() {


    for (var i = 0; i < 10; i++) {

        var box = document.createElement("div");
        box.className = "box";
        box.id = "box" + i;
        box.style.marginLeft = boxMarginLeft + "px";
        boxMarginLeft = boxMarginLeft + 500

        document.getElementById("background").appendChild(box);

    }
}




function moveBoxes() {
    for (var i = 0; i < 10; i++) {
        var box = document.getElementById("box" + i);
        var currentMarginLeft = getComputedStyle(box).marginLeft;
        var newMarginleft = parseInt(currentMarginLeft) - 20;
        box.style.marginLeft = newMarginleft + "px";

        //alert(newMarginleft);
        //60px-200px
        if (newMarginleft >= 70 & newMarginleft <= 200) {
            if (boyMarginTop >= 345) {
                clearInterval(moveBoxesAnimationId);

                clearInterval(boyRunWorkerNumber);
                boyRunWorkerNumber = -1;

                clearInterval(backgroundWorkerNumber);

                clearInterval(boyJumpWorkerNumber);
                boyJumpWorkerNumber = -1;

                boyDeadWorkerNumber = setInterval(boyDeadAnimation, 100);
                runSound.pause();
                jumpSound.pause();
                backgroundSound.pause();
                deadSound.play();
                if (finishWorkerNumber == 0) {
                    finishWorkerNumber = setInterval(finishGame, 100);
                }
            }
        }
    }
}

//_____END___GAME_____//


finishWorkerNumber = 0;
function finishGame() {
    if (score == 800) {
        finish.style.visibility = "visible";
        clearInterval(boyRunWorkerNumber);
        clearInterval(boyJumpWorkerNumber);
        boyJumpImageNumber = 1;
        clearInterval(moveBoxesAnimationId);
        clearInterval(backgroundWorkerNumber);
        runSound.pause();
        jumpSound.pause();
        backgroundSound.pause();
        winSound.play();
        boyRunImageNumber = 1;
    }
}


//_____BOY___DEAD_____//


var boyDeadImageNumber = 1;
var boyDeadWorkerNumber = 0;

function boyDeadAnimation() {
    boyDeadImageNumber = boyDeadImageNumber + 1;

    if (boyDeadImageNumber == 11) {
        boyDeadImageNumber = 10;
        clearInterval(boyDeadWorkerNumber);
        document.getElementById("endGame").style.visibility = "visible";
        document.getElementById("endScore").innerHTML = score;
        runSound.pause();
        jumpSound.pause();
        backgroundSound.pause();
    }

    document.getElementById("boy").src = "Dead (" + boyDeadImageNumber + ").png";
}

function newGame() {
    location.reload();
}



















