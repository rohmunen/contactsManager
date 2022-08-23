import { useEffect, useState } from 'react';
import styles from './styles.module.scss'
import { Button, Pagination, TextInput } from '@mantine/core';
import { contactsStore } from '../../stores/contactsStore';
import { observer } from 'mobx-react-lite';
import ContactCard from './Contact';
import ContactModal from './ContactModal';
import { List } from '../../components/List';

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
      <ContactModal titleText='Измените контакт!' buttonText='Сохранить' opened={ contactsStore.selectedContact != undefined } setOpened={ () => contactsStore.setSelectedContact(undefined) } />
      <ContactModal titleText='Создайте контакт!' buttonText='Создать' opened={ opened } setOpened={ setOpened } />
      <TextInput
        label="Найти контакт"
        placeholder="Имя"
        onChange={ (e) => { contactsStore.setPage(1); contactsStore.setFilter(e.target.value) } }
      />
      <section className={ styles.contacts__cards }>
        <List
          data={ contactsStore.pagedContacts }
          renderEmpty={ <p> У вас нет контактов, попробуйте их создать!</p> }
          renderItem={ ContactCard }
        />
      </section>
      <Pagination className={ styles.contacts__pagination } page={ contactsStore.page } onChange={ (e) => contactsStore.setPage(e) } total={ Math.floor(contactsStore.filterContacts.length / 9) + 1 } />
    </main >
  )
})

export default Contacts;
