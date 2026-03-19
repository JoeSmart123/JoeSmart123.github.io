let timeLeft = 10;
let countdow;
let readyToReset = false;

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
                alert("times up");
            }

        }, 1000);
        timeLeft = 10;
        readyToReset = true;
    } else {
        alert("Do not attempt to beat the counter.")
    }
}