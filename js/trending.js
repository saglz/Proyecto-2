//Variables
let countStartTrending = 0;
let countEndTrending = 3;

/*  */
const API_KEY_TRENDING = "vcZZ9afZZzKY6qX9q4US8wITbdxp9wPG";
document.addEventListener("DOMContentLoaded", initTrending);


/* Botones siguiente y atras trending */
document.getElementById("btnNext").addEventListener('click', () => {
    countStartTrending++;
    countEndTrending++;
    document.getElementById('sectionTrending').innerText = "";
    initTrending();
});

document.getElementById("btnBack").addEventListener('click', () => {
    if (countStartTrending == 0 && countEndTrending == 3) {
        console.log('Esta posicionado en la primer imagen.')
    } else {
        countStartTrending--;
        countEndTrending--;
        document.getElementById('sectionTrending').innerText = "";
        initTrending();

    }
});


function initTrending() {
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY_TRENDING}&limit=${countEndTrending}&q=`;
    let str = 'cat';
    url = url.concat(str);
    console.log(url);
    fetch(url).then(response => response.json()).then(content => {
            console.log(content.data);
            if (content.data != "") {
                try {

                    for (var i = countStartTrending; i < countEndTrending; i++) {
                        /* Crear imagen con GIF */
                        let img = document.createElement('img');
                        img.setAttribute('id', `imgTren${i}`);
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
                        imgFavorite.setAttribute('id', `imgFavT${i}`);
                        imgFavorite.src = "img/icon-fav-hover.svg";
                        imgFavorite.setAttribute('onclick', 'addFavoritesTrending(this)');
                        imgFavorite.setAttribute('class', 'icon imgFavorite');

                        let imgDownload = document.createElement('img');
                        imgDownload.setAttribute('id', `imgDowT${i}`);
                        imgDownload.src = "img/icon-download.svg";
                        imgDownload.setAttribute('onclick', 'download(this)');
                        imgDownload.setAttribute('class', 'icon imgDownload');

                        let imgFullSize = document.createElement('img');
                        imgFullSize.setAttribute('id', `imgFulT${i}`);
                        imgFullSize.src = "img/icon-max.svg";
                        imgFullSize.setAttribute('onclick', 'fullSize(this)');
                        imgFullSize.setAttribute('class', 'icon imgFullSize');

                        /* Agregar imagenes al div */
                        let div = document.createElement('div');
                        div.setAttribute('class', 'containerImg imgHover');
                        div.setAttribute('id', `divGifT${i}`);

                        div.appendChild(img); /* Agregar imagen buscada */
                        div.appendChild(imgFavorite); /* Agregar icono Favorito <3*/
                        div.appendChild(imgDownload); /* Agregar icono Descargar */
                        div.appendChild(imgFullSize); /* Agregar icono Pantalla completa */
                        div.appendChild(pUser); /* Agregar texto usuario */
                        div.appendChild(pTitle); /* Agregar Titulo Gif */


                        /* Agregar div a la seccion */
                        let out = document.getElementById('sectionTrending');
                        out.appendChild(div);
                    }
                } catch (error) {
                    console.log(error);
                }
            } else {
                alert('No hay GIF para la palabra buscada: ' + document.getElementById('search').value);
            }

        })
        .catch(err => {
            console.error(err);
        });
}

var arrayFavorites = [];

var arrFav = JSON.parse(localStorage.getItem("sendFavorites"));
console.log(arrFav);
if (arrFav != null) {
    arrayFavorites = arrFav;
}


function addFavoritesTrending(iconFavorite) {

    let idImgHtml = iconFavorite.id;
    let extractLastDigit = idImgHtml.slice(7, idImgHtml.length);
    let tagGif = document.getElementById(`imgTren${extractLastDigit}`);
    arrayFavorites.push(tagGif.src);
    console.log(arrayFavorites);
    localStorage.setItem('sendFavorites', JSON.stringify(arrayFavorites));
    location.reload();
}