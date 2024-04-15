import { apiFetch } from "../utils/fetch.js";

export const getUserLocation = async () => {

  const appMain = document.getElementById('app-main');

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      fetchUserLocationName(latitude, longitude);

      const userLatitude = document.createElement('p');
      userLatitude.textContent = `Latitude: ${position.coords.latitude}`;
      appMain.appendChild(userLatitude);

      const userLongitude = document.createElement('p');
      userLongitude.textContent = `Longitude: ${position.coords.longitude}`;
      appMain.appendChild(userLongitude);

    },
    (error) => {
      console.error("Error getting location:", error.message);
    }
  );

  const fetchUserLocationName = async (latitude, longitude) => {
    const apiKey = `65fbf0ab53bd8384900768tupe2265f`;
    const endpoint = `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=${apiKey}`;
    const userLocationData = await apiFetch(endpoint);

    console.log(userLocationData);

    let locationName;
    // Check for both city and town in the API response (adjust paths based on your API structure)
    if (userLocationData.address.city) {
      locationName = userLocationData.address.city;
    } else if (userLocationData.address.town) {
      locationName = userLocationData.address.town;
    } else {
      // Handle cases where neither city nor town is found (optional)
      console.warn("Unable to find city or town in response data.");
      locationName = ""; // Or set a default value
    }

    const userCityElm = document.createElement('p');
    userCityElm.textContent = locationName;
    appMain.appendChild(userCityElm);

    // Save user location name to localStorage (rest of the code remains the same)
  };
};
