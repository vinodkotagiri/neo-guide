'use client'
import React, { useRef, useState } from 'react'
import VideoPlayer from '../components/video-editor/VideoPlayer'
import VideoSider from '../components/video-editor/VideoSider'
import VideoControls from '../components/video-editor/VideoControls'

function page() {
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [seek, setSeek] = useState(0);
  const [duration, setDuration] = useState(0); // Total duration of the video
  const [currentTime, setCurrentTime] = useState(0); // Current playback time
  return (
    <div className='flex w-full h-[90%] bg-slate-900 p-2 gap-1'>
      <div className='w-4/5 h-full flex flex-col gap-1'>
        <div className='w-full h-[68%] border-[1px] rounded-md border-slate-700 bg-black'>
          <VideoPlayer playing={playing} setDuration={setDuration} setCurrentTime={setCurrentTime}/>
        </div>
        <div className='w-full h-[24%] bg-black rounded-md border-[1px] border-slate-700 text-slate-200'>
        <VideoControls playing={playing} setPlaying={setPlaying} duration={duration} currentTime={currentTime}/>
        </div>

      </div>
      <div className='w-1/5 h-[93%] bg-black rounded-md border-[1px] border-slate-700 text-slate-200'>
          <VideoSider />
      </div>
    </div>
  )
}

export default page