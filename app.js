const clickSound = new Audio("click.mp3");
const winSound = new Audio("win.mp3");
const loseSound = new Audio("lose.mp3");
const tieSound = new Audio("tie.mp3");
const resetSound = new Audio("reset.mp3");

//banner
const banner = document.getElementById("winner-banner");


//animaation
const animateMsg = () => {
    msg.style.animation = "none";
    msg.offsetHeight; // trigger reflow
    msg.style.animation = "slideUp 0.3s ease";
};

//glow
const computerChoiceIcon = document.getElementById("computer-choice-icon");
const removeGlow = () => {
    console.log('choices:', choices);
    console.log('computerChoiceIcon:', computerChoiceIcon);
    choices.forEach(choice => {
        choice.classList.remove("glow", "pulse-glow");
    });
    computerChoiceIcon.classList.remove("glow", "pulse-glow", "computer-pulse");

};



const showBanner = (text, type) => {
    banner.innerText = text;

    // remove old classes
    banner.className = "";
    banner.classList.add("banner-show", type);

    // reset animation so it plays every time
    banner.style.animation = "none";
    banner.offsetHeight;
    banner.style.animation = "bannerSlide 2s ease-in-out";
};

let userScore = 0;
let computerScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.getElementById("msg");

const updateUserScoreboard = document.querySelector('#userscore');
const updateCompScoreboard = document.querySelector('#computerscore');

const getComputerChoice = () => {
    const options = ['rock', 'paper', 'scissor'];
    //generates between 0 and 2
    //floor removes decimal value
    const randomIndex = Math.floor(Math.random()*3);
    return options[randomIndex];
}


const playGame = (userChoice) => {
    // console.log("Game Started");
    // console.log("User choice is: ", userChoice);
    const computerChoice = getComputerChoice();

    // Update computer choice icon
    if (computerChoice === "rock") {
    computerChoiceIcon.innerText = "✊🏻";
    } else if (computerChoice === "paper") {
        computerChoiceIcon.innerText = "🤚🏻";
    } else {
        computerChoiceIcon.innerText = "✌🏻";
    }

    computerChoiceIcon.style.animation = "none";
    computerChoiceIcon.offsetHeight;
    computerChoiceIcon.style.animation = "pop 0.3s ease";

    // console.log("Computer choice is: ", computerChoice);

    if(userChoice === computerChoice) {
        // console.log("It's a tie!");
        tieSound.currentTime = 0;
        tieSound.play();
        msg.innerText = "It's a tie! Try again.";
        removeGlow();
        animateMsg();
        msg.style.backgroundColor = "white";
        msg.style.color = "black";
        showBanner("🤝 IT'S A TIE!", "banner-tie");
        banner.style.color = "black";

    } else if (
        (userChoice === 'rock' && computerChoice === 'scissor') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissor' && computerChoice === 'paper')
    ) {
        userScore++;
        winSound.currentTime = 0;
        winSound.play();
        updateUserScoreboard.innerText = userScore;
        // console.log("You win!");
        msg.innerText = `You win! Your ${userChoice} beats ${computerChoice}`;
        animateMsg();

        //glow
        removeGlow();
        document.getElementById(userChoice).classList.add("pulse-glow");

        msg.style.backgroundColor = "rgba(153, 246, 142, 0.5)";
        msg.style.color = "black";

        showBanner("🎉 YOU WIN!", "banner-win");
        banner.style.color = "black";
        
    } else {
        computerScore++
        loseSound.currentTime = 0;
        loseSound.play();
        updateCompScoreboard.innerText = computerScore;
        // console.log("Computer wins!");
        msg.innerText = "You Lose! " + computerChoice + " beats your " + userChoice;
        animateMsg();
        //glow
        removeGlow();
        computerChoiceIcon.classList.add("pulse-glow",'glow');
        msg.style.backgroundColor = "rgba(216, 112, 147, 0.5)";
        msg.style.color = "black";

        showBanner("😢 YOU LOSE!", "banner-lose");
        banner.style.color = "black";
        
    }

    // console.log(`Scores => You: ${userScore}, Computer: ${computerScore}`);
}

choices.forEach((choice) => {
    console.log(choice);
    choice.addEventListener("click", () => {
        clickSound.currentTime = 0;
        clickSound.play();
        const userChoice = choice.getAttribute("id");
        // console.log("You clicked a choice", userChoice);
        playGame(userChoice);
    })
})

// Reset Game Functionality
const resetButton = document.getElementById("resetbtn");
computerChoiceIcon.innerText = "❔";
msg.style.animation = "none";
msg.offsetHeight;
msg.style.animation = "slideUp 0.3s ease";

resetButton.addEventListener("click", () => {
    resetSound.currentTime = 0;
    resetSound.play();
    userScore = 0;
    computerScore = 0;
    updateUserScoreboard.innerText = userScore;
    updateCompScoreboard.innerText = computerScore;
    msg.innerText = "Play your move";
    msg.style.backgroundColor = "rgb(151, 212, 250)";
    msg.style.color = "black";
    computerChoiceIcon.innerText = "❔";
    removeGlow();
    animateMsg();
    banner.innerText = "";
    banner.className = "";

});