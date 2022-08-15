import styles from './styles.module.scss'
import { ResContact } from '../../../api/contacts/classes';
import { Card, Text, Group, CloseButton, Button } from '@mantine/core';
import { contactsStore } from '../../../stores/contactsStore';
import { useState } from 'react';
import ContactModal from '../ContactModal';

type Props = {
  contact: ResContact
}

const ContactCard = (props: Props) => {
  const { contact } = props
  const [ opened, setOpened ] = useState(false);
  return (
    <Card className={ styles.card } shadow="sm" p="lg" radius="md" withBorder>
      <Button onClick={() => setOpened(true)} className={ styles.card__edit }>Edit</Button>
      <ContactModal contact={ contact } opened={ opened } setOpened={ setOpened } />
      <CloseButton onClick={ () => { contactsStore.delete(contact.id) } } className={ styles.card__close } />
      <Group position="apart" mt="md" mb="xs">
        <Text className={styles.card__name} weight={ 500 }>{ contact.name }</Text>
      </Group>
      <Text size="sm" color="dimmed">
        { contact.phone }
      </Text>
    </Card>
  )
}

export default ContactCard;
