import { API } from '../../network/client';
import { Contact, ResGetContacts } from './classes';

const PATHS = {
  CONTACTS: '/contacts',
}

export const ContactsAPI = {

  getContacts: async () => {
    return API.get<ResGetContacts>({
      url: PATHS.CONTACTS,
    })
  },

  create: async (data: Contact) => {
    return API.post<Contact>({
      url: PATHS.CONTACTS,
      data
    })
  }

}