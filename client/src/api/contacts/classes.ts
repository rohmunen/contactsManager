export interface ResContact {
  id: number;
  name: string;
  phone: string;
}

export interface ReqContact {
  name: string;
  phone: string;
}

export interface ResGetContacts {
  contacts: ResContact[]
}

export interface ResDeleteContact {
  id: number;
}