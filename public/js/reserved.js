  //jQuery('#qrcode').qrcode("this plugin is great");


  var ParkApp = ParkApp || {};

  ParkApp.initReserved = function () {
      var park = ParkApp.getParameterByName('park');
      var slot = ParkApp.getParameterByName('slot');

      jQuery('#qrcodeTable').qrcode({
          render: "table",
          text: 'park:' + park + '|slot:' + slot
      });

  };

  ParkApp.initReserved();