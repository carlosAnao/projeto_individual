const headsButton = document.getElementById('heads-button');
const tailsButton = document.getElementById('tails-button');
const resetButton = document.getElementById('reset-button');
const coinImage = document.getElementById('coin-image');
const resultText = document.getElementById('result-text');
const winsCount = document.getElementById('wins-count');
const lossesCount = document.getElementById('losses-count');

const headsImageUrl = 'img/cara.png';
const tailsImageUrl = 'img/coroa.png';

let wins = 0;
let losses = 0;
let isFlipping = false;

function playGame(playerChoice) {
    if (isFlipping) {
        return;
    }
    isFlipping = true;
    resultText.textContent = '';
    coinImage.classList.add('flipping');
    
    const randomNum = Math.random();
    const result = randomNum < 0.5 ? 'cara' : 'coroa';

    setTimeout(() => {
        coinImage.classList.remove('flipping');
        coinImage.src = (result === 'cara') ? headsImageUrl : tailsImageUrl;

        if (playerChoice === result) {
            resultText.textContent = 'Você venceu!';
            resultText.style.color = 'green';
            wins++;
        } else {
            resultText.textContent = 'Você perdeu!';
            resultText.style.color = 'red';
            losses++;
        }
        
        updateScore();
        isFlipping = false;
    }, 1000);
}

function updateScore() {
    winsCount.textContent = wins;
    lossesCount.textContent = losses;
}

function resetGame() {
    wins = 0;
    losses = 0;
    updateScore();
    resultText.textContent = '';
    coinImage.src = 'img/cara.png'; 
}

headsButton.addEventListener('click', () => playGame('cara'));
tailsButton.addEventListener('click', () => playGame('coroa'));
resetButton.addEventListener('click', resetGame);