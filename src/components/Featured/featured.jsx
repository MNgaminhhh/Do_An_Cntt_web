import React from 'react'
import classes from './featured.module.css'
import Image from 'next/image'
const featured = () => {
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>
        <b>Hey, MNgaminh here!</b>Discover my stories and creative ideas.
      </h1>
      <div className={classes.post}>
        <div className={classes.imgContainer}>
          <Image src="/p1.jpeg" alt='' fill className={classes.image}></Image>
        </div>
        <div className={classes.textContainer}>
          <h1 className={classes.postTitle}>Lorem ipsum dolor sit amet consectetur adipisicing elit..</h1>
          <p className={classes.postDesc}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam nobis quos deleniti vitae aliquam, quas nulla animi porro provident illum magni. Quos vero in suscipit ipsum porro dicta eum perspiciatis.</p>
          <button className={classes.button}>Read More</button>
        </div>
      </div>
    </div>
  )
}

export default featured