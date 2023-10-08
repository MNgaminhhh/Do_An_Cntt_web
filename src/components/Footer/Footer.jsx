import React from 'react'
import classes from '@/components/Footer/footer.module.css'  
const Footer = () => {
  return (
    <div className={classes.container}>
      <footer className={classes.footer}>
      <div className={classes.wrapper}>
        <div className={classes.col}>
          <h2>About the App</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti corporis aperiam deserunt nihil eligendi corrupti eveniet hic quaerat provident explicabo iusto quo omnis delectus ea earum vero, quis magni fugiat?</p>
        </div>
        <div className={classes.col}>
          <h2>Contacts</h2>
          <span>Phone: +12348390</span>
          <span>Youtube: MNgaminh</span>
        </div>
      </div>
    </footer>
    </div>
    
  )
}

export default Footer