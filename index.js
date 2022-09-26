require('dotenv').config();

const colors = require('colors');
const clrTheme = require('./config/colorsConfig');

const { inquirerMenu, pause, readInput, listArrayIdName } = require('./helpers/inquirer');
const Search = require('./models/search');

colors.setTheme(clrTheme());

const main = async () => {

    let searches = new Search();
    let opt;

    while (opt !== 0) {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                // ask for a place
                const placeSearch = await readInput('City name: ');

                // search 
                const places = await searches.place(placeSearch);

                // select place
                const selectedId = await listArrayIdName(places, 'Select one place:');
                if (selectedId === 0) continue;

                const selectedPlace = places.find(place => place.id === selectedId);

                // save history
                searches.addHistory(selectedPlace.name);

                // weather data
                const weather = await searches.getWeather(selectedPlace.lat, selectedPlace.lng);

                // show results
                console.clear();
                console.log('\nCity info:\n'.highlight);
                console.log('City:'.results, selectedPlace.name.normal);
                console.log('Lat:'.results, selectedPlace.lat.toString().normal);
                console.log('Lng:'.results, selectedPlace.lng.toString().normal);
                console.log('Temp:'.results, weather.temp.toString().normal);
                console.log('Desc:'.results, weather.desc.normal);
                console.log('Min:'.results, weather.min.toString().normal);
                console.log('Max:'.results, weather.max.toString().normal, '\n');

                break;
            case 2:
                searches.history.forEach((place, index) => {
                    const idx = `${index + 1}`.listElemNumber;
                    console.log(`${idx}. ${place}`)
                })
                break;
            default:
                break;
        }

        if (opt !== 0) await pause();
    }

}

main();
