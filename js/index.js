/* Variables Globales */
const APIKEY = "vcZZ9afZZzKY6qX9q4US8wITbdxp9wPG";

/* Menu hamburguesa */
let navBar = document.getElementById('navBar');
navBar.addEventListener('click', () => {

    navBarClose.classList.remove('hidden');
    navBar.classList.add('hidden');
    document.getElementById('ulNavBar').classList.toggle('active');
});

let navBarClose = document.getElementById('navBarClose');
navBarClose.addEventListener('click', () => {

    navBarClose.classList.add('hidden');
    navBar.classList.remove('hidden');
    document.getElementById('ulNavBar').classList.toggle('active');
});

/* Cambiar tema Nocturno */
const btnTheme = document.querySelector('#theme');
var modeTheme = 0;
btnTheme.addEventListener('click', () => {
    document.body.classList.toggle('changeTheme');
    if (btnTheme.innerText == "MODO NOCTURNO") {
        btnTheme.innerText = "MODO DIURNO";
        modeTheme = 1;
        /* debugger */
        ImgDarkTheme();
    } else {
        btnTheme.innerText = "MODO NOCTURNO";
        modeTheme = 0;
        ImgLightTheme();
    }
    /* Enviar información del cambio de modo */
    localStorage.setItem('sendTheme', JSON.stringify(modeTheme));
});

let logo = document.getElementById('logo');
let burger = document.getElementById('navBar');
let closeNav = document.getElementById('navBarClose');
let camara = document.getElementById('camara');
let movie = document.getElementById('movie');
let btnSearch = document.getElementById('imgBtnSearch');
let imgCloseSearch = document.getElementById('imgCloseSearch');

function ImgDarkTheme() {
    logo.src = "../imgLogo-modo-noc.svg";
    burger.src = "../imgburger-modo-noct.svg";
    closeNav.src = "../imgclose-modo-noct.svg";
    if (camara != null && movie != null) {
        camara.src = "../imgcamara-modo-noc.svg";
        movie.src = "../imgpelicula-modo-noc.svg";
    }
    if (btnSearch != null) {
        btnSearch.src = "../imgicon-search-mod-noc.svg";
        imgCloseSearch.src = "../imgclose-modo-noct.svg";
    }
}

function ImgLightTheme() {
    logo.src = "../imglogo-desktop.svg";
    burger.src = "../imgburger.svg";
    closeNav.src = "../imgbutton-close.svg";
    if (camara != null && movie != null) {
        camara.src = "../imgcamara.svg";
        movie.src = "../imgpelicula.svg";
    }
    if (btnSearch != null) {
        btnSearch.src = "../imgicon-search.svg";
        imgCloseSearch.src = "../imgbutton-close.svg";
    }
}

/* Traer información del modo actual */
var modeThemeResponse = JSON.parse(localStorage.getItem("sendTheme"));

if (modeThemeResponse == 1) {
    document.body.classList.toggle('changeTheme');
    btnTheme.innerText = "MODO DIURNO";
    ImgDarkTheme();
} else {
    ImgLightTheme();
}



async function downloadFullScreen(e) {

    let imgFullScreen = document.getElementById('imgFullScreen').src;

    let a = document.createElement('a');
    let response = await fetch(imgFullScreen);
    let file = await response.blob();
    a.download = e.id;
    a.href = window.URL.createObjectURL(file);
    a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
    a.click();
}

var arrayFavorites = [];

var arrFav = JSON.parse(localStorage.getItem("sendFavorites"));
if (arrFav != null) {
    arrayFavorites = arrFav;
}

function addFavoritesFullScreen(iconFavorite) {

    let imgFullScreen = document.getElementById('imgFullScreen').src;

    arrayFavorites.push(imgFullScreen);
    localStorage.setItem('sendFavorites', JSON.stringify(arrayFavorites));
}