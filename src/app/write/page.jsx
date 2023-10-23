"use client"
import React, { useState, useEffect } from 'react';
import classes from './writepage.module.css';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.bubble.css';
import Link from 'next/link';
import { useSession } from "next-auth/react";
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const WritePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState('edit');
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { data: session } = useSession();
  useEffect(() => {
    fetch('http://localhost:3000/api/category')
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  const handlePublish = () => {
  };
  const handleDeleteCategory = async () => {
    if (!selectedCategory) {
        return;
    }

    // Sử dụng hộp thoại xác nhận để đảm bảo người dùng muốn xóa
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

        // Thông báo khi xóa thành công
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
            <button className={classes.addButton}>
              <Image src="/image.png" alt="" width={16} height={16} />
            </button>
            <button className={classes.addButton}>
              <Image src="/external.png" alt="" width={16} height={16} />
            </button>
            <button className={classes.addButton}>
              <Image src="/video.png" alt="" width={16} height={16} />
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
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className={classes.select}
            >
              {categories.map((category) => (
                <option key={category.category_ID} value={category.category_Name}>
                  {category.category_Name}
                </option>
              ))}
            </select>
          </div>

          <button className={classes.publish} onClick={handlePublish}>
            Đăng Bài
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
