let api = "";

const movieList = document.getElementById("movie-list");
const formSubmit = document.getElementById("form-submit");

formSubmit.addEventListener("submit", getMovieBySearch);

function getMovieBySearch() {
  movieList.innerHTML = "";
  event.preventDefault();
  let searchBarValue = document.getElementById("search-bar").value;
  console.log(searchBarValue);
  fetch(`http://www.omdbapi.com/?apikey=${api}&s=${searchBarValue}`)
    .then((response) => response.json())
    .then((data) => {
      for (let items of data.Search) {
        getMovieByTitle(items);
      }
      searchBarValue = "";
    });
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

  movieHtml = `
  <div class="movie">
    <h4>${Title}</h4>
    <img class="poster" src=${Poster}>
    <p>${Year}</p>
    <p>${Runtime}</p>
    <p>${Actors}</p>  
    <p>${Plot}</p>
  </div>
  `;

  movieList.innerHTML += movieHtml;
}
