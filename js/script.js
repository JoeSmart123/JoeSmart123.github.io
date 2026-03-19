let timeLeft = 10;
let countdow;
let readyToReset = false;
let currentWord = "Please Generate"

function sayHello() {
    alert("Hello World!");
}

function makeGreen() {
    if (document.getElementById("box").style.backgroundColor === "green") {
        document.getElementById("box").style.backgroundColor = "red";
        console.log("daswdwd");
    } else {
        document.getElementById("box").style.backgroundColor = "green";
    }
}

function startTimer() {
    if (!readyToReset) {
        countdown = setInterval(function () {
            timeLeft--;
            document.getElementById("timer").textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(countdown);
            }

        }, 1000);
        timeLeft = 10;
        readyToReset = true;
    }
}

function init() {
    makeGreen();
    setTimeout(() => {
        window.location.href = "/startingpage.html";
    }, 750);
}

function generate() {
    makeGreen();
    startTimer();
}