"use client"
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import classes from "./login.module.css";
import Link from "next/link";

const metadata = {
  title: 'Đăng Nhập Tài Khoản',
  description: 'login',
}
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
        setError("Sai tài khoản hoặc mật khẩu.");
      }
    } catch (error) {
      console.error("Error authenticating:", error);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h1 className={classes.title}>ĐĂNG NHẬP</h1>
        <form onSubmit={handleFormSubmit}>  
          {error && <div className={classes.error}>{error}</div>}
          <div className={classes.form_warper}>
            <label className={classes.label_form} htmlFor="username">Tên Tài Khoản</label>
            <input className={classes.input_form} type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} required placeholder="nguyenminh"/>
          </div>
          <div className={classes.password}>
            <label className={classes.label_form} htmlFor="password">Mật Khẩu</label>
            <input className={classes.input_form} type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="abcdefgh!"/>
          </div>
          <button type="submit" className={classes.button_effect}>Đăng Nhập</button>  
          <p className={classes.button_desc}>Bạn Không Có Tài Khoản ?</p>
          <Link href="/register">
            <span className={classes.button_effect}>Đăng Ký</span>
          </Link>
        </form>
      </div>
    </div>  
  );

};

export default LoginPage;
