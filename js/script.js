let timeLeft = 10;
let countdow;
let readyToReset = false;
let currentWord = "Please Generate"
let teams = [];


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

function createTeam(names) {
    let nameString = names;
    if (nameString.charAt(nameString.length - 1) === " ") {
        nameString = nameString.trim();
    }

    let name = nameString.replaceAll(" ", " & ");
    
    teams.push({name, score: 0});

    renderTeams();
}

function addPoint(index) {
    teams[index].score++;
    if (document.URL.includes("scoreboard")) {
        renderTeams();      
    }
}

function removePoint(index) {
    if (teams[index].score <= 0) {
        alert("No points to remove");
    } else {
        teams[index].score--;
    }
    renderTeams();
}

function removeTeam(index) {
    if (confirm("Are you sure you want to remove this team?")) {
        teams.splice(index, 1);
        renderTeams();    
    }
    
}

function renderTeams() {
    const container = document.getElementById("teamsContainer");
    container.innerHTML = "";

    teams.forEach((team, index) => {
        container.innerHTML += `
            <div class="team">
                <p>${team.name}</p>
                <p>Score: ${team.score}</p>
                <div class="teamButtons">
                    <button id="teamBox" onclick="addPoint(${index})">+1</button>
                    <button id="teamBox" onclick="removeTeam(${index})">RemoveTeam</button>
                    <button id="teamBox" onclick="removePoint(${index})">-1</button>
                </div>
            </div>
        `;
    });
}

function teamStatPopUp() {

}

function addTeam() {
    let names = document.getElementById("p1").value;
    
    createTeam(names);
}

function goToScoreboard() {
    window.location.href = "scoreboard.html";
    renderTeams();
}
