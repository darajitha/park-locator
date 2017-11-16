var ParkApp = ParkApp || {};

ParkApp.slots = function () {
    function loadSlots() {
        var title = getParameterByName('parkTitle');

        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                parkTitle: title
            }),
            contentType: 'application/json',
            url: '/locations/slots',
            success: function (data) {
                if (data.state) {
                    console.log('success');
                    var slotContainer = document.getElementById('slot-container');
                    slotContainer.innerHTML = getSlotHtml(data.slots);
                } else {
                    alert(data.msg);
                }
                console.log(JSON.stringify(data));
            },
            error: function (err) {
                alert('login error ' + err);
            }
        });
    }

    /**
     * 
     * @param {*} slots 
     */
    function getSlotHtml(slots) {
        if (slots) {
            return slots.map(slot => {
                return '<div>' + slot.title + '</div>';
            });
        }else {
            return 'No slots found';
        }
    }

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    return {
        loadSlots: loadSlots
    }
}();

ParkApp.slots.loadSlots();