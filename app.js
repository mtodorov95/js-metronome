let metronome = new Metronome();
let tempo = document.getElementById('tempo');
let playPauseIcon = document.getElementById('playPauseIcon');
let playButton = document.getElementById('playButton');
let tempoSlider = document.getElementById('tempoSlider');

tempo.textContent = metronome.tempo;

playButton.addEventListener('click', () => {
    metronome.startStop();
    if (metronome.isRunning){
        playPauseIcon.className = 'pause';
    } else {
        playPauseIcon.className = 'play';
    }
})

tempoSlider.addEventListener('input', e => {
    metronome.tempo = e.target.value;
    tempo.textContent = metronome.tempo;
})

