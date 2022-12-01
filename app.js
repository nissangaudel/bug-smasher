
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth * 0.7;
canvas.height = window.innerHeight * 0.75;
document.body.appendChild(canvas);

const scoreText = document.querySelector("#score");
const restartBtn = document.querySelector("#restart");
const resetBtn = document.querySelector("#reset");


var drawnFirst = false;

var score = 0;
var missed = 0;
var currentPos;

var counter = 0;

var bugImage = new Image();

var reapeter;

resetBtn.addEventListener('click', () => {
    score = 0;
    setSpeed();
    setScore();
    console.log('clicked');
})

restartBtn.addEventListener('click', () => {
    score = 0;
    setSpeed();
    setScore();
    console.log('clicked');
})





bugLoaded = false;

bugImage.onload = () => { bugLoaded = true; }

bugImage.src = "img/bug.png";

var renderBug = function () {

    currentPos = randPos();

    if (bugLoaded) {
        ctx.drawImage(bugImage, currentPos[0], currentPos[1]);
    }

}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    }
}


canvas.addEventListener('click', (e) => {
    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    if (bugKilled(e)) {
        score++;
        setScore();

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        currentPos = randPos();

        setSpeed();

    }
})

var bugKilled = (e) => {
    if (getMousePos(canvas, e).x - currentPos[0] <= 40 && getMousePos(canvas, e).x - currentPos[0] >= 0) {
        if (getMousePos(canvas, e).y - currentPos[1] <= 40 && getMousePos(canvas, e).y - currentPos[1] >= 0) {
            return true;
        } else {
            false;
        }
    }
}

var randPos = function () {
    posX = Math.floor((Math.random() * canvas.width) - 20);
    posY = Math.floor((Math.random() * canvas.height) - 20);

    let randPos = [];
    randPos.push(posX);
    randPos.push(posY);

    return randPos;
}

var setScore = () => {
    scoreText.innerText = `Score: ${score.toString()}`;
}

var setSpeed = () => {
    if (score <= 5) {
        clearInterval(reapeter);
        reapeter = setInterval(jumpBug, 2000);
        return;
    } else if (score > 5 && score <= 10) {
        clearInterval(reapeter);
        reapeter = setInterval(jumpBug, 1700);
        return;
    } else if (score > 10 && score <= 15) {
        clearInterval(reapeter);
        reapeter = setInterval(jumpBug, 1400);
        return;
    } else if (score > 15 && score <= 20) {
        clearInterval(reapeter);
        reapeter = setInterval(jumpBug, 1100);
        return;
    } else if (score > 20 && score <= 25) {
        clearInterval(reapeter);
        reapeter = setInterval(jumpBug, 1000);
        return;
    } else if (score > 25 && score <= 50) {
        clearInterval(reapeter);
        reapeter = setInterval(jumpBug, 900);
        return;
    } else {
        clearInterval(reapeter);
        reapeter = setInterval(jumpBug, 800);
        return;
    }
}

function jumpBug() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    setTimeout(() => {
        renderBug();
    }, 500);
}

if (drawnFirst === false) {
    jumpBug();
    drawnFirst = true;
}

function main() {
    reapeter = setInterval(jumpBug, 2000);

}

main();