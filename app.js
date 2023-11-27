const boxesCtn = document.querySelector(".gameBoard");
/* const startBtn = document.querySelector(".start-btn"); */
const playerModeCtn = document.querySelector(".playermode");
const human_mode = document.querySelector(".human");
const robot_mode = document.querySelector(".robot");


const GameBoard = (function () {
    const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const playerTurn = 1;   // 1 == player1 turn and 0 == player2 turn
    const chanceCount = 0; 
    const boxes = 0;
    const robotChoices = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const player1 = "ply1";
    const player2 = "ply2";
    return {
        arr, playerTurn, chanceCount,boxes,robotChoices,player1,player2
    }
})();

function restart() {
    GameBoard.arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    GameBoard.playerTurn = 1;
    GameBoard.chanceCount = 0;
}

function createPlayer(name,selection) {
    const wins = 0;
    const choice = selection;
    return {name,wins,choice}
}

/* const player1 = createPlayer("Abdullah","X");
const player2 = createPlayer("Arman", "O"); 


/* startBtn.addEventListener("click", startGame); */

function setBoard() {
    boxesCtn.classList.remove("hide");
    boxesCtn.innerHTML = `<div class="box" data-key="0"></div>
    <div class="box" data-key="1"></div>
    <div class="box" data-key="2"></div>
    <div class="box" data-key="3"></div>
    <div class="box" data-key="4"></div>
    <div class="box" data-key="5"></div>
    <div class="box" data-key="6"></div>
    <div class="box" data-key="7"></div>
    <div class="box" data-key="8"></div>`;
    GameBoard.boxes = document.querySelectorAll(".box");
}
/****************** VS HUMAN MODE ALL RELATED CODE******************/
function setVsHuman() {
    setBoard();
    GameBoard.boxes.forEach((box) => {
        box.addEventListener("click", addMark);
    })
}

function addMark(e) {
    let markIndex = e.target.dataset.key;
    
    if (GameBoard.playerTurn) {
        e.target.textContent = GameBoard.player1.choice;
        GameBoard.arr[markIndex] = GameBoard.player1.choice;
        if (checkWin()) {
            removeHumanMark();
            announceResult(checkWin());
        };
        GameBoard.playerTurn = 0;
    }
    else {
        e.target.textContent = GameBoard.player2.choice;
        GameBoard.arr[markIndex] = GameBoard.player2.choice;
        if (checkWin()) {
            removeHumanMark();
            announceResult(checkWin());
        };
        GameBoard.playerTurn = 1;
    }
    console.log(GameBoard.arr);
    GameBoard.boxes[markIndex].removeEventListener("click", addMark);
}

function checkWin() {
    GameBoard.chanceCount++;
    if ((GameBoard.arr[0]===GameBoard.arr[1])&&(GameBoard.arr[1]===GameBoard.arr[2]) || (GameBoard.arr[0]===GameBoard.arr[3])&&(GameBoard.arr[3]===GameBoard.arr[6]) || (GameBoard.arr[6]===GameBoard.arr[7])&&(GameBoard.arr[7]===GameBoard.arr[8]) || (GameBoard.arr[2]===GameBoard.arr[5])&&(GameBoard.arr[5]===GameBoard.arr[8]) || (GameBoard.arr[0]===GameBoard.arr[4])&&(GameBoard.arr[4]===GameBoard.arr[8]) || (GameBoard.arr[2]===GameBoard.arr[4])&&(GameBoard.arr[4]===GameBoard.arr[6]) || (GameBoard.arr[1]===GameBoard.arr[4])&&(GameBoard.arr[4]===GameBoard.arr[7])) {
        return 1;
    }
    
    else if (GameBoard.chanceCount === 9) {
        return 2;
    }

    return 0; // If No one wins or draw
}

function announceResult(score) {
    if (score == 1) {
        console.log(`${getNameOfWinner(GameBoard.playerTurn)} Wins`);
    }

    else if (score == 2) {
        console.log("Draw");
    }
    console.log(score);
}

function getNameOfWinner(boolean) {
    if (boolean === 1) {
        return GameBoard.player1.name;
    } else {
        return GameBoard.player2.name;
    }
}

/* ****************************************** */

function removeHumanMark() {
    GameBoard.boxes.forEach((box) => {
        box.removeEventListener("click", addMark);
    })
}

function removeAutomaticMark() {
    GameBoard.boxes.forEach((box) => {
        box.removeEventListener("click", automaticMark);
    })
}

/****************** VS ROBOT MODE ALL RELATED CODE******************/
function setVsRobot() {
    setBoard();
    GameBoard.boxes.forEach((box) => {
        box.addEventListener("click", automaticMark);
    })
}

function automaticMark(e) {
    let markIndex = e.target.dataset.key;
    e.target.textContent = GameBoard.player1.choice; 
    GameBoard.arr[markIndex] = GameBoard.player1.choice;
    GameBoard.boxes[markIndex].removeEventListener("click", automaticMark);
    if (checkWin()) {
        removeAutomaticMark();
        announceResult(checkWin());
    } else {
        updateRobotChoices();
        GameBoard.playerTurn = 0;
        playRobot();
    }
}

function playRobot() {
    const randomChoice = Math.floor(Math.random() * GameBoard.robotChoices.length);
    const robotFinalChoice = GameBoard.robotChoices[randomChoice];
    GameBoard.boxes[robotFinalChoice].textContent = GameBoard.player2.choice;
    GameBoard.boxes[robotFinalChoice].removeEventListener("click", automaticMark);
    GameBoard.arr[robotFinalChoice] = GameBoard.player2.choice;
    if (checkWin()) {
        removeAutomaticMark();
        announceResult(checkWin());
    } else {
        updateRobotChoices();
        GameBoard.playerTurn = 1;
    }
}

function updateRobotChoices() {
    GameBoard.robotChoices = GameBoard.arr.filter((item) => {
        if ((item == "X") || (item == "O")) {
            return false;
        } else {
            return true;
        }
    })
    console.log(GameBoard.robotChoices);
}

/* *************************************** */


/* SETIING SELECTION PAGE WHERE USER CAN CHOOSE HIS MARK */

const selectionCtn = document.querySelector(".selection-ctn");
const player2DetailCtn = document.querySelector(".player2-details");
const player1TextInput = document.getElementById("ply1Name");
const player2TextInput = document.getElementById("ply2Name");
const crossSelectionBtn = document.querySelector(".cross-selection");
const circleSelectionBtn = document.querySelector(".circle-selection");

human_mode.addEventListener("click", displayHumanSelection);
robot_mode.addEventListener("click", displayRobotSelection);

function displayHumanSelection() {
    playerModeCtn.classList.add("hide");
    selectionCtn.classList.remove("hide");
    startGame("Human");
}

function displayRobotSelection() {
    playerModeCtn.classList.add("hide");
    selectionCtn.classList.remove("hide");
    player2DetailCtn.classList.add("hide");
    startGame("Robot");
}

/* SETTING THE GAME NOW */
function startGame(gameMode) {
    if (gameMode === "Human") {
        crossSelectionBtn.addEventListener("click", setVsHumanPlayers);
        circleSelectionBtn.addEventListener("click", setVsHumanPlayers);
    } else {
        crossSelectionBtn.addEventListener("click", setVsRobotPlayers);
        circleSelectionBtn.addEventListener("click", setVsRobotPlayers);
    }
}

function setVsHumanPlayers(e) {
    GameBoard.player1 = createPlayer(player1TextInput.value, e.currentTarget.textContent);
    if (GameBoard.player1.choice === "X") {
        GameBoard.player2 = createPlayer(player2TextInput.value, "O");
    } else {
        GameBoard.player2 = createPlayer(player2TextInput.value, "X");
    }
    console.log(GameBoard.player1);
    console.log(GameBoard.player2);
    selectionCtn.classList.add("hide");
    setVsHuman();
}

function setVsRobotPlayers(e) {
    GameBoard.player1 = createPlayer(player1TextInput.value, e.currentTarget.textContent);
    if (GameBoard.player1.choice === "X") {
        GameBoard.player2 = createPlayer("Robot", "O");
    } else {
        GameBoard.player2 = createPlayer("Robot", "X");
    }
    console.log(GameBoard.player1);
    console.log(GameBoard.player2);
    selectionCtn.classList.add("hide");
    setVsRobot();
}

/* function addHover(e) {
    console.log(e);
    if (GameBoard.playerTurn) {
        e.currentTarget.textContent = player1.choice;
        GameBoard.playerTurn = 0;
    }
    else {
        e.target.textContent = player2.choice;
        GameBoard.playerTurn = 1;
    }
} */