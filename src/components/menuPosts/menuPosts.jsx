"use client"
import React, { useEffect, useState } from 'react'
import classes from './menuPost.module.css'
import Image from 'next/image'
import Link from 'next/link'
const menuPosts = ({withImage}) => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/api/category')
      .then((response) => response.json())
      .then((data) => setCategories(data));
    fetch('http://localhost:3000/api/posts')
      .then(response => response.json())
      .then(data => setPosts(data));
  }, []);
  return (
    <div className={classes.items}>
      {posts.map((post) => (
        <Link href="/" key={post.id} className={classes.item}>
          {withImage && (
            <div className={classes.imageContainer}>
              <Image src="/p1.jpeg" alt='' fill className={classes.image}></Image>
            </div>
          )}
          <div className={classes.textContainer}>
            <span className={`${classes.category} ${classes.bg}`}>{post.category}</span>
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

export default menuPosts