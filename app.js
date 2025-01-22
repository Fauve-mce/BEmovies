// Événements liés à la recherche dans le champ de saisie
    document.getElementById('searchInput').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            const query = this.value.trim();
            if (query){
                fetchMovie(query);
            }else {
                document.getElementById('results').innerHTML = '<p>Film introuvable.</p>'
            }
        }
    });
    
//Movie Details rearch
    const url = 'https://api.themoviedb.org/3/movie/movie_id?api_key=be68de6d94928ce284bb4c3c82184d81';
    const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTY4ZGU2ZDk0OTI4Y2UyODRiYjRjM2M4MjE4NGQ4MSIsIm5iZiI6MTczMDc1MDc2MC4xMzQ0MzQ1LCJzdWIiOiI2NzI4Yzk1NjAwOGM4MTM3ODUyZTAyNWQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.0R4p3F1Q2UBUw1FKrp6bsRLrNhP7amujg3JN0a-YTrU'
        }
    };
    

    
    
//**Latest Release** 
const swiperContainer = document.querySelector('.swiper-wrapper');
const fetchLatestMovies = async (page = 60) => {
    const url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=be68de6d94928ce284bb4c3c82184d81&language=en-US'; 
    const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTY4ZGU2ZDk0OTI4Y2UyODRiYjRjM2M4MjE4NGQ4MSIsIm5iZiI6MTczMDgyMTMyMS42ODA0MjQ3LCJzdWIiOiI2NzI4Yzk1NjAwOGM4MTM3ODUyZTAyNWQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.MaFQ7x3I-ao4hrM-PVRJUs09vCpTlTcJusl7FW0-OtA' 
        }
    };
    
    try {
        const response = await fetch(url, options);
        const data = await response.json();
    


        // Ajouter les films à la swiper
data.results.forEach(movie => {
    const slide = document.createElement('li');
            slide.className = 'swiper-slide';
            slide.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
            // `;
            swiperContainer.appendChild(slide);
        });
        } catch (error) {
            console.error('Erreur lors de la récupération des films :', error);
        }
    };
    
    // Appeler la fonction pour récupérer les films
    fetchLatestMovies();




document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper('.swiper-container', {
        loop: true,
        grabCursor: true,
        centeredSlides: true,
        initialSlide: 4,
        slidesPerView: 3, // Affiche trois slides visibles
        spaceBetween: 30, // Espace entre les slides
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'coverflow',
        coverflowEffect: {
          rotate: 30,       // Diminue l'angle pour un effet 3D plus subtil
          stretch: 0,     // Sépare un peu les slides
          depth: 150,        // Diminue la profondeur pour plus de visibilité des slides latéraux
            modifier: 1,
            slideShadows: true,
        }, 
      observer: true, // Observe les changements dans le DOM
      observeParents: true, // Observe les changements dans les parents du conteneur Swiper
    });

    // Forcer la mise à jour après l'initialisation complète
    swiper.on('init', () => {
        swiper.update(); 
        swiper.slideToLoop(4, 0, false); // Va à la slide initiale
    });

    // Initialiser Swiper explicitement
    swiper.init();

    // Forcer la mise à jour après un léger délai
    setTimeout(() => {
        swiper.update(); // Met à jour Swiper pour recalculer les positions et les effets visuels
        swiper.slideToLoop(swiper.realIndex, 0); // Assure que la bonne slide est active
    }, 200);

    });




//**RECHERCHE DE FILM */
    
    document.addEventListener("DOMContentLoaded", async function () {
        const searchInput = document.getElementById("searchInput");
        const searchButton = document.getElementById("searchButton");
        const section2 = document.querySelector(".section2"); 
        const carousel1 = document.querySelector("#carousel1 .splide__list");
        const API_KEY = "be68de6d94928ce284bb4c3c82184d81"; 
        const BASE_URL = "https://api.themoviedb.org/3";
        const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"; // Pour les images des films
    
        // Fonction pour récupérer les films en fonction de la recherche
        async function searchMovies(query, page = 60) {
            try {
                const response = await fetch(
                    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
                );
                const data = await response.json();
                return data.results;
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
                return [];
            }
        }
    
        // Fonction pour mettre à jour le carousel avec les films
        function updateCarousel(movies) {
            // Supprimer les anciennes slides
            while (carousel1.firstChild) {
                carousel1.removeChild(carousel1.firstChild);
            }
    
            // Ajouter chaque film comme une nouvelle slide
            movies.forEach((movie) => {
                const imageUrl = movie.poster_path
                    ? `${IMAGE_BASE_URL}${movie.poster_path}`
                    : "./assets/img/default-movie.png"; // Image par défaut si aucune affiche n'existe
    
                const slide = document.createElement("li");
                slide.classList.add("splide__slide");
                slide.innerHTML = `
                    <div class="movie-card">
                <img src="${imageUrl}" alt="${movie.title}">
                <div class="movie-info">
                    <h3 class="movie-title">${movie.title}</h3>
                    <p class="movie-details">
                        ${new Date(movie.release_date).getFullYear()}<br>
                        ${movie.genre_ids.map(id => getGenreName(id)).join(', ')}<br>
                        <span class="movie-rating">⭐ ${movie.vote_average}</span>
                    </p>
                </div>
            </div>
                `;
                carousel1.appendChild(slide);
            });
        }
    
        // Afficher la section2 et la mettre à jour avec les films recherchés
        function showSection2(movies) {
            section2.style.display = "block";
            if (movies.length > 0) {
                updateCarousel(movies); // Mettre à jour le carousel avec les films trouvés
                new Splide("#carousel1", {
                    type: "loop",
                    perPage: 5,
                    perMove: 1,
                    gap: "15px",
                    pagination: false,
                    // autoWidth: false,
                    width: "auto",
                    fixedWidth: "220px",
                    height: "350px",
                    trimSpace: false,// Empêche Splide de couper les dernières slides
                    // focus: "center",
                }).mount(); // Initialise Splide pour le carousel
            } else {
                alert("Aucun film trouvé pour votre recherche.");
            }
        }

        // Fonction pour obtenir le nom du genre à partir de l'ID
        function getGenreName(id) {
            const genres = {
                28: 'Action',
                12: 'Adventure',
                16: 'Animation',
                35: 'Comedy',
                80: 'Crime',
            };
            return genres[id] || 'Unknown';
        }




//**RECHERCHE PAR GENRE ** 

        const apiKey = 'be68de6d94928ce284bb4c3c82184d81';
        const baseUrl = 'https://api.themoviedb.org/3';
        
        const genreButtons = document.querySelectorAll('button[genres-movie]');
        const carouselList = document.querySelector('#carousel2 .splide__list');
        
        // Fonction pour récupérer les films par genre
        async function fetchMoviesByGenre(genreId) {
            const url = `${"https://api.themoviedb.org/3"}/discover/movie?api_key=${"be68de6d94928ce284bb4c3c82184d81"}&with_genres=${genreId}&language=en-US`;
            const response = await fetch(url);
            const data = await response.json();
            return data.results;
        }
        
        // Fonction pour afficher les films dans le carousel
        function displayMovies(movies) {
            carouselList.innerHTML = ''; 
            movies.forEach(movie => {
                const li = document.createElement('li');
                li.classList.add('splide__slide');
                li.innerHTML = `
                    <div class="movie-card">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                <div class="movie-info">
                    <h4 class="movie-title">${movie.title}</h4>
                    <p class="movie-details">${movie.release_date}</p>
                    <p class="movie-rating">⭐ ${movie.vote_average}</p>
                </div>
            </div>
                `;
                carouselList.appendChild(li);
            });

            // Initialise ou met à jour le carousel
    if (typeof window.splideInstance !== 'undefined') {
        window.splideInstance.destroy();
    }
        
            // Initialise le carousel Splide après avoir ajouté les films
            new Splide('#carousel2', {
                type: "loop",
                    perPage: 5,
                    perMove: 1,
                    gap: "15px",
                    pagination: false,
                    // autoWidth: false,
                    width: "auto",
                    fixedWidth: "220px",
                    height: "350px",
                    trimSpace: false,// Empêche Splide de couper les dernières slides
                    // focus: "center",
            }).mount();
        }
        
        // Fonction pour changer de genre lors du clic sur un bouton
        genreButtons.forEach(button => {
            button.addEventListener('click', async () => {
                // Désactive les autres boutons et active celui sur lequel on a cliqué
                genreButtons.forEach(b => b.classList.remove('active'));
                button.classList.add('active');
        
                const genreId = button.getAttribute('genres-movie');
                const movies = await fetchMoviesByGenre(genreId);
                displayMovies(movies);
            });
        });
        
        // Charger les films du genre initial (par exemple, Action)
        document.querySelector('.buttons button.active').click();
        










    
    // Écouteur d'événement pour le bouton de recherche
    searchButton.addEventListener("click", async () => {
        const query = searchInput.value.trim();
        if (query) {
            const movies = await searchMovies(query);
            showSection2(movies); // Afficher la section2 avec les films trouvés
        }
    });    
    // Activer la recherche en appuyant sur la touche Entrée
    searchInput.addEventListener("keypress", async (event) => {
        if (event.key === "Enter") {
            const query = searchInput.value.trim();
            if (query) {
                const movies = await searchMovies(query);
                showSection2(movies); // Afficher la section2 avec les films trouvés
            }
        }
    });
});
    



















    