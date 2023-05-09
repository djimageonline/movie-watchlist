import { v4 as uuidv4 } from "https://jspm.dev/uuid";
console.log(uuidv4);
let api = "";

const movieList = document.getElementById("movie-list");
const formSubmit = document.getElementById("form-submit");
let filmIcon = document.getElementById("film-icon");

formSubmit.addEventListener("submit", getMovieBySearch);

document.addEventListener("click", function (e) {
  console.log(e.target.dataset);
});

function getMovieBySearch() {
  filmIcon.classList.add("hidden");
  movieList.innerHTML = "";
  event.preventDefault();
  let searchBarValue = document.getElementById("search-bar");
  fetch(`http://www.omdbapi.com/?apikey=${api}&s=${searchBarValue.value}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.Response);
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
      console.log(movieData);
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
      <p class="year">${Year}</p>
      <p class="runtime">${Runtime}</p>
      <p class="ratings">⭐️ ${Ratings[0].Value}</p>
      <p class="genre">${Genre}</p>
      <p class="actors">${Actors}</p>
      <p class="watchlist-btn" id="watchlist-btn" data-watchlist="">➕ Watchlist</p>
    </div>
    <p class="plot">${Plot}</p>
  </div>
  `;

    movieList.innerHTML += movieHtml;
  }
}

function handleWatchlistClick() {
  console.log("watch click");
}
