export interface Contact {
  id: string;
  creator: string;
  name: string;
  phone: string;
}

export interface ResContacts {
  contacts: Contact[]
}
