import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authStore } from '../../stores/authStore';
import styles from './styles.module.scss'

const SignIn = observer(() => {
  let navigate = useNavigate();
  useEffect(() => {
    if (authStore.init) {
      navigate('/contacts')
    }
  }, [authStore.init])
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
    <div className={ styles.signIn }>
      <Box className={ styles.signIn__form } >
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
            <Button className={ styles.signIn__submit } type="submit">Submit</Button>
          </Group>
        </form>
      </Box>
    </div>
  )
})

export default SignIn;
