import { makeAutoObservable } from 'mobx';
import { ReqContact, ResContact } from '../api/contacts/classes';
import { ContactsAPI } from '../api/contacts/routes';
import { showError } from '../utils/notifications';

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
    } else {
      showError(resp.message!)
    }
  }

  removeContact = (id: number) => {
    this.contacts = this.contacts.filter(contact => contact.id !== id)
  }

  updateContact = (contact: ResContact) => {
    let index = this.contacts.findIndex(item => item.id === contact.id)
    this.contacts[ index ] = contact
  }

  update = async (contact: ResContact) => {
    const resp = await ContactsAPI.update(contact)
    if (resp.data) {
      this.updateContact(resp.data)
    } else {
      showError(resp.message!)
    }
  }

  delete = async (id: number) => {
    const resp = await ContactsAPI.delete(id)
    if (resp.data) {
      this.removeContact(id)
    } else {
      showError('Что-то пошло не так при удалении контакта')
    }
  }
}

export const contactsStore = new ContactsStore();
