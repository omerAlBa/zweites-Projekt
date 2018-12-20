var Eingabe1
var Eingabe2

var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>',
    maxZoom: 18,
}).addTo(mymap);


L.tileLayer('https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=7fe0a7c2949f42168c03cae8ebb202f2', {
    maxZoom: 18,
}).addTo(mymap);

L.tileLayer('http://t1.openseamap.org/seamark/{z}/{x}/{y}.png',{
    maxZoom: 18,
}).addTo(mymap);

var marker = L.marker([53.866376, 10.687195]).addTo(mymap);
marker.bindPopup("<b>MediaFactory</b><br>Softwareentwickler in Luebeck, Schleswig-Holstein.").openPopup();

/*var popup = L.popup()
    .setLatLng([53.866376, 10.687195])
    .setContent("I am a standalone popup.")
    .openOn(mymap);*/

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
                    Eingabe1=result[0].lat;
                    Eingabe2=result[0].lon;
                    L.Routing.control({
                      waypoints: [
                        L.latLng(53.866376, 10.687195),
                        L.latLng(parseFloat(Eingabe1), parseFloat(Eingabe2))
                      ]
                    }).addTo(mymap);

                } else {
                    alert("Adresse nicht gefunden")
                }
            }
        });
    }


//Fullscreen
mymap.addControl(new L.Control.Fullscreen());
mymap.isFullscreen() // Is the map fullscreen?
mymap.toggleFullscreen() // Either go fullscreen, or cancel the existing fullscreen.

// `fullscreenchange` Event that's fired when entering or exiting fullscreen.
mymap.on('fullscreenchange', function () {
    if (mymap.isFullscreen()) {
        console.log('entered fullscreen');
    } else {
        console.log('exited fullscreen');
    }
});



//minimap
var osm2 = new L.TileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {minZoom: 5, maxZoom: 8, attribution: "http://openstreetmap.org"});
var MiniMap = new L.Control.MiniMap(osm2).addTo(mymap);

//measureControl
mymap.addControl(new L.Control.ScaleNautic({
                metric: true,
                imperial: true,
                nautic: false
            }));




//Navigation
//schaue Oben, findet sich in der Eingabe1&Eingabe2!!




