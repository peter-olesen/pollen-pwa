export const userLocations = () => {
    const locations = JSON.parse(localStorage.getItem('pollenLocations'))

    if (locations) {
        const select = document.createElement('select')

        for(let location of locations) {

            // console.log(location);

            const option = document.createElement('option')
            option.value = location.city
            option.textContent = location.city
            select.appendChild(option)
        }

        const appHeader = document.getElementById('app-header')
        appHeader.appendChild(select)
    }
}