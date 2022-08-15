import React, { HTMLProps } from "react";
import { Button } from "@mantine/core";
import styles from "./styles.module.scss"


export interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  text: string | number
  type: "button" | "submit" | "reset"
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export const PrimaryButton = (props: ButtonProps) => {
  const {
    text,
    onClick,
    type,
    ...otherProps
  } = props;

  return (
    <Button className={ styles.button } type={ type } onClick={ onClick }>
      { text }
    </Button>
  )
}