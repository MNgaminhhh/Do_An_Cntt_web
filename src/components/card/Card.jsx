import React from 'react'
import classes from './card.module.css'
import Image from 'next/image'
import Link from 'next/link'

const Card = ({ post }) => {
  const maxLength = 300; 

  return (
    <div className={classes.container}>
        <div className={classes.imageContainer}>
          <Image src={post.img} alt='' fill className={classes.imageContainer} />
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
              <div dangerouslySetInnerHTML={{ __html: post.content.substring(0, maxLength) + ' ...' }} className={classes.desc} />
            </Link>
            
            <Link href={`/posts/${post.post_ID}`} className={classes.link}>Read More</Link>
        </div>
    </div>
  )
} 

export default Card

