/* Menu hamburguesa */
$(document).ready(function() {
    $('.menu').click(function() {
        $('ul').toggleClass('active');
    })
})

/* Cambiar tema Nocturno */
const btnTheme = document.querySelector('#theme');
var modeTheme = 0;
btnTheme.addEventListener('click', () => {
    document.body.classList.toggle('changeTheme');
    if (btnTheme.innerText == "Modo Nocturno") {
        btnTheme.innerText = "Modo Diurno";
        modeTheme = 1;
    } else {
        btnTheme.innerText = "Modo Nocturno";
        modeTheme = 0;
    }
    /* Enviar información del cambio de modo */
    localStorage.setItem('sendTheme', JSON.stringify(modeTheme));
});

/* Traer información del modo actual */
var modeThemeResponse = JSON.parse(localStorage.getItem("sendTheme"));

if (modeThemeResponse == 1) {
    document.body.classList.toggle('changeTheme');
    btnTheme.innerText = "Modo Diurno";
}