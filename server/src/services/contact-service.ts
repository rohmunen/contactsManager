import { Contact } from '../database/models/contact-model'

class ContactsService {
  async create (contact: Contact) {
      const contactData = Contact.create(contact) 
      return contactData
  }

  async get(id: string) {
    const data = Contact.get(id)
    return data
  }
}

export default new ContactsService()