import React from 'react'
import classes from './blogPage.module.css'
import CardList from '../../components/cardList/CardList'
import Menu from '@/components/menu/Menu'
const page = () => {
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Style Blog</h1>
      <div className={classes.content}>
        <CardList></CardList>
        <Menu></Menu>
      </div>
    </div>
  )
}

export default page