let map;
let polygon;
let geocoder;
let autocomplete;
let timeout;
let isQuote = false;

let defaultCenter = { lat: 38.6572966, lng: -121.0885898 };
let defaultZoom = 10;
let defaultMapId = '8e2c66eaea082271';
let defaultMapStyleId = '6855bf9019f9c448';

let polygonKmlPath = 'https://lvisana.github.io/foothill-tech/service-areas/';

let defaultPolygonPath = [
    { lat: 38.670289, lng: -120.8871988 },
    { lat: 38.6701732, lng: -120.8394595 },
    { lat: 38.6729885, lng: -120.8201265 },
    { lat: 38.6897321, lng: -120.7899247 },
    { lat: 38.7141753, lng: -120.7901791 },
    { lat: 38.72227, lng: -120.7346309 },
    { lat: 38.7539697, lng: -120.7643897 },
    { lat: 38.7453708, lng: -120.7805114 },
    { lat: 38.7514426, lng: -120.7892339 },
    { lat: 38.7468675, lng: -120.8133161 },
    { lat: 38.7469485, lng: -120.8489448 },
    { lat: 38.7262559, lng: -120.8503984 },
    { lat: 38.7240377, lng: -120.8759246 },
    { lat: 38.7068606, lng: -120.8662114 },
    { lat: 38.699343, lng: -120.8994601 },
    { lat: 38.7228957, lng: -120.9258491 },
    { lat: 38.7222719, lng: -120.9637598 },
    { lat: 38.7145063, lng: -120.9632029 },
    { lat: 38.6930045, lng: -120.9456383 },
    { lat: 38.6830242, lng: -120.9478181 },
    { lat: 38.6859043, lng: -120.967589 },
    { lat: 38.714241, lng: -120.9818719 },
    { lat: 38.7110267, lng: -121.013713 },
    { lat: 38.7187898, lng: -121.0499338 },
    { lat: 38.7186547, lng: -121.0676106 },
    { lat: 38.7433599, lng: -121.0718164 },
    { lat: 38.7470443, lng: -121.0794595 },
    { lat: 38.7287702, lng: -121.1083079 },
    { lat: 38.7186249, lng: -121.1042506 },
    { lat: 38.7111914, lng: -121.0940582 },
    { lat: 38.7077017, lng: -121.10543 },
    { lat: 38.6997231, lng: -121.1185165 },
    { lat: 38.6966653, lng: -121.1407006 },
    { lat: 38.7036865, lng: -121.1446792 },
    { lat: 38.7076261, lng: -121.1528644 },
    { lat: 38.7114827, lng: -121.1695694 },
    { lat: 38.7281938, lng: -121.1711213 },
    { lat: 38.7349418, lng: -121.1619403 },
    { lat: 38.736333, lng: -121.1561922 },
    { lat: 38.7409401, lng: -121.1439367 },
    { lat: 38.7490072, lng: -121.1450554 },
    { lat: 38.7587478, lng: -121.1458311 },
    { lat: 38.7594204, lng: -121.1499578 },
    { lat: 38.7650496, lng: -121.1439626 },
    { lat: 38.7729533, lng: -121.1399621 },
    { lat: 38.7734288, lng: -121.1309825 },
    { lat: 38.7781864, lng: -121.1304565 },
    { lat: 38.7913088, lng: -121.1239646 },
    { lat: 38.7889841, lng: -121.1103343 },
    { lat: 38.796953, lng: -121.1087155 },
    { lat: 38.8072631, lng: -121.1065385 },
    { lat: 38.8122983, lng: -121.1095665 },
    { lat: 38.8185571, lng: -121.1124474 },
    { lat: 38.8182337, lng: -121.1261943 },
    { lat: 38.8104195, lng: -121.1639268 },
    { lat: 38.8250589, lng: -121.1640483 },
    { lat: 38.8417696, lng: -121.1783365 },
    { lat: 38.8439087, lng: -121.2205651 },
    { lat: 38.8345541, lng: -121.2999679 },
    { lat: 38.8107435, lng: -121.3007311 },
    { lat: 38.8106098, lng: -121.3280252 },
    { lat: 38.8098091, lng: -121.3723192 },
    { lat: 38.801179, lng: -121.3947157 },
    { lat: 38.7517105, lng: -121.392689 },
    { lat: 38.7138782, lng: -121.3923045 },
    { lat: 38.7109722, lng: -121.3914057 },
    { lat: 38.7089168, lng: -121.38512 },
    { lat: 38.7067508, lng: -121.3830082 },
    { lat: 38.6650619, lng: -121.3831286 },
    { lat: 38.5681832, lng: -121.383064 },
    { lat: 38.5593235, lng: -121.3805981 },
    { lat: 38.56237, lng: -121.3452978 },
    { lat: 38.5659003, lng: -121.3366609 },
    { lat: 38.5488773, lng: -121.3354337 },
    { lat: 38.5471686, lng: -121.3211331 },
    { lat: 38.553514, lng: -121.3133549 },
    { lat: 38.5632488, lng: -121.2977954 },
    { lat: 38.5662054, lng: -121.2852137 },
    { lat: 38.5690284, lng: -121.271892 },
    { lat: 38.5620202, lng: -121.2517737 },
    { lat: 38.5685216, lng: -121.2466583 },
    { lat: 38.5787808, lng: -121.2458336 },
    { lat: 38.5850734, lng: -121.2380031 },
    { lat: 38.5933961, lng: -121.2446695 },
    { lat: 38.5936676, lng: -121.2576885 },
    { lat: 38.6089696, lng: -121.2542024 },
    { lat: 38.6185996, lng: -121.2308881 },
    { lat: 38.6129359, lng: -121.2175291 },
    { lat: 38.617432, lng: -121.1976753 },
    { lat: 38.6288365, lng: -121.1909213 },
    { lat: 38.6393373, lng: -121.1911663 },
    { lat: 38.6404495, lng: -121.157763 },
    { lat: 38.6177988, lng: -121.1537031 },
    { lat: 38.6119756, lng: -121.0835717 },
    { lat: 38.5994886, lng: -121.0547403 },
    { lat: 38.6236483, lng: -121.008756 },
    { lat: 38.6382654, lng: -121.0505513 },
    { lat: 38.6514039, lng: -121.0551005 },
    { lat: 38.6507432, lng: -120.9918805 },
    { lat: 38.6444401, lng: -120.9811925 },
    { lat: 38.6445515, lng: -120.9215311 },
    { lat: 38.670289, lng: -120.8871988 }
    ];

async function initMap(validate = true, mapCenter = defaultCenter, mapZoom = defaultZoom, polygonCoords = defaultPolygonPath) {
    const { Map } = await google.maps.importLibrary("maps");
    geocoder = new google.maps.Geocoder();

    map = new Map(document.getElementById("map"), {
        center: mapCenter,
        zoom: mapZoom,
    });
    
    const styledMapType = new google.maps.StyledMapType([], {
        mapId: defaultMapStyleId
      });

    map.mapTypes.set("styled_map", styledMapType);
    map.setMapTypeId("styled_map");

    if (validate) {
        polygon = new google.maps.Polygon({
            paths: polygonCoords,
            strokeColor: "#1a73e8",
            strokeOpacity: 1,
            strokeWeight: 2,
            fillColor: "#1a73e8",
            fillOpacity: 0.2
        });
        polygon.setMap(map);
    } else {
        new google.maps.KmlLayer({
            url: polygonCoords,
            map: map
        });
    }
}

function resetMap(defaultCenter, defaultZoom, mapId) {
    map.setCenter(defaultCenter);
    map.setZoom(defaultZoom);
}


function validateAddressManual(address) {
    const addressSuccess = document.querySelector('#notice_success');
    const addressError = document.querySelector('#notice_error');

    addressSuccess.style.display = "none";
    addressError.style.display = "none";
    
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
    const quoteForm = document.querySelector('#quote_form');

    const point = new google.maps.LatLng(latLng.lat(), latLng.lng());

    if (google.maps.geometry.poly.containsLocation(point, polygon)) {
            setTimeout(() => {
                if (isQuote) {
                    quoteForm.style.display = "block"
                } else {
                    contactForm.style.display = "block"
                }
            }, 2000);
        addressSuccess.style.display = "block";
        map.setZoom(10);
    } else {
        addressError.style.display = "block";
    }
}