let map;
let polygon;
let geocoder;
let autocomplete;
let timeout;

let defaultCenter =  { lat: 38.6271542, lng: -121.0921948 };
let defaultZoom = 10;
let defaultMapId = '8e2c66eaea082271';

let polygonKmlPath = 'https://lvisana.github.io/foothill-tech/service-areas/'; 
let defaultPolygonKmlArea = 'Sacramento.kml'; 
let defaultPolygonKmlFile = polygonKmlPath+defaultPolygonKmlArea;
let defaultPolygonPath = getPolygonPaths(defaultPolygonKmlFile);

async function getPolygonPaths(kmlFile) {
    const paths = await extractPolygonPaths(kmlFile);
    return paths[0];
}

async function extractPolygonPaths(kmlUrl) {
    try {
        const response = await fetch(kmlUrl);
        const kmlText = await response.text();
        const parser = new DOMParser();
        const kmlDoc = parser.parseFromString(kmlText, 'application/xml');

        const placemarks = kmlDoc.getElementsByTagName('Placemark');
        let paths = [];

        for (let i = 0; i < placemarks.length; i++) {
            const placemark = placemarks[i];
            const coordinatesTag = placemark.getElementsByTagName('coordinates')[0];

            if (coordinatesTag) {
                const coordinatesText = coordinatesTag.textContent.trim();
                const coordinatesArray = coordinatesText.split(' ');

                const placemarkPaths = coordinatesArray.map(coord => {
                    const [lng, lat] = coord.split(',').map(Number);
                    if (!isNaN(lng) && !isNaN(lat)) {
                        return { lat, lng };
                    }
                }).filter(Boolean);

                paths.push(placemarkPaths);
            }
        }

        return paths;
    } catch (err) {
        console.error('Error loading KML file:', err);
        return null;
    }
}

async function initMap(mapCenter = defaultCenter, mapZoom = defaultZoom, mapId = defaultMapId, polygonPath = defaultPolygonPath) {
    const { Map } = await google.maps.importLibrary("maps");
    geocoder = new google.maps.Geocoder();

    map = new Map(document.getElementById("map"), {
        center: mapCenter,
        zoom: mapZoom,
        mapId: mapId
    });

    polygon = new google.maps.Polygon({
            paths: polygonPath,
            strokeColor: "#1a73e8",
            strokeOpacity: 1,
            strokeWeight: 2,
            fillColor: "#1a73e8",
            fillOpacity: 0.2
        });

    polygon.setMap(map);
}

function resetMap(defaultCenter, defaultZoom, mapId) {
    map.setOptions({
        center: defaultCenter,
        zoom: defaultZoom,
        mapId: mapId
    });
}


function validateAddressManual(address) {
    geocoder.geocode({ address: address }, function(results, status) {
        if (status === 'OK' && results.length > 0) {
            const place = results[0];
            const latLng = place.geometry.location;
            const point = new google.maps.LatLng(latLng.lat(), latLng.lng());

            map.setCenter(latLng);
            map.setZoom(15);

            validateLatLng(point);
        }
    });
}

function validateAddress() {
    const place = autocomplete.getPlace();
    const addressSuccess = document.querySelector('#notice_success');
    const addressError = document.querySelector('#notice_error');

    addressSuccess.style.display = "none";
    addressError.style.display = "none";

    if (!place.geometry || !place.geometry.location) {
        return;
    }

    const latLng = place.geometry.location;
    const point = new google.maps.LatLng(latLng.lat(), latLng.lng());

    map.setCenter(latLng);
    map.setZoom(15);

    validateLatLng(point);
}

function validateLatLng(latLng) {
    const addressSuccess = document.querySelector('#notice_success');
    const addressError = document.querySelector('#notice_error');
    const contactForm = document.querySelector('#contact_form');

    const point = new google.maps.LatLng(latLng.lat(), latLng.lng());
    addressSuccess.style.display = "none";
    addressError.style.display = "none";

    if (google.maps.geometry.poly.containsLocation(point, polygon)) {
        setTimeout(() => contactForm.style.display = "block", 2000);
        addressSuccess.style.display = "block";
        map.setZoom(10);
    } else {
        addressError.style.display = "block";
    }
}