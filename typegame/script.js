const word = document.querySelector("#word");
const text = document.querySelector("#text");
const scoreEl = document.querySelector("#score");
const timeEl = document.querySelector("#time");
const endgameEl = document.querySelector("#end-game-container");
const settingsBtn = document.querySelector("#settings-btn");
const settings = document.querySelector("#settings");
const settignsForm = document.querySelector("#settings-form");
const difficultySelect = document.querySelector("#difficulty");


const words = [ 'sigh', 'tense', 'airplane', 'superficial'];

 // init word
let randomWord;

// init score
let score = 0;

// Init time
let time = 10;

// set difficulty to value 
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// sset diffculty to select value

difficultySelect.value = difficulty
// Focus on text on start
text.focus();

// start counting down
const timeInterval = setInterval(updateTime, 1000)


// Generate random word from array
function getRandomWord() {
    return words[Math.floor(Math.random()*words.length)]
}

// Add word to DOM
function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

// Update score
function updateScore() {
    score++;
    scoreEl.innerHTML = score;

    
}
// Update time
function updateTime() {
    time --;
    timeEl.innerHTML = time + 's';

    if(time === 0) {
        clearInterval(timeInterval);
        // end game
        gameOver();
    }
}

// Game over, show end screed
function gameOver() {
    endgameEl.innerHTML = `
        <h1>Time ran out</h1>
        <p> Your final score is ${score} </p>
        <button onclick="location.reload()">Reload</button>
    
    `;
    endgameEl.style.display = 'flex';
}

addWordToDOM();

// Event listeners

text.addEventListener('input', e => {
    const insertedText = e.target.value;

    if (insertedText === randomWord) {
        addWordToDOM();
        updateScore();
        //Cear
        e.target.value = '';
        if(difficulty ==='hard') {
            time +=2;
        } else if (difficulty ==='medium') {
            time +=3;
        }else {
            time +=5;
        }
        
        updateTime();

    }
});

settingsBtn.addEventListener('click', () => {
    settings.classList.toggle('hide');
})


settignsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
})