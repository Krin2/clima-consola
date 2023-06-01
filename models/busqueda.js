const axios = require('axios');

class Busquedas {
    historial = ['Tegucigalpa', 'Madrid', 'Rafaela'];

    constructor() {
        // TODO: leer DB si existe
    };

    // Parametros usados para hacer las consultas
    paramsMapbox() {
        return {
            access_token: process.env.MAPBOX_KEY,
            limit: 5,
            language: 'es',
        }
    }
    paramsWeather() {
        return {
            appid: process.env.OPENWEATHER_KEY,
            units:'metric',
            lang: 'es',
        }
    }

    async ciudad( lugar = '' ) {
        // peticion http
        try {
            // creo una instancia de axios para hacer las consultas
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params : this.paramsMapbox()
            });

            // realizacion de la consulta (tipo get)
            const respuesta = await instance.get();

            // al usar los parentesis despues del => se indica que se va a retornar un objeto de forma implicita
            return respuesta.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lat: lugar.center[1],
                lng: lugar.center[0],
            }))
        } catch (error) {
            return [];
        }
    }

    async climaLugar (lat, lon) {
        // peticion http
        try {
            // creo una instancia de axios para hacer las consultas
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params : {...this.paramsWeather(), lat, lon } // uso de destructuracion 
            });
            const resultado = await instance.get();
            const { weather, main } = resultado.data // uso de destructuracion
            return {
                desc: weather[0].description,
                temp: main.temp,
                min: main.temp_min,
                max: main.temp_max,
            };
        }
        catch (error) {
            return [];
        }
    }
}

module.exports = Busquedas;