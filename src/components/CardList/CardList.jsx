"use client";
import React, { useEffect, useState } from "react";
import classes from "./cardList.module.css";
import Card from "@/components/card/Card";
import Pagination from "@/components/Pagination/Pagination";

const Page = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cat, setCat] = useState("");
  const postsPerPage = 5;

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const catParam = urlParams.get("cat");
    const baseURL = process.env.NEXTAUTH_URL;
    setCat(catParam);
    const url = catParam
      ? `${baseURL}/api/posts?cat=${encodeURIComponent(
          catParam
        )}&page=${currentPage}`
      : `${baseURL}/api/posts`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setAllPosts(data));
  }, [currentPage, cat]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const newQueryString = cat
      ? `?cat=${encodeURIComponent(cat)}&page=${pageNumber}`
      : `?page=${pageNumber}`;
    window.history.pushState(null, "", newQueryString);
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
