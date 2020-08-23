//Variables
let countSeeMore = 12;
let countSeeLess = 12;

const APIKEY = "vcZZ9afZZzKY6qX9q4US8wITbdxp9wPG";

/* Even Listener     */
document.getElementById("btnSearch").addEventListener("click", init);

document.getElementById("search").addEventListener('keyup', onKeyUp);

document.getElementById('btnClose').addEventListener('click', clearSuggest);

document.getElementById('search').addEventListener('keyup', suggestSearch);

/* ____________________________________________________________________________________________________________________________________ */
/*                                    FUNCIONES DE BUSQUEDA DE GIF - BTN_LUPA BTN_VER_MAS                                               */

/* funcion de busqueda inicial*/
function init() {


    document.getElementById('noFound').classList.remove('styleNoFound');
    document.getElementById('noFound').classList.add('hidden');

    let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=${countSeeMore}&q=`;
    let str = document.getElementById("search").value;
    url = url.concat(str);
    console.log(url);
    fetch(url).then(response => response.json()).then(content => {
            console.log(content.data);
            if (content.data != "") {
                try {
                    document.getElementById('sectionSearch').classList.remove('hidden');
                    document.getElementById('searchIndex').innerText = "";
                    document.getElementById('h2SectionSearch').innerText = document.getElementById("search").value;
                    for (var i = 0; i < 12; i++) {
                        /* Crear imagen con GIF */
                        let img = document.createElement('img');
                        img.setAttribute('id', `imgGIF${i}`);
                        img.src = content.data[i].images.original.url;
                        img.alt = content.data[i].title;

                        let pUser = document.createElement('p');
                        pUser.innerText = "User";
                        pUser.setAttribute('class', 'pUser');
                        let pTitle = document.createElement('p');
                        pTitle.innerText = content.data[i].title;
                        pTitle.setAttribute('class', 'pTitle');


                        /* Crear iconos Favoritos, Descarga y Maximizar */
                        let imgFavorite = document.createElement('img');
                        imgFavorite.setAttribute('id', `imgFav${i}`);
                        imgFavorite.src = "img/icon-fav-hover.svg";
                        imgFavorite.setAttribute('onclick', 'addFavorites(this)');
                        imgFavorite.setAttribute('class', 'icon imgFavorite');

                        let imgDownload = document.createElement('img');
                        imgDownload.setAttribute('id', `imgDow${i}`);
                        imgDownload.src = "img/icon-download.svg";
                        imgDownload.setAttribute('onclick', 'download(this)');
                        imgDownload.setAttribute('class', 'icon imgDownload');

                        let imgFullSize = document.createElement('img');
                        imgFullSize.setAttribute('id', `imgFul${i}`);
                        imgFullSize.src = "img/icon-max.svg";
                        imgFullSize.setAttribute('onclick', 'fullScreen(this)');
                        imgFullSize.setAttribute('class', 'icon imgFullSize');

                        /* Agregar imagenes al div */
                        let div = document.createElement('div');
                        div.setAttribute('class', 'containerImg imgHover');
                        div.setAttribute('id', `divGif${i}`);

                        div.appendChild(img); /* Agregar imagen buscada */
                        div.appendChild(imgFavorite); /* Agregar icono Favorito <3*/
                        div.appendChild(imgDownload); /* Agregar icono Descargar */
                        div.appendChild(imgFullSize); /* Agregar icono Pantalla completa */
                        div.appendChild(pUser); /* Agregar texto usuario */
                        div.appendChild(pTitle); /* Agregar Titulo Gif */


                        /* Agregar div a la seccion */
                        let out = document.getElementById('searchIndex');
                        out.appendChild(div);
                    }
                    document.getElementById("btnSearch").disabled = true;
                } catch (error) {
                    console.log(error);
                }
            } else {
                alert('No hay GIF para la palabra buscada: ' + document.getElementById('search').value);
                showMessageNoFound();
            }

        })
        .catch(err => {
            console.error(err);
        });
    /* }); */
}

/* Event Listener boton ver más*/
document.getElementById("btnSeeMore").addEventListener("click", ev => {
    ev.preventDefault();

    document.getElementById('noFound').classList.remove('styleNoFound');
    document.getElementById('noFound').classList.add('hidden');

    countSeeMore += 12;
    countSeeLess = 12;
    countSeeLess = countSeeMore - countSeeLess;

    let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=${countSeeMore}&q=`;
    let str = document.getElementById("search").value;
    url = url.concat(str);
    console.log(url);
    fetch(url).then(response => response.json()).then(content => {
            console.log(content.data);
            if (content.data != "") {
                try {
                    document.getElementById('sectionSearch').style.display = 'block';
                    document.getElementById('h2SectionSearch').innerText = document.getElementById("search").value;

                    for (var i = countSeeLess; i < countSeeMore; i++) {
                        let img = document.createElement('img');
                        img.setAttribute('id', `imgGIF${i}`);
                        img.src = content.data[i].images.original.url;
                        img.alt = content.data[i].title;

                        let pUser = document.createElement('p');
                        pUser.innerText = "User";
                        pUser.setAttribute('class', 'pUser');
                        let pTitle = document.createElement('p');
                        pTitle.innerText = content.data[i].title;
                        pTitle.setAttribute('class', 'pTitle');


                        /* Crear iconos Favoritos, Descarga y Maximizar */
                        let imgFavorite = document.createElement('img');
                        imgFavorite.setAttribute('id', `imgFav${i}`);
                        imgFavorite.src = "img/icon-fav-hover.svg";
                        imgFavorite.setAttribute('onclick', 'addFavorites(this)');
                        imgFavorite.setAttribute('class', 'icon imgFavorite');

                        let imgDownload = document.createElement('img');
                        imgDownload.setAttribute('id', `imgDow${i}`);
                        imgDownload.src = "img/icon-download.svg";
                        imgDownload.setAttribute('onclick', 'download(this)');
                        imgDownload.setAttribute('class', 'icon imgDownload');

                        let imgFullSize = document.createElement('img');
                        imgFullSize.setAttribute('id', `imgFul${i}`);
                        imgFullSize.src = "img/icon-max.svg";
                        imgFullSize.setAttribute('onclick', 'fullScreen(this)');
                        imgFullSize.setAttribute('class', 'icon imgFullSize');

                        /* Agregar imagenes al div */
                        let div = document.createElement('div');
                        div.setAttribute('class', 'containerImg imgHover');
                        div.setAttribute('id', `divGif${i}`);

                        div.appendChild(img); /* Agregar imagen buscada */
                        div.appendChild(imgFavorite); /* Agregar icono Favorito <3*/
                        div.appendChild(imgDownload); /* Agregar icono Descargar */
                        div.appendChild(imgFullSize); /* Agregar icono Pantalla completa */
                        div.appendChild(pUser); /* Agregar texto usuario */
                        div.appendChild(pTitle); /* Agregar Titulo Gif */


                        /* Agregar div a la seccion */
                        let out = document.getElementById('searchIndex');
                        out.appendChild(div);
                    }
                } catch (error) {
                    alert('No hay más imagenes');
                    console.log(error);
                }
            } else {
                alert('No hay GIF para la palabra buscada: ' + document.getElementById('search').value);
                showMessageNoFound();
            }
        })
        .catch(err => {
            console.error(err);
        });
});


/* ____________________________________________________________________________________________________________________________________ */
/*                                                          FUNCIONALIDADES                                                             */

/* Habilitar div de busqueda no encontrada */
function showMessageNoFound() {
    let divNofound = document.getElementById('noFound');
    divNofound.classList.remove('hidden');
    divNofound.classList.add('styleNoFound');
    document.getElementById('noFoundH2').innerText = document.getElementById('search').value;
    document.getElementById('sectionSearch').classList.add('hidden')
}


/* Desactivar el boton de busqueda una vez cambie el input */
document.getElementById("search").addEventListener('change', inputChange => {
    document.getElementById("btnSearch").disabled = false;
});


/* ____________________________________________________________________________________________________________________________________ */
/*                                                          ALMACENAR LOCAL STORAGE                                                     */
var arrayFavorites = [];

var arrFav = JSON.parse(localStorage.getItem("sendFavorites"));
console.log(arrFav);
if (arrFav != null) {
    arrayFavorites = arrFav;
}


function addFavorites(iconFavorite) {

    let idImgHtml = iconFavorite.id;
    let extractLastDigit = idImgHtml.slice(6, idImgHtml.length);
    let tagGif = document.getElementById(`imgGIF${extractLastDigit}`);
    arrayFavorites.push(tagGif.src);
    console.log(arrayFavorites);
    localStorage.setItem('sendFavorites', JSON.stringify(arrayFavorites));
}

/* ____________________________________________________________________________________________________________________________________ */

function onKeyUp(event) {
    var keycode = event.keyCode;
    if (keycode == '13') {
        document.getElementById('searchIndex').innerText = "";
        countSeeMore = 12;
        init();
    }
}


function suggestSearch() {

    let keyword = document.getElementById('search').value;
    if (keyword) {
        const endpoint = `https://api.giphy.com/v1/tags/related/${keyword}?api_key=${APIKEY}`;

        fetch(endpoint)
            .then(response => response.json())
            .then(data => {

                var ulSearch = document.getElementById('ulSearch');
                ulSearch.innerHTML = "";
                ulSearch.classList.add('ulShow');

                for (var i = 0; i < 4; i++) {
                    let li = document.createElement('li');
                    li.innerText = data.data[i].name;
                    li.setAttribute('onclick', 'completeInput(this)')
                    ulSearch.appendChild(li);
                }

            });

        document.getElementById('btnClose').classList.remove('btnCloseHidden');

        let containerInpImg = document.getElementById('containerInpImg');
        containerInpImg.classList.add('orderInpImg');

        document.getElementById('subtitleTrending').classList.add('hidden');
        document.getElementById('descriptionTrending').classList.add('hidden');

    } else {
        clearSuggest();
    }

}

function completeInput(valueLi) {
    let inputSearch = document.getElementById('search');
    inputSearch.value = valueLi.innerText;
    console.log(inputSearch);
    init();
    clearSuggest(false);
}

function clearSuggest(clear = true) {
    ulSearch.innerHTML = "";
    ulSearch.classList.remove('ulShow');
    document.getElementById('search').value = clear ? "" : document.getElementById('search').value;
    document.getElementById('containerInpImg').classList.remove('orderInpImg');
    document.getElementById('btnClose').classList.add('btnCloseHidden');
    document.getElementById('subtitleTrending').classList.remove('hidden');
    document.getElementById('descriptionTrending').classList.remove('hidden');
    document.getElementById('noFound').classList.add('hidden');
    document.getElementById('noFound').classList.remove('styleNoFound');

}



function closeFullScreen() {
    document.getElementById('divFullScreen').innerHTML = "";
    document.getElementById('divFullScreen').classList.add('hidden');
    document.getElementById('divFullScreen').classList.remove('styleFullScreen');
}

function fullScreen(iconFullScreen) {


    let idImgFullScreen = iconFullScreen.id;
    let extractLastDigit = idImgFullScreen.slice(6, idImgFullScreen.length);
    let imgFullScreenSrc = document.getElementById(`imgGIF${extractLastDigit}`).src;

    let imgClose = document.createElement('img');
    imgClose.src = '../img/close.svg';
    imgClose.classList.add('styleClose');
    imgClose.setAttribute('onclick', 'closeFullScreen()');


    /* CONTENEDOR CON IMAGEN Y FLECHAS - SIGUIENTE ANTERIOR *****************************************************/

    let btnBack = document.createElement('img');
    btnBack.src = '../img/button-left.svg';
    btnBack.setAttribute('class', 'btnBack');

    let imgFullScreen = document.createElement('img');
    imgFullScreen.src = imgFullScreenSrc;
    imgFullScreen.classList.add('styleImgFullScreen');
    imgFullScreen.setAttribute('id', `imgFullScreen`);

    let btnNext = document.createElement('img');
    btnNext.src = '../img/button-right.svg';
    btnNext.setAttribute('class', 'btnNext');


    let divImgDirection = document.createElement('div');
    divImgDirection.classList.add('styleImgDirection');

    divImgDirection.appendChild(btnBack);
    divImgDirection.appendChild(imgFullScreen);
    divImgDirection.appendChild(btnNext);



    /* CONTENEDOR CON TITULOS Y ICONOS *****************************************************/
    let pUser = document.createElement('p');
    pUser.innerText = "User";

    let getTitle = document.getElementById(`divGif${extractLastDigit}`);
    let sendTitle = getTitle.getElementsByClassName('pTitle')[0].innerText;

    let pTitle = document.createElement('p');
    pTitle.innerText = sendTitle;

    let divText = document.createElement('div');
    divText.classList.add('styleDivText');

    divText.appendChild(pUser);
    divText.appendChild(pTitle);

    let imgFavorite = document.createElement('img');
    imgFavorite.src = "img/icon-fav-hover.svg";
    imgFavorite.setAttribute('onclick', 'addFavoritesFullScreen(this)');
    imgFavorite.setAttribute('class', 'icon imgFavorite');

    let imgDownload = document.createElement('img');
    imgDownload.src = "img/icon-download.svg";
    imgDownload.setAttribute('onclick', 'downloadFullScreen(this)');
    imgDownload.setAttribute('class', 'icon imgDownload');

    let divDescription = document.createElement('div');
    divDescription.classList.add('styleDivDescription');

    divDescription.appendChild(divText);
    divDescription.appendChild(imgFavorite);
    divDescription.appendChild(imgDownload);

    /* CONTENEDOR PRINCIPAL *************************************************************/
    let divFullScreen = document.getElementById('divFullScreen');
    divFullScreen.classList.add('styleFullScreen');
    divFullScreen.classList.remove('hidden');

    divFullScreen.appendChild(imgClose);
    divFullScreen.appendChild(divImgDirection);
    divFullScreen.appendChild(divDescription);
    document.querySelector('body').appendChild(divFullScreen);

}

async function download(e) {

    let idImgFullScreen = e.id;
    let extractLastDigit = idImgFullScreen.slice(6, idImgFullScreen.length);
    let imgFullScreenSrc = document.getElementById(`imgGIF${extractLastDigit}`).src;

    let a = document.createElement('a');
    let response = await fetch(imgFullScreenSrc);
    let file = await response.blob();
    a.download = e.id;
    a.href = window.URL.createObjectURL(file);
    a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
    a.click();
}