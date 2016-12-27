/** Recuperar elementos */

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = progress.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
/** Construir funciones */

function tooglePlay(e){
    console.log('its ran');
    const method = (video.paused) ? 'play' : 'pause';
    video[method]();
} 

function updateButton(){
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip(){
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdated() {
    console.log(this.name);
    console.log(this.value);
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;    
    video.currentTime = scrubTime;
}

/** Añadir 'hooks' a los eventos */

video.addEventListener('click', tooglePlay);
toggle.addEventListener('click', tooglePlay);
progress.addEventListener('click', scrub);
let scrubOn = false;
progress.addEventListener('mousemove', (e) => scrubOn && scrub(e));
progress.addEventListener('mousedown', ()=> scrubOn = true);
progress.addEventListener('mouseup', ()=> scrubOn = false);

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

skipButtons.forEach(button => {
    button.addEventListener('click', skip);
})

ranges.forEach(range => {
    range.addEventListener('change', handleRangeUpdated);
});

ranges.forEach(range => {
    range.addEventListener('mousemove', handleRangeUpdated);
});


