"use client"
import React, { useEffect, useState } from 'react'
import classes from './cardList.module.css'
import Link from 'next/link'
import Image from 'next/image'
import Card from '../card/Card'
import Pagination from '@/components/Pagination/Pagination'

const Page = () => {
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/category')
      .then(response => response.json())
      .then(data => setCategories(data));

    fetch('http://localhost:3000/api/post')
      .then(response => response.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Bài Viết Gần Đây</h1>
      <div className={classes.posts}>
        {posts.map((post) => (
          <Card key={post.post_ID} post={post}></Card>
        ))}
      </div>
      <Pagination></Pagination>
    </div>
  )
}

export default Page
