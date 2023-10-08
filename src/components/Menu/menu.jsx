import React from 'react'
import classes from './menu.module.css'
import MenuPosts from '@/components/menuPosts/menuPosts'
const menu = () => {
  return (
    <div className={classes.container}>
      <h2 className={classes.subtitle}>{"What's hot"}</h2>
      <h1 className={classes.title}>Most Popular</h1>
      <MenuPosts withImage={false}></MenuPosts>
      {/* /3layout */}
      <h2 className={classes.subtitle}>Discover by topic</h2>
      <h1 className={classes.title}>Categories</h1>
      <MenuCategories></MenuCategories>
      {/* 2layout */}
      <h2 className={classes.subtitle}>{"Chosen by the editor"}</h2>
      <h1 className={classes.title}>Editors Pick</h1>
      <MenuPosts withImage={true}></MenuPosts>
    </div>
  )
}

export default menu