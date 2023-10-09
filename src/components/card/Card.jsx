import React from 'react'
import classes from './card.module.css'
import Image from 'next/image'
import Link from 'next/link'
const Card = () => {
  return (
    <div className={classes.container}>
        <div className={classes.imageContainer}>
          <Image src='/p1.jpeg' alt='' fill className={classes.imageContainer}></Image>
        </div>
        <div className={classes.textContainer}>
            <div className={classes.detail}>
                <span className={classes.date}>11.02.2023 - </span>
                <span className={classes.category}>CULTURE</span>
            </div>
            <Link href="/posts/1">
              <h1>Lorem ipsum dolor, sit amet consectetur adipisicing elit. </h1>
            </Link>
            <p className={classes.desc}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam numquam tenetur similique harum eaque cum recusandae molestias earum consectetur soluta assumenda nemo aliquam reiciendis sapiente ullam dolore, placeat labore maxime?</p>
            <Link href="/posts/1" className={classes.link}>Read More</Link>
        </div>
    </div>
  )
} 

export default Card