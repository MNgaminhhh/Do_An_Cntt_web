import React from 'react'
import classes from './cardList.module.css'
import Card from '../card/Card'
import Pagination from '@/components/Pagination/pagination'
const cardList = () => {
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Recent Posts</h1>
      <div className={classes.posts}>
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </div>
      <Pagination></Pagination>
    </div>
  )
}

export default cardList