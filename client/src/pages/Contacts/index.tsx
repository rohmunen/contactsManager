import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import styles from './styles.module.scss'
import { Button, Group, Input, Modal, Pagination, TextInput } from '@mantine/core';
import { useNavigate } from "react-router-dom";
import { contactsStore } from '../../stores/contactsStore';
import { observer } from 'mobx-react-lite';
import ContactCard from './Contact';
import { useForm } from '@mantine/form';
import NumberFormat from 'react-number-format';
import { useId } from '@mantine/hooks';

const Contacts = observer(() => {
  const [ activePage, setPage ] = useState(1);
  const id = useId();
  const inputRef = React.createRef();
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
      <TextInput
        label="Search for a contact"
        placeholder="contact name"
        onChange={ (e) => { contactsStore.setPage(1); contactsStore.setFilter(e.target.value) } }
      />
      <Modal title="Создайте контакт!" opened={ opened } onClose={ () => setOpened(false) }>
        <form onSubmit={ form.onSubmit((values) => { contactsStore.create(values) }) }>
          <TextInput
            label="Email"
            placeholder="your@email.com"
            { ...form.getInputProps('name') }
          />
          <Input.Wrapper label="Номер телефона">
            <NumberFormat { ...form.getInputProps('phone') } placeholder='+7 (777)-777-77-77' customInput={ TextInput } format="+7 (###)-###-##-##" />
          </Input.Wrapper>
          <Group position="center" mt="md">
            <Button className={ styles.signUp__submit } type="submit">Создать</Button>
          </Group>
        </form>
      </Modal>
      <section className={ styles.contacts__cards }>
        {
          contactsStore.pagedContacts.map((contact) =>
            <ContactCard contact={ contact } />
          )
        }
      </section>
      <Pagination page={ contactsStore.page } onChange={ (e) => contactsStore.setPage(e) } total={ Math.floor(contactsStore.filterContacts.length / 9) + 1 } />
    </main >
  )
})

export default Contacts;
