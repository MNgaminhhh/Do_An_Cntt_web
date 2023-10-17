import React from 'react'
import classes from './blogPage.module.css'
import CardList from '../../components/CardList/CardList'
import Menu from '@/components/Menu/Menu'
const page = () => {
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Công Nghê Thông Tin</h1>
      <div className={classes.content}>
        <CardList></CardList>
        <Menu></Menu>
      </div>
    </div>
  )
}

export default page