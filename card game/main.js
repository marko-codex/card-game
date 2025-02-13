const imageList = [
  "/card of hearts/2.jpg",
  "/card of hearts/3.jpg",
  "/card of hearts/4.jpg",
  "/card of hearts/5.jpg",
  "/card of hearts/6.jpg",
  "/card of hearts/7.jpg",
  "/card of hearts/8.jpg",
  "/card of hearts/9.jpg",
  "/card of hearts/10.jpg",
  "/card of hearts/jack.jpg",
  "/card of hearts/king.jpg",
  "/card of hearts/ace.jpg",
  "/card of spades/2.jpg",
  "/card of spades/3.jpg",
  "/card of spades/5.jpg",
  "/card of spades/8.jpg",
  "/card of spades/jack.jpg",
  "/card of spades/king.jpg",
];

let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let timer = 0;
let timerInterval;
let canFlip = true;

function generateCards() {
  const shuffledImages = [...imageList].sort(() => Math.random() - 0.5);
  const selectedImages = shuffledImages.slice(0, 18);
  const cardImages = [...selectedImages, ...selectedImages];
  return cardImages.sort(() => Math.random() - 0.5);
}

function createCardElement(imagePath) {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.value = imagePath;

  const cardFront = document.createElement("div");
  cardFront.className = "card-front";

  const cardBack = document.createElement("div");
  cardBack.className = "card-back";

  const img = document.createElement("img");
  img.src = imagePath;
  img.alt = "Card Image";

  cardBack.appendChild(img);
  card.appendChild(cardFront);
  card.appendChild(cardBack);

  card.addEventListener("click", flipCard);

  return card;
}

function createGameGrid() {
  const grid = document.getElementById("gameGrid");
  grid.innerHTML = "";
  const cardImages = generateCards();

  for (let row = 0; row < 4; row++) {
    const rowDiv = document.createElement("div");
    rowDiv.className = "row";

    const cardsInRow = row === 3 ? 6 : 8;
    for (let i = 0; i < cardsInRow; i++) {
      const cardIndex = row * 8 + i;
      if (cardIndex < cardImages.length) {
        const card = createCardElement(cardImages[cardIndex]);
        rowDiv.appendChild(card);
      }
    }

    grid.appendChild(rowDiv);
  }
}

function flipCard() {
  if (!canFlip || this.classList.contains("flipped") || this.classList.contains("matched")) {
    return;
  }

  this.classList.add("flipped");
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    moves++;
    document.getElementById("moves").textContent = moves;
    canFlip = false;

    if (flippedCards[0].dataset.value === flippedCards[1].dataset.value) {
      matchedPairs++;
      setTimeout(() => {
        flippedCards.forEach((card) => {
          card.classList.add("matched");
        });
        flippedCards = [];
        canFlip = true;

        if (matchedPairs === 18) {
          clearInterval(timerInterval);
          setTimeout(() => {
            alert(`Congratulations! You won in ${moves} moves and ${timer} seconds!`);
          }, 800);
        }
      }, 600);
    } else {
      flippedCards.forEach(card => card.classList.add("wrong"));
      setTimeout(() => {
        flippedCards.forEach((card) => {
          card.classList.remove("flipped");
          card.classList.remove("wrong");
        });
        flippedCards = [];
        canFlip = true;
      }, 1200);
    }
  }
}

function updateTimer() {
  timer++;
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  document.getElementById("time").textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function resetGame() {
  clearInterval(timerInterval);
  flippedCards = [];
  matchedPairs = 0;
  moves = 0;
  timer = 0;
  canFlip = true;
  document.getElementById("moves").textContent = "0";
  document.getElementById("time").textContent = "0:00";

  createGameGrid();
  timerInterval = setInterval(updateTimer, 1000);
}

resetGame();