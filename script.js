const Gameboard = (() => {
    let gameboard = ['', '', '', '', '', '', '', '', '',];
    let currentPlayer = 'X';
    let running = false; 

    const cells = document.querySelectorAll('.cell');
    const restartButton = document.querySelector('#restartButton');
    const gameStatus = document.querySelector('#gameStatus');
    const winCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [2,4,6],
        [0,4,8]
    ];

    initialize();

    function initialize() {
        cells.forEach(cell => cell.addEventListener("click", cellClick));       //for each cell, we'll take our cell and add an event listener
        restartButton.addEventListener("click", gameReset);
        gameStatus.textContent = `${currentPlayer}'s turn`;
        running = true;                                                     //so game is considered running
    };

    function cellClick() {
        const cellIndex = this.getAttribute('cellIndex');           //this for whatever cell that we click on, getting index attribute from html

        if(gameboard[cellIndex] != '' || !running) {            //if the gameboard array DOES NOT have an empty cell, OR if game is not running, then we return (not do anything)
            return;
        }

        updateCell(this, cellIndex);                         //OTHERWISE, we will invoke updateCell(), passing 'this' as argument as well as the cell's index
        changePlayer();                                     //change player each round
        checkWinner();
                                
    }

    function updateCell(cell, index) {
        gameboard[index] = currentPlayer;      //take the index of the gameboard, set it to current player - updating our placeholders
        cell.textContent = currentPlayer;

    }

    function changePlayer() {
        currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';
        gameStatus.textContent = `${currentPlayer}'s turn`;
    }


    function checkWinner() {                           
        for(const condition of winCombinations) {
            let [a, b, c] = condition

            if(gameboard[a] && (gameboard[a] == gameboard[b] && gameboard[a] == gameboard[c])) {
                changePlayer();
                gameStatus.textContent = `${currentPlayer} wins!`;
                running = false;
                return [a, b, c];
            } else if (!gameboard.includes("")) {
                gameStatus.textContent = 'Draw!!';
                running = false;
            }
        }
        return false;
    }

    function gameReset() {
        currentPlayer = 'X';
        gameStatus.textContent = `${currentPlayer}'s turn`;
        gameboard = ['', '', '', '', '', '', '', '', '',];
        cells.forEach(cell => cell.textContent = '');
        running = true;
    };

   

}) ();









