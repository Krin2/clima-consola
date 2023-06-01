require('dotenv').config();

const { leerInput, inquirerMenu, pausa, listarLugares } = require('./helpers/inquirer');
const Busqueda = require('./models/busqueda');

const main = async () => {
    const busqueda = new Busqueda();
    
    let opcion = null;
    while (opcion !== 0) {
        console.clear();
        opcion = await inquirerMenu();

        switch (opcion) {
            case 1:
                // consulta para escribir un lugar a buscar
                const lugar = await leerInput('Ciudad: ');

                // busqueda del lugar usando mapbox
                const lugares = await busqueda.ciudad(lugar);

                // Generar un listado usando inquirer para seleccionar uno de los lugares encontrados
                const idSeleccionado = await listarLugares(lugares);

                // Usamos el id para buscar el luar en el listado
                const lugarSeleccionado = lugares.find(l => l.id === idSeleccionado);

                // consulto la API de openWeather para obtener el clima segun las coordenadas del lugar
                const clima = await busqueda.climaLugar(lugarSeleccionado.lat, lugarSeleccionado.lng);
                console.clear();
                console.log('\nInformacion de la ciudad: '.yellow);
                console.log(`Ciudad: ${`${lugarSeleccionado.nombre}`.cyan}`);
                console.log(`Lat:  ${`${lugarSeleccionado.lat}`.cyan}`);
                console.log(`Long: ${`${lugarSeleccionado.lng}`.cyan}`);
                console.log(`Clima: ${`${clima.desc}`.cyan}`);
                console.log(`Temperatura: ${`${clima.temp}`.cyan}`);
                console.log(`Minima: ${`${clima.min}`.cyan}`);
                console.log(`Maxima: ${`${clima.max}`.cyan}`);
                break;
                
            case 2:
                // mostrar ciudades
                break;
                
            case 0:
                break;
        }

        await pausa();
    }
}

main();