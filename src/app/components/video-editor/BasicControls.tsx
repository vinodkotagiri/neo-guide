import { formatTime } from '@/app/helpers/time';
import React from 'react'
import { HiScissors } from "react-icons/hi2";
import { MdCrop, MdPlayCircle, MdPauseCircle } from 'react-icons/md'
function BasicControls({ playing,setPlaying,currentTime,duration }) {
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
      <div>C</div>
    </div>
  )
}

export default BasicControls