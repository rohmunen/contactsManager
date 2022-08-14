import { API } from '../../network/client';
import { ResContact, ReqContact, ResGetContacts, ResDeleteContact } from './classes';

const PATHS = {
  CONTACTS: '/contacts',
}

export const ContactsAPI = {

  getContacts: async () => {
    return API.get<ResGetContacts>({
      url: PATHS.CONTACTS,
    })
  },

  create: async (data: ReqContact) => {
    return API.post<ResContact>({
      url: PATHS.CONTACTS,
      data
    })
  },

  delete: async (id: number) => {
    return API.delete<ResDeleteContact>({
      url: PATHS.CONTACTS + `/${id}`,
    })
  }

}