const player = document.getElementById('player');
const obstacle = document.getElementById('obstacle');
const scoreEl = document.getElementById('score');
const overlay = document.getElementById('overlay');
const resultText = document.getElementById('resultText');
const newGameBtn = document.getElementById('newGameBtn');

let isJumping = false;
let score = 0;
let gameOver = false;
const WIN_SCORE = 60; // survive long enough to "win" (tweak this)

/* Jump */
function jump(){
  if(isJumping || gameOver) return;
  isJumping = true;
  player.classList.add('jump');
  setTimeout(()=>{
    player.classList.remove('jump');
    isJumping = false;
  }, 500);
}

/* Collision check */
const collideTimer = setInterval(()=>{
  if(gameOver) return;
  const a = player.getBoundingClientRect();
  const b = obstacle.getBoundingClientRect();

  const overlap = a.right > b.left && a.left < b.right && a.bottom > b.top;
  if(overlap){ endGame(false); }
}, 16);

/* Score */
const scoreTimer = setInterval(()=>{
  if(gameOver) return;
  score++;
  scoreEl.textContent = score;
  if(score === WIN_SCORE){ endGame(true); }
}, 500);

/* End game */
function endGame(win){
  gameOver = true;
  obstacle.style.animationPlayState = 'paused';
  resultText.textContent = win ? `You Win! Score: ${score}` : `Game Over! Score: ${score}`;
  overlay.classList.remove('hidden');
}

/* New game */
function restartGame(){
  score = 0; scoreEl.textContent = '0';
  gameOver = false;
  overlay.classList.add('hidden');
  obstacle.style.animation = 'none'; // restart animation cleanly
  void obstacle.offsetWidth;
  obstacle.style.animation = 'moveObstacle 2s linear infinite';
}

/* Controls */
document.addEventListener('keydown', e=>{
  if(e.code === 'Space' || e.code === 'ArrowUp') jump();
});
document.addEventListener('touchstart', jump);
newGameBtn.addEventListener('click', restartGame);
