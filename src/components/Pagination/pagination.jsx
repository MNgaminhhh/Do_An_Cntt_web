import React from 'react';
import styles from './pagination.module.css';

const Pagination = ({ currentPage, postsPerPage, totalPosts, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.container}>
      <ul className={styles.pagination}>
        {pageNumbers.map((number) => (
          <li key={number} className={currentPage === number ? styles.active : ''}>
            <button onClick={() => onPageChange(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
