document.addEventListener("DOMContentLoaded", function() {
    const animeListElement = document.getElementById('anime-list');
    const studioId = 569;
const currentYear = new Date().getFullYear();
const apiUrl = `https://api.jikan.moe/v4/anime?start_date=2019-01-01&end_date=${currentYear + 1}-01-01&producer=${studioId}`;


        
    fetchAnime();

    async function fetchAnime() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            displayAnime(data.data);
        } catch (error) {
            console.error('Error fetching anime:', error);
        }
    }

    function displayAnime(animes) {
        animeListElement.textContent = ''; // Clear existing anime by removing all child nodes
        animes.forEach(anime => {
            const animeItem = document.createElement("div");
    
            const imageElement = document.createElement('img');
            const imageUrl = anime.images.jpg.image_url;
            imageElement.src = imageUrl;
            imageElement.alt = anime.title;
            animeItem.appendChild(imageElement);
    
            const titleElement = document.createElement('h2');
            titleElement.textContent = anime.title;
            animeItem.appendChild(titleElement);
    
            const synopsisElement = document.createElement('p');
            synopsisElement.textContent = anime.synopsis.length > 0 ? anime.synopsis.slice(0, 50) + '...' : anime.synopsis;
            animeItem.appendChild(synopsisElement);
    
            animeListElement.appendChild(animeItem);
        });
    }
    fetchAnime();
});

document.addEventListener("click", function (event) {
    const dropdown = document.querySelector(".dropdown-content");
    const icons = document.querySelector(".icons");

    if (!icons.contains(event.target)) {
      dropdown.style.display = "none";
    }
  });
  
    const animeList = document.getElementById("anime-list");
    const scrollAmount = 400; // Adjust this value based on the width of your items
    const scrollDelay = 3000; // Adjust this value for the delay between scrolls (in milliseconds)

    let currentPosition = 0;

    function scrollAnimeList() {
        const animation = setInterval(function () {
            currentPosition += scrollAmount;
            animeList.scroll({
                left: currentPosition,
                behavior: "smooth",
            });

            if (currentPosition >= animeList.scrollWidth - animeList.clientWidth) {
                currentPosition = 0;
                clearInterval(animation);
                setTimeout(scrollAnimeList, scrollDelay);
            }
        }, scrollDelay);
    }

    setTimeout(scrollAnimeList, scrollDelay);

    
        const scrollLeftBtn = document.getElementById("scroll-left-btn");
        const scrollRightBtn = document.getElementById("scroll-right-btn");
        const scrollStep = 300; // Adjust this value based on the width of your items
    
        scrollLeftBtn.addEventListener("click", function () {
            animeList.scrollBy({
                left: -scrollStep,
                behavior: "smooth",
            });
        });
    
        scrollRightBtn.addEventListener("click", function () {
            animeList.scrollBy({
                left: scrollStep,
                behavior: "smooth",
            });
        });

























