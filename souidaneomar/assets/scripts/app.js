const apiUrl = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
const apiKey = 'b4a342ac0d35f6b4c192ceb22bce0cb4'; 
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNGEzNDJhYzBkMzVmNmI0YzE5MmNlYjIyYmNlMGNiNCIsInN1YiI6IjY2Mjc2NjFmMTc2YTk0MDE2NjgxN2NhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.s1Mo6yBob-bcKKmhqJ2-2EsT5t596BxzYfHLokzRyO8'
  }
};

const movieList = document.getElementById('movie-list');

fetch(apiUrl, options)
  .then(response => response.json())
  .then(data => {
    const movies = data.results;
    movies.forEach(movie => {
      const li = document.createElement('li');
      li.classList.add('movie');

      const posterUrl = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
      const poster = document.createElement('img');
      poster.src = posterUrl;
      poster.alt = movie.title;
      poster.classList.add('poster');
      li.appendChild(poster);

      const title = document.createElement('span');
      title.textContent = movie.title;
      title.classList.add('title');
      li.appendChild(title);






      //LISTA TUTTI NORMALE



      fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&language=en-US`, options)
        .then(response => response.json())
        .then(movieData => {
          const rating = document.createElement('span');
          rating.textContent = `${movieData.vote_average}/10`;
          rating.classList.add('rating');
          li.appendChild(rating);
        })
        .catch(err => {
          console.error(`Error fetching rating for movie ${movie.title}:`, err);
          const rating = document.createElement('span');
          rating.textContent = 'Rating: N/A';
          rating.classList.add('rating');
          li.appendChild(rating);
        });

      movieList.appendChild(li);
    });
  })
  .catch(err => console.error(err));



  fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  .then(response => response.json())
  .then(data => {
    const moviesContainer = document.getElementById('movies');

    data.results.forEach(movie => {
      const movieElement = document.createElement('div');
      movieElement.classList.add('movie');

      const title = document.createElement('h2');
      title.textContent = movie.title;

      const image = document.createElement('img');
      image.src = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;   
      image.alt = movie.title;

      const description = document.createElement('p');
      description.textContent = movie.overview;

      movieElement.appendChild(title);
      movieElement.appendChild(image);
      movieElement.appendChild(description);

      moviesContainer.appendChild(movieElement);
    });
  })
  .catch(err => console.error(err));




