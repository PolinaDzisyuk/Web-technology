import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const VideoPlayer = ({ videoId }) => {
  const videoPlaceholderRef = useRef(null);
  const playerRef = useRef(null);
  const videoUrl = `http://127.0.0.1:8000/api/videos/${videoId}/stream/`;

  useEffect(() => {
    const videoElement = document.createElement('video-js');
    videoElement.classList.add('vjs-big-play-centered');
    videoPlaceholderRef.current.appendChild(videoElement);
    const player = playerRef.current = videojs(videoElement, {
      autoplay: false,
      controls: true,
      responsive: true,
      fluid: true,
      sources: [{ src: videoUrl, type: 'video/mp4' }]
    }, () => {
      console.log('Воспроизведение видео ID:', videoId);
    });
    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
      if (videoPlaceholderRef.current) {
        videoPlaceholderRef.current.innerHTML = '';
      }
    };
  }, [videoUrl, videoId]);

  return (
    <div className="video-wrapper" style={{ width: '100%', borderRadius: '12px', overflow: 'hidden' }}>
      <div ref={videoPlaceholderRef} data-vjs-player />
    </div>
  );
};

export default VideoPlayer;