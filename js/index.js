$(document).ready(function() {
    $('.menu').click(function() {
        $('ul').toggleClass('active');
    })
})

// Obtener el arreglo de localStorage

var arrFav = JSON.parse(localStorage.getItem("ElPutoArr"));


function loadContentFav() {
    for (var i = 0; i < arrFav.length; i++) {
        let img = document.createElement('img');
        img.src = arrFav[i];
        let outImg = document.getElementById('outImgFav');
        outImg.appendChild(img);
    }
}