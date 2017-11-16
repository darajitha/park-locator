function initMap() {

    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 6.927079,
            lng: 79.861244
        },
        zoom: 10,
    });

    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: '/locations/all',
        success: function (data) {
            if (data.state) {
                console.log('success');
                data.parks.forEach(park => {
                    if (park.title) {
                        addMarker(park);
                    }
                });
            } else {
                alert(data.msg);
            }
            console.log(JSON.stringify(data));
        },
        error: function (err) {
            alert('login error ' + err);
        }
    });

    function addMarker(park) {
        var marker = new google.maps.Marker({
            position: park.position,
            title: park.title,
            map: map,
            icon: park.icon
        });
        google.maps.event.addListener(marker, 'click', function () {
            window.location.href = "/slots.html?parkTitle="+marker.title;
        });
    }
}