"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import classes from './cardList.module.css';
import Card from '@/components/card/Card';
import Pagination from '@/components/Pagination/Pagination';

const Page = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const router = useRouter();

  useEffect(() => {

    fetch('https://www.mn-tech.tech/api/posts')
      .then((response) => response.json())
      .then((data) => setAllPosts(data));
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    router.push(`/?page=${pageNumber}`, undefined, { shallow: true });
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Bài Viết Gần Đây</h1>
      <div className={classes.posts}>
        {currentPosts.map((post) => (
          <Card key={post.post_ID} post={post}></Card>
        ))}
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
