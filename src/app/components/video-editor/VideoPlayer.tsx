'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

const src = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

interface VideoPlayerProps {
  playing: boolean;
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
  playerRef: React.RefObject<unknown>;
  zoom: number;
}

interface OnProgressProps {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  playing,
  setCurrentTime,
  setDuration,
  playerRef,
  zoom,
}) => {
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

useEffect(()=>{
  if(zoom==1){
    setOffsetX(0)
    setOffsetY(0)

  }
},[zoom])

  const handleDuration = (duration: number) => {
    setDuration(duration); // Sets the total duration of the video in seconds
  };

  const handleProgress = (state: OnProgressProps) => {
    setCurrentTime(state.playedSeconds); // Sets the current time in seconds
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if(zoom!=1){
      setDragging(true);
      setStartX(e.clientX - offsetX);
      setStartY(e.clientY - offsetY);
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;

    const newOffsetX = e.clientX - startX;
    const newOffsetY = e.clientY - startY;

    setOffsetX(newOffsetX);
    setOffsetY(newOffsetY);
  };

  const onMouseUp = () => {
    setDragging(false);
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-md"
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      <div
        className="absolute"
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: 'center',
          cursor: zoom==1?'auto':dragging ? 'grabbing' : 'grab',
          left: `${offsetX}px`,
          top: `${offsetY}px`,
        }}
        onMouseDown={onMouseDown}
      > 
        <ReactPlayer
          ref={playerRef}
          url={src}
          playing={playing}
          width="100%"
          height="100%"
          onDuration={handleDuration}
          onProgress={handleProgress}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
