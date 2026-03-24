const wordList = await fetch("charades_words.json").then(res => res.json());
const cardStack = document.getElementById("card-stack");

function newCard(fadeIn = true) {
    // initialize card
    const card = document.createElement("li");
    card.classList.add("game-card");
    card.classList.add("cgrid");
    card.innerHTML = wordList[Math.floor(Math.random() * wordList.length)];
    
    // randomize position and rotation
    const angle = Math.random() * 10 - 5;
    const x = Math.random() * 20 - 10;
    const y = Math.random() * 20 - 10;
    card.dataset.baseTransform = `rotateZ(${angle}deg) translateX(${x}px) translateY(${y}px)`;
    card.style.transform = card.dataset.baseTransform;
    cardStack.prepend(card);
    
    // fade card into view
    card.style.opacity = fadeIn ? 0 : 1;
    card.style.transition = "opacity 1s";
    void card.offsetHeight; // force reflow (reading offsetHeight triggers reflow)
    card.style.opacity = 1;
    setTimeout(() => card.style.transition = "", fadeIn ? 1000 : 0);
    
    return card;
}
dragElement(newCard(false));
newCard(false)
newCard(false)
newCard(false)
newCard(false)

function dragElement(card) {
    let x1 = 0;
    let x2 = 0;
    card.onpointerdown = dragMouseDown;

    const cooldown_quality = 30; // ms between cooldown frames
    card.style.setProperty("--cooldown", 100);
    const skip_cooldown = setInterval(() => {
        let cooldown = getComputedStyle(card).getPropertyValue("--cooldown");
        cooldown -= 100/(15000/cooldown_quality);
        card.style.setProperty("--cooldown", cooldown);
        
        if (cooldown <= 0) {
            card.style.setProperty("--cooldown", 0);
            card.classList.add("play-skip-anim");
            clearInterval(skip_cooldown);
        }
    }, cooldown_quality);

    function dragMouseDown(e) {
        e.preventDefault();

        card.style.transition = "opacity 500ms";

        // get the initial pointer position
        x1 = e.clientX;

        document.onpointerup = closeDragElement;
        document.onpointermove = elementDrag;
    }

    function elementDrag(e) {
        e.preventDefault();

        // calculate new pointer position
        x2 = x1 - e.clientX;
        x1 = e.clientX;

        let distance = parseInt(card.style.left);
        let cooldown = getComputedStyle(card).getPropertyValue("--cooldown");
        document.body.style.background = distance < -50 ? ( cooldown <= 0 ? "var(--alert)" : "var(--accent)" ) : distance > 50 ? "var(--accent2)" : "";

        // set card's new position
        card.style.left = card.offsetLeft - x2 + "px";
    }

    function closeDragElement(e) {
        // calculate card distance
        let distance = parseInt(card.style.left);

        card.style.transition = "left 500ms, opacity 500ms";
        document.body.style.background = ""
        document.onpointerup = null;
        document.onpointermove = null;

        if (
            distance < -50 &&
            getComputedStyle(card).getPropertyValue("--cooldown") <= 0
        ) {
            // remove card from stack
            card.style.left = `${distance - 300}px`;
            card.style.opacity = "0";
            card.onpointerdown = null;

            setTimeout((e) => {
                newCard();
                card.remove();
            }, 500);

            // make next card draggable
            dragElement(card.previousSibling);

            // dicard the card
            console.log("Discarded " + card.innerHTML);

        } else if (
            distance > 50
        ) {
            // remove card from stack
            card.style.left = `${distance + 300}px`;
            card.style.opacity = "0";
            card.onpointerdown = null;

            newCard()

            // make next card draggable
            dragElement(card.previousSibling);

            // add a point
            console.log("+1 Point!");
            
            setTimeout(() => {
                card.remove()
            }, 500);

        } else {
            // return card to center
            card.style.left = "";
        }
    }
}

export function tossCards() {
    document.onpointermove = null;
    document.onpointerup = null;

    for (let _ = 0; _ < 5; _++) {
        newCard(false);
    }

    cardStack.childNodes.forEach((card) => {
        card.onpointerdown = null;

        const direction = Math.random() < 0.5 ? -1 : 1;
        let [x, y] = [0, 0];
        
        const Vx = (Math.random() * 5) * direction;
        let Vy = Math.random() * 5 + 3;
        const Ay = -0.25;

        const cardInterval = setInterval(() => {
            x += Vx;
            y += Vy;

            const lowerBounds = -(window.innerHeight + card.getBoundingClientRect().height) / 2;
            if (y < lowerBounds) {
                card.remove();
                clearInterval(cardInterval);
            }

            card.style.transform = `${card.dataset.baseTransform} translateX(${x}px) translateY(${-y}px)`;

            Vy += Ay;
        }, 20);
    })
}