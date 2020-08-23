var arrCreate = JSON.parse(localStorage.getItem('sendCreateGifos'));
console.log(arrCreate);

function loadContentMyGifos() {
    if (arrCreate != null) {

        for (var i = 0; i < arrCreate.length; i++) {
            let img = document.createElement('img');
            img.src = arrCreate[i];
            let imagesCreateGifos = document.getElementById('imagesCreateGifos');
            imagesCreateGifos.appendChild(img);
        }
    } else {
        console.log('Mis Gifos no tiene videos');
    }
}