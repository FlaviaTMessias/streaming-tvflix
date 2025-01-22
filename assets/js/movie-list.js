'use strict';
import { api_key, fetchDataFromServer} from './api.js';
import { sidebar } from './sidebar.js'
import { createMovieCard } from './movie-card.js';
import { search } from './search.js';

// collect genre name & url parameter from local storage
const genreName = window.localStorage.getItem("genreName");
const urlParam = window.localStorage.getItem("urlParam");
const pageContent = document.querySelector("[page-content]");

sidebar();
let currentPage=1;
let totalPages=0;
// const fetchURL = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&include_adult=false&page=${currentPage}&${urlParam}`;

fetchDataFromServer(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&include_adult=false&page=${currentPage}&${urlParam}`,function({results:movieList,total_pages}){
    totalPages=total_pages;
    document.title = `${genreName} Videos - Tvflix`;

    const movieListElem = document.createElement("section");
    movieListElem.classList.add("movie-list","genre-list")
    movieListElem.ariaLabel = `${genreName} Videos`;
    movieListElem.innerHTML = `
    <div class="title-wrapper">
    <h1 class="heading">Todos ${genreName} Videos</h1>
    </div>
    <div class="grid-list"></div>
    <button class="btn load-more" load-more> Carregar mais</button>
    `;

    for(const movie of movieList){
        const movieCard = createMovieCard(movie);
        movieListElem.querySelector(".grid-list").appendChild(movieCard)
    }
    pageContent.appendChild(movieListElem);

    //> Carregar mais funcionalidade botao

    document.querySelector("[load-more]").addEventListener("click",function(){
        if(currentPage >= totalPages){
            this.style.display = "none";
            return;
        }
        currentPage++;
        this.classList.add("loading"); 
        fetchDataFromServer(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&include_adult=false&page=${currentPage}&${urlParam}`,({results:movieList}) => {
            this.classList.remove("loading")

            for(const movie of movieList){
                const movieCard = createMovieCard(movie);
                movieListElem.querySelector(".grid-list").append(movieCard);
            }
        })
    })

})

search();