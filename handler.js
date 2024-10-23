async function initMapWrapper() {
    let polygonKmlArea = 'Antelope.kml';
    let polygonKmlFile = polygonKmlPath+polygonKmlArea;
    let path = await extractPolygonPaths(polygonKmlFile);

    defaultCenter = { lat: 38.717176, lng: -121.356399 };
    defaultZoom = 13;
    defaultMapId = '8bb28006ffc8ddf2';

    await initMap(defaultCenter, defaultZoom, defaultMapId,path[0]);

    const input = document.getElementById('address');
    const resetButton = document.getElementById('resetButton');
    const closeModal = document.getElementById('close_modal');
    const serviceAreaChecker = document.getElementById('service_area_form');


    autocomplete = new google.maps.places.Autocomplete(input, {
        types: ['address']
    });

    autocomplete.addListener('place_changed', validateAddress);

    if (input) {
      input.addEventListener('keyup', () => {
          clearTimeout(timeout);
          timeout = setTimeout(() => validateAddressManual(input.value), 3000);
      });
    }
    
		if (resetButton) {
    	resetButton.addEventListener('click', resetMap(defaultCenter, defaultZoom, defaultMapId));
    }
    
    if (closeModal) {
      closeModal.addEventListener('click', function() {
      const contactForm = document.querySelector('#contact_form');
          contactForm.style.display = "none";
      });
    }
    
   if (serviceAreaChecker) {
     document.getElementById('service_area_form').addEventListener('submit', function() {
          return false;
      });
   }
}