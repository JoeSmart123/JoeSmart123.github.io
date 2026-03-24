import { tossCards } from "./cards.js";

const timer = document.getElementById("timer");

const mins = 1;
const secs = 30;
let ms = (mins * 60 + secs) * 1000;

function formatTime(ms) {
    let mins = Math.floor(ms / 60_000);
    let secs = Math.floor((ms % 60_000) / 1000);
    let msecs = Math.floor((ms % 1000) / 10);

    mins = String(mins);
    secs = String(secs).padStart(2, "0");
    msecs = String(msecs).padStart(2, "0");

    return `${mins}:${secs}:${msecs}`;
}

const timeInterval = setInterval(() => {
    ms -= 8;
    timer.innerHTML = formatTime(ms);

    let blinkFreq = ms / 10_000 * (2000 - 1000) + 1000;

    // linear timer alert
    if (ms <= 3000) {
        timer.style.color = ms % 500 >= 250 ? "red" : "";
    } else if (ms <= 10000) {
        timer.style.color = ms % 1000 >= 500 ? "red" : "";
    }

    if (ms <= 0) {
        clearInterval(timeInterval);
        tossCards();
        console.log("game over!");
    }
}, 8);