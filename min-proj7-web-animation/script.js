const ball = document.getElementById('ball');
const play = document.getElementById('play');
const pause = document.getElementById('pause');
const reverse = document.getElementById('reverse');
const speedUp = document.getElementById('speed-up');
const slowDown = document.getElementById('slow-down');
const pbrSpeed = document.getElementById('playbackrate-speed');

const rollAnimation = [
  {
    transform: 'rotate(0) translate3D(-50%, -50%, 0)',
    color: 'white',
  },
  {
    color: 'blue',
    offset: 0.3,
  },
  {
    transform: 'rotate(360deg) translate3D(-50%, -50%, 0)',
    color: 'white',
  },
];

const rollOptions = {
  duration: 3000,
  iterations: Infinity
};

const roll = ball.animate(rollAnimation, rollOptions);

function speedUpPlayback(e) {

  roll.playbackRate = roll.playbackRate * 2
  pbrSpeed.innerHTML = `<h1>Playback Speed: ${roll.playbackRate}<h1>`;
}


function slowDownPlayback(e) {
    roll.playbackRate = roll.playbackRate * 0.5;
    pbrSpeed.innerHTML = `<h1>Playback Speed: ${roll.playbackRate}<h1>`;
}



play.addEventListener('click', () => {
  roll.playbackRate = 1;
  roll.play();
});

pause.addEventListener('click', () => roll.pause());
reverse.addEventListener('click', () => roll.reverse());
speedUp.addEventListener('click', speedUpPlayback);
slowDown.addEventListener('click', slowDownPlayback);

