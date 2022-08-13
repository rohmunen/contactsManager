import { AuthAPI } from '../api/auth/routes';
import { AxiosRequestConfig } from 'axios';
import { makeAutoObservable } from 'mobx';
import { API } from '../network/client';
import { Contact } from '../api/contacts/classes';
import { ContactsAPI } from '../api/contacts/routes';

class ContactsStore {
  contacts: Contact[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setContacts = (contacts: Contact[]) => {
    this.contacts = contacts
  }

  getContacts = async () => {
    const resp = await ContactsAPI.getContacts()
    if (resp.data) {
      this.setContacts(resp.data?.contacts)
    }
  }
}

export const contactsStore = new ContactsStore();
