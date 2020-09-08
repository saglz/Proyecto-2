//Variables
let streamVar;
let data64;
var video = document.querySelector('video');
let time;

//Boton COMENZAR, GRABAR, FINALIZAR, SUBIR GIFO
function btnActive() {
    document.getElementById('btnAllowCam').classList.remove('activeNum');
    document.getElementById('btnRecordCam').classList.remove('activeNum');
    document.getElementById('btnUploadCam').classList.remove('activeNum');
}

//Inicializar cámara
function initializeCam() {
    navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                height: { max: 480 }
            }
        })
        .then(function(stream) {
            video.srcObject = stream;
            video.play()
            streamVar = stream;
        }).catch(function(error) {
            console.error("Cannot access media devices: ", error);
        });
}

//Funciones start y stop grabación
function startRecordingFn(stream) {

    // Initialize the recorder
    recorder = new RecordRTC(stream, {
        type: 'gif',
        quality: 10,
        width: 360,
        height: 360,
        hidden: 240,

        onGifRecordingStarted: function() {
            console.log('started');
        }
    });

    // Start recording the video
    recorder.startRecording();

    // release stream on stopRecording
    recorder.stream = stream;

}

function stopRecordingFn() {
    recorder.stopRecording(function() {
        console.log(URL.createObjectURL(this.blob));

        data64 = recorder.getBlob();
    });


    document.getElementById('btnStart').innerText = 'SUBIR GIFO';
}


/* var localCreateGifos = JSON.parse(localStorage.getItem("sendCreateGifos")); */


async function sendGif(data) {
    const endpoint = "https://upload.giphy.com/v1/gifs";
    const username = 'Santi-1234';

    var formData = new FormData();
    formData.append("api_key", APIKEY);
    formData.append("username", username);
    formData.append("file", data, 'misGif.gif');

    let res = await fetch(endpoint, {
        method: 'POST',
        body: formData
    });
    let gifResult = await res.json();
    console.log(gifResult);

    let ids = localStorage.getItem('sendCreateGifos') != null ? localStorage.getItem('sendCreateGifos').split(',') : [];
    ids.push(gifResult.data.id);
    localStorage.setItem('sendCreateGifos', ids);
    succesUpGifo();
}

document.getElementById('btnStart').addEventListener("click", function() {
    if (document.getElementById('btnStart').innerText == 'COMENZAR') {
        //Permiso inicar camara
        document.getElementById("camLoad").classList.remove('camLoadHidden');
        document.querySelector("h2").innerText = `¿Nos das acceso \n a tu cámara?`;
        document.querySelector("p").innerText = 'El acceso a tu camara será válido sólo \n por el tiempo en el que estés creando el GIFO.';
        btnActive();
        document.getElementById('btnAllowCam').classList.add('activeNum');
        document.getElementById('btnStart').innerText = "GRABAR";
        initializeCam();

    } else if (document.getElementById('btnStart').innerText == 'GRABAR') {
        //Inicia grabación
        document.getElementById("camLoad").classList.add('camLoadHidden');
        btnActive();
        document.getElementById('btnRecordCam').classList.add('activeNum');
        startRecordingFn(streamVar);
        interval();
        document.getElementById('btnStart').innerText = 'FINALIZAR';

    } else if (document.getElementById('btnStart').innerText == 'FINALIZAR') {
        //Finaliza grabación
        stopRecordingFn();
        stopTimer();
    } else if (document.getElementById('btnStart').innerText == 'SUBIR GIFO') {
        //Subir Gifo a Giphy
        document.getElementById("camLoad").classList.add('camLoadHidden');
        btnActive();
        document.getElementById('btnUploadCam').classList.add('activeNum');
        divUpRecord();
        sendGif(data64);
    }
})

function divUpRecord() {
    let upRecord = document.getElementById('upRecord')
    upRecord.classList.remove('hidden');
    upRecord.classList.add('upRecord');

    let textCreateGifos = document.getElementById('textCreateGifos');
    textCreateGifos.innerText = "Estamos subiendo tu GIFO";
    textCreateGifos.classList.remove('hidden');
    textCreateGifos.classList.add('textCreateGifos');

    let loader = document.getElementById('loader');
    loader.classList.remove('hidden');
    loader.classList.add('iconCreateGifos');

    let check = document.getElementById('check');
    check.classList.add('hidden');
    check.classList.remove('iconCreateGifos');

}

function succesUpGifo() {
    let textCreateGifos = document.getElementById('textCreateGifos');
    let loader = document.getElementById('loader');
    let check = document.getElementById('check');


    loader.classList.add('hidden');
    loader.classList.remove('iconCreateGifos');

    check.classList.remove('hidden');
    check.classList.add('iconCreateGifos');

    textCreateGifos.innerText = "GIFO subido con éxito";

    document.getElementById('btnStart').classList.add('hidden');
}

function interval() {
    let t = 1;
    time = setInterval(function() {
        document.getElementById("timer").innerText = '00:00:' + t++;
    }, 1000, "JavaScript");
}

function stopTimer() {
    clearInterval(time);
    document.getElementById("timer").innerText = "REPETIR CAPTURA";
}