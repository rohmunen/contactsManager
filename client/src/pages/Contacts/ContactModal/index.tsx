import styles from './styles.module.scss'
import { Button, Group, Input, Modal, TextInput } from '@mantine/core';
import { contactsStore } from '../../../stores/contactsStore';
import { observer } from 'mobx-react-lite';
import { useForm } from '@mantine/form';
import NumberFormat from 'react-number-format';
import { ResContact } from '../../../api/contacts/classes';
import { PrimaryButton } from '../../../components/Buttons/PrimaryButton';
import { useEffect } from 'react';

type Props = {
  titleText: string,
  buttonText: string,
  opened: boolean,
  setOpened: React.Dispatch<React.SetStateAction<boolean>>,
}

const ContactModal = observer((props: Props) => {
  const { titleText, buttonText, opened, setOpened } = props
  useEffect(() => {
    form.setValues(contactsStore.selectedContact || { name: '', phone: '' })
  }, [ contactsStore.selectedContact ])
  const form = useForm({
    initialValues: {
      name: '',
      phone: ''
    },

    validate: {
      name: (value) => (value.length > 0 ? null : 'Слишком короткое имя'),
      phone: (value) => (value.length === 18 && value.indexOf(' ') === -1 ? null : 'Заполните телефон'),
    },
  });
  return (
    <Modal
      title={ titleText }
      opened={ opened }
      onClose={ () => { setOpened(false); form.reset() } }
      transition={ 'fade' }
      transitionDuration={ 300 }
    >
      <form
        onSubmit=
        {
          contactsStore.selectedContact ?
            form.onSubmit((values) => { contactsStore.update({ ...values, id: contactsStore.selectedContact!.id }) }) // если контакт выбран и мы обновляем его
            :
            form.onSubmit((values) => { contactsStore.create(values); form.reset() }) } // если контакт не выбран и мы создаем новый
      >
        <TextInput
          label="Имя"
          placeholder="John K."
          { ...form.getInputProps('name') }
        />
        <Input.Wrapper label="Номер телефона">
          <NumberFormat { ...form.getInputProps('phone') } placeholder='+7-(777)-777-77-77' customInput={ TextInput } format="+7-(###)-###-##-##" />
        </Input.Wrapper>
        <Group position="center" mt="md">
          <PrimaryButton text={ buttonText } type="submit" />
        </Group>
      </form>
    </Modal>
  )
})

export default ContactModal;