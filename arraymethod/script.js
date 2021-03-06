const main = document.querySelector('#main');
const addUserBtn = document.querySelector('#add-user');
const doubleBtn = document.querySelector('#double');
const showMillionairesBtn= document.querySelector('#show-millionaires');
const sortBtn = document.querySelector('#sort');
const calculateWealthBtn = document.querySelector('#calculate-wealth');

let data = [];


async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api')
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };

    addData(newUser);

}

function doubleMoney() {
    data = data.map((user)=> {
        return {...user, money:user.money * 2}
    })
    updateDom();
}

function sortUser() {
    data.sort((a,b)=> {
        return b.money - a.money 
    })
    updateDom();

}

function showMillionaires() {
    data = data.filter(user => user.money > 1000000);
    updateDom();
}

function calculateWealth() {
    const wealth = data.reduce((acc,user) => (acc +=user.money), 0);

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)} </storng>`;
    main.appendChild(wealthEl);
}
function addData(obj) {
    data.push(obj)
    updateDom();
}


function updateDom(providedData = data) {
    main.innerHTML = '<h2><strong>Person</storng> Wealth</h2>';

    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)} `;
        main.appendChild(element); 
    })
} 

function formatMoney(number) {
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortUser);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth)