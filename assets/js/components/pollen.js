import { apiFetch } from "../utils/fetch.js";
import { getFriendlyPollenNames, pollenImg } from "../utils/custom.js"

const appMain = document.getElementById('app-main')

export const pollenList = async () => {
        
    const endpoint = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=52.52&longitude=13.41&current=alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen&hourly=alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen&timezone=Europe%2FBerlin&forecast_days=1`;
    const result = await apiFetch(endpoint);
    const { current } = result
    const { current_units } = result
    const { hourly } = result

    // console.log(current);
    // console.log(current_units);
    // console.log(hourly);

    const currentPollenArray = Object.keys(current).slice(2)

    const ul = document.createElement('ul')

    currentPollenArray.map(value => {
        // console.log(`${value} = ${current[value]}`);

        const li = document.createElement('li')

        const span_img = document.createElement('span')
        const img = document.createElement('img')
        img.src = `./assets/img/${pollenImg(value)}`
        span_img.appendChild(img)

        const span_name = document.createElement('span')
        span_name.innerText = getFriendlyPollenNames(value)

        const span_value = document.createElement('span')
        span_value.innerText = current[value]

        li.append(span_img, span_name, span_value)
        ul.appendChild(li)

    })

    appMain.appendChild(ul)

};

