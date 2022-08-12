import { Contact } from '../database/models/contact-model'
import { ApiError } from '../utils/api-errors'

class ContactsService {
  async create (contact: Contact) {
      const contactData = Contact.create(contact) 
      return contactData
  }

  async getByUserId(id: string) {
    const data = Contact.getByUserId(id)
    return data
  }

  async update(id: string, userId: string, contact: Contact) {
    const contactData = await Contact.getById(id)
    if (contactData.creator != userId) {
      throw ApiError.UnauthorizedError()
    }
    const data = Contact.update(id, contact)
    return data
  }

  async delete(id: string, userId: string) {
    const contactData = await Contact.getById(id)
    if (contactData.creator != userId) {
      throw ApiError.UnauthorizedError()
    }
    const data = Contact.delete(id)
    return data
  }
}

export default new ContactsService()