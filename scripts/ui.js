"use strict";

function generateMovieItem(movie, clickHandler) {
    const item = document.createElement("div");
    item.classList.add("movie-item");
    item.setAttribute("data-imdbid", movie.imdbID);

    const img = document.createElement("img");
    img.src = movie.Poster !== "N/A" ? movie.Poster : "./assets/img/no-poster.png";
    img.alt = `${movie.Title} Poster`;
    img.loading = "lazy";

    const title = document.createElement("h3");
    title.classList.add("movie-item__title");
    title.textContent = movie.Title;

    const year = document.createElement("p");
    year.classList.add("movie-item__year");
    year.textContent = movie.Year;

    item.append(img, title, year);
    item.addEventListener("click", clickHandler);

    return item;
}

function generateNoContentPlaceholder() {
    const placeholder = document.createElement("div");
    placeholder.classList.add("no-content");
    placeholder.innerHTML = `
        <p>Nenhum resultado encontrado.</p>
        <p>Tente outra busca!</p>
    `;
    return placeholder;
}

function showMovieInDetails(movie, movieItem, detailsWrapper) {
    if (!detailsWrapper) return;

    const poster = movie.Poster !== "N/A" ? movie.Poster : "./assets/img/no-poster.png";

    detailsWrapper.innerHTML = `
        <div class="movie-details__content">
            <button class="movie-details__close">×</button>
            <div class="movie-details__poster">
                <img src="${poster}" alt="${movie.Title} Poster">
            </div>
            <div class="movie-details__info">
                <h2>${movie.Title}</h2>
                <p><strong>Ano:</strong> ${movie.Year}</p>
                <p><strong>Gênero:</strong> ${movie.Genre}</p>
                <p><strong>Diretor:</strong> ${movie.Director}</p>
                <p><strong>Elenco:</strong> ${movie.Actors}</p>
                <p><strong>Enredo:</strong> ${movie.Plot}</p>
                <p><strong>Nota IMDb:</strong> ${movie.imdbRating}</p>
            </div>
        </div>
    `;

    detailsWrapper.classList.add("--visible");

    const closeBtn = detailsWrapper.querySelector(".movie-details__close");
    closeBtn.addEventListener("click", () => closeDetailsSection(detailsWrapper));
}

function closeDetailsSection(detailsWrapper) {
    if (!detailsWrapper) return;

    detailsWrapper.classList.remove("--visible");

    detailsWrapper.innerHTML = "";
}

function removeDetailsClassFromItems() {
    document.querySelectorAll(".movie-item.--in-details")
        .forEach(item => item.classList.remove("--in-details"));
}

export {
    generateMovieItem,
    generateNoContentPlaceholder,
    showMovieInDetails,
    closeDetailsSection,
    removeDetailsClassFromItems
};
