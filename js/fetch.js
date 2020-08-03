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
                        document.getElementById('h2SectionSearch').innerText = document.getElementById("search").value;
                        for (var i = 0; i < countSeeMore; i++) {
                            /* Crear imagen con GIF */
                            let img = document.createElement('img');
                            img.setAttribute('id', `imgGIF${i}`);
                            img.src = content.data[i].images.original.url;
                            img.alt = content.data[i].title;
                            /* console.log(img); */

                            /* Crear imagen con icono favoritos */
                            let imgHover = document.createElement('img');
                            imgHover.setAttribute('id', `imgFav${i}`);
                            imgHover.src = "img/icon-fav-hover.svg";
                            imgHover.setAttribute('class', 'imgHover');
                            imgHover.setAttribute('onclick', 'captureImage(this)');
                            /* console.log(imgHover); */

                            /* Agregar imagenes al div */
                            let div = document.createElement('div');
                            div.setAttribute('class', 'prueba');
                            div.setAttribute('id', `divGif${i}`);
                            div.appendChild(img);
                            div.appendChild(imgHover);

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
                        img.src = content.data[i].images.original.url;
                        img.alt = content.data[i].title;

                        let out = document.getElementById('searchIndex');
                        out.appendChild(img);
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


var elPutoArreglo = [];

function captureImage(laPutaImagen) {
    let id = laPutaImagen.id;
    let idGif = id.slice(6, 7);
    let aux = document.getElementById(`imgGIF${idGif}`);
    elPutoArreglo.push(document.getElementById(`imgGIF${idGif}`).src);
    console.log(elPutoArreglo);
    localStorage.setItem('ElPutoArr', JSON.stringify(elPutoArreglo));
}

/* function captureImage(laPutaImagen) {
    let id = laPutaImagen.id;
    console.log(id);
    let idGif = id.slice(6, 7);
    console.log(idGif);
    let aux = document.getElementById(`imgGIF${idGif}`);
    console.log(aux);
    elPutoArreglo.push(document.getElementById(`imgGIF${idGif}`).src);
    console.log(elPutoArreglo);

    localStorage.setItem('ElPutoArr', JSON.stringify(elPutoArreglo));
} */