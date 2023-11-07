"use client"
import React, { useEffect, useState } from 'react'
import classes from './menuPost.module.css'
import Image from 'next/image'
import Link from 'next/link'

const MenuPosts = ({withImage}) => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
  fetch('https://www.mn-tech.tech/api/category')
    .then((response) => response.json())
    .then((data) => setCategories(data));

  fetch('https://www.mn-tech.tech/api/posts')
    .then((response) => response.json())
    .then((data) => {
      const lastFivePosts = data.sort((a, b) => a.post_ID - b.post_ID).slice(-5);
      setPosts(lastFivePosts);
    });
  }, [withImage]);


  const getCategoryName = (categoryId) => {
    const category = categories.find((category) => category.category_ID === categoryId);
    return category ? category.category_Name : '';
  }

  return (
    <div className={classes.items}>
      {posts.map((post) => (
        <Link href={`/posts/${post.post_ID}`} key={post.id} className={classes.item}>
          {withImage && (
            <div className={classes.imageContainer}>
              <Image src={post.img} alt='' fill className={classes.image}></Image>
            </div>
          )}
          <div className={classes.textContainer}>
            <span className={`${classes.category} ${classes.bg}`}>{getCategoryName(post.category_ID)}</span>
            <h3 className={classes.postTitle}>{post.title}</h3>
            <div className={classes.postDetails}>
              <span className={classes.username}>{post.username}</span>
              <span className={classes.date}>{post.date}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default MenuPosts;
