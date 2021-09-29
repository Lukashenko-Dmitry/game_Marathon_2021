const startBtn = document.querySelector('#start');
const restartBtn = document.querySelector('#restart');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const scoreEl = document.querySelector('#score');
const board = document.querySelector('#board');
const colors = [];
let colorRand = 0;
let time = 0;
let score = 0;

for(let i=0; i<= 1000; i++){
    colorRand = Math.floor((Math.random()*100000000)+1);
    colors.push("#" + ("000000" + colorRand.toString(16)).slice(-6));
}

startBtn.addEventListener('click', (event) =>{
restartBtn.classList.add('hide');
event.preventDefault();
screens[0].classList.add('up'); 
});

restartBtn.addEventListener('click', (event) =>{
event.preventDefault();
document.location.reload(true);
});

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')){
        time = parseInt(event.target.getAttribute("data-time"));
        screens[1].classList.add('up'); 
        startGame();
    }
});

board.addEventListener('click', (event) => {
    if (event.target.classList.contains('circle')){
        score ++;
        setScore(score);
        event.target.remove();
        createRandomCircle();
    }
});

function startGame(){
   setInterval(decreaseTime, 1000);
   setTime(time);   
   createRandomCircle();
}

function decreaseTime(){
    if (time === 0){
        finishGame();
    } else {
        let current = --time ;
        if(current < 10){
            current = `${current}`;
        }             
        setTime(current);       
    }
}

function setTime(value = 0){
   if (value < 10){
    timeEl.innerHTML = `00:0${value}`;
   } else {
    timeEl.innerHTML = `00:${value}`;
   }
}

function setScore(value){
    if (value < 10){
        scoreEl.innerHTML = `0${value}`;
    } else{
        scoreEl.innerHTML = `${value}`;
    }
    
}

function finishGame(){
timeEl.parentNode.classList.add('hide');
scoreEl.parentNode.classList.add('hide');
restartBtn.classList.add('visible');
board.innerHTML = `<h1>Your score : <span class = "primary">${score}</span></h1>`;
}

function createRandomCircle(){
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    let colorCirc = getRandomColor();
    circle.style.background = colorCirc;
    circle.style.boxShadow = `0 0 2px ${colorCirc}, 0 0 10px ${colorCirc}`;
    board.append(circle);
}

function getRandomNumber(min, max){
    return Math.round(Math.random()*(max-min) + min);
}

function getRandomColor(){
    const index = Math.floor(Math.random()*colors.length);
    return colors[index];
}
