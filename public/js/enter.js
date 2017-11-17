var ParkApp = ParkApp || {};
ParkApp.reserve = function () {
    if (Instascan) {
        var scanner = new Instascan.Scanner({
            video: document.getElementById('preview')
        });
        scanner.addListener('scan', function (content) {
            console.log(content);
            alert(content);
        });
        Instascan.Camera.getCameras().then(function (cameras) {
            if (cameras.length > 0) {
                var cameraSelect = document.getElementById('cameras');
               
                scanner.start(cameras[cameras.length -1]);
            } else {
                console.error('No cameras found.');
            }
        }).catch(function (e) {
            console.error(e);
        });
    }
}

ParkApp.initCamera = function () {
    if (Instascan) {
        Instascan.Camera.getCameras().then(function (camera) {

        }).catch(function (err) {
            alert(err);
        });
    }
}