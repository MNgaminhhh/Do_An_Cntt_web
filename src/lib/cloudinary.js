const axios = require('axios');
const FormData = require('form-data');

const handleImageUpload = async (selectedImage, setImageCallback) => {
  if (selectedImage) {
    const formData = new FormData();
    formData.append('file', selectedImage);
    formData.append('upload_preset', 'DoAnCNTT');

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/dts365s0l/image/upload', formData, {
        headers: formData.getHeaders(),
      });

      if (response.data.secure_url) {
        const imageUrl = response.data.secure_url;
        setImageCallback(imageUrl);
      } else {
        console.error('Lỗi khi tải lên hình ảnh: Không có URL hình ảnh được trả về từ Cloudinary.');
      }
    } catch (error) {
      console.error('Lỗi khi tải lên hình ảnh:', error);
    }
  } else {
    console.error('Lỗi khi tải lên hình ảnh: Hình ảnh không tồn tại.');
  }
};

module.exports = { handleImageUpload };
