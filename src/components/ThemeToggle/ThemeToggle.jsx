"use client"
import React, { useContext } from 'react'
import classes from './themeToggle.module.css'
import Image from 'next/image'
import { ThemeContext } from '@/context/themeContext'

const ThemeToggle = () => {
  const {theme, toggle} = useContext(ThemeContext)
    return (
      <div className={classes.container} onClick={toggle} style={theme==="dark" ? {backgroundColor: "white"} : {backgroundColor:"#0f172a"}}>
        <Image src="/moon.png" alt="" width={14} height={14}></Image>
        <div className={classes.ball} style={theme==="dark" ? {left:1, background: "#0f172a"} : {right:1, background:"white"}}></div>
        <Image src="/sun.png" alt="" width={14} height={14}></Image>
      </div>
    )
}

export default ThemeToggle;
