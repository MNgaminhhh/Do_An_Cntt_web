import React from 'react'
import classes from './pagination.module.css'
const pagination = () => {
  return (
    <div className={classes.container}>
      <button className={classes.button}>Trang Sau</button>
      <button className={classes.button}>Trang Trước</button>
    </div>
  )
}

export default pagination