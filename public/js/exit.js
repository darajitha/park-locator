var ParkApp = ParkApp || {};
ParkApp.reserve = function () {
    if (Instascan) {
        var scanner = new Instascan.Scanner({
            video: document.getElementById('preview')
        });
        scanner.addListener('scan', function (content) {
            console.log(content);
            ParkApp.book(content);
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

ParkApp.book = function (content) {
    var idIndex = content.indexOf('slot:');
    var id = content.substring(idIndex, content.length);
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        data:JSON.stringify({slot:id}),
        url: '/locations/unlock',
        success: function (data) {
            if (data.state) {
                console.log('success');
                alert('location booked');
            } else {
                alert(JSON.stringify(data.msg));
            }
            console.log(JSON.stringify(data));
        },
        error: function (err) {
            alert('login error ' + json.stringify(err));
        }
    });
}