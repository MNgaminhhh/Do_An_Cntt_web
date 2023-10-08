import React from 'react'
import classes from './menuPost.module.css'
import Image from 'next/image'
import Link from 'next/link'
const menuPosts = ({withImage}) => {
  return (
    <div className={classes.items}>
        <Link href="/" className={classes.item}>
         {withImage && (<div className={classes.imageContainer}>
            <Image src="/p1.jpeg" alt='' fill className={classes.image}></Image>
          </div>)}
          <div className={classes.textContainer}>
            <span className={`${classes.category} ${classes.travel}`}>Travel</span>
            <h3 className={classes.postTitle}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. </h3>
            <div className={classes.detail}>
              <span className={classes.username}>John Doe</span>
              <span className={classes.date}>10.03.2023</span>
            </div>
          </div>
        </Link>

        <Link href="/" className={classes.item}>
          {withImage && (<div className={classes.imageContainer}>
            <Image src="/p1.jpeg" alt='' fill className={classes.image}></Image>
          </div>)}
          <div className={classes.textContainer}>
            <span className={`${classes.category} ${classes.culture}`}>Culture</span>
            <h3 className={classes.postTitle}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. </h3>
            <div className={classes.detail}>
              <span className={classes.username}>John Doe</span>
              <span className={classes.date}>10.03.2023</span>
            </div>
          </div>
        </Link>

        <Link href="/" className={classes.item}>
          {withImage &&(<div className={classes.imageContainer}>
            <Image src="/p1.jpeg" alt='' fill className={classes.image}></Image>
          </div>)}
          <div className={classes.textContainer}>
            <span className={`${classes.category} ${classes.food}`}>Food</span>
            <h3 className={classes.postTitle}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. </h3>
            <div className={classes.detail}>
              <span className={classes.username}>John Doe</span>
              <span className={classes.date}>10.03.2023</span>
            </div>
          </div>
        </Link>
      </div>

  )
}

export default menuPosts