//Variables
let countSeeMore = 12;
let countSeeLess = 12;

const APIKEY = "vcZZ9afZZzKY6qX9q4US8wITbdxp9wPG";
//you will need to get your own API KEY

document.addEventListener("DOMContentLoaded", init);

function init() {
    document.getElementById("btnSearch").addEventListener("click", ev => {
        ev.preventDefault();


        let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=${countSeeMore}&q=`;
        let str = document.getElementById("search").value.trim();
        url = url.concat(str);
        console.log(url);
        fetch(url).then(response => response.json()).then(content => {
                console.log(content.data);
                if (content.data != "") {
                    try {
                        document.getElementById('sectionSearch').style.display = 'block';
                        document.getElementById('searchIndex').innerText = "";
                        document.getElementById('h2SectionSearch').innerText = document.getElementById("search").value;
                        for (var i = 0; i < countSeeMore; i++) {
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
                            imgFullSize.setAttribute('onclick', 'fullSize(this)');
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
                }

            })
            .catch(err => {
                console.error(err);
            });
    });
}


document.getElementById("btnSeeMore").addEventListener("click", ev => {
    ev.preventDefault();


    countSeeMore += 12;
    countSeeLess = 12;
    countSeeLess = countSeeMore - countSeeLess;

    let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=${countSeeMore}&q=`;
    let str = document.getElementById("search").value.trim();
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
                        imgFullSize.setAttribute('onclick', 'fullSize(this)');
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
            }
        })
        .catch(err => {
            console.error(err);
        });
});

/* Activar boton */
document.getElementById("search").addEventListener('change', inputChange => {
    document.getElementById("btnSearch").disabled = false;
});


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