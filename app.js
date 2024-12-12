document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper('.swiper-container', {
      loop: true,
      grapCursor: true,
      centeredSlides: false,
      slidesPerView: 1, // Affiche trois slides visibles
      spaceBetween: 30, // Espace entre les slides
      loop: true,
      pagination: {
          el: '.swiper-pagination',
          clickable: true,
      },
      navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
      },
      effect: 'coverflow',
      centeredSlides: true,
      slidesPerView: '3',
      coverflowEffect: {
          rotate: 30,       // Diminue l'angle pour un effet 3D plus subtil
          stretch: 0,     // Sépare un peu les slides
          depth: 150,        // Diminue la profondeur pour plus de visibilité des slides latéraux
          modifier: 1,
          slideShadows: true,
      },
    });
    });
    
    
    
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
    
    // fetch(url, options)
    //   .then(res => res.json())
    //   .then(json => console.log(json))
    //   .catch(err => console.error(err));
    
    // async function fetchMovies(query){
    //     try {
    //         const response = await fetch(`https://api.themoviedb.org/3/movie/11?api_key=be68de6d94928ce284bb4c3c82184d81`)
    //     }
    // }
    
    
    
    
    
    
    
    
    
    //LATEST RELEASE
    const swiperContainer = document.querySelector('.swiper-wrapper');
    
    const fetchLatestMovies = async () => {
      const url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=be68de6d94928ce284bb4c3c82184d81&language=en-US'; // Remplacez YOUR_API_KEY par votre clé
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTY4ZGU2ZDk0OTI4Y2UyODRiYjRjM2M4MjE4NGQ4MSIsIm5iZiI6MTczMDgyMTMyMS42ODA0MjQ3LCJzdWIiOiI2NzI4Yzk1NjAwOGM4MTM3ODUyZTAyNWQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.MaFQ7x3I-ao4hrM-PVRJUs09vCpTlTcJusl7FW0-OtA' // Remplacez par votre token si nécessaire
        }
      };
    
      try {
        const response = await fetch(url, options);
        const data = await response.json();
    
        // Ici, nous pouvons ajouter les films à la swiper
        data.results.forEach(movie => {
          const slide = document.createElement('li');
          slide.className = 'swiper-slide';
          slide.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
          `;
          swiperContainer.appendChild(slide);
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des films :', error);
      }
    };
    
    // Appeler la fonction pour récupérer les films
    fetchLatestMovies();
    
    
    







//Searsh for film

    document.addEventListener("DOMContentLoaded", function () {
      const searchInput = document.getElementById("searchInput");
      const searchButton = document.getElementById("searchButton");
      const carousel1 = document.querySelector("#carousel1 .splide__list");
      const API_KEY = "be68de6d94928ce284bb4c3c82184d81"; // Remplacez par votre clé TMDb
      const BASE_URL = "https://api.themoviedb.org/3";
      const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"; // Pour les images des films
  
      // Fonction pour effectuer une requête à l'API TMDb
      async function searchMovies(query) {
          try {
              const response = await fetch(
                  `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
              );
              const data = await response.json();
              return data.results;
          } catch (error) {
              console.error("Erreur lors de la récupération des données :", error);
          }
      }
  
      function updateCarousel(movies) {
        // Supprime toutes les slides existantes
        while (carousel1.firstChild) {
            carousel1.removeChild(carousel1.firstChild);
        }
    
        // Ajoute chaque film comme une nouvelle slide
        movies.forEach((movie) => {
            const imageUrl = movie.poster_path
                ? `${IMAGE_BASE_URL}${movie.poster_path}`
                : "./assets/img/default-movie.png"; // Image par défaut si aucune affiche n'existe
    
            const slide = document.createElement("li");
            slide.classList.add("splide__slide");
            slide.innerHTML = `
                <img src="${imageUrl}" alt="${movie.title}">
                
            `;
            carousel1.appendChild(slide);
        });
    
        // Re-monte le carousel Splide pour inclure les nouvelles slides
        const splide = new Splide("#carousel1");
        splide.mount();
    }
    
  
      // Écouteur d'événement pour le bouton de recherche
      searchButton.addEventListener("click", async () => {
          const query = searchInput.value.trim();
          if (query) {
              const movies = await searchMovies(query);
              if (movies && movies.length > 0) {
                  updateCarousel(movies);
              } else {
                  alert("Aucun film trouvé pour votre recherche.");
              }
          }
      });
  
      // Optionnel : Activer la recherche en appuyant sur la touche Entrée
      searchInput.addEventListener("keypress", async (event) => {
          if (event.key === "Enter") {
              const query = searchInput.value.trim();
              if (query) {
                  const movies = await searchMovies(query);
                  if (movies && movies.length > 0) {
                      updateCarousel(movies);
                  } else {
                      alert("Aucun film trouvé pour votre recherche.");
                  }
              }
          }
      });
  });
  