'use client'
import React, { useRef } from 'react'
import VideoPlayer from '../components/video-editor/VideoPlayer'
import VideoSider from '../components/video-editor/VideoSider'
import VideoControls from '../components/video-editor/VideoControls'
function VideoEditorPage() {
  const playerRef = useRef(null);

  return (
    <div className='flex size-full bg-slate-900 p-2 gap-1'>
      <div className='w-[85%] h-full flex flex-col gap-1'>
        <div className='w-full h-[75%] border-[1px] rounded-md border-slate-700 bg-black'>
          <VideoPlayer playerRef={playerRef}/>
        </div>
        <div className='w-full h-[25%] bg-black rounded-md border-[1px] border-slate-700 text-slate-200'>
          <VideoControls/>
        </div>

      </div>
      <div className='w-[25%] h-full bg-black rounded-md border-[1px] border-slate-700 text-slate-200'>
        <VideoSider />
      </div>
    </div>
  )
}

export default VideoEditorPage