const fs = require('fs');
const axios = require('axios');

class Busquedas {
    historial = [];
    dbPath = './db/database.json';

    constructor() {
        // TODO: leer DB si existe
        this.leerDB();
    };

    get historialCapitalizado() {
        return this.historial.map( lugar => {
            // divido el string en un  array de palabras, teniendo en cuenta el espacio como separador
            let palabras = lugar.split(' ');

            // a cada palabra, le extraigo el primer elemento y lo capitaliza, y luego le uno el resto de la palabra
            palabras = palabras.map( p => p[0].toUpperCase() + p.substring(1) );

            // Vuelvo a unir las palabras del array para formar un solo string.
            return palabras.join(' ');
        });
    }

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

    agregarHistorial( lugar = 'marcos') {
        // prevencion de duplicados
        if (this.historial.includes(lugar.toLowerCase())) return;

        // incluyo el lugar al principio de la lista
        this.historial.unshift(lugar.toLowerCase());
        
        // limito el historial a 6 elementos
        this.historial.splice(0,5);

        // Grabar en la DB
        this.guardarDB();
    }

    guardarDB () {
        const payload = {
            historial: this.historial
        };
        fs.writeFileSync(this.dbPath, JSON.stringify( payload ));
    }

    leerDB() {
        if (!fs.existsSync(this.dbPath)) return;
        
        const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8'});
        const data = JSON.parse(info);
        this.historial = data.historial;
    }
}

module.exports = Busquedas;