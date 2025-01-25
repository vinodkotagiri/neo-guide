'use client';
import React from 'react'
import BasicControls from './BasicControls'
import AdvancedControls from './AdvancedControls'
interface VideoControlsProps {
  playing: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  currentTime: number;
  duration: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  zoom: number;
}

function VideoControls({ playing, setPlaying, currentTime, duration, setZoom,zoom }: VideoControlsProps) {
  return (
    <div className='w-full h-full p-2'>
      <BasicControls playing={playing} setPlaying={setPlaying} currentTime={currentTime} duration={duration} setZoom={setZoom} zoom={zoom} />
      <AdvancedControls />
    </div>
  )
}

export default VideoControls