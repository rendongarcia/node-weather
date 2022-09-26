const inquirer = require('inquirer');
const colors = require('colors');
const clrTheme = require('../config/colorsConfig');

colors.setTheme(clrTheme());

const menuQuestions = [
    {
        type: 'list',
        name: 'option',
        message: 'Select an option',
        choices: [
            {
                value: 1,
                name: `${'1'.opts}. ${'Search'}`
            },
            {
                value: 2,
                name: `${'2'.opts}. History`
            },
            {
                value: 0,
                name: `${'0'.opts}. Exit`
            }
        ]
    }
];

const inquirerMenu = async () => {
    console.clear();
    console.log('--------------------------------------'.titles);
    console.log('---          Weather app           ---'.titles);
    console.log('--------------------------------------'.titles);

    const { option } = await inquirer.prompt(menuQuestions);

    return option;

}

const pause = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Press ${'ENTER'.highlight} to continue\n`
        }
    ]

    const result = await inquirer.prompt(question);
    return result;
}

const readInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'description',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Please enter a valid input';
                }
                return true;
            }
        }
    ]

    const { description } = await inquirer.prompt(question);
    return description;
}


const listArrayIdName = async (elems = [], message = 'Select an option') => {
    const choices = elems.map((elem, index) => {
        return {
            value: elem.id,
            name: `${String(index + 1).listElemNumber}. ${elem.name.listElemText}`
        }
    });

    choices.unshift({
        value: 0,
        name: `${'0'.listElemNumber}. ${'Go back'.listElemText}`
    })

    const arrList = [
        {
            type: 'list',
            name: 'id',
            message,
            choices
        }
    ]

    const { id } = await inquirer.prompt(arrList);
    return id;
}

const confirmMessage = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
}

module.exports = {
    inquirerMenu, pause, readInput, listArrayIdName, confirmMessage
}