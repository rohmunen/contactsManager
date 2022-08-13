import React, { useEffect } from 'react';
import logo from './logo.svg';
import styles from './styles.module.scss'
import { Button } from '@mantine/core';
import { useNavigate } from "react-router-dom";
import { ContactsAPI } from '../../api/contacts/routes';
import { contactsStore } from '../../stores/contactsStore';
import { observer } from 'mobx-react-lite';
import Contact from './Contact';

const Contacts = observer(() => {
  useEffect(() => {
    contactsStore.getContacts()
  }, [])
  let navigate = useNavigate();
  return (
    <main className={ styles.content }>
      {
        contactsStore.contacts.map((contact) =>
          <Contact contact={ contact } />
        )
      }
    </main>
  )
})

export default Contacts;
