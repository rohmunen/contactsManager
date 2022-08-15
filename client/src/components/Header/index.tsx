import styles from "./styles.module.scss"
import cn from 'classnames'
import { Button } from '@mantine/core';
import { useNavigate } from "react-router-dom";
import { authStore } from "../../stores/authStore";
import { observer } from "mobx-react-lite";

type Props = {
  className?: string
}

export const Header = observer((props: Props) => {
  const { className } = props
  let navigate = useNavigate();
  return (
    <header
      className={ cn(
        styles.navbar,
        className
      ) }
    >
      <Button onClick={ () => { authStore.init ? navigate('/contacts') : navigate('/') } } className={ styles.navbar__logo }>
        CONTACTS
      </Button>
      { authStore.init && <Button onClick={ () => authStore.logout() } className={ styles.navbar__logout }>
        Выйти
      </Button> }

    </header>
  )
})

