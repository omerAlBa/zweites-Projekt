var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>',
    maxZoom: 18,
}).addTo(mymap);

var marker = L.marker([53.866376, 10.687195]).addTo(mymap);
marker.bindPopup("<b>MediaFactory</b><br>Softwareentwickler in Luebeck, Schleswig-Holstein.").openPopup();

var popup = L.popup()
    .setLatLng([51.5, -0.09])
    .setContent("I am a standalone popup.")
    .openOn(mymap);

(function() {       
    $("#Isearch").click(function(){
        doLocate(eingabeStr.value, eingabeOrt.value);
    });
}());

function doLocate(str, ort) {
        if ( ort == '') {
            alert('Straße und Ort muessen angegeben werden');
            return;
        }
        let url = "https://nominatim.openstreetmap.org/search?format=json&limit=1&polygon=0&addressdetails=0&q="
        $.ajax({
            url: url + encodeURI(str) + ',' + encodeURI(ort),
            success: function(result) {
                if (result && result[0]) {
                    marker.setLatLng([result[0].lat, result[0].lon])
                    mymap.setView([result[0].lat, result[0].lon], 15)
                } else {
                    alert("Adresse nicht gefunden")
                }
            }
        });
    }



$('#getFullScreen').click(function(e){
    //$('#myDiv').toggleClass('fullscreen'); 
    vollbild();
});

function vollbild() {

  var element = document.getElementById("mapid");

  if (element.requestFullScreen) {

    if (!document.fullScreen) {
      element.requestFullscreen();
    } else {
      document.exitFullScreen();
    }

  } else if (element.mozRequestFullScreen) {

    if (!document.mozFullScreen) {
      element.mozRequestFullScreen();
    } else {
      document.mozCancelFullScreen();
    }

  } else if (element.webkitRequestFullScreen) {

    if (!document.webkitIsFullScreen) {
      element.webkitRequestFullScreen();
    } else {
      document.webkitCancelFullScreen();
    }

  }

}

//Fullbild versuch