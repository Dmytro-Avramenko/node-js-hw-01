const fs = require("fs/promises");
const path = require("path");
const {nanoid} = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json")

// function listContacts
async function getAll () {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

// function getContactById(contactId)
async function getById(id) {
  const contacts = await getAll();
  const result = contacts.find(item => item.id === id);
  return result || null;
}

// function removeContact(contactId)
async function deleteById(id) {
  const contacts = await getAll();
  const index = contacts.findIndex(item => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 3));
  return result
} 

// function addContact(name, email, phone)
async function add(data) {
  const contact = await getAll(); 
  const newContact = {
    id: nanoid(),
    ...data,
  }
  contact.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 3));
  return newContact; 
} 

module.exports = {
  getAll,
  getById,
  add,
  deleteById
}