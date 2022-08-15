import { useEffect, useState } from 'react';
import styles from './styles.module.scss'
import { Button, Pagination, TextInput } from '@mantine/core';
import { contactsStore } from '../../stores/contactsStore';
import { observer } from 'mobx-react-lite';
import ContactCard from './Contact';
import ContactModal from './ContactModal';

const Contacts = observer(() => {
  useEffect(() => {
    contactsStore.getContacts()
  }, [])
  const [ opened, setOpened ] = useState(false);
  return (
    <main className={ styles.contacts }>
      <Button onClick={ () => { setOpened(true) } } className={ styles.contacts__button } radius="xs" size="md">
        Добавить контакт
      </Button>
      <ContactModal opened={ opened } setOpened={ setOpened } />
      <TextInput
        label="Найти контакт"
        placeholder="Имя"
        onChange={ (e) => { contactsStore.setPage(1); contactsStore.setFilter(e.target.value) } }
      />
      <section className={ styles.contacts__cards }>
        {
          contactsStore.pagedContacts.map((contact) =>
            <ContactCard key={ contact.id } contact={ contact } />
          )
        }
      </section>
      <Pagination className={ styles.contacts__pagination } page={ contactsStore.page } onChange={ (e) => contactsStore.setPage(e) } total={ Math.floor(contactsStore.filterContacts.length / 9) + 1 } />
    </main >
  )
})

export default Contacts;
