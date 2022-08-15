import styles from './styles.module.scss'
import { Button } from '@mantine/core';
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';

const NotFound = () => {
  let navigate = useNavigate();
  return (
    <main className={ styles.notFound }>
      <p className={ styles.notFound__text }>404</p>
      <PrimaryButton onClick={ () => { navigate('/') } } text="Вернуться" type='button' />
    </main>
  )
}

export default NotFound;
