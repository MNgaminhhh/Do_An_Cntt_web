import React from 'react'
import classes from './categoryList.module.css'
import Link from 'next/link'
import Image from 'next/image'
const categoryList = () => {
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Popular Categories</h1>
      <div className={classes.categories}>
          <Link href="/blog?cat=style" className={`${classes.category} ${classes.style}`}>
            <Image src="/style.png" alt='' width={32} height={32} className={classes.image}></Image>
            style
          </Link>
          <Link href="/blog?cat=style" className={`${classes.category} ${classes.fashion}`}>
            <Image src="/fashion.png" alt='' width={32} height={32} className={classes.image}></Image>
            fashion
          </Link>
          <Link href="/blog?cat=style" className={`${classes.category} ${classes.food}`}>
            <Image src="/food.png" alt='' width={32} height={32} className={classes.image}></Image>
            food
          </Link>
          <Link href="/blog?cat=style" className={`${classes.category} ${classes.travel}`}>
            <Image src="/travel.png" alt='' width={32} height={32} className={classes.image}></Image>
            travel
          </Link>
          <Link href="/blog?cat=style" className={`${classes.category} ${classes.culture}`}>
            <Image src="/culture.png" alt='' width={32} height={32} className={classes.image}></Image>
            culture
          </Link>
          <Link href="/blog?cat=style" className={`${classes.category} ${classes.coding}`}>
            <Image src="/coding.png" alt='' width={32} height={32} className={classes.image}></Image>
            coding
          </Link>
      </div>
    </div>
  )
}

export default categoryList