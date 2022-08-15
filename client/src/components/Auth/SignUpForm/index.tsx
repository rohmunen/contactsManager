import { TextInput, Button, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import styles from '../styles.module.scss'
import { authStore } from '../../../stores/authStore';
import { PrimaryButton } from '../../Buttons/PrimaryButton';

const SignUpForm = () => {
  const form = useForm({
    initialValues: {
      email: '',
      nickname: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length > 4 ? null : 'Слишком короткий пароль'),
      nickname: (value) => (value.length > 4 ? null : 'Короткий никнейм'),
    },
  });
  return (
    <form onSubmit={ form.onSubmit((values) => authStore.signUp(values)) }>
      <TextInput
        label="Email"
        placeholder="your@email.com"
        { ...form.getInputProps('email') }
      />
      <TextInput
        label="Username"
        placeholder="your nickname"
        { ...form.getInputProps('nickname') }
      />
      <TextInput
        label="Password"
        type="password"
        placeholder="password"
        { ...form.getInputProps('password') }
      />
      <Group position="center" mt="md">
        <PrimaryButton text="Зарегистрироваться" type="submit" />
      </Group>
    </form>
  )
}

export default SignUpForm;
