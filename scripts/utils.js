"use strict";


export function calcItemsSize(resultWrapper) {
    let columnsCount = Math.floor(resultWrapper.offsetWidth / 200) || 1;
    document.body.style.setProperty("--poster-height", (resultWrapper.offsetWidth / columnsCount) + "px");
    document.body.style.setProperty("--result-grid-column", columnsCount.toString());
}


export function removeDetailsClassFromItems() {
    document.querySelectorAll(".movie-item").forEach(mi => {
        mi.classList.remove("--in-details");
    });
}


export function generateNoContentPlaceholder(resultWrapper, message = "Movies not found.") {
    let placeholderElm = document.createElement("p");
    placeholderElm.classList.add("no-content-placeholder");
    placeholderElm.innerText = message;
    resultWrapper.append(placeholderElm);
}
