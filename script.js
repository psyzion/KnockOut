// hämta alla element från DOM
const knockoutSelect = document.getElementById('knockout');
const rollButton = document.getElementById('rollButton');
const resetButton = document.getElementById('resetButton');
const dice1El = document.getElementById('dice1');
const dice2El = document.getElementById('dice2');
const statusText = document.getElementById('status');
const totalDisplay = document.getElementById('total');
const lastResultEl = document.getElementById('lastResult');

// deklarera lite bra att ha variabler
let knockoutNumber = null;
let totalScore = 0;
let gameOver = false;

// tärningssymboler
const diceFaces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

// slumpa ett kast
function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}

// hantering av kst
function rollDice() {
    if (gameOver) return;
  
    // kolla så användaren valt ett nummer
    knockoutNumber = parseInt(knockoutSelect.value);
    if (!knockoutNumber) {
      statusText.textContent = 'Välj ett knockout-nummer först!';
      return;
    }
  
    // animeringar tärningar
    dice1El.classList.add('shake');
    dice2El.classList.add('shake');
  
    setTimeout(() => {
      const die1 = rollDie();
      const die2 = rollDie();
      const sum = die1 + die2;
  
      dice1El.textContent = diceFaces[die1 - 1];
      dice2El.textContent = diceFaces[die2 - 1];
  
      // knockoout?
      if (sum === knockoutNumber) {
        statusText.textContent = `Du slog ${sum} – KNOCKOUT!`;
        gameOver = true;
        rollButton.disabled = true;
      } else {
        totalScore += sum;
        totalDisplay.textContent = totalScore;
  
        if (totalScore >= 45) {
          statusText.textContent = `Grattis! Du vann med ${totalScore} poäng!`;
          gameOver = true;
          rollButton.disabled = true;
        } else {
          statusText.textContent = `Du slog ${sum}. Fortsätt spela!`;
        }
      }
  
      // ta bort animation
      dice1El.classList.remove('shake');
      dice2El.classList.remove('shake');
    }, 500);
  }
  

// omstart spelet
function resetGame() {
  // var vi klara? – spara resultat
  if (totalScore > 0 || gameOver) {
    let resultText = gameOver
      ? (totalScore >= 45
          ? `Du vann med ${totalScore} poäng!`
          : `Du förlorade med ${totalScore} poäng.`)
      : `Du avslutade spelet med ${totalScore} poäng.`;

    lastResultEl.textContent = `Föregående omgång: ${resultText}`;
  } else {
    lastResultEl.textContent = '';
  }

  // återatäll spel
  totalScore = 0;
  gameOver = false;
  knockoutSelect.value = '';
  totalDisplay.textContent = '0';
  statusText.textContent = '';
  dice1El.textContent = '🎲';
  dice2El.textContent = '🎲';
  rollButton.disabled = false;
}

// eventfångare knappar
rollButton.addEventListener('click', rollDice);
resetButton.addEventListener('click', resetGame);
