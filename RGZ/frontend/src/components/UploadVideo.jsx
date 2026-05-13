import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { videoService } from '../services/API';
import Input from './input';
import bgImage from './img/background.png';
import './Registration.css';

const UploadVideo = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Пожалуйста, выберите файл");
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);

    try {
      await videoService.uploadVideo(formData);
      alert('Видео успешно загружено!');
      setTitle('');
    } catch (err) {
      console.error(err);
      alert('Ошибка при загрузке. Проверьте соединение с сервером.');
    }
  };

  return (
    <div className="registration-page" style={{ backgroundImage: `url(${bgImage})` }}>
      <header className="header" style={{ 
  position: 'absolute', 
  top: 0, 
  left: 0, 
  width: '100%', 
  padding: '30px 60px', 
  display: 'flex', 
  justifyContent: 'space-between',
  boxSizing: 'border-box',
  zIndex: 10
}}>
  <Link to="/" className="logo" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '24px' }}>
    Click2Watch
  </Link>
  <Link to="/registration" className="user-menu" style={{ textDecoration: 'none', cursor: 'pointer', color: 'white' }}>
    Регистрация
  </Link>
</header>
      <div className="auth-container">
        <div className="auth-card">
          <h3 style={{ color: 'black', marginBottom: '20px', textAlign: 'left' }}>Загрузка контента</h3>
          <form className="auth-form" onSubmit={handleUpload}>
            <Input 
              label="Название видео" 
              placeholder="Введите название"
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
            />
            <div className="input-group" style={{ marginTop: '15px' }}>
              <label style={{ color: 'black', display: 'block', marginBottom: '8px', textAlign: 'left' }}>
                Выберите видеофайл
              </label>
              <input 
                type="file" 
                accept="video/*" 
                onChange={(e) => setFile(e.target.files[0])} 
                required 
                style={{ color: 'black', width: '100%' }}
              />
            </div>
            <button type="submit" className="submit-btn" style={{ marginTop: '25px' }}>
              Опубликовать
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadVideo;