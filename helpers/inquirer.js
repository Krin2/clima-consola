// Documentacion oficial de inquirer: https://www.npmjs.com/package/inquirer#installation

const inquirer = require('inquirer');
require('colors');


const menuOptions = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1.'.yellow} Buscar ciudad`
            },
            {
                value: 2,
                name: `${'2.'.yellow} Historial`
            },
            {
                value: 0,
                name: `${'0.'.yellow} Salir\n`
            },
        ]
    }
]

const inquirerMenu = async () => {
    console.clear();
    console.log('╔═══════════════════════════╗'.yellow);
    console.log('║   '.yellow +'Seleccione una opción'.magenta+ '   ║'.yellow);
    console.log('╚═══════════════════════════╝\n'.yellow);

    const { opcion } = await inquirer.prompt(menuOptions);
    console.log({ opcion });
    return opcion;
}

const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if ( value.length === 0 ) {
                    return 'Por favor ingrese un valor'.red;
                }
                return true;
            }
        }
    ]

    const { desc } = await inquirer.prompt(question);
    return desc;
}

const listarLugares = async (lugares = []) => {

    const choices = lugares.map( ( lugar, i ) => {
        idx = `${ i + 1 }.`.blue;

        return {
            value: lugar.id,
            name: `${ idx } ${ lugar.nombre }`
        };
    })

    choices.unshift({
        value: '0',
        name: `${ '0.'.yellow} Cancelar`
    });
    
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar',
            choices
        }
    ];
        
    const { id } = await inquirer.prompt(preguntas);

    return id;
}

const confirmar = async (message) => {
    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(pregunta);
    return ok;
}

const mostrarListadoChecklist = async (tareas = []) => {

    const choices = tareas.map( ( tarea, i ) => {
        idx = `${ i + 1 }.`.blue;

        return {
            value: tarea.id,
            name: `${ idx } ${ tarea.desc }`,
            checked: ( tarea.completadoEn ) ? true : false,
        };
    })
    
    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ];
        
    const { ids } = await inquirer.prompt(preguntas);

    return ids;
}

const pausa = async () => {
    const menuPausa = [
        {
            type: 'input',
            name: 'pausa',
            message: `\nPresione ${ 'ENTER'.red } para continuar`.magenta,
        }
    ]
    await inquirer.prompt(menuPausa);
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listarLugares,
    confirmar,
    mostrarListadoChecklist
}