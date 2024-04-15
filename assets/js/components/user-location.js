import { apiFetch } from "../utils/fetch.js";

export const getUserLocation = async () => {

    const appHeader = document.getElementById('app-header');
    const selectElm = document.createElement('select');
    selectElm.id = "location-dropdown";
    appHeader.appendChild(selectElm);

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
        
        if (userLocationData.address.city) {
        locationName = userLocationData.address.city;
        } else if (userLocationData.address.town) {
        locationName = userLocationData.address.town;
        } else {
        
        console.warn("Unable to find city or town in response data.");
        locationName = "";
        }

        const userCityElm = document.createElement('p');
        userCityElm.textContent = locationName;
        appMain.appendChild(userCityElm);

        let existingLocationNames = [];
        try {
            existingLocationNames = JSON.parse(localStorage.getItem('userLocationNames')) || [];
        } catch(error) {
            console.error("Error parsing existing user location names:", error);
        }

        if (!existingLocationNames.includes(locationName)) {
            existingLocationNames.push(locationName);
        }

        const populateSelect = () => {
            selectElm.innerHTML ="";
            existingLocationNames.forEach((option) => {
                const optionElm = document.createElement("option");
                optionElm.value = option;
                optionElm.textContent = option;
                selectElm.appendChild(optionElm);
            });
        };

        populateSelect();

        localStorage.setItem('userLocationNames', JSON.stringify(existingLocationNames));

    }
};
