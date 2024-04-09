document.addEventListener("DOMContentLoaded", function() {
    const animeList = document.getElementById('anime-list');

    const apiUrl = 'https://api.jikan.moe/v4/anime';

    fetchProducts();

    function fetchProducts() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                displayAnime(data.data); // Access data array directly
            })
            .catch(error => console.error('Error fetching products:', error));
    }

    function displayAnime(animes) {
        const animeList = document.getElementById("anime-list");
        animeList.textContent = ''; // Clear existing products by removing all child nodes
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
            synopsisElement.textContent = anime.synopsis;
            animeItem.appendChild(synopsisElement);

            

            animeList.appendChild(animeItem);
        });
    }
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

























