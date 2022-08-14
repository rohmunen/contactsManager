import { makeAutoObservable } from 'mobx';
import { ReqContact, ResContact } from '../api/contacts/classes';
import { ContactsAPI } from '../api/contacts/routes';

class ContactsStore {
  contacts: ResContact[] = [];
  filter: string = '';
  page: number = 1;

  constructor() {
    makeAutoObservable(this);
  }

  setContacts = (contacts: ResContact[]) => {
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

  addContact = (contact: ResContact) => {
    this.contacts.push(contact)
  }

  getContacts = async () => {
    const resp = await ContactsAPI.getContacts()
    if (resp.data) {
      this.setContacts(resp.data?.contacts)
    }
  }

  create = async (data: ReqContact) => {
    const resp = await ContactsAPI.create(data)
    if (resp.data) {
      this.addContact(resp.data)
    }
  }

  removeContact = (id: number) => {
    console.log(this.contacts)
    console.log(this.contacts.filter(contact => contact.id !== id))
    this.contacts = this.contacts.filter(contact => contact.id !== id)
  }

  delete = async (id: number) => {
    const resp = await ContactsAPI.delete(id)
    if (resp.data) {
      this.removeContact(id)
    }
  }
}

export const contactsStore = new ContactsStore();
