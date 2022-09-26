const fs = require('fs');
const axios = require('axios');

class Search {
    history = [];
    dbPath = './db/database.json';

    constructor() {
        this.readDB();
    }

    get mapboxParams() {
        return {
            'limit': 5,
            /* 'proximity': 'ip',
            'types'=place%2Cpostcode%2Caddress */
            'language': 'en',
            'access_token': `${process.env.MAPBOX_TOKEN}`
        };
    }

    async place(name = '') {
        const axiosInstance = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${name}.json`,
            params: this.mapboxParams
        });

        try {
            const resp = await axiosInstance.get();
            return resp.data.features.map(place => ({
                id: place.id,
                name: place.place_name_en,
                lng: place.center[0],
                lat: place.center[1]
            }))


        } catch (error) {
            throw error;
        }
    }

    get weatherParams() {
        return {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric'
        };

    }

    async getWeather(lat, lng) {
        try {
            const axiosInstance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {
                    ...this.weatherParams,
                    lat,
                    lon: lng
                }
            });

            const { data } = await axiosInstance.get();
            return {
                desc: data.weather[0].description,
                temp: data.main.temp,
                min: data.main.temp_min,
                max: data.main.temp_max
            }


        } catch (error) {
            throw error;
        }
    }

    addHistory(place = '') {
        // prevent duplicates
        if (this.history.includes(place)) {
            this.history = this.history.filter(plc => plc !== place)
        }

        this.history.unshift(place);

        // save
        this.saveDB();
    }

    saveDB() {
        const payload = {
            history: this.history
        }

        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    readDB() {
        if (fs.existsSync(this.dbPath)) {
            const loadedData = JSON.parse(fs.readFileSync(this.dbPath, { encoding: 'utf-8' }));
            this.history = loadedData.history ? loadedData.history : [];
        }
    }

}

module.exports = Search;