import React from 'react'
import classes from './card.module.css'
import Image from 'next/image'
import Link from 'next/link'

const Card = ({ post }) => {
  return (
    <div className={classes.container}>
        <div className={classes.imageContainer}>
          <Image src='/p1.jpeg' alt='' fill className={classes.imageContainer}></Image>
        </div>
        <div className={classes.textContainer}>
            <div className={classes.detail}>
                <span className={classes.date}>{post.postDate} - </span>
                <span className={classes.category}>{post.category_Name}</span>
            </div>
            <Link href={`/posts/${post.post_ID}`}>
              <h1>{post.title}</h1>
            </Link>
            <Link href={`/posts/${post.post_ID}`}>
            <p className={classes.desc}>{post.content}</p>
            </Link>
            
            <Link href={`/posts/${post.post_ID}`} className={classes.link}>Read More</Link>
        </div>
    </div>
  )
} 

export default Card
