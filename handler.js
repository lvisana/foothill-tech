window.initMapWrapper = async function() {

  if (defaultCenter && defaultZoom && defaultMapId && defaultPolygonKmlFile) {
    await initMap();
  }
  
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