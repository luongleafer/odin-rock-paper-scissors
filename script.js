let lastResult = "";
let isPlaying = true;

function getComputerChoice(){
    let choice = Math.floor(Math.random()*3);
    let wordChoice = "";
    switch (choice){
        case 0:
            wordChoice = "rock";
            break;
        case 1:
            wordChoice = "paper";
            break;
        case 2:
            wordChoice = "scissors";
            break;
    }
    return wordChoice;
}

function getHumanChoice(promtMsg){
    let humanChoice = "";
    do{
        humanChoice = prompt(`${promtMsg}\nPlease choose rock, paper or scissors: `).toLowerCase();
    } while (
        humanChoice !== "rock" &&
        humanChoice !== "paper" &&
        humanChoice !== "scissors"
    );
    return humanChoice.toLowerCase();
}

let humanScore = 0;
let computerScore = 0;

function playRound(humanChoice, computerChoice){
    if ( humanChoice === computerChoice){
        lastResult = `It's a tie! You and the computer both choose ${humanChoice}`
    }
    else if(
        (humanChoice === "rock" && computerChoice == "scissors") ||
        (humanChoice === "scissors" && computerChoice == "paper") ||
        (humanChoice === "paper" && computerChoice == "rock")
    ){
        lastResult = `You win! ${humanChoice} (you) beats ${computerChoice} (computer)`
        humanScore++;
    }
    else{
        lastResult = `You lose! ${computerChoice} (computer) beats ${humanChoice} (you)`
        computerScore++;
    }
    console.log(lastResult);
}

function playGame(rounds){
    const numRounds = Number(rounds) || 5;
    humanScore = 0;
    computerScore = 0;
    for(let i = 0; i<numRounds; ++i){
        let humanChoice = getHumanChoice(`${lastResult}\nRound ${i+1}`);
        let computerChoice = getComputerChoice();
        playRound(humanChoice,computerChoice);
    }
    console.log(`Final result: You: ${humanScore} Computer: ${computerScore}`);
    alert(`Final result: You: ${humanScore} Computer: ${computerScore}`);
    if(humanScore > computerScore){
        console.log("You win :D");
    }
    else if(humanScore < computerScore){
        console.log("You lose :(");
    }
    else {
        console.log("It's a tie :|");
    }

}


const humanSide = document.querySelector(".side#human");
humanSide.addEventListener(
    "click",
    (event)=>{
        if(event.target.classList.contains("selection")){
            // only run code when click on one of the rock, paper, scissors button
            showHumanChoice(event.target.classList[1]);
            showComputerChoice();
        }
    }
);

function showChoice(selectionDivList, choiceStr){
    selectionDivList.forEach(
        (div) => {
            if(div.classList.contains("selected")){
                div.classList.remove("selected");
            }
            if(div.classList.contains("unselected")){
                div.classList.remove("unselected");
            }
            if(div.classList[1] === choiceStr){
                div.classList.add("selected");
            }
            else{
                div.classList.add("unselected");
            }
        }
    );
}


function showComputerChoice(){
    const allComputerChoiceDiv = document.querySelectorAll(".computer.selection");
    const computerChoice = getComputerChoice();
    console.log(computerChoice);
    showChoice(allComputerChoiceDiv,computerChoice);    
}

function showHumanChoice(choiceStr){
    const allHumanChoiceDiv = document.querySelectorAll(".human.selection");
    showChoice(allHumanChoiceDiv,choiceStr);
}
