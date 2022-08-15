import { useEffect, useState } from 'react';
import styles from './styles.module.scss'
import { Button, Group, Input, Modal, Pagination, TextInput } from '@mantine/core';
import { useNavigate } from "react-router-dom";
import { contactsStore } from '../../stores/contactsStore';
import { observer } from 'mobx-react-lite';
import ContactCard from './Contact';
import { useForm } from '@mantine/form';
import NumberFormat from 'react-number-format';
import ContactModal from './ContactModal';

const Contacts = observer(() => {
  useEffect(() => {
    contactsStore.getContacts()
  }, [])
  let navigate = useNavigate();
  const [ opened, setOpened ] = useState(false);
  const form = useForm({
    initialValues: {
      name: '',
      phone: ''
    },

    validate: {
    },
  });
  return (
    <main className={ styles.contacts }>
      <Button onClick={ () => { setOpened(true) } } className={ styles.contacts__button } radius="xs" size="md">
        Add contact
      </Button>
      <ContactModal opened={opened} setOpened={setOpened} />
      <TextInput
        label="Search for a contact"
        placeholder="contact name"
        onChange={ (e) => { contactsStore.setPage(1); contactsStore.setFilter(e.target.value) } }
      />
      <section className={ styles.contacts__cards }>
        {
          contactsStore.pagedContacts.map((contact) =>
            <ContactCard key={contact.id} contact={ contact } />
          )
        }
      </section>
      <Pagination page={ contactsStore.page } onChange={ (e) => contactsStore.setPage(e) } total={ Math.floor(contactsStore.filterContacts.length / 9) + 1 } />
    </main >
  )
})

export default Contacts;
