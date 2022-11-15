import React, { useState } from 'react'
import styles from './SideMenu.module.css'
import clsx from 'clsx'
import { useAuth } from '../../contexts/AuthContext'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { ThemeProvider } from "@emotion/react";
import MUItheme from '../MUItheme'

export default function SideMenu() {
    const [burgerHidden, setBurgerHidden] = useState(false)
    const [menuHidden, setMenuHidden] = useState(true)

    const [error, setError] = useState('')
    const history = useHistory()

    const theme = MUItheme

    const {currentUser, logout} = useAuth()

    async function handleLogout() {
        setError('')

        try {
        await logout()
        history.pushState('/login')
        } catch {
        setError('Failed to log out.')
        }
    }


    const clsBurger = clsx({
        [styles['burger-container']]: true,
        [styles['burger-hidden']]: burgerHidden
    })
    const clsMenu = clsx({
        [styles['menu-container']]: true,
        [styles['menu-hidden']]: menuHidden
    })

    const toggleMenu = () => {
        setBurgerHidden(prev => !prev)
        setMenuHidden(prev => !prev)
        // console.log("burger: " + burgerHidden)
        // console.log("menu: " + menuHidden)
    }
  return (
//   <ThemeProvider theme={theme}>
    <>
    <div className={clsBurger}>
        <div className={styles.burger} onClick={() => toggleMenu()}>
            <div className={styles['burger-line']}></div>
            <div className={styles['burger-line']}></div>
            <div className={styles['burger-line']}></div>
        </div>
    </div>

    <div className={clsMenu}>
        <div className={styles['top-bar']}>
            <div className={styles.close} onClick={() => toggleMenu()}></div>
        </div>
        <div className={styles['menu-content']}>
            <Link to="/admin" className={styles.link}>
                {/* <Button variant="contained" color='light'> */}
                    Admin page
                {/* </Button> */}
            </Link>
            <Link to="/spectate" className={styles.link}>
                {/* <Button variant="contained" color="light"> */}
                    Spectator mode
                {/* </Button> */}
            </Link>
            {currentUser ? 
            <div className={styles.user}>
                <div>Logged in as:</div>
                <div>{currentUser.email}</div>
                <button onClick={() => handleLogout()}>Log Out</button>
                </div>
            : 
            <div className={styles['not-logged-in']}>
                <button>
                    <Link to="/login">Log in</Link>
                </button>
            </div>}
        </div>
        <div className={styles.backdrop} onClick={() => toggleMenu()}></div>
    </div>
    </>
    // </ThemeProvider>
  )
}
