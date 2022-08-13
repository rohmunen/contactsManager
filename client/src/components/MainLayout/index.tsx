import React from "react";
import styles from "./styles.module.scss";
import cn from 'classnames'
import { Header } from "../Header";

type Props = {
  className?: string
}

export const MainLayout = (props: React.PropsWithChildren<Props>) => {
  const { children, className } = props
  return (
    <div className={ styles.wrapper }>
      <Header className={ styles.header } />
      { children }
    </div>
  )
}
