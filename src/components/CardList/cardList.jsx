"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import classes from './cardList.module.css';
import Card from '../card/Card';
import Pagination from '@/components/Pagination/Pagination';

const Page = ({ posts }) => {
  const [allPosts, setAllPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const router = useRouter();

  useEffect(() => {
    // Fetch all posts
    fetch('http://localhost:3000/api/posts')
      .then((response) => response.json())
      .then((data) => setAllPosts(data));
  }, []);

  // Logic to paginate posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    router.push(`/?page=${pageNumber}`, undefined, { shallow: true });
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Bài Viết Gần Đây</h1>
      <div className={classes.posts}>
        {posts
          ? posts.map((post) => <Card key={post.post_ID} post={post}></Card>)
          : currentPosts.map((post) => <Card key={post.post_ID} post={post}></Card>)}
      </div>
      <Pagination
        currentPage={currentPage}
        postsPerPage={postsPerPage}
        totalPosts={allPosts.length}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Page;
