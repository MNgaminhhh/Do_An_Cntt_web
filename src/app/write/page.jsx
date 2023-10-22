"use client"
import React, { useState, useEffect } from 'react';
import classes from './writepage.module.css';
import Image from 'next/image';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

const WritePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState('edit'); // Sử dụng 'edit' hoặc 'category' để chọn tab mặc định

  useEffect(() => {
    fetch('http://localhost:3000/api/category')
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  const handlePublish = () => {
    // Gửi thông tin bài viết lên server ở đây, bao gồm title, content, categoryID, adminID, và postDate.
  };

  const handleCreateCategory = () => {
    // Gửi thông tin danh mục mới lên server ở đây, bao gồm categoryName.
  };

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
        </div>
      )}

      
    </div>
  );
};

export default WritePage;
