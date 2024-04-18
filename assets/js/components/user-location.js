import { apiFetch } from "../utils/fetch.js";
import { getPollenData } from "./pollen.js";

export const getUserLocation = async () => {
    const appHeader = document.getElementById('app-header');
    const selectElm = document.createElement('select');
    selectElm.id = "location-dropdown";
    appHeader.appendChild(selectElm);
  
    const appMain = document.getElementById('app-main');
  
    // Check for navigator.geolocation support
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          fetchUserLocationName(latitude, longitude);
          getPollenData(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      // Navigator.geolocation not supported
        const errorMessageElm = document.createElement('p');
        errorMessageElm.textContent = "This browser doesn't support location services.";
        appMain.appendChild(errorMessageElm);

        console.error("Error getting location:", error.message); // Log the error to the console

    }

    const fetchUserLocationName = async (latitude, longitude) => {
    const apiKey = `65fbf0ab53bd8384900768tupe2265f`;
    const endpoint = `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=${apiKey}`;
    const userLocationData = await apiFetch(endpoint);

    let locationName;

    if (userLocationData.address.city) {
        locationName = userLocationData.address.city;
    } else if (userLocationData.address.town) {
        locationName = userLocationData.address.town;
    } else {
        console.warn("Unable to find city or town in response data.");
        locationName = "";
    }

    const populateSelect = (existingLocationNames) => {
        selectElm.innerHTML = ""; 
    
        // Add current location first
        const optionElm = document.createElement("option");
        optionElm.value = locationName;
        optionElm.textContent = locationName;
        optionElm.selected = true; // Set as selected by default
        selectElm.appendChild(optionElm);
    
        existingLocationNames.forEach((option) => {
            const optionElm = document.createElement("option");
            optionElm.value = option;
            optionElm.textContent = option;
            selectElm.appendChild(optionElm);
        });
    };

    populateSelect([locationName]); 

        let existingLocationNames = new Set();
        try {
        const storedLocations = JSON.parse(localStorage.getItem('userLocationNames')) || new Set();
        storedLocations.forEach(location => existingLocationNames.add(location));
        } catch (error) {
        console.error("Error parsing existing user location names:", error);
        }

        const addedLocationName = locationName;
        existingLocationNames.add(addedLocationName);
        populateSelect(existingLocationNames); 
        localStorage.setItem('userLocationNames', JSON.stringify([...existingLocationNames]));
    }
  };
