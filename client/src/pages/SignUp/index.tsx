import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import styles from './styles.module.scss'

const SignUp = () => {
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
        <form onSubmit={ form.onSubmit((values) => console.log(values)) }>
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
}

export default SignUp;
