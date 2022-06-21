const currencyOne = document.querySelector('#currency-one')
const amountOne = document.querySelector('#amount-one')

const currencyTwo = document.querySelector('#currency-two')
const amountTwo = document.querySelector('#amount-two')

const rate = document.querySelector('#rate');
const swaper = document.querySelector('#swap');




function calculate() {
    const oneValue = currencyOne.value;
    const twoValue = currencyTwo.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${oneValue}`)
        .then(res => res.json())
        .then(data => {
            const rateV = data.rates[twoValue];
            rate.innerText = `1 ${oneValue} = ${rateV} ${twoValue} `
            amountTwo.value = (amountOne.value * rateV).toFixed(2);
        })

}

function swap() {
    const temp = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = temp;
    calculate();
}

currencyOne.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
currencyTwo.addEventListener('change', calculate);
amountTwo.addEventListener('input', calculate);
swaper.addEventListener('click', swap)
calculate();