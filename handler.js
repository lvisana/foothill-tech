window.initMapWrapper = async function() {

  const url = window.location.href;

  // if its not a webflow collection, show default map
  // if (!url.includes('/service-areas/')) {
  //   if (defaultCenter && defaultZoom && defaultMapId && defaultPolygonPath) {
  //     await initMap();
  //   }
  // } else {
    let mapCenter = { lat: 38.716783421744765, lng: -121.36591377980162 };
    let mapZoom = 13;
    let polygon = polygonKmlPath+'Antelope.kml';
    await initMap(false, mapCenter, mapZoom, polygon);
  // }

  
  const input = document.getElementById('address');
  const resetButton = document.getElementById('resetButton');
  const closeModal = document.getElementById('close_modal');
  const serviceAreaChecker = document.getElementById('service_area_form');
  
  
  if (input) {

    autocomplete = new google.maps.places.Autocomplete(input, {
        types: ['address']
    });
  
    autocomplete.addListener('place_changed', validateAddress);

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