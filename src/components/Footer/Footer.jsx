import React from 'react';
import classes from '@/components/Footer/footer.module.css';
import Image from 'next/image';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className={classes.container}>
      <footer className={classes.footer}>
        <div className={classes.wrapper}>
          <div className={classes.col}>
            <h2>Về Tin Công Nghệ</h2>
            <p>Chào mừng bạn đến với nền tảng tin công nghệ của chúng tôi! Chúng tôi luôn cố gắng mang đến cho bạn những cập nhật mới nhất và các bài viết sâu sắc về thế giới công nghệ đang liên tục thay đổi. Khám phá những câu chuyện hấp dẫn, phân tích chi tiết và cập nhật về các tiến bộ công nghệ đang hình thành tương lai của chúng ta.</p>
          </div>
          <div className={classes.col}>
            <h2>Liên Hệ</h2>
            <span>Email: 21110242@student.hcmute.edu.vn</span>
            <span>Điện thoại: +123-456-7890</span>
          </div>
        </div>
        <div className={classes.copyright}>&copy;{currentYear} Tin Công Nghệ</div> 
      </footer>
    </div>
  );
};

export default Footer;
