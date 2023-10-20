"use client"
import React, { useState } from 'react';
import styles from './authLinks.module.css';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

const AuthLinks = () => {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();

  return (
    <>
      {status === "authenticated" ? (
        <>
          <Link href="/write">Write</Link>
          <span className={styles.link} onClick={() => signOut()}>
            Logout
          </span>
        </>
      ) : (
        <Link href="/login">Login</Link>
      )}
      <div className={styles.burger} onClick={() => setOpen(!open)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      {open && (
        <div className={styles.responsiveMenu}>
          <Link href="/">Homepage</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
          {status === "authenticated" ? (
            <>
              <Link href="/write">Write</Link>
              <span className={styles.link} onClick={() => signOut()}>
                Logout
              </span>
            </>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </div>
      )}
    </>
  );
};

export default AuthLinks;
