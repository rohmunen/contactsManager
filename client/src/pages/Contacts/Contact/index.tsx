import styles from './styles.module.scss'
import { ResContact } from '../../../api/contacts/classes';
import { Card, Text, Group, CloseButton, Button } from '@mantine/core';
import { contactsStore } from '../../../stores/contactsStore';
import { memo } from 'react';

type Props = {
  contact: ResContact
}
//TODO: move modal out of this component to clear html
const ContactCard = memo((props: Props) => {
  const { contact } = props
  return (
    <Card className={ styles.card } shadow="sm" p="lg" radius="md" withBorder>
      <Button onClick={() => contactsStore.setSelectedContact(contact) } className={ styles.card__edit }>Edit</Button>
      <CloseButton onClick={ () => { contactsStore.delete(contact.id) } } className={ styles.card__close } />
      <Group position="apart" mt="md" mb="xs">
        <Text className={styles.card__name} weight={ 500 }>{ contact.name }</Text>
      </Group>
      <Text size="sm" color="dimmed">
        { contact.phone }
      </Text>
    </Card>
  )
})

export default ContactCard;
