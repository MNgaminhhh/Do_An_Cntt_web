import React from 'react'
import classes from './menu.module.css'
import MenuPosts from '@/components/menuPosts/menuPosts'
const menu = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.subtitle}>{"What's hot"}</h2>
      <h1 className={styles.title}>Most Popular</h1>
      <MenuPosts withImage={false}></MenuPosts>
      {/* /3layout */}
      <h2 className={styles.subtitle}>Discover by topic</h2>
      <h1 className={styles.title}>Categories</h1>
      <MenuCategories></MenuCategories>
      {/* 2layout */}
      <h2 className={styles.subtitle}>{"Chosen by the editor"}</h2>
      <h1 className={styles.title}>Editors Pick</h1>
      <MenuPosts withImage={true}></MenuPosts>
    </div>
  )
}

export default menu