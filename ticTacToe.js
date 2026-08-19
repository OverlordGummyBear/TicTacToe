function GameBoard(){
    const rows = 3;
    const columns = 3;
    const board = [];

    //Create board
    for(let i = 0; i < rows; i++){
        board[i] = [];
        for(let j = 0; j < columns; j++){
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const placeToken = (player, column, row) => {
        //Find all cells with nothing inside
        const availableCells = board.filter((row) => row[column].getValue() === "");

        if(!availableCells.length) return; //return if no cells are available

        if(board[row][column].getValue() !== "") return false; //return false if chosen cell is occupied

        //Otherwise the cell is valid and a token is placed in the cell
        board[row][column].addToken(player);

        return true; //tell that it was placed correctly
    };

    const printBoard = () => {
        const boardWithCellsValues = board.map((row) => 
            row.map((cell) => cell.getValue())
        );

        console.log(boardWithCellsValues);
    };

    return {
        getBoard,
        placeToken,
        printBoard,
    }
}

//A singular cell in the gameboard
function Cell(){
    let value = "";

    const addToken = (player) => {
        value = player;
    }

    const getValue = () => value;

    return {
        addToken,
        getValue
    };
}

function GameController(playerOneName, playerTwoName){
    const board = GameBoard();
    const winningPlacements = [
        ["0.0", "1.0", "2.0"], ["0.1", "1.1", "2.1"], ["0.2", "1.2", "2.2"],
        ["0.0", "0.1", "0.2"], ["1.0", "1.1", "1.2"], ["2.0", "2.1", "2.2"],
        ["0.0", "1.1", "2.2"], ["2.0", "1.1", "0.2"]
    ]
    const players = [
        {
            name: playerOneName,
            token: "X",
            occupiedSpaces: [],
        },
        {
            name: playerTwoName,
            token: "O",
            occupiedSpaces: [],
        }
    ]
    let isGameFinished = false;

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn`)
    }

    const playRound = (column, row) => {
        console.log(`Placing ${getActivePlayer().name}'s token into position (${column},${row})`)
    
        const isSuccess = board.placeToken(getActivePlayer().token, column, row);

        if(!isSuccess){
            console.log("Invalid placement. Try again!")
            printNewRound();
            return;
        }
        
        //Winner logic
        getActivePlayer().occupiedSpaces.push(`${column}.${row}`);

        const isWinner = winningPlacements.some(array => {
            return array.sort().join(",") === getActivePlayer().occupiedSpaces.sort().join(",");
        });

        if(isWinner){
            console.log(`${getActivePlayer().name} has won the game!`)
            return;
        } 

        const availableCells = board.getBoard().flat().filter((cell) => cell.getValue() === "");

        if(availableCells.length < 1){
            console.log("The game ended in a tie!")
            return;
        }

        switchPlayerTurn();
        printNewRound();
    }

    printNewRound();

    return {
        getActivePlayer,
        playRound
    }
}

const game = GameController("Daniel", "Computer");
/*
game.playRound(0, 0);
game.playRound(0, 1);
game.playRound(1, 1);
game.playRound(0, 2);
game.playRound(2, 2);
*/

/*
game.playRound(0,0);
game.playRound(0,1);
game.playRound(0,2);
game.playRound(1,0);
game.playRound(1,1);
game.playRound(1,2);
game.playRound(2,0);
game.playRound(2,1);
game.playRound(2,2);
*/
