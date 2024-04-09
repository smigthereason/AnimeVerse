let menu = document.querySelector("#menu-bars");
let navbar = document.querySelector(".navbar")

menu.onclick = () => { 
    menu.classList.toggle('fa-time');
    navbar.classList.toggle("active");

    // try {
    //     // Fetch data from AniAPI
    //     const response = await fetch('https://api.aniapi.com/v1/anime');
    //     if (!response.ok) {
    //         throw new Error('Failed to fetch data from AniAPI');
    //     }
        
    //     const data = await response.json();
    //     console.log(data); // You can handle the data here
    // } catch (error) {
    //     console.error('Error fetching data:', error);
    // }
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
        loop:true,
        });