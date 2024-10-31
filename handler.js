window.initMapWrapper = async function() {
  
  // const url = window.location.href;

  // if its not a webflow collection, show default map
  // if (!url.includes('/service-areas/')) {
  //   if (defaultCenter && defaultZoom && defaultMapId && defaultPolygonPath) {
  //     await initMap(false, );
  //   }
  // } else {
  //   let mapCenter = { lat: 38.716783421744765, lng: -121.36591377980162 };
  //   let mapZoom = 13;
  //   let polygon = polygonKmlPath+'Antelope.kml';
  //   console.log(polygon);
  //   await initMap(false, mapCenter, mapZoom, polygon);
  // }
    
  isQuote = true;
  await initMap();
  
  const input = document.getElementById('address');
  const resetButton = document.getElementById('resetButton');
  const closeModal = document.getElementById('close_modal');
  const serviceAreaChecker = document.getElementById('service_area_form');
  const captchaBtn = document.getElementById('captchaBtn');
  
  if (input) {
  
    if (captchaBtn) {
    console.log(captchaBtn)
      captchaBtn.addEventListener('click', function() {
      console.log('here')
        if (input.value) {
            let response = validateCaptcha();
            console.log(response)
            
            if (response) {
              initAutocomplete(input);
              clearTimeout(timeout);
              timeout = setTimeout(() => validateAddressManual(input.value), 3000);
            }
          }
      })
    }
      
    function initAutocomplete(input) {
      autocomplete = new google.maps.places.Autocomplete(input, {
          types: ['address']
      });
      autocomplete.addListener('place_changed', validateAddress);
		}

    input.addEventListener('keyup', (e) => {
      e.preventDefault();
			document.querySelector('#captcha_container').style.display = "block"

      let response = validateCaptcha();
      
      if (response) {
      	initAutocomplete(input);
        clearTimeout(timeout);
        timeout = setTimeout(() => validateAddressManual(input.value), 3000);
      }
    });
}
  
  if (resetButton) {
    resetButton.addEventListener('click', resetMap(defaultCenter, defaultZoom, defaultMapId));
  }
  
  if (closeModal) {
    closeModal.addEventListener('click', function() {
    const contactForm = document.querySelector('#quote_form');
        contactForm.style.display = "none";
    });
  }
  
 if (serviceAreaChecker) {
   document.getElementById('service_area_form').addEventListener('submit', function() {
        return false;
    });
 }
 
  function validateCaptcha() {
    const recaptchaResponse = document.querySelector('.g-recaptcha-response').value;

    if (!recaptchaResponse) {
      return false;
    }
    
    return true;
  }
 
}