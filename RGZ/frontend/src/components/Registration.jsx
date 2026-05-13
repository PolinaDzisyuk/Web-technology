import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../services/API';
import Input from './input';
import bgImage from './img/background.png';
import './Registration.css';

const Registration = () => {
  const [activeTab, setActiveTab] = useState('registration');
  const [formData, setFormData] = useState({ 
    email: '', 
    last_name: '', 
    first_name: '' 
  });

  const [emailForCode, setEmailForCode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (activeTab === 'registration') {
        const response = await authService.register(formData);
        if (response.data && response.data.access) {
          localStorage.setItem('token', response.data.access);
        }
        
        alert('Регистрация успешна! Токен сохранен.');
      } else {
        alert('Запрос на код отправлен на: ' + emailForCode);
      }
    } catch (err) {
      console.error(err);
      alert('Ошибка при выполнении запроса');
    }
  };

  return (
    <div className="registration-page" style={{ backgroundImage: `url(${bgImage})` }}>
      {}
      <header className="header" style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 1001 }}>
        <Link to="/" className="logo" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '24px' }}>
            Click2Watch
        </Link>
      </header>
      <div className="auth-container">
        <div className="auth-card">
          
          <div className="auth-tabs">
            <span 
              className={activeTab === 'registration' ? 'active' : ''} 
              onClick={() => setActiveTab('registration')}
            >
              Регистрация
            </span>
            <span 
              className={activeTab === 'code' ? 'active' : ''} 
              onClick={() => setActiveTab('code')}
            >
              Код доступа
            </span>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {activeTab === 'registration' ? (
              <>
                <h3>Данные для авторизации</h3>
                <Input 
                  label="Электронная почта" 
                  name="email" 
                  type="email" 
                  placeholder="my_email@mail"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required 
                />

                <h3>Прочие данные</h3>
                <Input 
                  label="Фамилия" 
                  name="last_name" 
                  placeholder="Ваша фамилия"
                  value={formData.last_name}
                  onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                  required 
                />

                <Input 
                  label="Имя" 
                  name="first_name" 
                  placeholder="Ваше имя"
                  value={formData.first_name}
                  onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                  required 
                />
                <button type="submit" className="submit-btn">Отправить</button>
              </>
            ) : (
              <>
                <p className="tab-description" style={{color: '#000', marginBottom: '15px'}}>
                  *Укажите электронную почту для восстановления кода
                </p>
                <Input 
                  type="email" 
                  placeholder="mail@example.com"
                  value={emailForCode}
                  onChange={(e) => setEmailForCode(e.target.value)}
                  required 
                />
                <button type="submit" className="submit-btn" style={{marginTop: '20px'}}>
                  Получить код
                </button>
              </>
            )}
            <p className="form-footer">* поле, обязательное для заполнения</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;