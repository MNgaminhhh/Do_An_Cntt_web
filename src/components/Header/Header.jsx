import Image from 'next/image'
import React from 'react'
import logo from '@/img/logo_final.png'
import classes from '@/components/Header/header.module.css'
import person from '@/img/logo_final.png'
import ThemeToggle from '../themeToggle/themeToggle'
import AuthLink from '../../authLink/authLink'
import Link from 'next/link'
const Header = () => {
  return (
    <header>
      <div className={classes.container}>
        <div className={classes.wrapper}>
          
          <div className={classes.right}>
            <Link href='/' className={classes.link}>Home</Link>
            <Link href='/' className={classes.link}>Contact</Link>
          </div>
          <div className={classes.left}>
            <h2>
              <Link href='/'><Image src={person} width='91' height='55' className={classes.img}></Image></Link>
            </h2>
          </div>
          <div className={classes.right}>
            <ThemeToggle></ThemeToggle>
            <Link href='/' className={classes.link}>Home</Link>
            <Link href='/' className={classes.link}>Contact</Link>
            <AuthLink></AuthLink>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header