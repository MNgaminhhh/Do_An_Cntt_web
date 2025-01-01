"use client";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import classes from "./adminPage.module.css";
import Link from "next/link";

const AdminProfile = () => {
  const [admin, setAdmin] = useState({
    username: "",
    full_name: "",
    isChangingPassword: false,
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [accountDeleted, setAccountDeleted] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const baseURL = process.env.NEXTAUTH_URL;
  useEffect(() => {
    const fetchAdminInfo = async () => {
      if (session) {
        try {
          const response = await fetch(`${baseURL}/api/admin/${session.id}`);
          if (response.ok) {
            const data = await response.json();
            setAdmin(data);
          } else {
            console.error("Failed to fetch admin information");
          }
        } catch (error) {
          console.error("Error fetching admin information", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    if (session) {
      fetchAdminInfo();
      setLoading(false);
    }
  }, [session]);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <div>
        <p>Bạn cần phải đăng nhập để thực hiện chức năng này.</p>
        <Link href="/login">
          <a>Đăng Nhập</a>
        </Link>{" "}
        {/* Make sure to wrap the text in an <a> tag */}
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseURL}/api/admin/${session.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: admin.password,
        }),
      });

      if (response.ok) {
        setPasswordChanged(true);
      } else {
        setPasswordChanged(false);
        console.error("Failed to update password");
      }
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };
  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(`${baseURL}/api/admin/${session.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setAccountDeleted(true);
        router.push("/");
        signOut();
      } else {
        setAccountDeleted(false);
        console.error("Failed to delete account");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdmin((prevAdmin) => ({
      ...prevAdmin,
      [name]: value,
    }));
  };
  const handlePasswordChange = () => {
    setAdmin((prevAdmin) => ({
      ...prevAdmin,
      isChangingPassword: true,
    }));
  };

  const togglePasswordVisibility = () => {
    setAdmin((prevAdmin) => ({
      ...prevAdmin,
      isPasswordVisible: !prevAdmin.isPasswordVisible,
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!admin) {
    return <div>Không tìm thấy tài khoản</div>;
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h1 className={classes.title}>Thông Tin Tài Khoản</h1>
        {passwordChanged && (
          <div className={classes.successMessage}>Đổi mật khẩu thành công!</div>
        )}
        {accountDeleted && (
          <p className={classes.successMessage}>
            Tài khoản đã được xóa thành công
          </p>
        )}
        <form className={classes.form} onSubmit={handleSubmit}>
          <div className={classes.fullname}>
            <label className={classes.label_form} htmlFor="full_name">
              Họ và Tên:
            </label>
            <input
              className={classes.input_form}
              type="text"
              id="full_name"
              name="full_name"
              value={admin.full_name || ""}
              onChange={handleInputChange}
              readOnly
            />
          </div>
          <div className={classes.username}>
            <label className={classes.label_form} htmlFor="username">
              Tên tài khoản:
            </label>
            <input
              className={classes.input_form}
              type="text"
              id="username"
              name="username"
              value={admin.username}
              readOnly
            />
          </div>
          {!admin.isChangingPassword ? (
            <button
              className={classes.button_effect}
              type="button"
              onClick={handlePasswordChange}
            >
              Đổi mật khẩu
            </button>
          ) : (
            <div className={classes.password}>
              <label className={classes.label_form} htmlFor="password">
                Mật khẩu mới:
              </label>
              <input
                className={classes.input_form}
                type={admin.isPasswordVisible ? "text" : "password"}
                id="password"
                name="password"
                value={admin.password}
                onChange={handleInputChange}
              />
              <button
                className={classes.button_effect}
                type="button"
                onClick={togglePasswordVisibility}
              >
                {admin.isPasswordVisible ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              </button>
              <button
                className={classes.button_effect}
                onClick={handleDeleteAccount}
              >
                Xóa Tài Khoản
              </button>
              <button className={classes.button_effect} type="submit">
                Lưu
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdminProfile;
