# Inquirer
[Documentacion oficial](https://github.com/SBoudrias/Inquirer.js/blob/master/packages/inquirer/README.md)

Permite interactuar por consola de forma simple.

## Instalacion
```
npm install inquirer
```

## Configuracion
Si bien no es necesario, se recomienda crear un archivo aparte con todo lo relacionado a la interaccion con el usuario mediante inquirer.

### Creacion de un menu de opciones
- importar libreria
```js
const inquirer = require('inquirer');
```
- crear lista de opciones
```js
const menuOptions = [
  {
    type: 'list',
    name: 'opcion',
    message: '¿Que desea hacer?',
    choices: [
      ...
    ]
  }
]
```
- desplegar menu interactivo

```js
const { opcion } = await inquirer.prompt(menuOptions);
```

## Lista de opciones
Muestra un listado de opciones las cuales pueden ser recorridas con las flechas del teclado.

El tipo debe ser `list`.
```js
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
];
const { opcion } = await inquirer.prompt(menuOptions);
```
La lista de opciones en un array que contiene un objeto de configuracion que posee los siguientes datos:
- **type**: es el tipo de menu a desplegar
- **name**: es el nombre que se le va a dar a la respuesta de este menu
- **message**: Es el mensaje que se va a desplegar para seleccionar las opciones
- **choices**: Es el array de opciones que se va a desplegar 
    - **value**: es el valor asignado a esta opcion, puede ser numerico o un string
    - **name**: es el mensaje que aparecera asociado a esta opcion 

## Entrada de texto
Permite realizar una consulta cuya respuesta es una entrada de texto por teclado.

El tipo debe ser `input`.
```js
const question = [
  {
    type: 'input',
    name: 'desc',
    message: 'Ciudad: ',
    validate( value ) {
      if ( value.length === 0 ) {
          return 'Por favor ingrese un valor'.red;
      }
      return true;
    }
  }
]
const { desc } = await inquirer.prompt(question);
```
- **validate( value )**: es una funcion que recive la entrada de texto como entrada y permite realizar validaciones sobre la misma

## Cuadro de confirmacion
Permite realizar una pregunta del tipo si-no

El tipo debe ser `confirm`.
```js
const pregunta = [
  {
    type: 'confirm',
    name: 'ok',
    message: 'Desea salir?'
  }
];
const { ok } = await inquirer.prompt(pregunta);
```

## Checklist
Permite crear un cuadro de dialogo en el cual es posible marcar varias opciones.

El tipo debe ser `checkbox`

```js
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
```
- **choices**: array de opciones para seleccionar
    - **value**: valor correspondiente a esta opcion
    - **name**: mensaje relativo a esta opcion
    - **checked**: si esta en true aparece como seleccionado, si esta en false aparece como no seleccionado.

## Pausa
Esta es una opcion para que el cuadro de dialogo espere a que se presione un enter para continuar.

Usa el tipo `input`
```js
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
```

