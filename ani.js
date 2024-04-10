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


    

    menu.onclick = () => {
      menu.classList.toggle("fa-time");
      navbar.classList.toggle("active");
    };
    
    var swiper = new Swiper(".home-slider", {
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
        delay: 7500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      loop: true,
    });
    
    var swiper = new Swiper(".anime-slider", {
      slidesPerView: 4,
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      loop: true,
    });
    
    var swiper = new Swiper(".action-slider", {
      slidesPerView: 4,
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      loop: true,
    });
    


// export{};

























