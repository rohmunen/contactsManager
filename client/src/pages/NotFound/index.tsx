import React from 'react';
import logo from './logo.svg';
import styles from './styles.module.scss'
import { Button } from '@mantine/core';
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  let navigate = useNavigate();
  return (
    <main className={ styles.notFound }>
      <p className={ styles.notFound__text }>404</p>
      <Button onClick={ () => { navigate('/') } } className={ styles.notFound__goBack }>
        go back
      </Button>
    </main>
  )
}

export default NotFound;
