function initialize(settings) {
    let mapOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 14
    };
    let map = new google.maps.Map($(settings.id)[0], mapOptions);
}

function initializeMap(settings, locations) {
    let map = new google.maps.Map(
        $(settings.id)[0],
        {
            center: new google.maps.LatLng(0, 0),
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

    let bounds = new google.maps.LatLngBounds();

    let geocoder = new google.maps.Geocoder();
    for (i = 0; i < locations.length; i++) {
        let location = locations[i];
        //geocodeAddress(locations, i, settings.marker);
        geocoder.geocode(
            {'address': locations[i].address},
            function (results, status) {
                //console.log(location);
                if (status == google.maps.GeocoderStatus.OK) {
                    let marker = new google.maps.Marker({
                        icon: settings.marker,
                        map: map,
                        position: results[0].geometry.location,
                        title: location.title,
                        animation: google.maps.Animation.DROP,
                        address: location.address,
                    });
                    //console.log(marker);
                    infoWindow(marker, map, location.title, location.address);
                    bounds.extend(marker.getPosition());
                    map.fitBounds(bounds);
                } else {
                    console.log("geocode of " + location.address + " failed: " + status);
                }
            });
    }
}

function infoWindow(marker, map, title, address) {
    google.maps.event.addListener(marker, 'click', function () {
        let html = "<div><h5>" + title + "</h5><p>" + address + "</p></div>";
        iw = new google.maps.InfoWindow({
            content: html
        });
        iw.open(map, marker);
    });
}


function initializeRecommendedMap() {
    //console.log("Initialize Recommended Map called");

    $("#recommendedGrid").show();
    $("#recommendedMap").hide();

    let mapSettings = {};
    mapSettings.id = '#recommended_technicians_map';
    mapSettings.style = $(mapSettings.id).data('mapstyle');
    mapSettings.marker = $(mapSettings.id).data('marker');
    //console.log(mapSettings);

    let locations = [];
    $('.recommended-map-popup').each(function () {
        let current_item = $(this);
        let location = {};
        location.title = current_item.data('title');
        location.address = current_item.data('address');
        locations.push(location);
    });
    //console.log(locations);

    //initialize(mapSettings);
    initializeMap(mapSettings, locations);

    $("#recommended_technicians_map").show();
    $("#recommended_technicians_grid").hide();
}

function initializeOthersMap() {
    //console.log("Initialize Others Map called");

    $("#othersGrid").show();
    $("#othersMap").hide();

    let mapSettings = {};
    mapSettings.id = '#other_technicians_map';
    mapSettings.style = $(mapSettings.id).data('mapstyle');
    mapSettings.marker = $(mapSettings.id).data('marker');
    //console.log(mapSettings);

    let locations = [];
    $('.other-map-popup').each(function () {
        let current_item = $(this);
        let location = {};
        location.title = current_item.data('title');
        location.address = current_item.data('address');
        locations.push(location);
    });
    //console.log(locations);

    //initialize(mapSettings);
    initializeMap(mapSettings, locations);

    $("#other_technicians_map").show();
    $("#other_technicians_grid").hide();
}

function initializeRecommendedGrid() {
    //console.log("Initialize Recommended Grid called");

    $("#recommendedMap").show();
    $("#recommendedGrid").hide();

    /** Initialize Grid **/

    $("#recommended_technicians_grid").show();
    $("#recommended_technicians_map").hide();
}

function initializeOthersGrid() {
    //console.log("Initialize Others Grid called");

    $("#othersMap").show();
    $("#othersGrid").hide();

    /** Initialize Grid **/

    $("#other_technicians_grid").show();
    $("#other_technicians_map").hide();
}

$(document).ready(function () {
    let mapButton;
    let gridButton;

    mapButton = $("#recommendedMap");
    gridButton = $("#recommendedGrid");
    if (mapButton && gridButton) {
        mapButton.show();
        gridButton.hide();

        mapButton.on('click', initializeRecommendedMap);
        gridButton.on('click', initializeRecommendedGrid);
    }
    $("#recommended_technicians_map").hide();

    mapButton = $("#othersMap");
    gridButton = $("#othersGrid");
    if (mapButton && gridButton) {
        mapButton.show();
        gridButton.hide();

        mapButton.on('click', initializeOthersMap);
        gridButton.on('click', initializeOthersGrid);
    }
    $("#other_technicians_map").hide();
});