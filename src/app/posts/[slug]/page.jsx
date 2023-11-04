"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import classes from './singlePage.module.css';
import Image from 'next/image';
import Menu from '@/components/Menu/Menu';
import { useSession } from 'next-auth/react';

export const metadata = {
  title: '',
  description: 'posts page',
}

const Page = () => {
  const router = useRouter();
  const [postId, setPostId] = useState(null);
  const [post, setPost] = useState(null);
  const { data: session } = useSession();
  const postDate = post ? new Date(post.postDate) : null;
  const formattedDate = postDate ? postDate.toLocaleDateString('en-US') : '';
  const [admin, setAdmin] = useState(null);
  useEffect(() => {
    const postIdFromPath = window.location.pathname.match(/\/posts\/(\d+)/);
    if (postIdFromPath) {
      const postId = postIdFromPath[1];
      setPostId(postId);
    }

    const fetchPost = async () => {
      if (postId) {
        try {
          const response = await fetch(`https://www.mn-tech.tech/api/posts/${postId}`);
          if (!response.ok) {
            throw new Error('Không tìm thấy bài đăng !');
          }
          const data = await response.json();
          setPost(data);
        } catch (error) {
          console.error('Error fetching post:', error);
        }
      }
    };

    fetchPost();
  }, [postId]);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await fetch('https://www.mn-tech.tech/api/admin');
        if (!response.ok) {
          throw new Error('Failed to fetch admin data');
        }
        const adminData = await response.json();
        const adminOfPost = adminData.find(admin => admin.admin_ID === post.admin_ID);
        setAdmin(adminOfPost);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };
    if (post) {
      metadata.title = post.title;
    }
    fetchAdmin();
  }, [post]);
  const handleEdit = () => {
    router.push(`/write?postId=${postId}`);
  };
  
  const handleDelete = async () => {
    try {
      const response = await fetch(`https://www.mn-tech.tech/api/posts/${postId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        alert('Bài viết đã được xóa thành công');
        router.push('/');
      } else {
        console.error('Lỗi xóa bài viết:', response.statusText);
      }
    } catch (error) {
      console.error('Lỗi khi gọi API xóa bài viết:', error);
    }
  };
  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className={classes.container}>
      {session ? (
        <div>
          <button
            className={classes.editButton}
            onClick={handleEdit}
          >
            Chỉnh sửa bài viết
          </button>
          <button
            className={classes.deleteButton}
            onClick={handleDelete}
          >
            Xóa bài viết
          </button>
        </div>
      ) : null}
      <div className={classes.infoContainer}>
        <div className={classes.textContainer}>
          <h1 className={classes.title}>{post.title}</h1>
          <div className={classes.user}>
          {admin && admin.full_name ? (
            <>
              <div className={classes.userImageContainer}>
                <Image className={classes.avatar} src='/p1.jpeg' alt='' fill />
              </div>
              <div className={classes.userTextContainer}>
                <span className={classes.username}>{admin.full_name} - </span>
                <span className={classes.date}>{formattedDate}</span>
              </div>
            </>
          ) : null}
          </div>
        </div>
        <div className={classes.imageContainer}>
          <Image src={post.img} alt='' fill className={classes.image}></Image>
        </div>
      </div>
      <div className={classes.content}>
        <div className={classes.post}>
          <div className={classes.description}>
            <div className={classes.descriptionContent} dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </div>
        <Menu></Menu>
      </div>
    </div>
  );
};

export default Page;
