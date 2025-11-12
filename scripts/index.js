"use strict";

import { calcItemsSize } from "./utils.js";
import {
    generateMovieItem,
    generateNoContentPlaceholder,
    closeDetailsSection,
    showMovieInDetails,
    removeDetailsClassFromItems
} from "./ui.js";
import { getMovies, getSingleMovie } from "./services.js";
import {
    DEFAULT_SEARCH_TERM,
    CURRENT_PAGE,
    SEARCH_DEBOUNCE_FLAG,
    resetPage,
    incrementPage
} from "./config.js";

const resultWrapper = document.getElementById("result-wrapper");
const detailsWrapper = document.getElementById("id-details-wrapper");
const searchInput = document.getElementById("search");
const searchTrendSpan = document.getElementById("search-trend");
const pageNumberSpan = document.getElementById("page-number");
const nextBtn = document.getElementById("next-btn");

window.onload = () => document.body.classList.add("loaded");

document.addEventListener("DOMContentLoaded", () => {
    if (!resultWrapper) throw new Error("Result wrapper not found");
    if (!detailsWrapper) throw new Error("Details wrapper not found");

    initialMovieList();
    initListeners();
});

window.onresize = () => calcItemsSize();

function initialMovieList() {
    getMovies(DEFAULT_SEARCH_TERM)
        .then(({ movies = [] }) => {
            movies.forEach(item =>
                resultWrapper.append(generateMovieItem(item, handleMovieItemClick))
            );
        });
}

function initListeners() {
    const closeBtn = detailsWrapper.querySelector(".movie-details__close");
    if (closeBtn)
        closeBtn.addEventListener("click", () => closeDetailsSection(detailsWrapper));

    searchInput.addEventListener("input", searchInMovies);
    nextBtn.addEventListener("click", nextBtnClickHandler);
}

function searchInMovies(e) {
    if (SEARCH_DEBOUNCE_FLAG) clearTimeout(SEARCH_DEBOUNCE_FLAG);
    SEARCH_DEBOUNCE_FLAG = setTimeout(() => {
        let trend = e.target.value || DEFAULT_SEARCH_TERM;

        if (trend.length < 3) return;

        resetPage();
        trend = trend.trim();

        getMoviesAndParse(trend, CURRENT_PAGE);
    }, 300);
}

function nextBtnClickHandler() {
    let trend = searchInput.value || DEFAULT_SEARCH_TERM;

    if (trend.length < 3) return;

    getMoviesAndParse(trend, incrementPage());
}

function getMoviesAndParse(trend, page) {
    resultWrapper.innerHTML = "";

    searchTrendSpan.innerText = trend.length < 10 ? trend : trend.substr(0, 8) + "...";
    nextBtn.style.display = "none";
    pageNumberSpan.innerText = "";

    getMovies(trend, page)
        .then(({ movies = [], totalResults = 0 }) => {
            if ((page * 10) < +totalResults) {
                pageNumberSpan.innerText = `| Page: ${page}`;
                nextBtn.style.display = "inline-block";
            }

            if (movies.length)
                movies.forEach(movie => resultWrapper.append(generateMovieItem(movie, handleMovieItemClick)));
            else
                resultWrapper.append(generateNoContentPlaceholder());

            window.scrollTo({ top: 0, behavior: "smooth" });
        });
}

function handleMovieItemClick(e) {
    const movieItem = e.target.closest(".movie-item");
    const movieItemID = movieItem.getAttribute("data-imdbid");

    removeDetailsClassFromItems();
    movieItem.classList.add("--in-details");

    getSingleMovie(movieItemID)
        .then(movieObj => showMovieInDetails(movieObj, movieItem, detailsWrapper));
}
