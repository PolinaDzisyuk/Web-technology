import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import VideoPlayer from './components/videoplayer';
import Registration from './components/Registration';
import bgImage from './components/img/background.png';
import UploadVideo from './components/UploadVideo';
import './App.css';

function App() {
  const videoList = [
    { id: 13, title: 'Трансляция 1' },
    { id: 14, title: 'Трансляция 2' },
    { id: 15, title: 'Архив' }
  ];

  const [currentVideoId, setCurrentVideoId] = useState(13);
  const [messages, setMessages] = useState([{ id: 1, user: 'Женя', text: 'Всем привет' }]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    const newMessage = { id: Date.now(), user: 'Я', text: inputValue };
    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="main-page" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="main-layout">
          <header className="header">
            <Link to="/" className="logo" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '24px' }}>
                Click2Watch
              </Link>
            <Link to="/registration" className="user-menu" style={{ textDecoration: 'none', cursor: 'pointer', color: 'white' }}>Регистрация</Link>
          </header>
          <Routes>
            <Route path="/" element={
              <main className="content-container">
                <div className="video-section">
                  <div className="video-container-fixed">
                    <VideoPlayer videoId={currentVideoId} />
                  </div>
                  
                  <div className="video-controls-panel">
                    <div className="video-selector">
                      {videoList.map(video => (
                        <button 
                          key={video.id} 
                          className={currentVideoId === video.id ? 'active-video' : ''}
                          onClick={() => setCurrentVideoId(video.id)}
                        >
                          {video.title}
                        </button>
                      ))}
                    </div>
                    <Link to="/upload" className="upload-btn-main">Загрузить новое видео</Link>
                  </div>
                </div>
                <aside className="sidebar">
                  <div className="sidebar-tabs">
                    <span className="active">Чат</span>
                    <span>Вопрос / ответ</span>
                  </div>
                  <div className="chat-messages">
                    {messages.map((msg) => (
                      <div className="message" key={msg.id}>
                        <span className="user-name">{msg.user}:</span>
                        <p className="text">{msg.text}</p>
                      </div>
                    ))}
                  </div>
                  <div className="chat-input-area">
                    <input 
                      type="text" 
                      className="chat-input"
                      placeholder="Введите сообщение..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <button className="chat-button" onClick={handleSendMessage}>
                      Отправить
                    </button>
                  </div>
                </aside>
              </main>
            } />
            <Route path="/registration" element={<Registration />} />
            <Route path="/upload" element={<UploadVideo />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;