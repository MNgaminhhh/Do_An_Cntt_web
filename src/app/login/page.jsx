"use client"
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";
import Link from "next/link";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signIn("credentials", {
        redirect: false,
        username,
        password,
      });

      if (response.ok) {
        router.push("/");
      } else {
        console.error("Authentication failed");
      }
    } catch (error) {
      console.error("Error authenticating:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>ĐĂNG NHẬP</h1>
        <form onSubmit={handleFormSubmit}>
          <div className={styles.form_warper}>
            <label className={styles.label_form} htmlFor="username">Tên Tài Khoản</label>
            <input className={styles.input_form} type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} required placeholder="nguyenminh"/>
          </div>
          <div className={styles.password}>
            <label className={styles.label_form} htmlFor="password">Mật Khẩu</label>
            <input className={styles.input_form} type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="abcdefgh!"/>
          </div>
          <button type="submit" className={styles.button_effect}>Login</button>
          <p className={styles.button_desc}>Don`t Have An Account ?</p>
          <Link href="/register">
            <span className={styles.button_effect}>Open Account</span>
          </Link>
        </form>
      </div>
    </div>  
  );

};

export default LoginPage;
