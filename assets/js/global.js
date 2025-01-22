'use strict';
// Adicione pares em vários elementos
const addEventOnElements = function(elements, eventType, callback){
    for(const elem of elements)elem.addEventListener(eventType,callback);
}

// Alternar caixa de pesquisa no dispositivo móvel || tela pequena

const searchBox = document.querySelector(".search-box");
const searchTogglers = document.querySelectorAll("[search-toggler]");
addEventOnElements(searchTogglers,"click",function(){
    searchBox.classList.toggle("active");
})
    
// Armazena movieId no armazenamento local
// quando qualquer filme clica no cartão

const getMovieDetail = function(movieId){
    window.localStorage.setItem("movieId",String(movieId));
}

const getMovieList = function(urlParam, genreName){
    window.localStorage.setItem("urlParam",urlParam);
    window.localStorage.setItem("genreName",genreName)
}
