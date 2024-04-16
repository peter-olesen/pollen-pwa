import { apiFetch } from '../utils/fetch.js';

// const pollenContainer = document.getElementById('app-main')
// const helloElm = document.createElement('p');
// helloElm.textContent = "hello from pollen.js";
// pollenContainer.appendChild(helloElm);

export const getPollenData = async (latitude, longitude) => {
        
        const timeZone = 'Europe%2FBerlin'
        const endpoint = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen&hourly=alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen&timeformat=unixtime&timezone=${timeZone}&forecast_days=1`;
        const pollenData = await apiFetch(endpoint);

        console.log(pollenData);

        // console.log(latitude);
        // console.log(longitude);
        
};