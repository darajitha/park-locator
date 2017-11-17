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
                    slotContainer.innerHTML = getSlotHtml(title, data.slots);
                } else {
                    alert(data.msg);
                }
                console.log(JSON.stringify(data));
            },
            error: function (err) {
                alert('login error ' + json.stringify(err));
            }
        });
    }

    /**
     * 
     * @param {*} slots 
     */
    function getSlotHtml(title, slots) {
        if (slots) {
            return slots.map(slot => {
                return '<button class="button button5" onclick="ParkApp.slots.reserveSlot(\''+title+'\', \'' +slot._id + '\')" >'+ slot.title +'</button>';
            });
        }else {
            return 'No slots found';
        }
    }

    function reserveSlot(park, slot){
        $.ajax({
            type: 'POST',
            data: JSON.stringify({
                slot: slot
            }),
            contentType: 'application/json',
            url: '/locations/reserve',
            success: function (data) {
                if (data.state) {
                    console.log('success');
                    window.location.href='/reserved.html?id='+slot;
                } else {
                    alert(data.msg);
                }
                console.log(JSON.stringify(data));
            },
            error: function (err) {
                alert('login error ' + json.stringify(err));
            }
        });
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
        loadSlots: loadSlots,
        reserveSlot: reserveSlot
    }
}();

ParkApp.slots.loadSlots();