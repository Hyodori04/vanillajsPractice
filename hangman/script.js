const wordEl = document.querySelector("#word");
const wrongLettersEl = document.querySelector("#wrong-letters");
const playAgainBtn = document.querySelector("#play-again");
const popup = document.querySelector("#popup-container");
const notification = document.querySelector("#notification-container");
const finalMessage = document.querySelector("#final-message");

const figureParts = document.querySelectorAll('.figure-part');

const words = ["application", "programming", "interface", "wizard"];

let selectedWord = words[Math.floor(Math.random() * words.length)];


const correctLetters = [];
const wrongLetters = [];

function displayWord() {
    wordEl.innerHTML = 
    `${selectedWord
        .split('')
        .map(
            letter =>
            `<span class="letter">
                ${correctLetters.includes(letter) ? letter : ''}
            </span>
            `
        ).join('')}`

    const innerWord = wordEl.innerText.replace(/\n/g, '');

    if(innerWord === selectedWord) {
        finalMessage.innerText ="Congratulations! U Won";
        popup.style.display= 'flex';
    }
}

function updateWrongLettersEl() {
    wrongLettersEl.innerHTML = 
    `${wrongLetters.length > 0 ? '<p>Wrong</p>' : '' }
     ${wrongLetters.map(letter => `<span>${letter}</span`)}`;
    
     figureParts.forEach((part, index) => {
         const errors = wrongLetters.length;

         if(index <errors) {
            part.style.display = 'block';
         } else {
            part.style.display = 'none';
         }
     })

     if (wrongLetters.length === figureParts.length) {
         finalMessage.innerText = "Unfortunately you lost";
         popup.style.display = 'flex';
     }
}

function showNotification() {
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

window.addEventListener('keydown', e => {
    let key = e.key
    const re = /^[a-z]/g
    if (re.test(key)) {
        if(selectedWord.includes(key)){
            if(!correctLetters.includes(key)) {
                correctLetters.push(key)
                displayWord();
            }else {
                showNotification();
            }
        }else {
            if(!wrongLetters.includes(key)) {
                wrongLetters.push(key);
                updateWrongLettersEl();
            }else {
                showNotification();
            }
        }
        
    } 
    
})

playAgainBtn.addEventListener('click', () => {
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord =words[Math.floor(Math.random() * words.length)];

    displayWord();
    updateWrongLettersEl();
    popup.style.display = 'none';
})
displayWord();