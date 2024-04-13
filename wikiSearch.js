let searchInput = document.getElementById("searchInput");
let spinner = document.getElementById("spinner");
let searchResults = document.getElementById("searchResults");

function createAndAppendSearchResult(result) {
    let {
        title,
        link,
        description
    } = result;

    let resultContainer = document.createElement("div");
    resultContainer.classList.add("result-item");
    searchResults.appendChild(resultContainer);

    let searchTitle = document.createElement("a");
    searchTitle.classList.add("result-title");
    searchTitle.href = link;
    searchTitle.target = "_blank";
    searchTitle.textContent = title;
    resultContainer.appendChild(searchTitle);

    let titleBreak = document.createElement("br");
    resultContainer.appendChild(titleBreak);

    let searchLink = document.createElement("a");
    searchLink.classList.add("result-url");
    searchLink.hraf = link;
    searchLink.textContent = link;
    searchLink.target = "_blank";
    resultContainer.appendChild(searchLink);

    let linkBreak = document.createElement("br");
    resultContainer.appendChild(linkBreak);

    let searchDescription = document.createElement("p");
    searchDescription.classList.add("link-description");
    searchDescription.textContent = description;
    resultContainer.appendChild(searchDescription);
}



function searchResultsObject(search_results) {
    spinner.classList.toggle("d-none");
    for (let result of search_results) {
        createAndAppendSearchResult(result);
    }
}



function searchWikipedia(event) {
    if (event.key === "Enter") {
        searchResults.textContent = "";
        spinner.classList.toggle("d-none");

        let searchInputValue = searchInput.value;
        let options = {
            method: "GET"
        }
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInputValue;
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                searchResultsObject(search_results);
            });
    }
}


searchInput.addEventListener("keydown", searchWikipedia);