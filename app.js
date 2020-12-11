let tempo = document.getElementById('tempo');
let playPauseIcon = document.getElementById('playPauseIcon');
let playButton = document.getElementById('playButton');
let tempoSlider = document.getElementById('tempoSlider');
let canvas = document.getElementById('myCanvas');

let metronome = new Metronome();
let pendulum = new Pendulum(canvas);

tempo.textContent = metronome.tempo;

playButton.addEventListener('click', () => {
    metronome.startStop();
    pendulum.swing();
    if (metronome.isRunning){
        playPauseIcon.className = 'pause';
    } else {
        playPauseIcon.className = 'play';
    }
})

tempoSlider.addEventListener('input', e => {
    metronome.tempo = e.target.value;
    pendulum.setPeriod(metronome.tempo)
    tempo.textContent = metronome.tempo;
})

