let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds){
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimer(seconds);
    displayEndTime(then);

    countdown = setInterval(()=> {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if(secondsLeft < 0) {
            clearInterval(countdown);     
            return;
        }
        
        displayTimer(secondsLeft);
    }, 1000);

}

function displayTimer(secondsLeft){
    const seconds = secondsLeft % 60;
    const minutes = Math.floor(secondsLeft / 60);
    const hour = Math.round(minutes / 60);
    display = `${hour}:${minutes<10 ? '0' + minutes:minutes}:${seconds<10?'0' + seconds:seconds}`;
    timerDisplay.textContent = display;
    document.title = display;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be back at ${hour}:${minutes<10?'0'+minutes:minutes}`;
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
});