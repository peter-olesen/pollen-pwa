import { apiFetch } from "../utils/fetch.js";

export const getUserLocation = async () => {

    navigator.geolocation.getCurrentPosition(
        (position) => {

            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            
            fetchUserLocationName(latitude, longitude);

            const userLatitude = document.getElementById('user-latitude');
            const userLongitude = document.getElementById('user-longitude');

            userLatitude.textContent = `Latitude: ${position.coords.latitude}`;
            userLongitude.textContent = `Longitude: ${position.coords.longitude}`;
        },
        (error) => {
            console.error("Error getting location:", error.message);
        }
    );

    const fetchUserLocationName = async (latitude, longitude) => {
        const apiKey = `65fbf0ab53bd8384900768tupe2265f`
        const endpoint = `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=${apiKey}`;
        const userLocationData = await apiFetch(endpoint);

        console.log(userLocationData)
      
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
      
        const userCityElm = document.getElementById('user-city');
        userCityElm.textContent = locationName;
      
        // Save user location name to localStorage
        let existingLocationNames = [];
        try {
            existingLocationNames = JSON.parse(localStorage.getItem('userLocationNames')) || [];
        } catch (error) {
          console.error("Error parsing existing user location names:", error);
        }
        
        const locationExists = existingLocationNames.includes(locationName);

        if (!locationExists) {
            existingLocationNames.push(locationName);
        }

        localStorage.setItem('userLocationNames', JSON.stringify(existingLocationNames));
      };
};