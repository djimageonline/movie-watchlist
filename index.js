let api = "";

const movieList = document.getElementById("movie-list");
const formSubmit = document.getElementById("form-submit");

formSubmit.addEventListener("submit", getMovieBySearch);

function getMovieBySearch() {
  movieList.innerHTML = "";
  event.preventDefault();
  let searchBarValue = document.getElementById("search-bar");
  fetch(`http://www.omdbapi.com/?apikey=${api}&s=${searchBarValue.value}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.Response);
      mapTest(data.Search);
      searchBarValue.value = "";
    });
}

function mapTest(data) {
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
  let { Title, Actors, Year, Rated, Released, Runtime, Genre, Plot, Poster } = movieData;
  let movieHtml = "";

  if (movieData.Response !== "False") {
    movieHtml = `
  <div class="movie">
    <h3>${Title}</h3>
    <img class="poster" src=${Poster}>
    <div class="movie-detail1">
      <p>${Year}</p>
      <p>${Runtime}</p>
      <p>${Genre}</p>
    </div>
    <p>${Actors}</p>
    <p>${Plot}</p>
    <hr color="#4B4B4B">
  </div>
  `;

    movieList.innerHTML += movieHtml;
  }
}
