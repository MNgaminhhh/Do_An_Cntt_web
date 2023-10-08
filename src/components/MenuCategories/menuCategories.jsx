import Link from 'next/link'
import React from 'react'
import classes from './menuCategories.module.css'
const menuCategories = () => {
  return (
    <div className={classes.categoryList}>
        <Link href="/blog?cat=style" className={`${classes.categoryItem} ${classes.style}`}>
          Style
        </Link>
        <Link href="/blog?cat=style" className={`${classes.categoryItem} ${classes.travel}`}>
          Travel
        </Link>
        <Link href="/blog?cat=style" className={`${classes.categoryItem} ${classes.culture}`}>
          Culture
        </Link>
        <Link href="/blog?cat=style" className={`${classes.categoryItem} ${classes.fashion}`}>
          Fashion
        </Link>
        <Link href="/blog?cat=style" className={`${classes.categoryItem} ${classes.food}`}>
          Food
        </Link>
        <Link href="/blog?cat=style" className={`${classes.categoryItem} ${classes.coding}`}>
          Coding
        </Link>
      </div>
  )
}

export default menuCategories