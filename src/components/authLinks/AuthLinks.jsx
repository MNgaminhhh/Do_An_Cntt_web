"use client"
import React, { useState } from 'react';
import classes from './authLinks.module.css';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

const AuthLinks = () => {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {status === "authenticated" ? (
        <div className={classes.titleAuth}>
          <Link href="/write">Bài Viết </Link>
          <Link href={`/admin/${session.id}`} onClick={handleClose}>Tài Khoản</Link>
          <span className={classes.link} onClick={handleSignOut}>
            Đăng Xuất
          </span>
        </div>
      ) : (
        <Link href="/login"></Link>
      )}
      <div className={classes.burger} onClick={() => setOpen(!open)}>
        <div className={classes.line}></div>
        <div className={classes.line}></div>
        <div className={classes.line}></div>
      </div>
      {open && (
        <div className={classes.responsiveMenu}>
          <Link href="/" onClick={handleClose}>Trang Chủ</Link>
          <Link href="/contact" onClick={handleClose}>Liên Hệ</Link>
          {status === "authenticated" ? (
            <div className={classes.labelAuth}>
              <Link href="/write" onClick={handleClose}>Bài Viết</Link>
              <Link href={`/admin/${session.id}`} onClick={handleClose}>Tài Khoản</Link>
              <span onClick={handleSignOut}>
                Đăng Xuất
              </span>
            </div>
          ) : (
            <Link href="/login" onClick={handleClose}></Link>
          )}
        </div>
      )}
    </>
  );
};

export default AuthLinks;
