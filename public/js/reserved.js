  //jQuery('#qrcode').qrcode("this plugin is great");


  var ParkApp = ParkApp || {};

  ParkApp.initReserved = function () {
      var slot = ParkApp.getParameterByName('id');
      $.ajax({
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({slot:slot}),
          url: 'locations/slot',
          success: function (data) {
              if (data.state) {
                  console.log('success');
                  jQuery('#qrcodeTable').qrcode({
                    render: "table",
                    text: 'Reserved|slot:' + JSON.stringify(slot)
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
      

  };

  ParkApp.initReserved();