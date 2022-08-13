import styles from './styles.module.scss'
import { useNavigate } from "react-router-dom";
import { Contact } from '../../../api/contacts/classes';
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';

type Props = {
  contact: Contact
}

const ContactCard = (props: Props) => {
  const { contact } = props
  let navigate = useNavigate();
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
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
