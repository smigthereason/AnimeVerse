document.addEventListener("DOMContentLoaded", function () {
  
  const animeListElement = document.getElementById("anime-list");
  const studioId = 569;
  const currentYear = new Date().getFullYear();
  const apiUrl = `https://api.jikan.moe/v4/anime?start_date=2020-01-01&end_date=${
    currentYear + 4
  }-01-01&producer=${studioId}`;

  fetchAnime();

  async function fetchAnime() {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      displayAnime(data.data);
    } catch (error) {
      console.error("Error fetching anime:", error);
    }
  }

  function displayAnime(animes) {
    animeListElement.textContent = ""; 
    animes.forEach((anime) => {
      const animeItem = document.createElement("div");

      const imageElement = document.createElement("img");
      const imageUrl = anime.images.jpg.image_url;
      imageElement.src = imageUrl;
      imageElement.alt = anime.title;
      animeItem.appendChild(imageElement);

      const titleElement = document.createElement("h2");
      titleElement.textContent = anime.title;
      animeItem.appendChild(titleElement);

      const synopsisElement = document.createElement("p");
      const shortSynopsis =
        anime.synopsis.length > 0
          ? anime.synopsis.slice(0, 50) + "..."
          : anime.synopsis;
      synopsisElement.textContent = shortSynopsis;
      animeItem.appendChild(synopsisElement);

      const scoreElement = document.createElement("span");
      scoreElement.textContent = anime.score;
      animeItem.appendChild(scoreElement);

      // Creates a "Read More" button
      const readMoreButton = document.createElement("button");
      readMoreButton.textContent = "Read More";
      readMoreButton.classList.add("read-more-btn");
      animeItem.appendChild(readMoreButton);

      readMoreButton.addEventListener("click", (event) => {
        event.stopPropagation();
        clearInterval(animationInterval);
        const fullSynopsisCard = document.createElement("div");
        fullSynopsisCard.classList.add("synopsis-card");

        const fullSynopsisContent = document.createElement("p");
        fullSynopsisContent.textContent = anime.synopsis;
        fullSynopsisCard.appendChild(fullSynopsisContent);

        // Append the full synopsis card to the body
        document.body.appendChild(fullSynopsisCard);

        // Close the full synopsis card when clicked outside
        document.addEventListener("click", (closeEvent) => {
          if (!fullSynopsisCard.contains(closeEvent.target)) {
            fullSynopsisCard.remove();
            setTimeout(scrollAnimeList, resumeDelay);
          }
        });
      });

      animeListElement.appendChild(animeItem);
    });
  }
  
  fetchAnime();
});

document.addEventListener("click", function (event) {
  const dropdown = document.querySelector(".dropdown-content");
  const menuBars = document.querySelector(".fa-bars");

  if (menuBars.contains(event.target)) {
    if (dropdown.style.display === "block") {
      dropdown.style.display = "none"; 
    } else {
      dropdown.style.display = "block"; 
    }
  } else {
    dropdown.style.display = "none"; 
  }
});

const animeList = document.getElementById("anime-list");
const scrollAmount = 800; 
const scrollDelay = 3500; 
const resumeDelay = 3000; 

let currentPosition = 0;
let animationInterval;

function scrollAnimeList() {
  animationInterval = setInterval(function () {
    currentPosition += scrollAmount;
    animeList.scroll({
      left: currentPosition,
      behavior: "smooth",
    });

    if (currentPosition >= animeList.scrollWidth - animeList.clientWidth) {
      currentPosition = 0;
    }
  }, scrollDelay);
}

// Start scrolling animation
scrollAnimeList();

// Pause scrolling animation and resume after delay when scroll buttons are clicked
const scrollLeftBtn = document.getElementById("scroll-left-btn");
const scrollRightBtn = document.getElementById("scroll-right-btn");
const scrollStep = 300; 

scrollLeftBtn.addEventListener("click", function () {
  clearInterval(animationInterval); 
  const scrollLeftPosition = animeList.scrollLeft - scrollStep;
  animeList.scroll({
    left: scrollLeftPosition,
    behavior: "smooth",
  });

  // Store current scroll position and resume after delay
  currentPosition = scrollLeftPosition;
  setTimeout(scrollAnimeList, resumeDelay);
});

scrollRightBtn.addEventListener("click", function () {
  clearInterval(animationInterval); 
  const scrollRightPosition = animeList.scrollLeft + scrollStep;
  animeList.scroll({
    left: scrollRightPosition,
    behavior: "smooth",
  });

  // Store current scroll position and resume after delay
  currentPosition = scrollRightPosition;
  setTimeout(scrollAnimeList, resumeDelay);
});

//Manga Section
const mangaListElement = document.getElementById("manga-list");
const studioId = 43;
const awardWinningGenreId = 46; 
const currentYear = new Date().getFullYear();
const apiUrl = `https://api.jikan.moe/v4/manga?start_date=2012-01-01&end_date=${
  currentYear + 4
}-01-01&producer=${studioId}&genre=${awardWinningGenreId}`;

fetchManga();

async function fetchManga() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    displayManga(data.data);
  } catch (error) {
    console.error("Error fetching manga:", error);
  }
}

function displayManga(mangas) {
    mangaListElement.textContent = ""; 
  
    // Filter mangas based on title length (max 25 characters) and score (3 and above)
    const filteredMangas = mangas.filter((manga) => manga.title.length <= 25 && manga.score >= 3);
  
    filteredMangas.forEach((manga) => {
      const mangaItem = document.createElement("div");
  
      const imageElement = document.createElement("img");
      const imageUrl = manga.images.jpg.image_url;
      imageElement.src = imageUrl;
      imageElement.alt = manga.title;
      mangaItem.appendChild(imageElement);
  
      const titleElement = document.createElement("h2");
      titleElement.textContent = manga.title;
      mangaItem.appendChild(titleElement);
  
      const starContainer = document.createElement("div");
      starContainer.classList.add("star-container");
      mangaItem.appendChild(starContainer);
  
      const readNowButton = document.createElement("button");
      readNowButton.textContent = "Read Now";
      readNowButton.classList.add("read-now-btn");
      mangaItem.appendChild(readNowButton);
  
      // Calculate the number of stars based on the score 
      const score = manga.score;
      const numStars = Math.round(score / 2); 
  
      for (let i = 0; i < numStars; i++) {
        const starIcon = document.createElement("i");
        starIcon.classList.add("fa", "fa-star");
        starIcon.setAttribute("aria-hidden", "true");
        starContainer.appendChild(starIcon);
      }
  
      mangaListElement.appendChild(mangaItem);
    });
  
    // Add event listeners to scroll buttons 
    const scrollLeftBtn = document.getElementById("left-btn");
    const scrollRightBtn = document.getElementById("right-btn");
    const scrollStep = 300; 
  
    scrollLeftBtn.addEventListener("click", function () {
      mangaListElement.scrollBy({
        left: -scrollStep,
        behavior: "smooth",
      });
    });
  
    scrollRightBtn.addEventListener("click", function () {
      mangaListElement.scrollBy({
        left: scrollStep,
        behavior: "smooth",
      });
    });
  }
  
  function smoothScroll(target, duration) {
    const targetElement = document.querySelector(target);
    const targetPosition = targetElement.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  }

  // Smooth scroll when a link is clicked
  const links = document.querySelectorAll('.dropdown-content a');

  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const duration = 1000; 
      smoothScroll(targetId, duration);
    });
  });

  document.querySelectorAll(".carousel").forEach((carousel) => {
    const items = carousel.querySelectorAll(".carousel__item");
    const buttonsHtml = Array.from(items, () => {
      return `<span class="carousel__button"></span>`;
    });
  
    carousel.insertAdjacentHTML(
      "beforeend",
      `
      <div class="carousel__nav">
        ${buttonsHtml.join("")}
      </div>
    `
    );
  
    const buttons = carousel.querySelectorAll(".carousel__button");
  
    buttons.forEach((button, i) => {
      button.addEventListener("click", () => {
        
        items.forEach((item) =>
          item.classList.remove("carousel__item--selected")
        );
        buttons.forEach((button) =>
          button.classList.remove("carousel__button--selected")
        );
  
        items[i].classList.add("carousel__item--selected");
        button.classList.add("carousel__button--selected");
      });
    });
  
    
    items[0].classList.add("carousel__item--selected");
    buttons[0].classList.add("carousel__button--selected");
  });