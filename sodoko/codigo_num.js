var numSelected = null;
var errors = 0;
var currentBoardIndex = 0;

var boards = [
    [
        "--74916-5",
        "2---6-3-9",
        "-----7-1-",
        "-586----4",
        "--3----9-",
        "--62--187",
        "9-4-7---2",
        "67-83----",
        "81--45---"
    ],
    [
        "--32-8-1-",
        "67--2---5",
        "9-1----32",
        "-9---5-7-",
        "2--7---36",
        "3--5---2-",
        "-5---3--9",
        "3-6--2--4",
        "-4-6-1-7-"
    ],
    [
        "6--9---34",
        "--1-68--7",
        "--27---1-",
        "--89-12--",
        "----5----",
        "--31-64--",
        "-9---31--",
        "1--27-6--",
        "52---9--8"
    ],
    [
        "--8--9--5",
        "--54-6--9",
        "4---8---3",
        "-73-5-2--",
        "----8----",
        "--9-4-61-",
        "7---3---2",
        "8--1-52--",
        "5--6--8--"
    ],
    // Agrega más tableros aquí según sea necesario
    [
        "123456789",
        "456789123",
        "789123456",
        "234567891",
        "567891234",
        "891234567",
        "345678912",
        "678912345",
        "912345678"
    ],
    // Agrega más tableros aquí según sea necesario
];

var originalSolutions = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763",
    // Solución para el segundo tablero
    "453297816",
    "678124395",
    "291865732",
    "189453276",
    "527681943",
    "364759128",
    "856312479",
    "317946582",
    "942578631",
    // Solución para el tercer tablero
    "678925134",
    "341768925",
    "952743681",
    "567891243",
    "213456897",
    "489312564",
    "794586312",
    "135279468",
    "526134789",
    // Solución para el cuarto tablero
    "278431695",
    "135496287",
    "469278153",
    "987345216",
    "346812579",
    "512967438",
    "694783521",
    "821654973",
    "753129864",
    // Agrega más soluciones aquí según sea necesario
    "123456789",
    "456789123",
    "789123456",
    "234567891",
    "567891234",
    "891234567",
    "345678912",
    "678912345",
    "912345678"
    // Agrega más soluciones aquí según sea necesario
];

window.onload = function() {
    setGame();
    document.getElementById("new-game").addEventListener("click", startNewGame);
}

function setGame() {
    clearBoard();

    // Digits 1-9
    for (let i = 1; i <= 9; i++) {
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    // Board 9x9
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.innerText = boards[currentBoardIndex][r][c] !== '-' ? boards[currentBoardIndex][r][c] : '';
            if (boards[currentBoardIndex][r][c] === "-") {
                tile.addEventListener("click", selectTile);
            }
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }
            tile.classList.add("tile");
            document.getElementById("board").appendChild(tile);
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

        if (originalSolutions[currentBoardIndex][r * 9 + c] === numSelected.id) {
            this.innerText = numSelected.id;
        } else {
            errors += 1;
            document.getElementById("errors").innerText = "Errors: " + errors;
        }
    }
}

function startNewGame() {
    setGame();
}

function clearBoard() {
    document.getElementById("board").innerHTML = '';
    document.getElementById("digits").innerHTML = '';
    errors = 0;
    document.getElementById("errors").innerText = "Errors: " + errors;
}
