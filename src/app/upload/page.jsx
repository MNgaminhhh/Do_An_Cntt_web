"use client"
import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState('');
  const [imageUrl, setImageUrl] = useState('');

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

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input type="file" onChange={handleFileChange} />
        <label>{filename}</label>
      </div>
      <button type="submit">Upload</button>
      {imageUrl && <Image src={imageUrl} alt="Uploaded" width={400} height={400}/>} {/* display the uploaded image */}
    </form>
  );
};

export default UploadForm;
