import { OkPacket } from 'mysql';
import { execute } from '../services/mysql.connector';
import { Contact } from './contacts.model';
import { contactsQueries } from './contacts.queries';

export const readcontacts = async () => {
  return execute<Contact[]>(contactsQueries.readcontacts, []);
};

export const createcontact = async (contact: Contact) => {
  if (!contact) {
    console.error('contact is undefined');
    throw new Error('contact is undefined');
  }
  return execute<OkPacket>(contactsQueries.createcontact, [contact.Name, contact.Age, contact.Birthdate]);
};

export const updatecontact = async (contact: Contact) => {
  let date = new Date(contact.Birthdate);
  let formattedDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  return execute<OkPacket>(contactsQueries.updatecontact, [contact.Name, contact.Age, formattedDate, contact.id]);
};


export const deletecontact = async (contactId: number) => {
  return execute<OkPacket>(contactsQueries.deletecontact, [contactId]);
};
