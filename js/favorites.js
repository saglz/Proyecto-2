var arrFav = JSON.parse(localStorage.getItem("sendFavorites"));


function loadContentFav() {
    if (arrFav != null) {
        for (var i = 0; i < arrFav.length; i++) {
            let img = document.createElement('img');
            img.src = arrFav[i];
            let outImg = document.getElementById('outImgFav');
            outImg.appendChild(img);
        }
    } else {
        console.log('Favoritos no tienes imagenes agregadas');
    }

}

function clearFavorites() {
    localStorage.clear();
}