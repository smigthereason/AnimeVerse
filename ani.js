document.addEventListener("DOMContentLoaded", function () {
  const animeListElement = document.getElementById("anime-list");
  const studioId = 569;
  const currentYear = new Date().getFullYear();
  const apiUrl = `https://api.jikan.moe/v4/anime?start_date=2019-01-01&end_date=${
    currentYear + 1
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
    animeListElement.textContent = ""; // Clear existing anime by removing all child nodes
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

      const synopsisElement = document.createElement('p');
      const shortSynopsis =
          anime.synopsis.length > 0 ? anime.synopsis.slice(0, 50) + '...' : anime.synopsis;
      synopsisElement.textContent = shortSynopsis;
      animeItem.appendChild(synopsisElement);

      // Create a "Read More" button
      const readMoreButton = document.createElement('button');
      readMoreButton.textContent = 'Read More';
      readMoreButton.classList.add('read-more-btn');
      animeItem.appendChild(readMoreButton);

      readMoreButton.addEventListener('click', (event) => {
          event.stopPropagation(); // Prevent event propagation
          const fullSynopsisCard = document.createElement('div');
          fullSynopsisCard.classList.add('synopsis-card');

          const fullSynopsisContent = document.createElement('p');
          fullSynopsisContent.textContent = anime.synopsis;
          fullSynopsisCard.appendChild(fullSynopsisContent);

          // Append the full synopsis card to the body
          document.body.appendChild(fullSynopsisCard);

          // Close the full synopsis card when clicked outside
          document.addEventListener('click', (closeEvent) => {
              if (!fullSynopsisCard.contains(closeEvent.target)) {
                  fullSynopsisCard.remove();
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
            dropdown.style.display = "none"; // Hide dropdown if already open
        } else {
            dropdown.style.display = "block"; // Show dropdown if closed
        }
    } else {
        dropdown.style.display = "none"; // Hide dropdown if click is outside menu bars
    }
});


const animeList = document.getElementById("anime-list");
const scrollAmount = 400; // Adjust this value based on the width of your items
const scrollDelay = 4500; // Adjust this value for the delay between scrolls (in milliseconds)
const resumeDelay = 5000; // Adjust this value for the delay before automatic scrolling resumes (in milliseconds)

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
const scrollStep = 300; // Adjust this value based on the width of your items

scrollLeftBtn.addEventListener("click", function () {
    clearInterval(animationInterval); // Pause animation
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
    clearInterval(animationInterval); // Pause animation
    const scrollRightPosition = animeList.scrollLeft + scrollStep;
    animeList.scroll({
        left: scrollRightPosition,
        behavior: "smooth",
    });

    // Store current scroll position and resume after delay
    currentPosition = scrollRightPosition;
    setTimeout(scrollAnimeList, resumeDelay);
});
