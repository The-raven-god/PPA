var currTile;
var otherTile;
var turns = 0;

var rows, columns;
var level = 1;

window.onload = function() {
    loadLevel();
}

function loadLevel() {
    level = document.getElementById("level-select").value;
    switch(level) {
        case "1":
            rows = 5;
            columns = 5;
            break;
        case "2":
            rows = 5;
            columns = 5;
            break;
        case "3":
            rows = 5;
            columns = 5;
            break;
        case "4":
            rows = 5;
            columns = 5;
            break;
        case "5":
            rows = 5;
            columns = 5;
            break;
    }
    turns = 0;
    document.getElementById("turns").innerText = turns;
    document.getElementById("win-message").style.display = "none";
    initializeBoard();
    initializePieces();
}

function initializeBoard() {
    const board = document.getElementById("board");
    board.innerHTML = '';
    board.style.width = `${81 * columns}px`;
    board.style.height = `${81 * rows}px`;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.src = "./images/blank.jpg";

            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            board.append(tile);
        }
    }
}

function initializePieces() {
    const pieces = document.getElementById("pieces");
    pieces.innerHTML = '';
    pieces.style.width = `${81 * columns}px`;

    let pieceNumbers = [];
    for (let i = 1; i <= rows * columns; i++) {
        pieceNumbers.push(i.toString());
    }
    pieceNumbers.reverse();

    for (let i = 0; i < pieceNumbers.length; i++) {
        let j = Math.floor(Math.random() * pieceNumbers.length);
        let tmp = pieceNumbers[i];
        pieceNumbers[i] = pieceNumbers[j];
        pieceNumbers[j] = tmp;
    }

    for (let i = 0; i < pieceNumbers.length; i++) {
        let tile = document.createElement("img");
        tile.src = `./images/nivel_${level}/` + pieceNumbers[i] + ".jpg";

        tile.addEventListener("dragstart", dragStart);
        tile.addEventListener("dragover", dragOver);
        tile.addEventListener("dragenter", dragEnter);
        tile.addEventListener("dragleave", dragLeave);
        tile.addEventListener("drop", dragDrop);
        tile.addEventListener("dragend", dragEnd);

        pieces.append(tile);
    }
}

function dragStart() {
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
    otherTile = this;
}

function dragEnd() {
    if (currTile.src.includes("blank")) {
        return;
    }
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;

    turns += 1;
    document.getElementById("turns").innerText = turns;
    checkWin();
}

function solvePuzzle() {
    let boardTiles = document.getElementById("board").getElementsByTagName("img");
    let index = 0;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            boardTiles[index].src = `./images/nivel_${level}/` + (rows * columns - (r * columns + c)) + ".jpg";
            index++;
        }
    }
    document.getElementById("win-message").style.display = "block";
}

function checkWin() {
    let boardTiles = document.getElementById("board").getElementsByTagName("img");
    let index = 0;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (!boardTiles[index].src.includes((rows * columns - (r * columns + c)) + ".jpg")) {
                return;
            }
            index++;
        }
    }
    document.getElementById("win-message").style.display = "block";
}



