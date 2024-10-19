const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');
const moveSound = document.getElementById('moveSound');
const winSound = document.getElementById('winSound');

let currentPlayer = 'X';
let gameActive = true;
let board = Array(9).fill(null);

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(e) {
    const cell = e.target;
    const index = cell.dataset.index;

    if (!board[index] && gameActive) {
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add('active', `player${currentPlayer}`);
        moveSound.play(); // Play sound on move

        if (checkWin()) {
            endGame(false);
            message.textContent = `Player ${currentPlayer} Wins!`;
            winSound.play(); // Play sound on win
        } else if (board.every(cell => cell)) {
            endGame(true);
            message.textContent = 'Draw!';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWin() {
    return winPatterns.some(pattern => {
        return pattern.every(index => board[index] === currentPlayer);
    });
}

function endGame(draw) {
    gameActive = false;
    cells.forEach(cell => cell.classList.remove('active'));
    if (!draw) {
        winPatterns.forEach(pattern => {
            if (pattern.every(index => board[index] === currentPlayer)) {
                pattern.forEach(i => cells[i].classList.add('winner'));
            }
        });
    }
}

function resetGame() {
    board = Array(9).fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('active', 'playerX', 'playerO', 'winner');
    });
    currentPlayer = 'X';
    gameActive = true;
    message.textContent = '';
}

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
    cell.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleClick(e);
        }
    });
});
resetBtn.addEventListener('click', resetGame);
