import styles from './styles.module.scss'
import { Button, Group, Input, Modal, TextInput } from '@mantine/core';
import { contactsStore } from '../../../stores/contactsStore';
import { observer } from 'mobx-react-lite';
import { useForm } from '@mantine/form';
import NumberFormat from 'react-number-format';
import { ResContact } from '../../../api/contacts/classes';
import { PrimaryButton } from '../../../components/Buttons/PrimaryButton';

type Props = {
  opened: boolean,
  setOpened: React.Dispatch<React.SetStateAction<boolean>>,
  contact?: ResContact
}

const ContactModal = observer((props: Props) => {
  const { contact, opened, setOpened } = props
  const form = useForm({
    initialValues: {
      name: contact?.name || '',
      phone: contact?.phone || ''
    },

    validate: {
      name: (value) => (value.length > 0 ? null : 'Слишком короткое имя'),
      phone: (value) => (value.length === 18 && value.indexOf(' ') === -1 ? null : 'Заполните телефон'),
    },
  });
  return (
    <Modal title={ contact ? "Изменить контакт" : "Создайте контакт!" } opened={ opened } onClose={ () => { setOpened(false); form.setValues({ name: contact?.name || '', phone: contact?.phone || '' }) } }>
      <form onSubmit={ contact ? form.onSubmit((values) => { console.log({ ...contact, ...values }); contactsStore.update({ ...contact, ...values }) }) : form.onSubmit((values) => { contactsStore.create(values) }) }>
        <TextInput
          label="Имя"
          placeholder="John K."
          { ...form.getInputProps('name') }
        />
        <Input.Wrapper label="Номер телефона" onChange={ (e) => { console.log(form.values.phone) } }>
          <NumberFormat { ...form.getInputProps('phone') } placeholder='+7-(777)-777-77-77' customInput={ TextInput } format="+7-(###)-###-##-##" />
        </Input.Wrapper>
        <Group position="center" mt="md">
          <PrimaryButton text={ contact ? 'Сохранить' : 'Создать' } type="submit" />
        </Group>
      </form>
    </Modal>
  )
})

export default ContactModal;