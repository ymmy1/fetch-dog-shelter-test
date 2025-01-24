import React, { useState, useEffect } from 'react';
import videoOne from '../assets/video/video_1.mp4';
import videoTwo from '../assets/video/video_2.mp4';
import videoThree from '../assets/video/video_3.mp4';
import videoFour from '../assets/video/video_4.mp4';

const videos = [videoOne, videoTwo, videoThree, videoFour];

const VideoCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {videos.map((video, index) => (
        <video
          key={index}
          src={video}
          autoPlay
          muted
          loop
          playsInline
          style={{
            display: currentIndex === index ? 'block' : 'none',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      ))}
    </div>
  );
};

export default VideoCarousel;
