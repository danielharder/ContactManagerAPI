import { Request, RequestHandler, Response } from 'express';
import { Contact } from './contacts.model';
import * as contactDao from './contacts.dao';
import { OkPacket } from 'mysql';

export const readContacts: RequestHandler = async (req: Request, res: Response) => {
  try {
    let contacts;
    let contactId = parseInt(req.query.contactId as string);

    console.log('contactId', contactId);
    if (Number.isNaN(contactId)) {
      contacts = await contactDao.readcontacts();
    } 
    // else {
    //    contacts = await contactDao.readcontactsBycontactId(contactId);
    //  }

    res.status(200).json(contacts);
  } catch (error) {
    console.error('[contacts.controller][readcontacts][Error] ', error);
    res.status(500).json({ message: 'There was an error when fetching contacts' });
  }
};

  export const createContact: RequestHandler = async (req: Request, res: Response) => {
    try {
      // Parse and format the date from the request body
      let date = new Date(req.body.Birthdate);
      let formattedDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

      // Replace the original Birthdate with the formatted one
      req.body.Birthdate = formattedDate;

      const okPacket: OkPacket = await contactDao.createcontact(req.body);
      console.log('req.body', req.body);
      console.log('contact', okPacket);
    
      res.status(200).json(okPacket);
    } catch (error) {
      console.error('[contacts.controller][createContact][Error]', error);
      res.status(500).json({ message: 'There was an error when writing contacts' });
    }
};

  export const updateContact: RequestHandler = async (req: Request, res: Response) => {
    try {
      const okPacket: OkPacket = await contactDao.updatecontact(req.body);
      console.log('req.body', req.body);
      console.log('contact', okPacket);  
      res.status(200).json(okPacket);
    } catch (error) {
      console.error('[contacts.controller][updatecontact][Error]', error);
      res.status(500).json({ message: 'There was an error when updating contacts' });
    }
  };
  
  export const deleteContact: RequestHandler = async (req: Request, res: Response) => {
    try {
      let contactId = parseInt(req.params.contactId as string);
      console.log('contactId', contactId);
      if (!Number.isNaN(contactId)) {
        const response = await contactDao.deletecontact(contactId);
        res.status(200).json(response);
      } else {
        throw new Error('Integer expected for contactId');
      }
    } catch (error) {
      console.error('[contacts.controller][deletecontact][Error]', error);
      res.status(500).json({ message: 'There was an error when deleting contacts' });
    }
  };
    