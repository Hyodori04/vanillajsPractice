const container = document.querySelector('.container');
const seats = container.querySelectorAll('.row .seat:not(.occupied)');
const count = document.querySelector('#count');
const total = document.querySelector('#total');
const movieSelect = document.querySelector('#movie');

const seatsArray = [...seats]

let ticketPrice = movieSelect.value;

populateUi();

function populateUi () {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats !== null && selectedSeats.length >0) {
        seats.forEach((seat, index)=> {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

function setMovieData (movieIndex, moivePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moivePrice);
}

//save selected moive index and price
function updateCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map((seat)=> {
        return seatsArray.indexOf(seat)
    })

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    console.log(seatsIndex)
    const selectedCount =  selectedSeats.length;
    count.innerText = selectedCount;
    total.innerText = selectedCount * ticketPrice;
}

movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value
    setMovieData(e.target.selectedIndex, e.target.value)
    updateCount();
})
container.addEventListener('click', e => {
    if(e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')) {
        e.target.classList.add('selected')
        
        updateCount();
    }
    
})

// Initial count and total set

updateCount();