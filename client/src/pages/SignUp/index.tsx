import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authStore } from '../../stores/authStore';
import styles from './styles.module.scss'

const SignUp = observer(() => {
  let navigate = useNavigate();
  useEffect(() => {
    if (authStore.init) {
      navigate('/contacts')
    }
  }, [authStore.init])
  const form = useForm({
    initialValues: {
      email: '',
      nickname: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });
  return (
    <div className={ styles.signUp }>
      <Box className={ styles.signUp__form } >
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
            <Button className={ styles.signUp__submit } type="submit">Submit</Button>
          </Group>
        </form>
      </Box>
    </div>
  )
})

export default SignUp;
