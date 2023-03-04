const fs = require('fs').promises;
const path = require('path');
const { v4 } = require('uuid');

const contactsPath = path.resolve('./db/contacts.json');

const listContacts = async () => {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(data);

    return contacts;
};

const getContactById = async id => {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(data);

    const getItem = contacts.find(item => item.id == id);
    if (!getItem) {
        return null;
    }

    return getItem;
};

const removeContact = async id => {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(data);

    const idx = contacts.findIndex(item => item.id == id);
    if (idx === -1) {
        return null;
    }
    const updatedContacts = contacts.filter((_, index) => index !== idx);
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
    return contacts[idx];
};

const addContact = async (name, email, phone) => {
    const item = { name, email, phone };
    const newContact = { id: v4(), ...item };

    const data = await fs.readFile(contactsPath, 'utf8');

    const contacts = JSON.parse(data);
    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts));

    return newContact;
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};
