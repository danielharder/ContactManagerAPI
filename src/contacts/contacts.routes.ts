import { Router } from 'express';
import * as ContactsController from './contacts.controller';

const router = Router();
router.route('/contacts').get(ContactsController.readContacts);
router.route('/contacts').post(ContactsController.createContact);
router.route('/contacts').put(ContactsController.updateContact);
router.route('/contacts/:contactId').delete(ContactsController.deleteContact);

export default router;
