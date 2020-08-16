function btnActive() {
    document.getElementById('btnAllowCam').classList.remove('active');
    document.getElementById('btnRecordCam').classList.remove('active');
    document.getElementById('btnUploadCam').classList.remove('active');
}
/* Función para activar la cámara */
var video = document.querySelector('video');
let stremaVar;

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

            /* if (document.getElementById('btnStart').innerText == 'GRABAR') {
            } */

        }).catch(function(error) {
            console.error("Cannot access media devices: ", error);
        });
}

function startRecordingFn(stream) {

    // Initialize the recorder
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

/* function btn3() {

    let form = new FormData();
    form.append('file', recorder.getBlob(), 'myGif.gif');
    console.log(form.get('file'))


} */
/* LAURA FORMDATA */
/* document.getElementById('btn-guardar').addEventListener("click", function() {
    let chunks = [];
    chunks.push(recorder);
    let blob = new Blob(chunks, { 'type': 'video/mp4;' });


    let form = new FormData();
    form.append('file', blob, 'myGif.gif');
    console.log(form.get('file'))
}, false); */


document.getElementById('btnStart').addEventListener("click", function() {

    if (document.getElementById('btnStart').innerText == 'COMENZAR') {

        document.getElementById("camLoad").classList.remove('camLoadHidden');
        document.querySelector("h2").innerText = `¿Nos das acceso \n a tu cámara?`;
        document.querySelector("p").innerText = 'El acceso a tu camara será válido sólo \n por el tiempo en el que estés creando el GIFO.';
        btnActive();
        document.getElementById('btnAllowCam').classList.add('active');

        document.getElementById('btnStart').innerText = "GRABAR";

        initializeCam();

    } else if (document.getElementById('btnStart').innerText == 'GRABAR') {

        document.getElementById("camLoad").classList.add('camLoadHidden');
        btnActive();
        document.getElementById('btnRecordCam').classList.add('active');

        startRecordingFn(stremaVar);

        document.getElementById('btnStart').innerText = 'FINALIZAR';

    } else if (document.getElementById('btnStart').innerText == 'FINALIZAR') {

        recorder.stopRecording().then(function() {
            console.info('stopRecording success');

            // Retrieve recorded video as blob and display in the preview element

            videoBlob = recorder.getBlob();
            console.log(videoBlob)

            /* let blob = new Blob(chunks, { 'type' : 'video/mp4;' }); */

            document.getElementById('btnStart').innerText = 'SUBIR GIFO';

        }).catch(function(error) {
            console.error('stopRecording failure', error);
        });

    } else if (document.getElementById('btnStart').innerText == 'SUBIR GIFO') {
        document.getElementById("camLoad").classList.add('camLoadHidden');
        btnActive();
        document.getElementById('btnUploadCam').classList.add('active');
        /* btn3(); */
    }


})