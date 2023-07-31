export const contactsQueries = {
    readcontacts: 'SELECT id as contactId, Name as Name, Age as Age, Birthdate as Birthdate FROM SimpleContactsDB.contacts',
  
    createcontact: 'INSERT INTO contacts(Name, Age, Birthdate) VALUES(?, ?, ?)',
  
    updatecontact: 'UPDATE SimpleContactsDB.contacts SET Name = ?, Age = ?, Birthdate = ? WHERE id = ?',
  
    deletecontact: 'DELETE FROM SimpleContactsDB.contacts WHERE id = ?'
  };
  