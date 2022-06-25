const toggleBtn = document.querySelector("#toggle");
const closeBtn = document.querySelector("#close");
const openBtn = document.querySelector("#open");
const modal = document.querySelector("#modal");

toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('show-nav');
});

openBtn.addEventListener('click', () => {
    modal.classList.add('show-modal')
});

closeBtn.addEventListener('click', ()=> {
    modal.classList.remove('show-modal');
})

window.addEventListener('click', e => 
    e.target == modal && modal.classList.remove('show-modal')
);