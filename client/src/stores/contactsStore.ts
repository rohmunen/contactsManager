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

  addContact = (contact: Contact) => {
    this.contacts.push(contact)
  }

  getContacts = async () => {
    const resp = await ContactsAPI.getContacts()
    if (resp.data) {
      this.setContacts(resp.data?.contacts)
    }
  }

  create = async (data: Contact) => {
    const resp = await ContactsAPI.create(data)
    if (resp.data) {
      this.addContact(data)
    }
  }
}

export const contactsStore = new ContactsStore();
