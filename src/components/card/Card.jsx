import React from 'react';
import classes from './card.module.css';
import Image from 'next/image';
import Link from 'next/link';

const Card = ({ post }) => {
  const maxLength = 250;
  const postDate = new Date(post.postDate); 
  const formattedDate = postDate.toLocaleDateString('en-US'); 
  return (
    <div className={classes.container}>
      <div className={classes.imageContainer}>
        <Image src={post.img} alt={post.title} fill className={classes.imageContainer} />
      </div>
      <div className={classes.textContainer}>
        <div className={classes.detail}>
          <span className={classes.date}>{formattedDate}</span>
        </div>
        <Link href={`/posts/${post.post_ID}`}>
            <h1>{post.title}</h1>
        </Link>
        <Link href={`/posts/${post.post_ID}`}>
            <div dangerouslySetInnerHTML={{ __html: post.content.substring(0, maxLength) + ' ...' }} className={classes.desc} />
        </Link>
        <Link href={`/posts/${post.post_ID}`}>
          <span className={classes.link}>
            Read More
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Card;
