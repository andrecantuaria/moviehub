'use strict';

// DATA (Import)
import movies from '../data/data.js';

// UTILITY FUNCTIONS
function getElement(selector, parent = document) {
    return parent.getElementById(selector);
}

function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}
    
// LOAD ALL MOVIES FUNCTION
function loadAllMovies() {
    const moviesContainer = getElement('movies-container');

    movies.forEach(function(film) {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');

        const img = document.createElement('img');
        img.src = film.poster;
        img.alt = film.title;

        const title = document.createElement('h4');
        title.textContent = `${film.title} (${film.year})`;

        const description = document.createElement('p');
        description.textContent = `${film.description} (${film.genre})`;

        movieItem.appendChild(img);
        movieItem.appendChild(title);
        movieItem.appendChild(description);
        

        moviesContainer.appendChild(movieItem);
    });
}

window.onload = loadAllMovies;

// LOAD RESULT FUNCTION

function populateSearchSuggestions(userInput) {
    const suggestionsContainer = getElement('suggestions-container');
    suggestionsContainer.innerHTML = ''; // clean content

    if (userInput === '') {
        //  If it is empty, no suggestions will be displayed.
        return;
    }

    // If the movie 'starts with' an specific character
    const matchedMovies = movies.filter(function(film) {
        return film.title.toLowerCase().startsWith(userInput.toLowerCase());
    });

    matchedMovies.forEach(function(film) {
        const suggestion = document.createElement('div');
        suggestion.textContent = film.title;
        suggestion.classList.add('suggestion');
        suggestion.addEventListener('click', function() {
            showMovieDetails(film);
        });
        suggestionsContainer.appendChild(suggestion);
    });

    if (matchedMovies.length === 0) {
        const movieNotFound = document.createElement('div');
        movieNotFound.textContent = 'Movie not found';
        suggestionsContainer.appendChild(movieNotFound);
    }
}


searchField.addEventListener('input', function() {
    const userInput = searchField.value.trim();
    populateSearchSuggestions(userInput);
});


function showMovieDetails(movie) {
    const moviesContainer = document.getElementById('movies-container');
    const detailMovieContainer = document.getElementById('detail-movie-container');

    
    moviesContainer.style.display = 'none';

    
    detailMovieContainer.innerHTML = '';
    detailMovieContainer.style.display = 'flex'; 

    
    const movieItem = document.createElement('div');
    movieItem.classList.add('detail-movie-item');

    const img = document.createElement('img');
    img.src = movie.poster;
    img.alt = movie.title;

    const detailsDiv = document.createElement('div'); 

    const title = document.createElement('h3');
    title.textContent = `${movie.title} (${movie.year})`;

    const description = document.createElement('p');
    description.textContent = movie.description;

    const genre = document.createElement('p');
    genre.textContent = movie.genre;

    const watchTrailer = document.createElement('a');
    watchTrailer.textContent = 'Watch Trailer';
    watchTrailer.href = movie.trailerUrl; 
    watchTrailer.target = '_blank'; 
    watchTrailer.style.display = 'inline'; 

    const runningTime = document.createElement('p');
    runningTime.textContent = `Duration: ${movie.runningTime}`;


    detailsDiv.appendChild(title);
    detailsDiv.appendChild(description);
    detailsDiv.appendChild(runningTime);
    detailsDiv.appendChild(genre);
    detailsDiv.appendChild(watchTrailer);
    movieItem.appendChild(img);
    movieItem.appendChild(detailsDiv);
    

    detailMovieContainer.appendChild(movieItem);
}
