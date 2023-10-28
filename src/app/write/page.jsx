"use client"
import React, { useState, useEffect } from 'react';
import classes from './writepage.module.css';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import axios from 'axios';
import 'react-quill/dist/quill.bubble.css';
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from 'next/navigation';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const WritePage = ({ params }) => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState('edit');
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const router = useRouter();
  const { data: session} = useSession();
  const searchParams = useSearchParams();
  const postId = searchParams.get('postId');
  useEffect(() => {
    fetch('http://localhost:3000/api/category')
      .then((response) => response.json())
      .then((data) => setCategories(data));
    
  }, []);
  useEffect(() => {
    fetchPostDetails(postId);
  }, [postId]);
  const handleSuccess = () => {
    if (postId) {
      alert('Bài viết đã được cập nhật thành công!');
    } else {
      alert('Bài viết đã được đăng thành công!');
    }
  };
  const fetchPostDetails = async (postId) => {
    if (!postId) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/posts/${postId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch post details');
      }

      const postData = await response.json();
      setTitle(postData.title);
      setContent(postData.content);
      setImageUrl(postData.img)
      setSelectedCategory(postData.category_ID);
    } catch (error) {
      console.error('Error fetching post details:', error);
    }
  };
  const handleSubmitPosts = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          img: imageUrl,
          postDate: new Date(),
          categoryId: selectedCategory,
          adminId: session.id,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      handleSuccess();
      router.push("/");
      const data = await response.json();
      setError(data.message);
      setTitle('');
      setContent('');
      setSelectedCategory('');
      setImageUrl('');
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };
  //update post 
  const handleUpdatePost = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          img: imageUrl,
          postDate: new Date(),
          categoryId: selectedCategory,
          adminId: session.id,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      handleSuccess();
      router.push("/");
      const data = await response.json();
      setError(data.message);
      setTitle('');
      setContent('');
      setSelectedCategory('');
      setImageUrl('');
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };
  
  //image upload in cloudinary
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setFilename(event.target.files[0].name);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert('Vui lòng chọn một file để tải lên.');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'DoAnCNTT');
    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dts365s0l/image/upload',
        formData
      );

      if (response.data.error) {
        console.error('Lỗi từ Cloudinary:', response.data.error.message);
      } else {
        console.log(response.data);
        setImageUrl(response.data.secure_url); // set the image URL
      }
    } catch (error) {
      console.error(error);
    }
  };

  // category 
  const handleDeleteCategory = async () => {
    if (!selectedCategory) {
        return;
    }
    const isConfirmed = window.confirm(`Bạn có chắc chắn muốn xóa danh mục "${selectedCategory}" không?`);
    if (!isConfirmed) {
        return;
    }
    try {
        const response = await fetch('http://localhost:3000/api/category', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ categoryName: selectedCategory }),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setError(data.message);
        setSelectedCategory('');
        alert(`Danh mục "${selectedCategory}" đã được xóa thành công.`);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
  };
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (categoryName.trim() === '') {
      setError('Tên danh mục không được để trống');
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/api/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categoryName }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setError(data.message);
      setCategoryName('');
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };
  // handleLogin
  if (!session) {
    return (
      <div>
        <p>Bạn cần phải đăng nhập để thực hiện chức năng này.</p>
        <Link href="/login">Đăng Nhập</Link>
      </div>
    );
  }

  
  return (
    <div className={classes.container}>
      <div className={classes.tabs}>
        <button
          className={`${classes.tabButton} ${activeTab === 'edit' ? classes.activeTab : ''}`}
          onClick={() => setActiveTab('edit')}
        >
          Bài Viết
        </button>
        <button
          className={`${classes.tabButton} ${activeTab === 'category' ? classes.activeTab : ''}`}
          onClick={() => setActiveTab('category')}
        >
          Chủ Đề
        </button>
      </div>

      {activeTab === 'edit' && (
        <div className={classes.editTab}>
            <input
              type="text"
              name="title"
              placeholder="Tiêu Đề"
              className={classes.titleInput}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className={classes.add}>
                <label htmlFor="imageUpload" className={classes.addButton}>
                  {imageUrl ? (
                    <Image src={imageUrl} alt="Uploaded" width={500} height={500} className={classes.uploadedImageContainer} />
                  ) : (
                    <div className={classes.imageLabel}>
                      <Image src="/image.png" alt="" width={30} height={30} />
                      <span className={classes.labelSpan}>Upload Image</span>
                    </div>
                  )}
                </label>
                <label className={classes.labelImage}>{filename}</label>
                <input
                  type="file"
                  id="imageUpload"
                  className={classes.imageInput}
                  onChange={handleFileChange}
                />
                <button 
                  type="submit" 
                  className={classes.uploadButton}
                  onClick={(e) => {
                    e.preventDefault();
                    if (!file) {
                      alert('Vui lòng chọn một file trước khi nhấn nút "Tải Lên".');
                      return;
                    }
                    handleSubmit(e);
                  }}
                >
                  Tải Lên
                </button>
              </div>

            <ReactQuill
              className={classes.textArea}
              theme="bubble"
              value={content}
              onChange={setContent}
              placeholder="Nội dung..."
            />
            <div className={classes.comboBoxCategory}>
              <label htmlFor="category" className={classes.label}>Danh mục:  </label>
              <select
                  id="category"
                  name="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={classes.select}
                >
                  <option value="">-- Chọn danh mục --</option>
                  {categories.map((category) => (
                    <option key={category.category_ID} value={category.category_ID}>
                      {category.category_Name}
                    </option>
                  ))}
                </select>

            </div>
            <button className={classes.publish} onClick={(e) => {
              if (postId) {
                handleUpdatePost(e);
              } else {
                handleSubmitPosts(e);
              }
            }}>
              {postId ? "Cập Nhật Bài Viết" : "Đăng Bài"}
            </button>
        </div>
      )}

      {activeTab === 'category' && (
        <div className={classes.categoryTab}>
          {error && <p className={classes.error}>{error}</p>}
          <input
            type="text"
            name="categoryName"
            placeholder="Tên danh mục"
            className={classes.titleInput}
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <button className={classes.publish} onClick={handleCreateCategory}>
            Tạo Danh Mục
          </button>

          <div className={classes.comboBoxCategory}>
            <label htmlFor="category" className={classes.label}>Danh mục:  </label>
            <select
              id="category"
              name="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={classes.select}
            >
              <option value="">-- Chọn danh mục để xóa --</option>
              {categories.map((category) => (
                <option key={category.category_ID} value={category.category_Name}>
                  {category.category_Name}
                </option>
              ))}
            </select>
          </div>
          <button className={classes.publish} onClick={handleDeleteCategory}>
            Xóa Danh Mục
          </button>
        </div>
      )}

    </div>
  );
};

export default WritePage;