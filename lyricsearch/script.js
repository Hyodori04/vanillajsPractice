const form = document.querySelector('#form');
const search = document.querySelector('#search');
const result = document.querySelector('#result');
const more = document.querySelector('#more');

const apiURL = 'https://api.lyrics.ovh';


// Search by song or artist

async function searchSongs(term) {
    const res = await fetch(`${apiURL}/suggest/${term}`);
    const data = await res.json();
    showData(data);
}

// Show song and artist in DOM

function showData(data) {
    let output  = ''
    data.data.forEach(song => {
        output += `
            <li>
                <span><strong>${song.artist.name}</strong> - ${song.title}</span>
                <button class="btn" data-artist="${song.artist.name}"
                data-songtitle="${song.title}">Get Lyrics</button>
            </li>
        `
    })
    result.innerHTML = `
        <ul class="songs">
            ${output}
        </ul>
    `;

    if (data.prev || data.next) {
        more.innerHTML = `
            ${data.prev ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>` : ''}
            ${data.next ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>` : ''}
        `

    }else {
        more.innerHTML = '';
    }
}

async function getMoreSongs(url) {
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const data = await res.json();
    showData(data);
}

// Get lyrics for song

async function getLyrics(artist, songTitle) {
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await res.json();

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

    result.innerHTML = `<h2><stroing>${artist}</strong> - ${songTitle}</h2><span>${lyrics}</span>`;

    more.innerHTML = '';
}

// Event listenere

form.addEventListener('submit', e => {
    e.preventDefault();

    const searchTerm = search.value.trim();

    if (searchTerm) {
        searchSongs(searchTerm);
    }
})

// Get lyrics button click


result.addEventListener('click', e => {
    const clickedEl = e.target;

    if (clickedEl.tagName == 'BUTTON') {
        const artist = clickedEl.getAttribute('data-artist');
        const songTitle = clickedEl.getAttribute('data-songtitle');

        getLyrics(artist, songTitle)
    }
})