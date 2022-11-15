import React from 'react'
import HomeLogo from '../HomeLogo/HomeLogo'
import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <div className={styles.navbar}>
        <div className={styles.logo}>
            <HomeLogo />
        </div>
    </div>
  )
}
