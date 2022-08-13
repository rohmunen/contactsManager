import React from "react"
import styles from "./styles.module.scss"
import cn from 'classnames'
import { Button } from '@mantine/core';

type Props = {
  className?: string
}

export const Header = (props: Props) => {
  const { className } = props

  return (
    <header
      className={ cn(
        styles.navbar,
        className
      ) }
    >
      <Button className={styles.navbar__logo}>
        CONTACTS
      </Button>

    </header>
  )
}

