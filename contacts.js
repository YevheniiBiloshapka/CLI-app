const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const updateContacts = async (data) =>
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));

// function to get contact list
const allListContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

//function to get contact by id
const getContactById = async (contactId) => {
  const contacts = await allListContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
};

//function to delete contact
const removeContact = async (contactId) => {
  const contacts = await allListContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
};

//function to add new contact
const addContact = async (name, email, phone) => {
  const contacts = await allListContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

//function to edit contact by id
const updateById = async (id, data) => {
  const contacts = await allListContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) return null;
  contacts[index] = { id, ...data };
  await updateContacts(contacts);
  return contacts[index];
};

module.exports = {
  allListContacts,
  getContactById,
  removeContact,
  addContact,
  updateById,
};
