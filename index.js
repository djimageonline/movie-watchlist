import { v4 as uuidv4 } from "https://jspm.dev/uuid";
let api = "";
let watchlistArray = [];

const movieList = document.getElementById("movie-list");
const formSubmit = document.getElementById("form-submit");
let filmIcon = document.getElementById("film-icon");

formSubmit.addEventListener("submit", getMovieBySearch);

document.addEventListener("click", function (e) {
  if (e.target.dataset.watchlist) {
    console.log("click event");
    handleWatchlistClick(e.target.dataset);
  }
});

function getMovieBySearch() {
  filmIcon.classList.add("hidden");
  movieList.innerHTML = "";
  event.preventDefault();
  let searchBarValue = document.getElementById("search-bar");
  fetch(`http://www.omdbapi.com/?apikey=${api}&s=${searchBarValue.value}`)
    .then((response) => response.json())
    .then((data) => {
      mapMovies(data.Search);
      searchBarValue.value = "";
    });
}

function mapMovies(data) {
  for (let items of data) {
    getMovieByTitle(items);
  }
}

function getMovieByTitle(data) {
  fetch(`http://www.omdbapi.com/?apikey=${api}&t=${data.Title}`)
    .then((response) => response.json())
    .then((movieData) => {
      renderMovieHtml(movieData);
    });
}

function renderMovieHtml(movieData) {
  let { Title, Actors, Year, Rated, Ratings, Released, Runtime, Genre, Plot, Poster } = movieData;
  let movieHtml = "";

  if (movieData.Response !== "False") {
    movieHtml = `
  <div class="movie">
    <h2 class="title">${Title}</h2>
    <img class="poster" src=${Poster}>
    <div class="movie-detail1">
    <div class="year-runtime-rating">
      <p class="year">${Year}</p>
      <p class="runtime">${Runtime}</p>
      <p class="ratings">⭐️ ${Ratings[0].Value}</p>
    </div>
      <p class="genre">${Genre}</p>
      <p class="actors">${Actors}</p>
      <p 
        class="watchlist-btn" 
        id="watchlist-btn" 
        data-watchlist="${uuidv4()}"
        data-title="${Title}"
        data-poster="${Poster}"
        data-year="${Year}"
        data-runtime="${Runtime}"
        data-ratings="${Ratings[0].Value}"
        data-actors="${Actors}"
        data-plot="${Plot}"
        "
      >➕ Watchlist</p>
    </div>
    <p class="plot">${Plot}</p>
  </div>
  `;

    movieList.innerHTML += movieHtml;
  }
}

function handleWatchlistClick(movieData) {
  let tempMovieDetailObj = {};
  tempMovieDetailObj = {
    id: `${movieData.watchlist}`,
    title: `${movieData.title}`,
    poster: `${movieData.poster}`,
    year: `${movieData.year}`,
    runtime: `${movieData.runtime}`,
    ratings: `${movieData.ratings}`,
    actors: `${movieData.actors}`,
    plot: `${movieData.plot}`,
  };

  watchlistArray.push(tempMovieDetailObj);
  console.log(watchlistArray);
}
