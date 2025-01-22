'use strict';

// const api_key = 'dbd1d03186db325cb0098ddd3623855d';
const api_key = '560900d43f10364d3470f692ab377e0b';
const imageBaseURL = 'https://image.tmdb.org/t/p/';
//2:10:32
//Busca dados de um servidor usando o 'url' e passa
// o resultado em dados JSON para uma função de 'retorno de chamada',
// junto com um parâmetro opcional se tiver 'optionParam'

const fetchDataFromServer = function(url,callback, optionalParam){
    fetch(url)
    .then(response => response.json())
    .then(data => callback(data,optionalParam));
}
export { imageBaseURL, api_key,fetchDataFromServer };