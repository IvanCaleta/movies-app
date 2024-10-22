import React, { useEffect, useRef } from 'react'
import './VideoPlayerStyle.css';

const VideoPlayer = ({ movieId }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const savedTime = localStorage.getItem(movieId);
    if (savedTime && videoRef?.current) {
      videoRef.current.currentTime = parseFloat(savedTime);
    }

    const handleTimeUpdate = () => {
      if (videoRef.current) {
        localStorage.setItem(movieId, videoRef?.current?.currentTime);
      }
    };

    const videoElement = videoRef?.current;
    if (videoElement) {
      videoElement.addEventListener('timeupdate', handleTimeUpdate);
    }

    return () => {
      if (videoElement) {
        videoElement?.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, [movieId]);

  return (
    <div className='video-container'>
      <video ref={videoRef} controls width="100%" height="auto">
        <source
          src={process.env.REACT_APP_VIDEO_URL}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export default VideoPlayer