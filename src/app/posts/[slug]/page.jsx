import React from 'react'
import classes from './singlePage.module.css'
import Image from 'next/image'
import Menu from '@/components/Menu/Menu'
const page = () => {
  return (
    <div className={classes.container}>
      <div className={classes.infoContainer}>
        <div className={classes.textContainer}>
          <h1 className={classes.title}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. </h1>
          <div className={classes.user}>
            <div className={classes.userImageContainer}>
              <Image className={classes.avatar} src='/p1.jpeg' alt='' fill></Image>
            </div>
            <div className={classes.userTextCotainer}>
              <span className={classes.username}>MNgaminh</span>
              <span className={classes.date}>01.01.2023</span>
            </div>
          </div>
        </div>
        <div className={classes.imageContainer}>
          <Image src="/p1.jpeg" alt='' fill className={classes.image}></Image>
        </div>
      </div>
      <div className={classes.content}>
        <div className={classes.post}>
          <div className={classes.description}>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos sint inventore aut quasi perferendis iste in beatae ut eum eveniet, fuga cumque, cum recusandae? Consectetur modi distinctio magnam voluptate. Sunt.</p>
            <p>
              <span>Lorem ipsum dolor sit amet consectetur adipisicing elit</span>
            </p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos sint inventore aut quasi perferendis iste in beatae ut eum eveniet, fuga cumque, cum recusandae? Consectetur modi distinctio magnam voluptate. Sunt.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos sint inventore aut quasi perferendis iste in beatae ut eum eveniet, fuga cumque, cum recusandae? Consectetur modi distinctio magnam voluptate. Sunt.</p>

          </div>
        </div>
          <Menu></Menu>
      </div>
    </div>
  )
}

export default page