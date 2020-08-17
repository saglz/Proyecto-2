/* Variables */
var video = document.querySelector('video');
let stremaVar;

/* Activar el boton dependiendo del estado COMENZAR, GRABAR, FINALIZAR Y SUBIR GIFO */
function btnActive() {
    document.getElementById('btnAllowCam').classList.remove('active');
    document.getElementById('btnRecordCam').classList.remove('active');
    document.getElementById('btnUploadCam').classList.remove('active');
}

/* Inicializar la Cámara */
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
            stremaVar = stream;
        }).catch(function(error) {
            console.error("Cannot access media devices: ", error);
        });
}

/* FUNCIONES para Grabar y Parar Grabación */
function startRecordingFn(stream) {

    recorder = new RecordRTCPromisesHandler(stream, {
        mimeType: 'video/webm',
        bitsPerSecond: 128000
    });
    // Start recording the video
    recorder.startRecording().then(function() {
        console.info('Recording video ...');
    }).catch(function(error) {
        console.error('Cannot start video recording: ', error);
    });

    // release stream on stopRecording
    recorder.stream = stream;

}

function stopRecordingFn() {

    recorder.stopRecording().then(function() {
        console.info('stopRecording success');

        let arraySaveVideo = [];
        arraySaveVideo.push(recorder);
        console.log(arraySaveVideo);
        let blob = new Blob(arraySaveVideo, { 'type': 'video/mp4;' });
        console.log(blob);

        let form = new FormData();
        form.append('file', blob, 'myGif.gif');
        console.log(form.get('file'));

        document.getElementById('btnStart').innerText = 'SUBIR GIFO';

    }).catch(function(error) {
        console.error('stopRecording failure', error);
    });

}


/* BOTON COMENZAR */
document.getElementById('btnStart').addEventListener("click", function() {

    if (document.getElementById('btnStart').innerText == 'COMENZAR') { /* Pide permisos para iniciar la cámara */

        document.getElementById("camLoad").classList.remove('camLoadHidden');
        document.querySelector("h2").innerText = `¿Nos das acceso \n a tu cámara?`;
        document.querySelector("p").innerText = 'El acceso a tu camara será válido sólo \n por el tiempo en el que estés creando el GIFO.';
        btnActive();
        document.getElementById('btnAllowCam').classList.add('active');

        document.getElementById('btnStart').innerText = "GRABAR";

        initializeCam();

    } else if (document.getElementById('btnStart').innerText == 'GRABAR') { /* Inicia la grabación */

        document.getElementById("camLoad").classList.add('camLoadHidden');
        btnActive();
        document.getElementById('btnRecordCam').classList.add('active');

        startRecordingFn(stremaVar);

        document.getElementById('btnStart').innerText = 'FINALIZAR';

    } else if (document.getElementById('btnStart').innerText == 'FINALIZAR') { /* Finaliza la grabación */

        stopRecordingFn();

    } else if (document.getElementById('btnStart').innerText == 'SUBIR GIFO') { /* Subir el Gifo a la pagina Giphy */
        document.getElementById("camLoad").classList.add('camLoadHidden');
        btnActive();
        document.getElementById('btnUploadCam').classList.add('active');

    }


})