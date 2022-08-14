import { AuthAPI } from '../api/auth/routes';
import { AxiosRequestConfig } from 'axios';
import { makeAutoObservable } from 'mobx';
import { API } from '../network/client';
import { Contact } from '../api/contacts/classes';
import { ContactsAPI } from '../api/contacts/routes';

class ContactsStore {
  contacts: Contact[] = [];
  filter: string = '';
  page: number = 1;

  constructor() {
    makeAutoObservable(this);
  }

  setContacts = (contacts: Contact[]) => {
    this.contacts = contacts
  }

  get filterContacts() {
    let filteredContacts = this.contacts.filter(contact => contact.name.includes(this.filter))
    return filteredContacts
  };

  get pagedContacts() {
    let start = (this.page - 1) * 9
    let finish = this.page * 9
    return this.filterContacts.slice(start, finish)
  }

  setFilter = (value: string) => {
    this.filter = value
  }

  setPage = (value: number) => {
    this.page = value
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
