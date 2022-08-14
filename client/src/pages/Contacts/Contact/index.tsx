import styles from './styles.module.scss'
import { ResContact } from '../../../api/contacts/classes';
import { Card, Text, Group, CloseButton, Button } from '@mantine/core';
import { contactsStore } from '../../../stores/contactsStore';

type Props = {
  contact: ResContact
}

const ContactCard = (props: Props) => {
  const { contact } = props
  return (
    <Card className={ styles.card } shadow="sm" p="lg" radius="md" withBorder>
      <Button className={ styles.card__edit }>Edit</Button>
      <CloseButton onClick={() => {contactsStore.delete(contact.id)}} className={ styles.card__close } />
      <Group position="apart" mt="md" mb="xs">
        <Text weight={ 500 }>{ contact.name }</Text>
      </Group>
      <Text size="sm" color="dimmed">
        { contact.phone }
      </Text>
    </Card>
  )
}

export default ContactCard;
