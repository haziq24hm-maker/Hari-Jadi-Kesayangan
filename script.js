const cards = document.querySelectorAll('.memory-card');
const successMessage = document.getElementById('success-message');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedPairs = 0;
// Jumlah pasangan sebenar (4 pasangan, kad ke-9 adalah kad bonus/tunggal)
const totalPairs = 4; 

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    // Elakkan kad tunggal (bintang) daripada dikira sebagai padanan biasa
    if (!firstCard.dataset.framework || !secondCard.dataset.framework) {
        resetBoard();
        return;
    }

    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    matchedPairs++;
    
    if (matchedPairs === totalPairs) {
        setTimeout(() => {
            successMessage.classList.remove('hidden');
        }, 500);
    }

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 900);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Rawak kedudukan susunan grid setiap kali dibuka
(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 9);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
