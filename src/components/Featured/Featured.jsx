"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import classes from './featured.module.css';
import Image from 'next/image';

const Featured = () => {
  const [featuredPost, setFeaturedPost] = useState(null);
  const maxLength = 499; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://do-an-cntt-web.vercel.app/api/posts');
        const data = await response.json();
        const highestIdPost = data.reduce((prev, current) =>
          prev.id > current.id ? prev : current
        );
        setFeaturedPost(highestIdPost);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Tin Tức Công Nghệ Nổi Bật</h1>
      {featuredPost && (
        <div className={classes.post}>
          <div className={classes.imgContainer}>
            <Image src={featuredPost.img} alt='' fill className={classes.image} />
          </div>
          <div className={classes.textContainer}>
            <h1 className={classes.postTitle}>{featuredPost.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: featuredPost.content.substring(0, maxLength) + ' ...' }} className={classes.postDesc} />
            <Link href={`/posts/${featuredPost.post_ID}`}>
              <button className={classes.button}>Đọc Thêm</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Featured;
