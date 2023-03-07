'use strict';

let scoreEl0 = document.getElementById('score--0');
let scoreEl1 = document.getElementById('score--1');
let currentEl0 = document.querySelector('#current--0');
let currentEl1 = document.querySelector('#current--1');
let playerEls = document.querySelectorAll('.player');
let playerEl0 = document.querySelector('.player--0');
let btnRoll = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');
let diceImg = document.querySelector('.dice');
let btnNewGame = document.querySelector('.btn--new');
let scores, currentScore, playActive, playing;

let newGame = function () {
  scores = [0, 0];
  currentScore = 0;
  playActive = 0;
  playing = true;

  scoreEl0.textContent = 0;
  scoreEl1.textContent = 0;
  currentEl0.textContent = 0;
  currentEl1.textContent = 0;

  playerEls.forEach(playerEl => playerEl.classList.remove('player--winner'));
  playerEl0.classList.add('player--active');
};
newGame();

let switchPlayer = function () {
  //reset current cores
  currentScore = 0;
  document.querySelector(`#current--${playActive}`).textContent = currentScore;

  //switch player
  document
    .querySelector(`.player--${playActive}`)
    .classList.remove('player--active');

  playActive = playActive === 0 ? 1 : 0;
  document
    .querySelector(`.player--${playActive}`)
    .classList.add('player--active');
};

btnRoll.onclick = function () {
  if (playing) {
    //roll dice
    let diceNumber = Math.trunc(Math.random() * 6 + 1);
    diceImg.src = `dice-${diceNumber}.png`;
    diceImg.classList.remove('hidden');

    if (diceNumber !== 1) {
      //display current Cores
      document.querySelector(`#current--${playActive}`).textContent =
        currentScore += diceNumber;
    } else {
      switchPlayer();
    }
  }
};

//click btn Hold
btnHold.onclick = function (event) {
  if (playing) {
    //update score
    scores[playActive] += currentScore;
    //display score
    document.getElementById(`score--${playActive}`).textContent =
      scores[playActive];

    if (scores[playActive] >= 100) {
      playing = false;
      // add class .player--winner
      document
        .querySelector(`.player--${playActive}`)
        .classList.add('player--winner');

      // remove class .play--active
      document
        .querySelector(`.player--${playActive}`)
        .classList.remove('player--active');

      // remove dice
      diceImg.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
};

//click New Game btn
btnNewGame.onclick = newGame;
