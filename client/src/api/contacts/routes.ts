import { API } from '../../network/client';
import { ResContacts } from './classes';

const PATHS = {
  CONTACTS: '/contacts',
}

export const ContactsAPI = {
  getContacts: async () => {
    return API.get<ResContacts>({
      url: PATHS.CONTACTS,
    })
  }
}