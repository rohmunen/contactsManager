import React from "react"
import styles from "./styles.module.scss"
import cn from 'classnames'
import { Button } from '@mantine/core';
import { useNavigate } from "react-router-dom";

type Props = {
  className?: string
}

export const Header = (props: Props) => {
  const { className } = props
  let navigate = useNavigate();
  return (
    <header
      className={ cn(
        styles.navbar,
        className
      ) }
    >
      <Button onClick={ () => { navigate('/') } } className={ styles.navbar__logo }>
        CONTACTS
      </Button>

    </header>
  )
}

