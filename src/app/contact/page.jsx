import React from 'react';
import classes from './contactPage.module.css';
import person from '@/img/logo_final.png'
import Image from 'next/image';

export const metadata = {
  title: 'Liên Hệ',
  description: 'contact page',
}

const Contact = () => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h1 className={classes.titleContent}>Liên Hệ</h1>
        <div className={classes.image}>
          <Image src={person} height={210} width={300} className={classes.img} alt=''></Image>
        </div>
        <div className={classes.col}>
          <h2 className={classes.title}>Về Tin Công Nghệ</h2>
          <p className={classes.desc}>Chào mừng bạn đến với nền tảng tin công nghệ của chúng tôi! Chúng tôi luôn cố gắng mang đến cho bạn những cập nhật mới nhất và các bài viết sâu sắc về thế giới công nghệ đang liên tục thay đổi. Khám phá những câu chuyện hấp dẫn, phân tích chi tiết và cập nhật về các tiến bộ công nghệ đang hình thành tương lai của chúng ta.</p>
        </div>
        <div className={classes.col}>
          <h2 className={classes.title}>Thông Tin Liên Hệ</h2>
          <span className={classes.desc}>Email: 21110242@student.hcmute.edu.vn</span>
          <span className={classes.desc}>Điện thoại: +123-456-7890</span>
        </div>
      </div>
    </div>
  );
};

export default Contact;
