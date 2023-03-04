const { Command } = require('commander');
const operation = require('./contacts');

const program = new Command();
program
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'user id')
    .option('-n, --name <type>', 'user name')
    .option('-e, --email <type>', 'user email')
    .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case 'list':
            const listItems = await operation.listContacts();
            console.log(listItems);
            break;

        case 'get':
            const getItem = await operation.getContactById(id);
            console.log(getItem);
            break;

        case 'add':
            const addItem = await operation.addContact(name, email, phone);
            console.log(addItem);
            break;

        case 'remove':
            const removeItem = await operation.removeContact(id);
            console.log(removeItem);
            break;

        default:
            console.warn('\x1B[31m Unknown action type!');
    }
};

invokeAction(argv);
