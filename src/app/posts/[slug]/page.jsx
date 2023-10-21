"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Importing useRouter from 'next/router'
import classes from './singlePage.module.css';
import Image from 'next/image';
import Menu from '@/components/Menu/Menu';

const Page = () => {
  const router = useRouter();
  const [postId, setPostId] = useState(null);
  const [post, setPost] = useState(null);

  useEffect(() => {
    // Extract postId from the URL using regular expression
    const postIdFromPath = window.location.pathname.match(/\/posts\/(\d+)/);
    if (postIdFromPath) {
      const postId = postIdFromPath[1];
      console.log('Post ID:', postId);
      setPostId(postId);
    }

    const fetchPost = async () => {
      if (postId) {
        try {
          const response = await fetch(`http://localhost:3000/api/posts/${postId}`);
          if (!response.ok) {
            throw new Error('Không tìm thấy bài đăng !');
          }
          const data = await response.json();
          setPost(data);
        } catch (error) {
          console.error('Error fetching post:', error);
        }
      }
    };

    fetchPost();
  }, [postId]); // Update when postId changes

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className={classes.container}>
      <div className={classes.infoContainer}>
        <div className={classes.textContainer}>
          <h1 className={classes.title}>{post.title}</h1>
          <div className={classes.user}>
            <div className={classes.userImageContainer}>
              <Image className={classes.avatar} src='/p1.jpeg' alt='' fill></Image>
            </div>
            <div className={classes.userTextCotainer}>
              <span className={classes.username}>MNgaminh</span>
              <span className={classes.date}>{post.postDate}</span>
            </div>
          </div>
        </div>
        <div className={classes.imageContainer}>
          <Image src="/p1.jpeg" alt='' fill className={classes.image}></Image>
        </div>
      </div>
      <div className={classes.content}>
        <div className={classes.post}>
          <div className={classes.description}>
            <p>{post.content}</p>
          </div>
        </div>
          <Menu></Menu>
      </div>
    </div>
  );
  
};

export default Page;
