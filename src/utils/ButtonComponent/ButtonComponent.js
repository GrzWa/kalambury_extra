import React from 'react'
import styles from './ButtonComponent.module.css'

export default function ButtonComponent({children}) {
  return (
    <button className={styles.button}>{children}</button>
  )
}
