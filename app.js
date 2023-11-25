const boxesCtn = document.querySelector(".gameBoard");
const boxes = document.querySelectorAll(".box");
const startBtn = document.querySelector(".start-btn");

const GameBoard = (function () {
    const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const playerTurn = 1;   // 1 == player1 turn and 0 == player2 turn
    const chanceCount = 0; 
    return {
        arr, playerTurn, chanceCount
    }
})();

function createPlayer(name,selection) {
    const score = 0;
    const win = 0;
    const choice = selection;
    return {name,score,win,choice}
}

/* const player1 = createPlayer("Abdullah","X");
const player2 = createPlayer("Arman", "O"); */

startBtn.addEventListener("click", startGame);

function startGame() {
    boxesCtn.classList.remove("hide");
    boxesCtn.innerHTML = `<div class="box" data-key="0"></div>
    <div class="box" data-key="1"></div>
    <div class="box" data-key="2"></div>
    <div class="box" data-key="3"></div>
    <div class="box" data-key="4"></div>
    <div class="box" data-key="5"></div>
    <div class="box" data-key="6"></div>
    <div class="box" data-key="7"></div>
    <div class="box" data-key="8"></div>`
}


boxes.forEach((box) => {
    box.addEventListener("click", addMark);
})

function addMark(e) {
    let markIndex = e.target.dataset.key;
    
    if (GameBoard.playerTurn) {
        e.target.textContent = player1.choice;
        GameBoard.playerTurn = 0;
        GameBoard.arr[markIndex] = player1.choice;
        checkWin(player1.name);
    }
    else {
        e.target.textContent = player2.choice;
        GameBoard.playerTurn = 1;
        GameBoard.arr[markIndex] = player2.choice;
        checkWin(player2.name);
    }
    console.log(GameBoard.arr);
    boxes[markIndex].removeEventListener("click", addMark);
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

function checkWin(user) {
    GameBoard.chanceCount++;
    if ((GameBoard.arr[0]===GameBoard.arr[1])&&(GameBoard.arr[1]===GameBoard.arr[2]) || (GameBoard.arr[0]===GameBoard.arr[3])&&(GameBoard.arr[3]===GameBoard.arr[6]) || (GameBoard.arr[6]===GameBoard.arr[7])&&(GameBoard.arr[7]===GameBoard.arr[8]) || (GameBoard.arr[2]===GameBoard.arr[5])&&(GameBoard.arr[5]===GameBoard.arr[8]) || (GameBoard.arr[0]===GameBoard.arr[4])&&(GameBoard.arr[4]===GameBoard.arr[8]) || (GameBoard.arr[2]===GameBoard.arr[4])&&(GameBoard.arr[4]===GameBoard.arr[6]) || (GameBoard.arr[1]===GameBoard.arr[4])&&(GameBoard.arr[4]===GameBoard.arr[7])) {
        console.log(`${user} Wins`);
        boxes.forEach((box) => {
            box.removeEventListener("click", addMark);
        })
    }
    
    else if (GameBoard.chanceCount === 9) {
        console.log("Draw");
    }
}



