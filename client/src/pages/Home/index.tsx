import { useEffect } from 'react';
import styles from './styles.module.scss'
import { Button } from '@mantine/core';
import { useNavigate } from "react-router-dom";
import { authStore } from '../../stores/authStore';

const HomePage = () => {
  let navigate = useNavigate();
  useEffect(() => {
    if (authStore.init) {
      navigate('/contacts')
    }
  }, [ authStore.init ])

  return (
    <main className={ styles.content }>
      <section className={ styles.content__text }>
        <h1 className={ styles.content__heading }> Contacts manager </h1>
        <h2 className={ styles.content__description }>после авторизации вам станет доступна возможность добавлять свои контанты и управлять ими!</h2>
        <Button onClick={ () => { navigate('/signup') } } className={ styles.content__login }>
          АВТОРИЗИРУЙТЕСЬ
        </Button>
      </section>
      <section className={ styles.content__picture }>

      </section>
    </main>
  )
}

export default HomePage;
