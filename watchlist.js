const watchlistArray = JSON.parse(localStorage.getItem("movieList"));

document.addEventListener("click", function (e) {
  if (e.target.dataset.watchlist) {
    handleRemoveMovie(e.target.dataset.watchlist);
  }
});

function handleRemoveMovie(movieId) {
  let targetMovieObj = watchlistArray.filter(function (movie) {
    return movie.id === movieId;
  })[0];

  let indexOfObject = watchlistArray.indexOf(targetMovieObj);
  watchlistArray.splice(indexOfObject, 1);

  localStorage.setItem("movieList", JSON.stringify(watchlistArray));
  renderWatchListMovies();
}

function renderWatchListMovies() {
  let movieHtml = "";

  if (watchlistArray.length < 1) {
    document.getElementById(
      "movie-list"
    ).innerHTML = `<h4 class="message" id="message">Your watchlist is looking a little empty...<br><a class="message-watchlist" href="index.html">Go search some movies! 🍿🎬</a></h4>
  `;
  } else {
    for (let movie of watchlistArray) {
      movieHtml += `
        <div class="movie">
          <h2 class="title">${movie.title}</h2>
          <img class="poster" src=${movie.poster}>
          <div class="movie-detail1">
          <div class="year-runtime-rating">
            <p class="year">${movie.year}</p>
            <p class="runtime">${movie.runtime}</p>
            <p class="ratings">⭐️ ${movie.ratings}</p>
          </div>
            <p class="genre">${movie.genre}</p>
            <p class="actors">${movie.actors}</p>
            <p
              class="remove-btn"
              id="remove-btn"
              data-watchlist="${movie.id}"
            >➖ Remove</p>
          </div>
          <p class="plot">${movie.plot}</p>
        </div>
        `;
    }
    document.getElementById("movie-list").innerHTML = movieHtml;
  }
}

renderWatchListMovies();
