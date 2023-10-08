import React from 'react'
import classes from './pagination.module.css'
const pagination = () => {
  return (
    <div className={classes.container}>
      <button className={classes.button}>Previous</button>
      <button className={classes.button}>Next</button>
    </div>
  )
}

export default pagination