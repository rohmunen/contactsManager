import { Box, SegmentedControl } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authStore } from '../../stores/authStore';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import styles from './styles.module.scss'

const Auth = observer(() => {
  const [ value, setValue ] = useState('signup');
  let navigate = useNavigate();
  useEffect(() => {
    if (authStore.init) {
      navigate('/contacts')
    }
  }, [ authStore.init ])
  return (
    <div className={ styles.signUp }>
      <Box className={ styles.signUp__form } >
        <SegmentedControl
          value={ value }
          onChange={ setValue }
          className={ styles.auth__option }
          data={ [
            { label: 'Регистрация', value: 'signup' },
            { label: 'Авторизация', value: 'signin' },
          ] }
        />
        { value === 'signup' ? <SignUpForm /> : <SignInForm /> }
      </Box>
    </div>
  )
})

export default Auth;
