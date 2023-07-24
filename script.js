// creating gameBoard using module pattern
const gameBoard = (() => {
    return ['', '', '', '', '', '', '', '', '']
})();

// factory function to create players
const playerDetails = (marker) => {
    return {marker}
}

const displayController = (() => {

    const markThisPlace = (idx, marker) => {
        gameBoard[idx] = marker
        checkResults(marker)
    }

    const  checkResults = (marker) => {
        if (playerHasWon()) {
            let selector = '.gameStatus > h1'
            let element = document.querySelector(selector);
            element.textContent = `Player ${marker} has Won`
        }
        else if (gameTied()) {
            let selector = '.gameStatus > h1'
            let element = document.querySelector(selector);
            element.textContent = `It is a tie`
        }
    }

    const enterValue = (event) => {

        let className = event.target.className
        let idx = Number(className.charAt(className.length - 1)) - 1;
        
        if (gameBoard[idx] === '') {
            markThisPlace(idx, turn.marker)
            className = className.split(' ')
            className = '.' + className[1]
            let element = document.querySelector(className)
            console.log(turn.marker, turn)
            element.textContent = turn.marker
            changeTurn()
        }
    }

    const restart = () => {
        for (let i = 0; i < 9; i++) {
            gameBoard[i] = ''
            className = '.item'+(i+1)
            let element = document.querySelector(className)
            element.textContent = ''
        }
        let selector = '.gameStatus > h1'
        let element = document.querySelector(selector);
        element.textContent = `Player X's turn`
    }

    const playerHasWon = () => {
        for (let i = 0; i < 9; i += 3) {
            if (gameBoard[i] === gameBoard[i+1] && gameBoard[i+1] === gameBoard[i+2] && gameBoard[i] !== '') {
                return true;
              }
        }
        if (gameBoard[0] === gameBoard[4] && gameBoard[4] === gameBoard[8] && gameBoard[0] !== '') {
            return true;
        }
        if (gameBoard[2] === gameBoard[4] && gameBoard[4] === gameBoard[6] && gameBoard[4] !== '') {
            return true;
        }

        if (gameBoard[0] === gameBoard[3] && gameBoard[3] === gameBoard[6] && gameBoard[6] !== '') {
            return true;
        }
        if (gameBoard[1] === gameBoard[4] && gameBoard[4] === gameBoard[7] && gameBoard[4] !== '') {
            return true;
        }
        if (gameBoard[2] === gameBoard[5] && gameBoard[5] === gameBoard[8] && gameBoard[5] !== '') {
            return true;
        }
        return false;
        
    }

    const changeTurn = () => {
        if (turn === player1) {
            turn = player2
        } else {
            turn = player1
        }
        console.log(turn)
    }

    const gameTied = () => {
        for (let i = 0; i < 9; i++) {
            if (gameBoard[i] === '') {
                return false;
              }
        }
        return true;
    }

    return {enterValue, restart}
})();


const player1 = playerDetails('X')
const player2 = playerDetails('O')
let turn = player1;