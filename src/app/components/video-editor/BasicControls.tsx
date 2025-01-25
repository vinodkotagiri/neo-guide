import { formatTime } from '@/app/helpers/time';
import React from 'react'
import { HiScissors } from "react-icons/hi2";
import { MdCrop, MdPlayCircle, MdPauseCircle } from 'react-icons/md'
import ZoomControls from './ZoomControls';

interface BasicControlsProps{
  playing: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  currentTime: number;
  duration: number;
  zoom:number;
  setZoom: React.Dispatch<React.SetStateAction<number>>
}

function BasicControls({ playing,setPlaying,currentTime,duration,zoom,setZoom }:BasicControlsProps) {
  return (
    <div className='h-8 w-full flex px-3 justify-between align-center text-slate-400'>
      <div className='flex items-center gap-3'>
        <button>
          <HiScissors />
        </button>
        <button>
          <MdCrop />
        </button>
      </div>
      <div className='flex items-center gap-3'>
        <button onClick={()=>setPlaying(!playing)}>
          {playing ? <MdPauseCircle /> : <MdPlayCircle />}
        </button>
        <div className='text-sm'>{formatTime(currentTime)} / {formatTime(duration)}</div>
      </div>
      <div>
        <ZoomControls zoom={zoom} setZoom={setZoom}/>
      </div>
    </div>
  )
}

export default BasicControls