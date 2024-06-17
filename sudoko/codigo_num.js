var numSelected = null;
var errors = 0;
var startTime;
var timerInterval;

var board = [
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"
];

var solution = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
];

window.onload = function() {
    setGame();
    startTime = new Date().getTime();
    timerInterval = setInterval(updateTimer, 1000);

    document.getElementById("new-game").addEventListener("click", resetGame);
    document.getElementById("solve").addEventListener("click", solveGame);
}

function setGame() {
    for (let i = 1; i <= 9; i++) {
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if (board[r][c] != "-") {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}

function selectNumber() {
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}

function selectTile() {
    if (numSelected && this.innerText === "") {
        let coords = this.id.split("-");
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (solution[r][c] === numSelected.id) {
            this.innerText = numSelected.id;
        } else {
            errors++;
            document.getElementById("errors").innerText = "Errores: " + errors;
        }
    }
}

function solveGame() {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            document.getElementById(r.toString() + "-" + c.toString()).innerText = solution[r][c];
        }
    }
    clearInterval(timerInterval);
    alert("¡Has resuelto el juego!");
}

function resetGame() {
    errors = 0;
    document.getElementById("errors").innerText = "Errores: 0";
    board.forEach((row, rIndex) => {
        row.split("").forEach((cell, cIndex) => {
            let tile = document.getElementById(rIndex.toString() + "-" + cIndex.toString());
            tile.innerText = cell === "-" ? "" : cell;
        });
    });
    startTime = new Date().getTime();
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const currentTime = new Date().getTime();
    const elapsedTime = Math.floor((currentTime - startTime) / 1000);
    document.getElementById("timer").innerText = "Tiempo: " + elapsedTime + "s";
}

