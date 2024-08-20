let lastResult = "";
let isPlaying = true;
let humanScore = 0;
let computerScore = 0;
let currentRound = 1;
const roundCountDiv = document.querySelector(".round>span");
roundCountDiv.textContent = currentRound;

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
    console.log(humanScore,computerScore);
    return lastResult;
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

const nextRoundButton = document.querySelector("#next-btn");
nextRoundButton.classList.add("transparent");
nextRoundButton.addEventListener("click", newRound);

function newRound(){
    currentRound++;
    roundCountDiv.textContent = currentRound.toString();
    resetSelection();
    isPlaying = true;
    nextRoundButton.classList.add("transparent");
}


const humanSide = document.querySelector(".side#human");
humanSide.addEventListener(
    "click",
    (event)=>{
        if(isPlaying){
        if(event.target.classList.contains("selection")){
            // only run code when click on one of the rock, paper, scissors button
            const humanChoice = event.target.classList[1];
            const computerChoice = getComputerChoice();
            const msg = playRound(humanChoice,computerChoice);
            showHumanChoice(humanChoice);
            showComputerChoice(computerChoice);
            showMsg(msg);
            showScore();
            isPlaying = false;
            nextRoundButton.classList.remove("transparent");
        }
    }
    }
);

function showChoice(selectionDivList, choiceStr){
    selectionDivList.forEach(
        (div) => {
            if(div.classList[1] === choiceStr){
                div.classList.add("selected");
            }
            else{
                div.classList.add("unselected");
            }
        }
    );
}


function showComputerChoice(choiceStr){
    const allComputerChoiceDiv = document.querySelectorAll(".computer.selection");
    console.log(choiceStr);
    showChoice(allComputerChoiceDiv, choiceStr);    
}

function showHumanChoice(choiceStr){
    const allHumanChoiceDiv = document.querySelectorAll(".human.selection");
    showChoice(allHumanChoiceDiv,choiceStr);
}

function resetSelection(){
    document.querySelectorAll(".selection").forEach(
        (div) => {
            if(div.classList.contains("selected")){
                div.classList.remove("selected");
            }
            if(div.classList.contains("unselected")){
                div.classList.remove("unselected");
            }
        }
    );
}

function showMsg(msgStr){
    const msgDiv = document.querySelector(".msg");
    msgDiv.textContent = msgStr;
}

function showScore(){
    const humanScoreDiv = document.querySelector("#human>.score"); 
    const computerScoreDiv = document.querySelector("#computer>.score"); 
    humanScoreDiv.textContent = humanScore.toString();
    computerScoreDiv.textContent = computerScore.toString();
}

