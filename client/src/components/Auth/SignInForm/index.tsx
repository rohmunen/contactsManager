import { TextInput, Button, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import styles from '../styles.module.scss'
import { authStore } from '../../../stores/authStore';
import { PrimaryButton } from '../../Buttons/PrimaryButton';

const SignInForm = () => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });
  return (
    <form onSubmit={ form.onSubmit((values) => authStore.signIn(values)) }>
      <TextInput
        label="Email"
        placeholder="your@email.com"
        { ...form.getInputProps('email') }
      />
      <TextInput
        label="Password"
        type="password"
        placeholder="password"
        { ...form.getInputProps('password') }
      />
      <Group position="center" mt="md">
        <PrimaryButton className={ styles.signUp__submit } type="submit" text="Войти" />
      </Group>
    </form>
  )
}

export default SignInForm;
