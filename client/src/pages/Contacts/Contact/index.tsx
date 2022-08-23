import styles from './styles.module.scss'
import { ResContact } from '../../../api/contacts/classes';
import { Card, Text, Group, CloseButton, Button } from '@mantine/core';
import { contactsStore } from '../../../stores/contactsStore';
import { FunctionComponent } from 'react';
import React from 'react';


const ContactCard: FunctionComponent<ResContact> = React.memo((item) => {
  return (
    <Card className={ styles.card } shadow="sm" p="lg" radius="md" withBorder>
      <Button onClick={ () => contactsStore.setSelectedContact(item) } className={ styles.card__edit }>Edit</Button>
      <CloseButton onClick={ () => { contactsStore.delete(item.id) } } className={ styles.card__close } />
      <Group position="apart" mt="md" mb="xs">
        <Text className={ styles.card__name } weight={ 500 }>{ item.name }</Text>
      </Group>
      <Text size="sm" color="dimmed">
        { item.phone }
      </Text>
    </Card>
  )
}, (prev, next) => prev.name === next.name && prev.id === next.id)

export default ContactCard
