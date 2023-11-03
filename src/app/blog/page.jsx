"use client"
import React, { useEffect, useState } from 'react';
import classes from './blogPage.module.css'
import CardList from '@/components/CardList/CardList'
import Menu from '@/components/Menu/Menu'
export const metadata = {
  title: '',
  description: 'blog page',
}
const BlogCategoryPage = () => {
  const [cat, setCat] = useState('');
  const [categoryPosts, setCategoryPosts] = useState([]);

  useEffect(() => {
    const queryString = window.location.search;
    const catParam = new URLSearchParams(queryString).get('cat');
    setCat(catParam);

    if (catParam) {
      fetch(`https://do-an-cntt-web.vercel.app/api/posts?cat=${encodeURIComponent(catParam)}`)
        .then(response => response.json())
        .then(data => setCategoryPosts(data));
    }
    if (cat) {
      metadata.title = cat;
    }
  }, [cat]);
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>{cat || 'Blog'}</h1>
      <div className={classes.content}>
        {cat ? (
          <CardList posts={categoryPosts} />
        ) : (
          <CardList />
        )}
        <Menu />
      </div>
    </div>
  );
};

export default BlogCategoryPage;
