"use client"
import { useState } from "react";
import classes from "./register.module.css";
import Link from "next/link";

const RegisterForm = () => {
    const [user, setUser] = useState({ username: "", password: "", confirmPassword: "", fullname: "" });
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user) {
            if (user.password !== user.confirmPassword) {
                setError("Mật khẩu không khớp");
                return;
            }
            if (user.username.length < 4 || user.password.length < 4) {
                setError("Tên tài khoản và mật khẩu phải có ít nhất 4 ký tự");
                return; 
            }
            const response = await fetch('https://do-an-cntt-web.vercel.app/api/auth/register', {
                method: "POST",
                body: JSON.stringify(user)
            });
            if (response.status === 201) {
                window.location.href = "/login";
            } 
            const data = await response.json();
            if (response.status === 400) {
                setError(data.error);
            } else if (response.status === 201) {
                console.log(data.message);
            }
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <div className={classes.form_warper}>
                    <h1 className={classes.title}>Đăng Ký Tài Khoản</h1>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        {error && <div className={classes.error}>{error}</div>}
                        <div className={classes.fullname}>
                            <label className={classes.label_form}>Họ và Tên</label>
                            <input className={classes.input_form} type="text" name="fullname" value={user.fullname} onChange={e => setUser({ ...user, fullname: e.target.value })} required placeholder="Full Name" autoComplete="off" />
                        </div>
                        <div className={classes.username}>
                            <label className={classes.label_form}>Tên Tài Khoản</label>
                            <input className={classes.input_form} type="text" name="username" value={user.username} onChange={e => setUser({ ...user, username: e.target.value })} required placeholder="Username" autoComplete="off" />
                        </div>
                        <div className={classes.password}>
                            <label className={classes.label_form}>Mật Khẩu</label>
                            <input className={classes.input_form} type="password" name="password" value={user.password} onChange={e => setUser({ ...user, password: e.target.value })} required autoComplete="off" placeholder="Password" />
                        </div>
                        <div className={classes.confirmPassword}>
                            <label className={classes.label_form}>Nhập Lại Mật Khẩu</label>
                            <input className={classes.input_form} type="password" name="confirmPassword" value={user.confirmPassword} onChange={e => setUser({ ...user, confirmPassword: e.target.value })} required autoComplete="off" placeholder="Confirm Password" />
                        </div>
                        <button type="submit" className={classes.button_effect}>Đăng Ký</button>
                        <p className={classes.login_desc}>Bạn đã có tài khoản? Đăng nhập ngay !</p>
                        <Link className={classes.button_effect} href="/login">Đăng Nhập</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default RegisterForm;
