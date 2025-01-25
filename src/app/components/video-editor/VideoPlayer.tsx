'use client';
import React from 'react'
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });
const src = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
function VideoPlayer({playing,setCurrentTime,setDuration}) {
  const handleDuration = (duration) => {
    setDuration(duration); // Sets the total duration of the video in seconds
  };
  const handleProgress = (state) => {
    setCurrentTime(state.playedSeconds); // Sets the current time in seconds
  };
  return (
    <div className='h-full w-full'>
            <ReactPlayer
              url={src}
              playing={playing}
              width="100%"
              height="100%"
              onDuration={handleDuration} 
              onProgress={handleProgress}
            />

    </div>
  )
}

export default VideoPlayer