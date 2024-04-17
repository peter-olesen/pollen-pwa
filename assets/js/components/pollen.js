import { apiFetch } from '../utils/fetch.js';

// const pollenContainer = document.getElementById('app-main')
// const helloElm = document.createElement('p');
// helloElm.textContent = "hello from pollen.js";
// pollenContainer.appendChild(helloElm);

export const getPollenData = async (latitude, longitude, ) => {
        
        const timeZone = 'Europe%2FBerlin'
        const endpoint = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen&hourly=alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen&timeformat=unixtime&timezone=${timeZone}&forecast_days=1`;
        const pollenData = await apiFetch(endpoint);

        console.log(pollenData);

        buildCurrentData(pollenData.current, pollenData.current_units);
};

function buildCurrentData(currentPollenData, currentPollenUnits) {

        let currentDataElement = document.getElementById('app-main');
    
        let currentDataHTML = `
                <ul>
                    <li>Alder: ${currentPollenData.alder_pollen} ${currentPollenUnits.alder_pollen}</li>
                    <li>Birch: ${currentPollenData.birch_pollen} ${currentPollenUnits.birch_pollen}</li>
                    <li>Grass: ${currentPollenData.grass_pollen} ${currentPollenUnits.grass_pollen}</li>
                    <li>Mugwort: ${currentPollenData.mugwort_pollen} ${currentPollenUnits.mugwort_pollen}</li>
                    <li>Olive: ${currentPollenData.olive_pollen} ${currentPollenUnits.olive_pollen}</li>
                    <li>Ragweed: ${currentPollenData.ragweed_pollen} ${currentPollenUnits.ragweed_pollen}</li>
                </ul>
                `;
        currentDataElement.innerHTML = currentDataHTML;
    }

// function pollenDataObj(pollenData) {

//         buildCurrentData(pollenData.current)
    
//         // Hourly data
//         let pollenHourArray = pollenData.hourly.time
    
//         let hourlyData = []
    
//         pollenHourArray.map((userTime, index ) => {
//             let hourData = {}
//             hourData.time = userTime
//             hourData.alder_pollen = pollenData.hourly.alder_pollen[index]
//             hourData.birch_pollen = pollenData.hourly.birch_pollen[index]
//             hourData.grass_pollen = pollenData.hourly.grass_pollen[index]
//             hourData.mugwort_pollen = pollenData.hourly.mugwort_pollen[index]
//             hourData.olive_pollen = pollenData.hourly.olive_pollen[index]
//             hourData.ragweed_pollen = pollenData.hourly.ragweed_pollen[index]
    
//             hourlyData.push(hourData)
//         })
    
//         buildHourlyData(hourlyData)
//     }
    

    