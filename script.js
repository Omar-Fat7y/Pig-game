'use strict';
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const dice = document.querySelector('.dice');
const score1 = document.querySelector('#score--0');
const score2 = document.getElementById('score--1');
const roll = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const newGame = document.querySelector('.btn--new');
const currentScore1 = document.getElementById('current--0');
const currentScore2 = document.getElementById('current--1');

let number, currentScore, scores, active, playing;

const init = function () {
  currentScore = 0;
  scores = [0, 0];
  active = 1;
  playing = true;

  dice.classList.add('hidden');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
  player2.classList.remove('player--active');
  player1.classList.add('player--active');

  score1.textContent = 0;
  score2.textContent = 0;
  currentScore1.textContent = 0;
  currentScore2.textContent = 0;
};

init();

const switchPlayer = function () {
  currentScore = 0;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
  writeScore();
  active = active === 1 ? 2 : 1;
};

const writeScore = function () {
  document.getElementById(`current--${active - 1}`).textContent = currentScore;
};

roll.addEventListener('click', function () {
  if (playing) {
    number = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove('hidden');
    dice.src = 'dice-' + number + '.png';
    if (number === 1) {
      switchPlayer();
    } else {
      currentScore += number;
      writeScore();
    }
  }
});

hold.addEventListener('click', function () {
  if (playing) {
    scores[active - 1] += currentScore;
    console.log(scores[active - 1]);
    document.getElementById(`score--${active - 1}`).textContent =
      scores[active - 1];
    if (scores[active - 1] >= 100) {
      dice.classList.add('hidden');
      playing = false;
      document
        .querySelector(`.player--${active - 1}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${active - 1}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

newGame.addEventListener('click', init);
