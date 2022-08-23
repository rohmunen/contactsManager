import React, { FunctionComponent } from "react";
import styles from './styles.module.scss'
import { ListItem } from '../../utils/interfaces'

type Props<T> = {
  className?: string
  data: T[]
  renderItem: FunctionComponent<T>
  renderEmpty: React.ReactNode
}


export function List<T extends ListItem>({
  data,
  renderEmpty,
  renderItem
}: Props<T>) {
  const RenderItem = renderItem
  if (data.length > 0) {
    return <>
      { data.map(item => <RenderItem key={ item.id } { ...item } />) }
    </>
  } else {
    return <div className={ styles.empty }>
      { renderEmpty }
    </div>
  }
}

