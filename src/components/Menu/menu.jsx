import React from 'react'
import classes from './menu.module.css'
import MenuPosts from '@/components/menuPosts/MenuPosts'
import MenuCategories from '@/components/MenuCategories/MenuCategories'
const menu = () => {
  return (
    <div className={classes.container}>
      <h2 className={classes.subtitle}>{"Có gì mới ?"}</h2>
      <h1 className={classes.title}>Tin Tức Mới</h1>
      <MenuPosts withImage={false}></MenuPosts>
      {/* /3layout */}
      <h2 className={classes.subtitle}>Khám phá</h2>
      <h1 className={classes.title}>Chủ Đề</h1>
      <MenuCategories></MenuCategories>
      {/* 2layout */}
      <h1 className={classes.title}>Tin Tức</h1>
      <MenuPosts withImage={true}></MenuPosts>
    </div>
  )
}

export default menu