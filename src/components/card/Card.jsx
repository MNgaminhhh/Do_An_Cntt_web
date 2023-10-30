import React from 'react';
import classes from './card.module.css';
import Image from 'next/image';
import Link from 'next/link';

const Card = ({ post, admin }) => {
  const maxLength = 300;

  const postDate = new Date(post.postDate); 
  const formattedDate = postDate.toLocaleDateString('en-US'); 

  return (
    <div className={classes.container}>
      <div className={classes.imageContainer}>
        <Image src={post.img} alt='' fill className={classes.imageContainer} />
      </div>
      <div className={classes.textContainer}>
        <div className={classes.detail}>
          <span className={classes.category}>{admin.full_name} - </span>
          <span className={classes.date}>{formattedDate}</span>
        </div>
        <Link href={`/posts/${post.post_ID}`} admin={admin} post={post}> 
          <h1>{post.title}</h1>
        </Link>
        <Link href={`/posts/${post.post_ID}`} admin={admin} post={post}>
          <div dangerouslySetInnerHTML={{ __html: post.content.substring(0, maxLength) + ' ...' }} className={classes.desc} />
        </Link>

        <Link href={`/posts/${post.post_ID}`} className={classes.link} admin={admin} post={post}>
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Card;
