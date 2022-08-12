import { Contact } from '../database/models/contact-model'

class ContactsService {
  async create (contact: Contact) {
      const contactData = Contact.create(contact) 
      return contactData
  }
}

export default new ContactsService()