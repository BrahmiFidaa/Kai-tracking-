// IMPORTANT: Replace these with your EmailJS values
const PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const SERVICE_ID = "YOUR_SERVICE_ID";
const TEMPLATE_ID = "YOUR_TEMPLATE_ID";

(function() {
  emailjs.init(PUBLIC_KEY);
})();

function sendLocation() {

  const status = document.getElementById("status");

  if (!navigator.geolocation) {
    status.innerText = "Geolocation is not supported.";
    return;
  }

  status.innerText = "Requesting location...";

  navigator.geolocation.getCurrentPosition(
    function(position) {

      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const templateParams = {
        latitude: lat,
        longitude: lon,
        maps_link: `https://maps.google.com/?q=${lat},${lon}`
      };

      emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
        .then(function() {
          status.innerText = "Location sent successfully ❤️";
        })
        .catch(function(error) {
          status.innerText = "Failed to send location.";
          console.error(error);
        });

    },
    function() {
      status.innerText = "Location permission denied.";
    }
  );
}