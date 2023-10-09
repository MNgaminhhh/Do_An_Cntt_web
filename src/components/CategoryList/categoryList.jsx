import React from 'react'
import classes from './categoryList.module.css'
import Link from 'next/link'
import Image from 'next/image'
const categoryList = () => {
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Các Chủ Đề Phổ Biến</h1>
      <div className={classes.categories}>
        {categories.map((category) => (
          <Link key={category.category_ID} href={`/blog?cat=${category.category_Name}`} className={`${classes.category} ${classes.bg}`}>
            <Image src='/p1.jpeg' alt='' width={32} height={32} className={classes.image}></Image>
            {category.category_Name}
         </Link>
         ) 
         </div>
    </div>
  )
}

export default categoryList