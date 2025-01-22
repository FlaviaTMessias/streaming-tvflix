'use strict'
import { api_key,fetchDataFromServer } from "./api.js"
export function sidebar(){
    const genreList = {};
    fetchDataFromServer(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=pt-BR`, function({genres}){
      for(const {id, name} of genres){
        genreList[id] = name;
      }
        genreLink();
    });
    const sidebarInner = document.createElement('div');
    sidebarInner.classList.add("sidebar-inner")
    sidebarInner.innerHTML = `
    <div class="sidebar-list">
    <p class="title">Genero</p>
    </div>

  <div class="sidebar-list">
    <p class="title">Idioma</p>

    <a href="./movie-list.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=en","English")'>English</a>

    <a href="./movie-list.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=pt","Portugues")'>Portugues</a>

    <a href="./movie-list.html" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=es","Espanhol")'>Espanhol</a>

  </div>

  <div class="sidebar-footer">
    <p >Feito por FlaviaTM
    </p>
    <div class="social-link">    
        <a target="_blank" href="https://github.com/FlaviaTMessias" alt="Social handles" target="_blank">Github</a>
        <a target="_blank" href="https://www.instagram.com/_flaviatm/" alt="Social handles" target="_blank">Instagram</a>
    </div>
  </div>
`;

    const genreLink = function(){

        for(const [genreId, genreName] of Object.entries(genreList)){
            const link = document.createElement("a");
            link.classList.add("sidebar-link");
            link.setAttribute("href","./movie-list.html");
            link.setAttribute("menu-close","");
            link.setAttribute('onclick',`getMovieList("with_genres=${genreId}","${genreName}")`);
            link.textContent= genreName;
            sidebarInner.querySelectorAll(".sidebar-list")[0].appendChild(link);
        }
        const sidebar= document.querySelector("[sidebar]")
        sidebar.appendChild(sidebarInner);
        toggleSidebar(sidebar);
    }
    const toggleSidebar = function(sidebar){
        // Alternar barra lateral apenas na tela do celular
        
        const sidebarBtn = document.querySelector("[menu-btn]")
        const sidebarTogglers = document.querySelectorAll("[menu-toggler]");
        const overlay = document.querySelector("[overlay]")
        addEventOnElements(sidebarTogglers, "click", function(){
            sidebar.classList.toggle("active");
            sidebarBtn.classList.toggle("active");
            overlay.classList.toggle("active");
        });
    }
}