"use client"
import React, { useEffect, useState } from 'react'
import classes from './menuCategories.module.css'
import Link from 'next/link'
import Image from 'next/image'

const MenuCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/category')
      .then(response => response.json())
      .then(data => setCategories(data));
  }, []);

  return (
    <div className={classes.categoryList}>
      {categories.map((category) => (
        <Link key={category.category_ID} href={`/blog?cat=${category.category_Name}`} className={`${classes.categoryItem} ${classes.bg}`}>
          {category.category_Name}
        </Link>
      ))}
    </div>
  )
}

export default MenuCategories