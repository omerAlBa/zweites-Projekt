

var mymap = L.map('mapid').setView([53.866376, 10.687195], 13);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);

var marker = L.marker([53.866376, 10.687195]).addTo(mymap);

//zusätze

marker.bindPopup("<b>MediaFactory</b><br>Softwareentwickler in Luebeck, Schleswig-Holstein.").openPopup();
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");

var popup = L.popup()
    .setLatLng([51.5, -0.09])
    .setContent("I am a standalone popup.")
    .openOn(mymap);